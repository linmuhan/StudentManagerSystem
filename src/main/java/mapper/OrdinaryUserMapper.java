package mapper;

import pojo.OrdinaryUser;

public interface OrdinaryUserMapper {
    //增加普通用户
    public void add(OrdinaryUser rootUser);
    //对数据库进行普通用户的删除
    public void delete(String userName);
    //对数据库进行普通的查询，返回一个普通用户对象
    public OrdinaryUser get(String userName);

}
