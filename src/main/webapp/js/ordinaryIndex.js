$(function () {
    student_page(1,null);
    course_page(1,null);
    grade_page(1,null);
    $("#sButton").click(function () {
        var search_key=$.trim($("#studentText").val());
        student_page(1,search_key);
    });
    $("#cButton").click(function () {
        var search_key=$.trim($("#courseText").val());
        course_page(1,search_key);
    });
    $("#gButton").click(function () {
        var search_key=$.trim($("#gradeText").val());
        grade_page(1,search_key);
    });
});

//学生信息的ajax的调用以及局部刷新
function student_page(pn,studentText){
    $.ajax({
        url:"doShowStudent",    //发起请求的地址
        data:{"pn":pn,"studentText":studentText},      //向后台传递的参数
        type:"post",
        success:function (data) {
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
    var data=student.extend.pageInfo.list;
    $(data).each(
        function (i,values) {
            $('#tbStudent').append(
                "<tr><td>"+values.sno+"</td>"
                +"<td>"+values.sname+"</td>"
                +"<td>"+values.gender+"</td>"
                +"<td>"+values.birth+"</td>"
                +"<td>"+values.classes+"</td>"
                +"<td>"+values.major+"</td>"
                +"<td>"+values.college+"</td></tr>"
            );
        }
    );
}
function build_student_pageInfo(pageInfo) {
    var studentText=$.trim($("#studentText").val());
    var data=pageInfo.extend.pageInfo;
    $("#student_nav").empty();
    var headStudent=$("<a></a>").append("[首 页]").attr("href","#").addClass("btn btn-default btn-sm");
    var backStudent=$("<a></a>").append("[上一页]").addClass("btn btn-default btn-sm");
    var nextStudent=$("<a></a>").append("[下一页]").addClass("btn btn-default btn-sm");
    var lastStudent=$("<a></a>").append("[末 页]").attr("href","#").addClass("btn btn-default btn-sm");
    var exitStudent=$("<a></a>").append("[注 销]").attr("href","login").addClass("btn btn-default btn-sm");
    //将构建好的分页按钮添加进入表格里
    headStudent.appendTo("#student_nav");
    backStudent.appendTo("#student_nav");
    nextStudent.appendTo("#student_nav");
    lastStudent.appendTo("#student_nav");
    exitStudent.appendTo("#student_nav");
    if(data.hasNextPage==false){
        nextStudent.addClass("disabled");
        lastStudent.addClass("disabled");
    }
    if(data.hasPreviousPage==false){
        headStudent.addClass("disabled");
        backStudent.addClass("disabled");
    }
    //实现分页按钮调用ajax进行异步局部刷新
    headStudent.click(function () {
        student_page(1,studentText);
    });
    backStudent.click(function () {
        student_page(data.pageNum-1,studentText);
    });
    nextStudent.click(function () {
        student_page(data.pageNum+1,studentText);
    });
    lastStudent.click(function () {
        student_page(data.pages,studentText);
    })
}

//课程信息的ajax调用以及局部刷新
function course_page(pn,courseText){
    $.ajax({
        url:"doShowCourse",    //发起请求的地址
        data:{"pn":pn,"courseText":courseText},      //向后台传递的参数
        type:"post",
        success:function (data) {
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
    var data=course.extend.pageInfo.list;
    $(data).each(
        function (i,values) {
            $('#tbCourse').append(
                "<tr><td>"+values.id+"</td>"
                +"<td>"+values.cno+"</td>"
                +"<td>"+values.cname+"</td>"
                +"<td>"+values.class_hour+"</td>"
                +"<td>"+values.credit+"</td></tr>"
            );
        }
    );
}
function build_course_pageInfo(pageInfo) {
    var courseText=$.trim($("#courseText").val());
    var data=pageInfo.extend.pageInfo;
    $("#course_nav").empty();
    var headCourse=$("<a></a>").append("[首 页]").attr("href","#").addClass("btn btn-default btn-sm");
    var backCourse=$("<a></a>").append("[上一页]").addClass("btn btn-default btn-sm");
    var nextCourse=$("<a></a>").append("[下一页]").addClass("btn btn-default btn-sm");
    var lastCourse=$("<a></a>").append("[末 页]").attr("href","#").addClass("btn btn-default btn-sm");
    var exitCourse=$("<a></a>").append("[注 销]").attr("href","login").addClass("btn btn-default btn-sm");
    //将构建好的分页按钮添加进入表格里
    headCourse.appendTo("#course_nav");
    backCourse.appendTo("#course_nav");
    nextCourse.appendTo("#course_nav");
    lastCourse.appendTo("#course_nav");
    exitCourse.appendTo("#course_nav");
    if(data.hasNextPage==false){
        nextCourse.addClass("disabled");
        lastCourse.addClass("disabled");
    }
    if(data.hasPreviousPage==false){
        headCourse.addClass("disabled");
        backCourse.addClass("disabled");
    }
    //实现分页按钮调用ajax进行异步局部刷新
    headCourse.click(function () {
        course_page(1,courseText);
    });
    backCourse.click(function () {
        course_page(data.pageNum-1,courseText);
    });
    nextCourse.click(function () {
        course_page(data.pageNum+1,courseText);
    });
    lastCourse.click(function () {
        course_page(data.pages,courseText);
    })
}


//成绩信息的ajax调用以及局部刷新
function grade_page(pn,gradeText){
    $.ajax({
        url:"doShowGrade",    //发起请求的地址
        data:{"pn":pn,"gradeText":gradeText},      //向后台传递的参数
        type:"post",
        success:function (data) {
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
    var data=grade.extend.pageInfo.list;
    $(data).each(
        function (i,values) {
            $('#tbGrade').append(
                "<tr><td>"+values.sno+"</td>"
                +"<td>"+values.cno+"</td>"
                +"<td>"+values.cname+"</td>"
                +"<td>"+values.score+"</td>"
                +"<td>"+values.secondScore+"</td></tr>"
            );
        }
    );
}
function build_grade_pageInfo(pageInfo) {
    var gradeText=$.trim($("#gradeText").val());
    var data=pageInfo.extend.pageInfo;
    $("#grade_nav").empty();
    var headGrade=$("<a></a>").append("[首 页]").attr("href","#").addClass("btn btn-default btn-sm");
    var backGrade=$("<a></a>").append("[上一页]").addClass("btn btn-default btn-sm");
    var nextGrade=$("<a></a>").append("[下一页]").addClass("btn btn-default btn-sm");
    var lastGrade=$("<a></a>").append("[末 页]").attr("href","#").addClass("btn btn-default btn-sm");
    var exitGrade=$("<a></a>").append("[注 销]").attr("href","login").addClass("btn btn-default btn-sm");
    //将构建好的分页按钮添加进入表格里
    headGrade.appendTo("#grade_nav");
    backGrade.appendTo("#grade_nav");
    nextGrade.appendTo("#grade_nav");
    lastGrade.appendTo("#grade_nav");
    exitGrade.appendTo("#grade_nav");
    if(data.hasNextPage==false){
        nextGrade.addClass("disabled");
        lastGrade.addClass("disabled");
    }
    if(data.hasPreviousPage==false){
        headGrade.addClass("disabled");
        backGrade.addClass("disabled");
    }
    //实现分页按钮调用ajax进行异步局部刷新
    headGrade.click(function () {
        grade_page(1,gradeText);
    });
    backGrade.click(function () {
        grade_page(data.pageNum-1,gradeText);
    });
    nextGrade.click(function () {
        grade_page(data.pageNum+1.,gradeText);
    });
    lastGrade.click(function () {
        grade_page(data.pages,gradeText);
    })
}




