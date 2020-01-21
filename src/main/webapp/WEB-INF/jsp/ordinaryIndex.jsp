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
    <title>学生信息管理系统</title>
    <script src="../../js/jquery.min.js"></script>
    <link href="../../css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="../../css/ordinaryIndex.css?v=<%= System.currentTimeMillis()%>" rel="stylesheet" type="text/css">
    <script src="../../js/bootstrap.min.js"></script>
    <script src="../../js/ordinaryIndex.js?v=<%= System.currentTimeMillis()%>"></script>
</head>
<body>
<div class="title">
    学生信息管理系统
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
        <div class="input-group">
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
            </tr>
           <tbody id="tbStudent"></tbody>
            <tr>
                <td colspan="7" align="center" id="student_nav">

                </td>
            </tr>
        </table>
    </div>
    <div class="tab-pane" id="course">
        <div class="input-group">
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
            </tr>
            <tbody id="tbCourse"></tbody>
            <tr>
                <td colspan="5" align="center" id="course_nav">
                </td>
            </tr>
        </table>
    </div>
    <div class="tab-pane" id="grade">
        <div class="input-group">
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
            </tr>
            <tbody id="tbGrade"></tbody>
            <tr>
                <td colspan="5" align="center" id="grade_nav">
                </td>
            </tr>
        </table>
    </div>
</div>
</body>
</html>
