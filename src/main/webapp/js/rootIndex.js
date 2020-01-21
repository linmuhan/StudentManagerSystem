//实现刷新时tab位置不变
$(document).ready(function () {
    if (location.hash) {
        $('a[href=' + location.hash + ']').tab('show');
    }
    //获取尾部的#后面的标签
    $(document.body).on("click", "a[data-toggle]", function (event) {
        location.hash = this.getAttribute("href");
    });
});
$(window).on(function () {
    var anchor = location.hash || $("a[data-toggle=tab]").first().attr("href");
    $('a[href=' + anchor + ']').tab('show');
});

//定义全局变量当前页码
var currentStudentPage;
var currentCoursePage;
var currentGradePage;

$(function () {
    student_page(1, null);
    course_page(1, null);
    grade_page(1, null);
    $("#sButton").click(function () {
        var search_key = $.trim($("#studentText").val());
        student_page(1, search_key);
    });
    $("#cButton").click(function () {
        var search_key = $.trim($("#courseText").val());
        course_page(1, search_key);
    });
    $("#gButton").click(function () {
        var search_key = $.trim($("#gradeText").val());
        grade_page(1, search_key);
    });

    //增加学生模态框的监听
    $("#addStudentModel").click(function () {
        $("#studentAddModal").modal({
            backdrop: 'static'
        })
    });

    //增加课程模态框的监听
    $("#addCourseModel").click(function () {
        $("#courseAddModal").modal({
            backdrop: 'static'
        })
    });

    //增加学生成绩模态框的监听
    $("#addGradeModel").click(function () {
        $("#gradeAddModal").modal({
            backdrop: 'static'
        })
    });

    //清除增加学生信息的模态框
    $("#studentAddModal").on('hidden.bs.modal', function () {
        document.getElementById("studentAddForm").reset();
    });
    //清除增加课程信息的模态框
    $("#courseAddModal").on('hidden.bs.modal', function () {
        document.getElementById("courseAddForm").reset();
    });
    //清除增加成绩信息的模态框
    $("#gradeAddModal").on('hidden.bs.modal', function () {
        document.getElementById("gradeAddForm").reset();
    });
});

//学生信息的ajax的调用以及局部刷新
function student_page(pn, studentText) {
    $.ajax({
        url: "doShowStudent",    //发起请求的地址
        data: {"pn": pn, "studentText": studentText},      //向后台传递的参数
        type: "post",
        success: function (data) {
            //构建学生信息列表
            build_student(data);
            //构建分页按钮列表
            build_student_pageInfo(data);
        }
    });
}

function build_student(student) {
    //清空表格旧的内容
    $('#tbStudent').empty();
    var data = student.extend.pageInfo.list;
    $(data).each(
        function (i, values) {
            var editbtn = $("<td></td>")
                .append($("<button></button>")
                    .addClass("btn btn-primary btn-sm btn-block").append($("<span></span>")
                        .addClass("glyphicon glyphicon-pencil")).append("编辑"));
            var deletebtn = $("<td></td>")
                .append($("<button></button>")
                    .addClass("btn btn-danger btn-sm btn-block")
                    .append($("<span></span>")
                        .addClass("glyphicon glyphicon-trash")).append("删除"));

            //删除按钮增加监听功能
            deletebtn.click(function () {
                var studentSno = $(this).parents("tr").find("td:eq(0)").text();
                var studentSname = $(this).parents("tr").find("td:eq(1)").text();
                if (confirm("确认删除学生【" + studentSname + "】吗？")) {
                    $.ajax({
                        url: "deleteStudent",
                        type: "post",
                        data: {"studentSno": studentSno},
                        dataType: 'html',
                        success: function (data) {
                            if (data == "failed") {
                                alert("删除失败！请重试。")
                            } else if (data == "success") {
                                alert("删除成功！");
                                student_page(currentStudentPage, null);
                                grade_page(currentGradePage, null);
                            } else if (data == "noSno") {
                                alert("无有效数据，请重试。")
                            }
                        }
                    })
                }
            });
            //编辑按钮增加监听功能
            editbtn.click(function () {
                $("#editStudentModal").modal({
                    backdrop: 'static'
                });
                var studentSno = $(this).parents("tr").find("td:eq(0)").text();
                var studentSname = $(this).parents("tr").find("td:eq(1)").text();
                var studentGender = $(this).parents("tr").find("td:eq(2)").text();
                var studentBirth = $(this).parents("tr").find("td:eq(3)").text();
                var studentClasses = $(this).parents("tr").find("td:eq(4)").text();
                var studentMajor = $(this).parents("tr").find("td:eq(5)").text();
                var studentCollege = $(this).parents("tr").find("td:eq(6)").text();
                $("#editSno").attr("value", studentSno);
                $("#editSname").attr("value", studentSname);
                $("#editClasses").attr("value", studentClasses);
                $("#editMajor").attr("value", studentMajor);
                $("#editCollege").attr("value", studentCollege);
                $("#editBirth").attr("value", studentBirth);
                if (studentGender == "男") {
                    $("#editMan").prop("checked", true);
                } else {
                    $("#editWoman").prop("checked", true);
                }
            });
            $('#tbStudent').append($("<tr></tr>").append(
                "<td>" + values.sno + "</td>"
                + "<td>" + values.sname + "</td>"
                + "<td>" + values.gender + "</td>"
                + "<td>" + values.birth + "</td>"
                + "<td>" + values.classes + "</td>"
                + "<td>" + values.major + "</td>"
                + "<td>" + values.college + "</td>"
            ).append(editbtn).append(deletebtn));
        }
    );
}

function build_student_pageInfo(pageInfo) {
    var studentText = $.trim($("#studentText").val());
    var data = pageInfo.extend.pageInfo;
    currentStudentPage = data.pageNum;
    $("#student_nav").empty();
    var headStudent = $("<a></a>").append("[首 页]").attr("href", "#").addClass("btn btn-default btn-sm");
    var backStudent = $("<a></a>").append("[上一页]").addClass("btn btn-default btn-sm");
    var nextStudent = $("<a></a>").append("[下一页]").addClass("btn btn-default btn-sm");
    var lastStudent = $("<a></a>").append("[末 页]").attr("href", "#").addClass("btn btn-default btn-sm");
    var exitStudent = $("<a></a>").append("[注 销]").attr("href", "login").addClass("btn btn-default btn-sm");
    //将构建好的分页按钮添加进入表格里
    headStudent.appendTo("#student_nav");
    backStudent.appendTo("#student_nav");
    nextStudent.appendTo("#student_nav");
    lastStudent.appendTo("#student_nav");
    exitStudent.appendTo("#student_nav");
    if (data.hasNextPage == false) {
        nextStudent.addClass("disabled");
        lastStudent.addClass("disabled");
    }
    if (data.hasPreviousPage == false) {
        headStudent.addClass("disabled");
        backStudent.addClass("disabled");
    }
    //实现分页按钮调用ajax进行异步局部刷新
    headStudent.click(function () {
        student_page(1, studentText);
    });
    backStudent.click(function () {
        student_page(data.pageNum - 1, studentText);
    });
    nextStudent.click(function () {
        student_page(data.pageNum + 1, studentText);
    });
    lastStudent.click(function () {
        student_page(data.pages, studentText);
    })
}

//课程信息的ajax调用以及局部刷新
function course_page(pn, courseText) {
    $.ajax({
        url: "doShowCourse",    //发起请求的地址
        data: {"pn": pn, "courseText": courseText},      //向后台传递的参数
        type: "post",
        success: function (data) {
            //构建学生信息列表
            build_course(data);
            //构建分页按钮列表
            build_course_pageInfo(data);
        }
    });
}

function build_course(course) {
    //清空表格旧的内容
    $('#tbCourse').empty();
    var data = course.extend.pageInfo.list;
    $(data).each(
        function (i, values) {
            var editbtn = $("<td></td>")
                .append($("<button></button>")
                    .addClass("btn btn-primary btn-sm btn-block").append($("<span></span>")
                        .addClass("glyphicon glyphicon-pencil")).append("编辑"));
            var deletebtn = $("<td></td>")
                .append($("<button></button>")
                    .addClass("btn btn-danger btn-sm btn-block")
                    .append($("<span></span>")
                        .addClass("glyphicon glyphicon-trash")).append("删除"));
            deletebtn.click(function () {
                var id = $(this).parents("tr").find("td:eq(0)").text();
                var courseCname = $(this).parents("tr").find("td:eq(2)").text();
                if (confirm("确认删除课程【" + courseCname + "】吗？")) {
                    $.ajax({
                        url: "deleteCourse",
                        type: "post",
                        data: {"id": id},
                        dataType: 'html',
                        success: function (data) {
                            if (data == "failed") {
                                alert("删除失败！请重试。")
                            } else if (data == "success") {
                                alert("删除成功！");
                                course_page(currentCoursePage, null);
                                grade_page(currentGradePage, null);
                            } else if (data == "noCno") {
                                alert("无有效数据！请重试。")
                            }
                        }
                    })
                }
            });
            //课程编辑按钮，将信息传入编辑框中
            editbtn.click(function () {
                $("#editCourseModal").modal({
                    backdrop: 'static'
                });
                var courseCno = $(this).parents("tr").find("td:eq(1)").text();
                var courseCname = $(this).parents("tr").find("td:eq(2)").text();
                var courseClass_hour = $(this).parents("tr").find("td:eq(3)").text();
                var courseCredit = $(this).parents("tr").find("td:eq(4)").text();
                $("#editCno").attr("value", courseCno);
                $("#editCname").attr("value", courseCname);
                //将获取的课时和学分进行select赋值
                $("#editSelectHour").find("option").eq(0).text(courseClass_hour).prop("selected", true);
                $("#editSelectCredit").find("option").eq(0).text(courseCredit).prop("selected", true);
            });
            $('#tbCourse').append($("<tr></tr>").append(
                "<td>" + values.id + "</td>"
                + "<td>" + values.cno + "</td>"
                + "<td>" + values.cname + "</td>"
                + "<td>" + values.class_hour + "</td>"
                + "<td>" + values.credit + "</td>"
            ).append(editbtn).append(deletebtn));
        }
    );
}

function build_course_pageInfo(pageInfo) {
    var courseText = $.trim($("#courseText").val());
    var data = pageInfo.extend.pageInfo;
    currentCoursePage = data.pageNum;
    $("#course_nav").empty();
    var headCourse = $("<a></a>").append("[首 页]").attr("href", "#").addClass("btn btn-default btn-sm");
    var backCourse = $("<a></a>").append("[上一页]").addClass("btn btn-default btn-sm");
    var nextCourse = $("<a></a>").append("[下一页]").addClass("btn btn-default btn-sm");
    var lastCourse = $("<a></a>").append("[末 页]").attr("href", "#").addClass("btn btn-default btn-sm");
    var exitCourse = $("<a></a>").append("[注 销]").attr("href", "login").addClass("btn btn-default btn-sm");
    //将构建好的分页按钮添加进入表格里
    headCourse.appendTo("#course_nav");
    backCourse.appendTo("#course_nav");
    nextCourse.appendTo("#course_nav");
    lastCourse.appendTo("#course_nav");
    exitCourse.appendTo("#course_nav");
    if (data.hasNextPage == false) {
        nextCourse.addClass("disabled");
        lastCourse.addClass("disabled");
    }
    if (data.hasPreviousPage == false) {
        headCourse.addClass("disabled");
        backCourse.addClass("disabled");
    }
    //实现分页按钮调用ajax进行异步局部刷新
    headCourse.click(function () {
        course_page(1, courseText);
    });
    backCourse.click(function () {
        course_page(data.pageNum - 1, courseText);
    });
    nextCourse.click(function () {
        course_page(data.pageNum + 1, courseText);
    });
    lastCourse.click(function () {
        course_page(data.pages, courseText);
    })
}


//成绩信息的ajax调用以及局部刷新
function grade_page(pn, gradeText) {
    $.ajax({
        url: "doShowGrade",    //发起请求的地址
        data: {"pn": pn, "gradeText": gradeText},      //向后台传递的参数
        type: "post",
        success: function (data) {
            //构建学生信息列表
            build_grade(data);
            //构建分页按钮列表
            build_grade_pageInfo(data);
        }
    });
}

function build_grade(grade) {
    //清空表格旧的内容
    $('#tbGrade').empty();
    var data = grade.extend.pageInfo.list;
    $(data).each(
        function (i, values) {
            var editbtn = $("<td></td>")
                .append($("<button></button>")
                    .addClass("btn btn-primary btn-sm btn-block").append($("<span></span>")
                        .addClass("glyphicon glyphicon-pencil")).append("编辑"));
            var deletebtn = $("<td></td>")
                .append($("<button></button>")
                    .addClass("btn btn-danger btn-sm btn-block")
                    .append($("<span></span>")
                        .addClass("glyphicon glyphicon-trash")).append("删除"));
            //成绩删除按钮监听模态框
            deletebtn.click(function () {
                var gradeSno = $(this).parents("tr").find("td:eq(0)").text();
                var gradeCno = $(this).parents("tr").find("td:eq(1)").text();
                var gradeCname = $(this).parents("tr").find("td:eq(2)").text();
                if (confirm("确认删除学号为【" + gradeSno + "】的" + gradeCname + "课程吗？")) {
                    $.ajax({
                        url: "deleteGrade",
                        type: "post",
                        data: {"gradeSno": gradeSno, "gradeCno": gradeCno},
                        dataType: 'html',
                        success: function (data) {
                            if (data == "failed") {
                                alert("删除失败！请重试。")
                            } else if (data == "success") {
                                alert("删除成功！");
                                grade_page(currentGradePage, null);
                            } else if (data == "noData") {
                                alert("无有效数据！请重试。")
                            }
                        },
                        error: function () {
                            alert("删除失败！请重试。")
                        }
                    })
                }
            });
            //成绩编辑按钮监听模态框
            editbtn.click(function () {
                $("#editGradeModal").modal({
                    backdrop: 'static'
                });
                var gradeSno = $(this).parents("tr").find("td:eq(0)").text();
                var gradeCno = $(this).parents("tr").find("td:eq(1)").text();
                var gradeCname = $(this).parents("tr").find("td:eq(2)").text();
                var gradeScore = $(this).parents("tr").find("td:eq(3)").text();
                var gradeSecondScore = $(this).parents("tr").find("td:eq(4)").text();
                $("#editGradeSno").attr("value", gradeSno);
                $("#editGradeCno").attr("value", gradeCno);
                $("#editGradeCname").attr("value", gradeCname);
                //修改select选项中的值
                $("#editSelectScore").find("option").eq(0).text(gradeScore).prop("selected", true);
                $("#editSelectSecondScore").find("option").eq(0).text(gradeSecondScore).prop("selected", true);
            });
            $('#tbGrade').append($("<tr></tr>").append(
                "<td>" + values.sno + "</td>"
                + "<td>" + values.cno + "</td>"
                + "<td>" + values.cname + "</td>"
                + "<td>" + values.score + "</td>"
                + "<td>" + values.secondScore + "</td>"
            ).append(editbtn).append(deletebtn));
        }
    );
}

function build_grade_pageInfo(pageInfo) {
    var gradeText = $.trim($("#gradeText").val());
    var data = pageInfo.extend.pageInfo;
    currentGradePage = data.pageNum;
    $("#grade_nav").empty();
    var headGrade = $("<a></a>").append("[首 页]").attr("href", "#").addClass("btn btn-default btn-sm");
    var backGrade = $("<a></a>").append("[上一页]").addClass("btn btn-default btn-sm");
    var nextGrade = $("<a></a>").append("[下一页]").addClass("btn btn-default btn-sm");
    var lastGrade = $("<a></a>").append("[末 页]").attr("href", "#").addClass("btn btn-default btn-sm");
    var exitGrade = $("<a></a>").append("[注 销]").attr("href", "login").addClass("btn btn-default btn-sm");
    //将构建好的分页按钮添加进入表格里
    headGrade.appendTo("#grade_nav");
    backGrade.appendTo("#grade_nav");
    nextGrade.appendTo("#grade_nav");
    lastGrade.appendTo("#grade_nav");
    exitGrade.appendTo("#grade_nav");
    if (data.hasNextPage == false) {
        nextGrade.addClass("disabled");
        lastGrade.addClass("disabled");
    }
    if (data.hasPreviousPage == false) {
        headGrade.addClass("disabled");
        backGrade.addClass("disabled");
    }
    //实现分页按钮调用ajax进行异步局部刷新
    headGrade.click(function () {
        grade_page(1, gradeText);
    });
    backGrade.click(function () {
        grade_page(data.pageNum - 1, gradeText);
    });
    nextGrade.click(function () {
        grade_page(data.pageNum + 1, gradeText);
    });
    lastGrade.click(function () {
        grade_page(data.pages, gradeText);
    })
}

/*
* 学生增加模态框的ajax
* */
function studentSave() {
    var student = new Object();
    student.sno = $.trim($("#sno").val());
    student.sname = $.trim($("#sname").val());
    student.gender = $.trim($("input[name='1']:checked").val());
    student.birth = $.trim($("#birth").val());
    student.classes = $.trim($("#classes").val());
    student.major = $.trim($("#major").val());
    student.college = $.trim($("#college").val());
    if (student.sno == "") {
        $("#sno").focus();
        alert("学号不能为空");
    } else if (student.sname == "") {
        $("#sname").focus();
        alert("姓名不能为空");
    } else if (student.gender == "") {
        $("#gender").focus();
        alert("性别不能为空");
    } else if (student.birth == "") {
        $("#birth").focus();
        alert("出生日期不能为空");
    } else if (student.classes == "") {
        $("#classes").focus();
        alert("班级不能为空");
    } else if (student.major == "") {
        $("#major").focus();
        alert("专业不能为空");
    } else if (student.college == "") {
        $("#college").focus();
        alert("院系不能为空");
    } else {
        $.ajax({
            type: "post",
            url: "addStudent",
            data: {student: JSON.stringify(student)},
            dataType: 'html',
            success: function (data) {
                if (data == "failed") {
                    alert("添加失败！请重试。");
                } else if (data == "success") {
                    alert("添加成功！");
                    $("#studentAddModal").modal("hide");
                    student_page(currentStudentPage, null);
                } else if (data == "noStudent") {
                    alert("无有效数据。");
                } else if (data == "exit") {
                    alert("该学生已经存在了！请重试。");
                }
            },
            error: function () {
                alert("添加失败！请重试。");
            }
        });
    }
}

/*
* 课程增加模态框的ajax
* */
function courseSave() {
    var course = new Object();
    course.cno = $.trim($("#cno").val());
    course.cname = $.trim($("#cname").val());
    course.class_hour = $.trim($("#selectHour option:selected").text());
    course.credit = $.trim($("#selectCredit option:selected").text());
    if (course.cno == "") {
        $("#cno").focus();
        alert("课程号不能为空");
    } else if (course.cname == "") {
        $("#cname").focus();
        alert("课程名不能为空");
    } else {
        $.ajax({
            type: "post",
            url: "addCourse",
            data: {course: JSON.stringify(course)},
            dataType: 'html',
            success: function (data) {
                if (data == "failed") {
                    alert("添加失败！请重试。");
                } else if (data == "success") {
                    alert("添加成功！");
                    $("#courseAddModal").modal("hide");
                    course_page(currentCoursePage, null);
                } else if (data == "noStudent") {
                    alert("无有效数据。");
                } else if (data == "exit") {
                    alert("该课程已经存在了！请重试。");
                }
            },
            error: function () {
                alert("添加失败！请重试。");
            }
        });
    }
}

/*
* 成绩增加模态框的ajax
* */
function gradeSave() {
    var grade = new Object();
    grade.sno = $.trim($("#gradeSno").val());
    grade.cno = $.trim($("#gradeCno").val());
    grade.cname = $.trim($("#gradeCname").val());
    grade.score = $.trim($("#selectScore option:selected").text());
    grade.secondScore = $.trim($("#selectSecondScore option:selected").text());
    if (grade.sno == "") {
        $("#gradeSno").focus();
        alert("学号不能为空");
    } else if (grade.cno == "") {
        $("#gradeCno").focus();
        alert("课程号不能为空");
    } else if (grade.cname == "") {
        $("#gradeCname").focus();
        alert("课程名不能为空");
    } else {
        $.ajax({
            type: "post",
            url: "addGrade",
            data: {grade: JSON.stringify(grade)},
            dataType: 'html',
            success: function (data) {
                if (data == "failed") {
                    alert("添加失败！请重试。");
                } else if (data == "success") {
                    alert("添加成功！");
                    $("#gradeAddModal").modal("hide");
                    grade_page(currentGradePage, null);
                } else if (data == "noGrade") {
                    alert("无有效数据。");
                } else if (data == "exit") {
                    alert("该成绩已经存在了！请重试。");
                } else if (data == "noSno") {
                    alert("该学生不存在！请重新输入。");
                } else if (data == "noCno") {
                    alert("该课程不存在！请重新输入。");
                }
            },
            error: function () {
                alert("添加失败！请重试。");
            }
        });
    }
}

//添加成绩时输入课程号向后台发送ajax请求，然后补全课程名
function makeUpCname() {
    var gradeCno = $.trim($("#gradeCno").val());
    if (gradeCno != null && gradeCno != "") {
        $.ajax({
            url: "makeUpCname",
            data: {"gradeCno": gradeCno},
            type: "post",
            success: function (data) {
                $("#gradeCname").attr("value", data.extend.gradeCname);
            }
        })
    } else {
        $("#gradeCname").attr("value", "");
    }
}

/*
* 编辑学生模态窗口
* */
function editStudent() {
    var student = new Object();
    student.sno = $.trim($("#editSno").val());
    student.sname = $.trim($("#editSname").val());
    student.gender = $.trim($("input[name='2']:checked").val());
    student.birth = $.trim($("#editBirth").val());
    student.classes = $.trim($("#editClasses").val());
    student.major = $.trim($("#editMajor").val());
    student.college = $.trim($("#editCollege").val());
    if (student.sno == "") {
        $("#editSno").focus();
        alert("学号不能为空");
    } else if (student.sname == "") {
        $("#editSname").focus();
        alert("姓名不能为空");
    } else if (student.birth == "") {
        $("#editBirth").focus();
        alert("出生日期不能为空");
    } else if (student.classes == "") {
        $("#editClasses").focus();
        alert("班级不能为空");
    } else if (student.major == "") {
        $("#editMajor").focus();
        alert("专业不能为空");
    } else if (student.college == "") {
        $("#editCollege").focus();
        alert("院系不能为空");
    } else {
        $.ajax({
            type: "post",
            url: "updateStudent",
            data: {student: JSON.stringify(student)},
            dataType: 'html',
            success: function (data) {
                if (data == "failed") {
                    alert("更新失败！请重试。");
                } else if (data == "success") {
                    alert("更新成功！");
                    $("#editStudentModal").modal("hide");
                    student_page(currentStudentPage, null);
                } else if (data == "noStudent") {
                    alert("无有效数据。");
                } else if (data == "exit") {
                    alert("无任何更新变化。");
                }
            },
            error: function () {
                alert("更新失败！请重试。");
            }
        });
    }
}

/*
* 编辑课程模态窗口
* */
function editCourse() {
    var course = new Object();
    course.cno = $.trim($("#editCno").val());
    course.cname = $.trim($("#editCname").val());
    course.class_hour = $.trim($("#editSelectHour option:selected").text());
    course.credit = $.trim($("#editSelectCredit option:selected").text());
    if (course.cno == "") {
        $("#cno").focus();
        alert("课程号不能为空");
    } else if (course.cname == "") {
        $("#cname").focus();
        alert("课程名不能为空");
    } else {
        $.ajax({
            type: "post",
            url: "updateCourse",
            data: {course: JSON.stringify(course)},
            dataType: 'html',
            success: function (data) {
                if (data == "failed") {
                    alert("更新失败！请重试。");
                } else if (data == "success") {
                    alert("更新成功！");
                    $("#editCourseModal").modal("hide");
                    course_page(currentCoursePage, null);
                    grade_page(currentGradePage,null);
                } else if (data == "noStudent") {
                    alert("无有效数据。");
                } else if (data == "exit") {
                    alert("无任何更新变化。");
                }
            },
            error: function () {
                alert("更新失败！请重试。");
            }
        });
    }
}

/*
* 编辑成绩模态窗口
* */
function editGrade() {
    var grade = new Object();
    grade.sno = $.trim($("#editGradeSno").val());
    grade.cno = $.trim($("#editGradeCno").val());
    grade.cname = $.trim($("#editGradeCname").val());
    grade.score = $.trim($("#editSelectScore option:selected").text());
    grade.secondScore = $.trim($("#editSelectSecondScore option:selected").text());
    $.ajax({
        type: "post",
        url: "updateGrade",
        data: {grade: JSON.stringify(grade)},
        dataType: 'html',
        success: function (data) {
            if (data == "failed") {
                alert("更新失败！请重试。");
            } else if (data == "success") {
                alert("更新成功！");
                $("#editGradeModal").modal("hide");
                grade_page(currentGradePage, null);
            } else if (data == "noGrade") {
                alert("无有效数据。");
            } else if (data == "exit") {
                alert("无任何更新变化。");
            }
        },
        error: function () {
            alert("更新失败！请重试。");
        }
    });
}



