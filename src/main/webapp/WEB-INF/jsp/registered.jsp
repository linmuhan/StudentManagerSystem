<%--
  Created by IntelliJ IDEA.
  User: 春夏你我
  Date: 2019/12/25
  Time: 14:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>用户注册</title>
    <link href="../../css/Registered.css?v=<%= System.currentTimeMillis()%>" rel="stylesheet" type="text/css">
    <script src="../../js/jquery.min.js"></script>
    <link href="../../css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <script src="../../js/bootstrap.min.js"></script>
    <script src="../../js/registered.js"></script>
</head>
<body>
<img src="img/login&registered.png" class="bg_image" id="bg_image"/>
<div class="rediv" id="rediv">
    <div class="registereddiv" id="registereddiv">
        <div class="registered_text" id="registered_text">学生信息管理系统注册</div>
        <form action="registered" method="post">
            <div class="input-group">
                <span class="input_text pull-left">用户名</span>
                <input type="text" class="pull-right reInput" placeholder="1-14个字符" id="userName">
            </div>
            <div class="input-group">
                <span class="input_text pull-left">姓名</span>
                <input type="text" class="pull-right reInput" placeholder="个人姓名" id="name">
            </div>
            <div class="input-group">
                <span class="input_text pull-left">密码</span>
                <input type="password" class="pull-right reInput" placeholder="6—12位数字加字母" id="password"/>
            </div>
            <input class="btn btn btn-primary" type="button" value="取消" id="cancelButton"/>
            <input class="btn btn-success" type="button" value="注册" id="reButton"/>
        </form>
    </div>
</div>
</body>
</html>
