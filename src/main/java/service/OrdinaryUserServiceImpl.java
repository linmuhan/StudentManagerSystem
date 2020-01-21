package service;

import mapper.OrdinaryUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pojo.OrdinaryUser;
@Service
public class OrdinaryUserServiceImpl implements OrdinaryUserService {
    @Autowired
    OrdinaryUserMapper ordinaryUserMapper;

    @Override
    public OrdinaryUser get(String userName) {
        return ordinaryUserMapper.get(userName);
    }

    @Override
    public boolean verifyOrdinary(String userName, String password) {
        OrdinaryUser ordinaryUser=ordinaryUserMapper.get(userName);
        if(ordinaryUser==null){
            return false;
        }
        if(userName.equals(ordinaryUser.getUserName())&&password.equals(ordinaryUser.getPassword())){
            return true;
        }
        return false;
    }
    //验证用户的用户名是否存在
    @Override
    public boolean loginCodeIsExit(String userName) {
        OrdinaryUser ordinaryUser=ordinaryUserMapper.get(userName);
        if(ordinaryUser==null){
            return false;
        }
        return true;
    }
    //进行账户判重，true为重复
    @Override
    public boolean ordinaryIsExit(OrdinaryUser ordinaryUser) {
        OrdinaryUser bean=ordinaryUserMapper.get(ordinaryUser.getUserName());
        if(bean==null){
            return false;
        }
        return true;
    }

    //添加新注册的用户
    @Override
    public void add(OrdinaryUser ordinaryUser) {
        ordinaryUserMapper.add(ordinaryUser);
    }
}
