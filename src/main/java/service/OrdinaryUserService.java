package service;

import pojo.OrdinaryUser;

public interface OrdinaryUserService {
    //获取普通用户的信息
    OrdinaryUser get(String userName);
    boolean verifyOrdinary(String userName,String password);
    boolean loginCodeIsExit(String userName);
    boolean ordinaryIsExit(OrdinaryUser ordinaryUser);
    void add(OrdinaryUser ordinaryUser);
}
