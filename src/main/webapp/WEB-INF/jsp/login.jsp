<%--
  Created by IntelliJ IDEA.
  User: 春夏你我
  Date: 2019/12/24
  Time: 19:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" import="java.util.*"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link href="../../css/login.css" rel="stylesheet" type="text/css">
    <script src="../../js/jquery.min.js"></script>
    <link href="../../css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <script src="../../js/bootstrap.min.js"></script>
    <title>登录</title>
    <script src="../../js/login.js?v=<%= System.currentTimeMillis()%>"></script>
</head>
<body>
<div class="loginDiv" id="ordinarybox">
    <img src="../../img/login&registered.png" class="bg_image" id="bg_image"/>
    <div class="login_box" id="login_box">
        <div class="login_acount_text">学生信息管理系统</div>
        <form action="ordinaryLogin" method="post">
            <div class="loginInput ">
					<span class="loginInputIcon ">
						<span class=" glyphicon glyphicon-user"></span>
					</span>
                <input type="text" placeholder="   用户名" id="ordinaryName">
                <span id="formTip"></span>
            </div>
            <div class="loginInput">
					<span class="loginInputIcon">
						<span class=" glyphicon glyphicon-lock"></span>
					</span>
                <input type="password" placeholder="   密码" id="ordinaryPassword">
            </div>
            <div>
                <a class="notImplementLink" id="ordinarychange">普通用户登录</a>
                <a class="pull-right" id="freeRegistered">免费注册</a>
            </div>
            <div style="margin-top:20px">
                <input type="button" value="登录" class="btn btn-block btn-success redButton" id="ordinarySubmit">
            </div>
        </form>
    </div>
</div>
<div class="loginDiv" id="rootbox" style="display: none">
    <img src="../../img/login&registered.png" class="bg_image"/>
    <div class="login_box">
        <div class="login_acount_text">学生信息管理系统</div>
        <form action="rootLogin" method="post">
            <div class="loginInput ">
					<span class="loginInputIcon ">
						<span class=" glyphicon glyphicon-user"></span>
					</span>
                <input type="text" placeholder="   用户名" id="rootName">
            </div>
            <div class="loginInput">
					<span class="loginInputIcon">
						<span class=" glyphicon glyphicon-lock"></span>
					</span>
                <input type="password" placeholder="   密码" id="rootPassword">
            </div>
            <div>
                <a class="notImplementLink" id="rootchange">管理员登录</a>
            </div>
            <div style="margin-top:20px">
                <input type="button" value="登录" class="btn btn-block btn-success redButton" id="rootSubmit">
            </div>
        </form>
    </div>
</div>
</body>
</html>

