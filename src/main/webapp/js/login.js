$(function () {
   $("#ordinarychange").click(function () {
       $("#ordinarybox").hide();
       $("#rootbox").show();
   });
   $("#rootchange").click(function () {
      $("#rootbox").hide();
      $("#ordinarybox").show();
   });
    $('#freeRegistered').click(function () {
        window.location.href='Registered';
    });
    //
    $('#rootSubmit').click(function () {
        var rootUser = new Object();
        rootUser.userName=$.trim($('#rootName').val());
        rootUser.password=$.trim($('#rootPassword').val());
        if(rootUser.userName==""||rootUser.password==null){
            $('#rootName').focus();
            alert("账号不能为空");
        }else if(rootUser.password==""||rootUser.userName==null){
            $('#rootPassword').focus();
            alert("密码不能为空");
        }else{
            $.ajax({
                type:'POST', //提交的方法的是post
                url:'rootVerify',  //请求的路径
                data:{rootUser:JSON.stringify(rootUser)},  //将数据以JSON的形式传递
                dataType:'html',
                timeout:1000,
                async:true,
                error:function(){
                    alert("登录失败！请重试。");
                },
                success:function(result){
                    if(result=="success"){
                        window.location.href='rootIndex';
                    }else if(result=="failed"){
                        alert("登录失败！请重试！");
                    }else if(result=="noUserName"){
                        alert("该账号不存在！请重试。");
                    }else if(result=="pwError"){
                        alert("密码错误！请重试。");
                    }else if(result=="noData"){
                        alert("对不起没有任何数据处理！");
                    }
                }
            })
        }
    });
    $('#ordinarySubmit').click(function () {
        var ordinaryUser = new Object();
        ordinaryUser.userName=$.trim($('#ordinaryName').val());
        ordinaryUser.password=$.trim($('#ordinaryPassword').val());
        if(ordinaryUser.userName==""||ordinaryUser.password==null){
            $('#ordinaryName').focus();
            alert("账号不能为空");
        }else if(ordinaryUser.password==""||ordinaryUser.userName==null){
            $('#ordinaryPassword').focus();
            alert("密码不能为空");
        }else{
            $.ajax({
                type:'POST', //提交的方法的是post
                url:'ordinaryVerify',  //请求的路径
                data:{ordinaryUser:JSON.stringify(ordinaryUser)},  //将数据以JSON的形式传递
                dataType:'html',
                timeout:1000,
                async:true,
                error:function(){
                    alert("登录失败！请重试。");
                },
                success:function(result){
                    if(result=="success"){
                        window.location.href='ordinaryIndex';
                    }else if(result=="failed"){
                        alert("登录失败！请重试！");
                    }else if(result=="noUserName"){
                        alert("该账号不存在！请重试。");
                    }else if(result=="pwError"){
                        alert("密码错误！请重试。");
                    }else if(result=="noData"){
                        alert("对不起没有任何数据处理！");
                    }
                }
            })
        }
    });
});