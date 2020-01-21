package mapper;

import pojo.RootUser;

public interface RootUserMapper {
    //增加管理员用户
    public void add(RootUser rootUser);
    //对数据库进行管理员用户的删除
    public void delete(String userName);
    //对数据库进行管理员的查询，返回一个管理员用户对象
    public RootUser get(String userName);

}
