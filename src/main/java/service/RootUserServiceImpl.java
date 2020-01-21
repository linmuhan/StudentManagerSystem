package service;

import mapper.RootUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pojo.RootUser;

@Service
public class RootUserServiceImpl implements RootUserService {
    @Autowired
    RootUserMapper rootUserMapper;

    @Override
    public RootUser get(String userName) {
        return rootUserMapper.get(userName);
    }

    //验证管理员用户的账号合法性
    @Override
    public boolean verifyRoot(String userName, String password) {
        RootUser rootUser=rootUserMapper.get(userName);
        if(rootUser==null){
            return false;
        }
        if(userName.equals(rootUser.getUserName())&&password.equals(rootUser.getPassword())){
            return true;
        }
        return false;
    }

    //验证管理员的用户名是否存在
    @Override
    public boolean loginCodeIsExit(String userName) {
        RootUser rootUser=rootUserMapper.get(userName);
        if(rootUser==null){
            return false;
        }
        return true;
    }

    //进行账户判重，true为重复
    @Override
    public boolean rootIsExit(RootUser rootUser) {
        RootUser bean=rootUserMapper.get(rootUser.getUserName());
        if(bean==null){
            return false;
        }
        return true;
    }

    @Override
    public void add(RootUser rootUser) {
        rootUserMapper.add(rootUser);
    }
}
