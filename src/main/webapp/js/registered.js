$(function () {
   $('#reButton').click(function () {
       var ordinaryUser=new Object();
       ordinaryUser.userName=$.trim($('#userName').val());
       ordinaryUser.name=$.trim($('#name').val());
       ordinaryUser.password=$.trim($('#password').val());
       if(ordinaryUser.userName==""||ordinaryUser.name==null||ordinaryUser.password==null){
           alert("用户名不能为空!");
       }else if(ordinaryUser.name==""||ordinaryUser.userName==null||ordinaryUser.password==null){
           alert("姓名不能为空!");
       }else if(ordinaryUser.password==""||ordinaryUser.userName==null||ordinaryUser.name==null){
           alert("密码不能为空!");
       }else{
            $.ajax({
                type:'POST', //提交的方法的是post
                url:'registeredVerify',  //请求的路径
                data:{ordinaryUser:JSON.stringify(ordinaryUser)},  //将数据以JSON的形式传递
                dataType:'html',
                timeout:1000,  //请求时间为1000ms
                async:true,
                error:function () {
                    alert("注册失败!请重试。");
                },
                success:function (result) {
                    if(result=="success"){
                        alert("注册成功");
                        window.location.href='login';
                    }else if(result=="exit"){
                        alert("用户名已经存在了！请重试。");
                    }else if(result=="noData"){
                        alert("无效数据！请重试。");
                    }else if(result=="failed"){
                        alert("注册失败！请重试。");
                    }
                }
            })
       }
   });
   $('#cancelButton').click(function () {
      window.location.href='login';
   });
});