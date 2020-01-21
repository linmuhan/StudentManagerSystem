<%--
  Created by IntelliJ IDEA.
  User: 春夏你我
  Date: 2019/12/25
  Time: 11:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>学生信息管理系统后台</title>
    <script src="../../js/jquery.min.js"></script>
    <link href="../../css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="../../css/rootIndex.css?v=<%= System.currentTimeMillis()%>" rel="stylesheet" type="text/css">
    <script src="../../js/bootstrap.min.js"></script>
    <script src="../../js/rootIndex.js?v=<%= System.currentTimeMillis()%>"></script>
</head>
<body>
<div class="title">
    学生信息管理系统后台
</div>
<div>
    <ul id="myTab" class="nav nav-tabs">
        <li class="active">
            <a href="#student" data-toggle="tab">学生信息</a>
        </li>
        <li class="">
            <a href="#course" data-toggle="tab">课程信息</a>
        </li>
        <li class="">
            <a href="#grade" data-toggle="tab">学生成绩信息</a>
        </li>
    </ul>
</div>
<div id="myTabContent" class="tab-content">
    <div class="tab-pane active" id="student">
        <div class="input-group search_btn">
            <input type="text" class="form-control" placeholder="输入关键字进行查询" id="studentText">
            <span class="input-group-btn">
                    <button class="btn btn-default" type="button" id="sButton">搜索</button>
                </span>
        </div>
        <table style="width:1200px; margin:40px auto"
               class="table table-striped table-bordered table-hover  table-condensed" align='center' border='1'
               cellspacing='0'>
            <tr>
                <td>学号</td>
                <td>姓名</td>
                <td>性别</td>
                <td>出生日期</td>
                <td>班级</td>
                <td>专业</td>
                <td>系别</td>
                <td>编辑</td>
                <td>删除</td>
            </tr>
            <tbody id="tbStudent"></tbody>
            <tr>
                <td colspan="7" align="center" id="student_nav">
                    <button id="" class="btn btn-default btn-sm">[增 加]</button>
                </td>
                <td colspan="2" align="center">
                    <button id="addStudentModel" class="btn btn-primary btn-sm btn-block">增加</button>
                </td>
            </tr>
        </table>
    </div>
    <div class="tab-pane" id="course">
        <div class="input-group search_btn">
            <input type="text" class="form-control" placeholder="输入关键字进行查询" id="courseText">
            <span class="input-group-btn">
                    <button class="btn btn-default" type="button" id="cButton">搜索</button>
                </span>
        </div>
        <table style="width:800px; margin:40px auto"
               class="table table-striped table-bordered table-hover  table-condensed" align='center' border='1'
               cellspacing='0'>
            <tr>
                <td>课程序号</td>
                <td>课程号</td>
                <td>课程名</td>
                <td>课时</td>
                <td>学分</td>
                <td>编辑</td>
                <td>删除</td>
            </tr>
            <tbody id="tbCourse"></tbody>
            <tr>
                <td colspan="5" align="center" id="course_nav">
                </td>
                <td colspan="2" align="center">
                    <button id="addCourseModel" class="btn btn-primary btn-sm btn-block">增加</button>
                </td>
            </tr>
        </table>
    </div>
    <div class="tab-pane" id="grade">
        <div class="input-group search_btn">
            <input type="text" class="form-control" placeholder="输入关键字进行查询" id="gradeText">
            <span class="input-group-btn">
                 <button class="btn btn-default" type="button" id="gButton">搜索</button>
                </span>
        </div>
        <table style="width:800px; margin:40px auto"
               class="table table-striped table-bordered table-hover  table-condensed" align='center' border='1'
               cellspacing='0'>
            <tr>
                <td>学号</td>
                <td>课程号</td>
                <td>课程名</td>
                <td>成绩</td>
                <td>补考成绩</td>
                <td>编辑</td>
                <td>删除</td>
            </tr>
            <tbody id="tbGrade"></tbody>
            <tr>
                <td colspan="5" align="center" id="grade_nav"></td>
                <td colspan="2" align="center">
                    <button id="addGradeModel" class="btn btn-primary btn-sm btn-block">增加</button>
                </td>
            </tr>
        </table>
    </div>
</div>
<%--学生增加模态框--%>
<div class="modal fade" id="studentAddModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="studentModalLabel">学生信息添加</h4>
            </div>
            <div class="modal-body">
                <form action="addStudent" method="post" id="studentAddForm">
                    <div class="studentFormBox">
                            <div class="studentForm">
                                <span>学号:</span>
                                <input type="text" id="sno">
                            </div>
                            <div class="studentForm">
                                <span>姓名:</span>
                                <input type="text" id="sname">
                            </div>
                            <div class="studentForm">
                                <span >性别:</span>
                                <input id="man" type="radio" checked="checked" name="1"  value="男"/>男 <input id="woman" type="radio"  name="1" value="女"/>女
                            </div>
                            <div class="studentForm">
                                <span>出生:</span>
                                <input type="text" id="birth">
                            </div>
                            <div class="studentForm">
                                <span>班级:</span>
                                <input type="text" id="classes">
                            </div>
                            <div class="studentForm">
                                <span>专业:</span>
                                <input type="text" id="major">
                            </div>
                            <div class="studentForm">
                                <span>系别:</span>
                                <input type="text" id="college">
                            </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="studentSave()">保存信息</button>
            </div>
        </div>
    </div>
</div>

<%--课程增加模态框--%>
<div class="modal fade" id="courseAddModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="courseModalLabel">课程信息添加</h4>
            </div>
            <div class="modal-body">
                <form action="addStudent" method="post" id="courseAddForm">
                <div class="courseFormBox">
                    <div class="courseForm">
                        <span>课程号:</span>
                        <input type="text" id="cno">
                    </div>
                    <div class="courseForm">
                        <span>课程名:</span>
                        <input type="text" id="cname">
                    </div>
                    <div class="courseForm">
                        <span>学&nbsp;&nbsp;&nbsp;&nbsp;时:</span>
                        <select id="selectHour" class="courseSelect">
                            <script>
                                for(var i=1;i<=100;i++){
                                    document.write("<option value='"+i+"'>"+i+"</option>");
                                }
                            </script>
                        </select>
                    </div>
                    <div class="courseForm">
                        <span>学&nbsp;&nbsp;&nbsp;&nbsp;分:</span>
                        <select id="selectCredit" class="courseSelect">
                            <script>
                                for(var i=1;i<=100;i++){
                                    document.write("<option value='"+i+"'>"+i+"</option>");
                                }
                            </script>
                        </select>
                    </div>
                </div>
            </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="courseSave()">保存信息</button>
            </div>
        </div>
    </div>
</div>

<%--成绩增加模态框--%>
<div class="modal fade" id="gradeAddModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="gradeModalLabel">学生成绩信息添加</h4>
            </div>
            <div class="modal-body">
                <form action="addGrade" method="post" id="gradeAddForm">
                    <div class="GradeFormBox">
                        <div class="gradeForm">
                            <span>学&nbsp;&nbsp;&nbsp;&nbsp;号:</span>
                            <input type="text" id="gradeSno">
                        </div>
                        <div class="gradeForm">
                            <span>课程号:</span>
                            <input type="text" id="gradeCno" onblur="makeUpCname()">
                        </div>
                        <div class="gradeForm">
                            <span>课程名:</span>
                            <input type="text" id="gradeCname">
                        </div>
                        <div class="gradeForm">
                            <span>成&nbsp;&nbsp;&nbsp;&nbsp;绩:</span>
                            <select id="selectScore" class="gradeSelect" onchange="change()">
                                <script>
                                    for(var i=1;i<=100;i++){
                                        document.write("<option value='"+i+"'>"+i+"</option>");
                                    }
                                    function change() {
                                        var flag=$("#selectScore option:selected").text();
                                        if(flag>=60){
                                            $("#selectSecondScore").empty();
                                            $("#selectSecondScore").append($("<option value='0'>0</option>"));
                                        }else{
                                            $("#selectSecondScore").empty();
                                            for(var i=1;i<=100;i++){
                                                $("#selectSecondScore").append($("<option value='"+i+"'>"+i+"</option>"));
                                            }
                                        }
                                    }
                                </script>
                            </select>
                        </div>
                        <div class="gradeForm">
                            <span>补&nbsp;&nbsp;&nbsp;&nbsp;考:</span>
                            <select id="selectSecondScore" class="gradeSelect">
                                <script>
                                        for(var i=1;i<=100;i++){
                                            document.write("<option value='"+i+"'>"+i+"</option>");
                                        }
                                </script>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="gradeSave()">保存信息</button>
            </div>
        </div>
    </div>
</div>

<%--学生编辑模态框--%>
<div class="modal fade" id="editStudentModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="deleteStudentModalLabel">更新学生信息</h4>
            </div>
            <div class="modal-body">
                <form action="addStudent" method="post">
                    <div class="studentFormBox">
                        <div class="studentForm">
                            <span>学号:</span>
                            <input type="text" id="editSno" readonly unselectable="on" style="background-color: #9d9d9d">
                        </div>
                        <div class="studentForm">
                            <span>姓名:</span>
                            <input type="text" id="editSname">
                        </div>
                        <div class="studentForm">
                            <span >性别:</span>
                            <input id="editMan" type="radio" checked="checked" name="2"  value="男"/>男 <input id="editWoman" type="radio"  name="2" value="女"/>女
                        </div>
                        <div class="studentForm">
                            <span>出生:</span>
                            <input type="text" id="editBirth">
                        </div>
                        <div class="studentForm">
                            <span>班级:</span>
                            <input type="text" id="editClasses">
                        </div>
                        <div class="studentForm">
                            <span>专业:</span>
                            <input type="text" id="editMajor">
                        </div>
                        <div class="studentForm">
                            <span>系别:</span>
                            <input type="text" id="editCollege">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" onclick="editStudent()">确认</button>
            </div>
        </div>
    </div>
</div>

<%--课程编辑模态框--%>

<div class="modal fade" id="editCourseModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="deleteCourseModalLabel">更新课程信息</h4>
            </div>
            <div class="modal-body">
                <form action="addStudent" method="post">
                    <div class="courseFormBox">
                        <div class="courseForm">
                            <span>课程号:</span>
                            <input type="text" id="editCno" readonly unselectable="on" style="background-color: #9d9d9d">
                        </div>
                        <div class="courseForm">
                            <span>课程名:</span>
                            <input type="text" id="editCname">
                        </div>
                        <div class="courseForm">
                            <span>学&nbsp;&nbsp;&nbsp;&nbsp;时:</span>
                            <select id="editSelectHour" class="courseSelect">
                                <script>
                                    for(var i=1;i<=100;i++){
                                        document.write("<option value='"+i+"'>"+i+"</option>");
                                    }
                                </script>
                            </select>
                        </div>
                        <div class="courseForm">
                            <span>学&nbsp;&nbsp;&nbsp;&nbsp;分:</span>
                            <select id="editSelectCredit" class="courseSelect">
                                <script>
                                    for(var i=1;i<=100;i++){
                                        document.write("<option value='"+i+"'>"+i+"</option>");
                                    }
                                </script>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" onclick="editCourse()">确认</button>
            </div>
        </div>
    </div>
</div>

<%--成绩编辑模态框--%>
<div class="modal fade" id="editGradeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="deleteGradeModalLabel">更新学生成绩信息</h4>
            </div>
            <div class="modal-body">
                <form action="addGrade" method="post">
                    <div class="GradeFormBox">
                        <div class="gradeForm">
                            <span>学&nbsp;&nbsp;&nbsp;&nbsp;号:</span>
                            <input type="text" id="editGradeSno" readonly unselectable="on" style="background-color: #9d9d9d">
                        </div>
                        <div class="gradeForm">
                            <span>课程号:</span>
                            <input type="text" id="editGradeCno" readonly unselectable="on" style="background-color: #9d9d9d">
                        </div>
                        <div class="gradeForm">
                            <span>课程名:</span>
                            <input type="text" id="editGradeCname" readonly unselectable="on" style="background-color: #9d9d9d">
                        </div>
                        <div class="gradeForm">
                            <span>成&nbsp;&nbsp;&nbsp;&nbsp;绩:</span>
                            <select id="editSelectScore" class="gradeSelect" onchange="change()">
                                <script>
                                    for(var i=1;i<=100;i++){
                                        document.write("<option value='"+i+"'>"+i+"</option>");
                                    }
                                    function change() {
                                        var flag=$("#editSelectScore option:selected").text();
                                        if(flag>=60){
                                            $("#editSelectSecondScore").empty();
                                            $("#editSelectSecondScore").append($("<option value='0'>0</option>"));
                                        }else{
                                            $("#editSelectSecondScore").empty();
                                            for(var i=1;i<=100;i++){
                                                $("#editSelectSecondScore").append($("<option value='"+i+"'>"+i+"</option>"));
                                            }
                                        }
                                    }
                                </script>
                            </select>
                        </div>
                        <div class="gradeForm">
                            <span>补&nbsp;&nbsp;&nbsp;&nbsp;考:</span>
                            <select id="editSelectSecondScore" class="gradeSelect">
                                <script>
                                    for(var i=1;i<=100;i++){
                                        document.write("<option value='"+i+"'>"+i+"</option>");
                                    }
                                </script>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" onclick="editGrade()">确认</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
