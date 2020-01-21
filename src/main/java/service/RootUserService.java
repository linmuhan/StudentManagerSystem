package service;

import pojo.RootUser;

public interface RootUserService {
    RootUser get(String userName);
    boolean verifyRoot(String userName,String password);
    boolean loginCodeIsExit(String userName);
    boolean rootIsExit(RootUser rootUser);
    void add(RootUser rootUser);
}
