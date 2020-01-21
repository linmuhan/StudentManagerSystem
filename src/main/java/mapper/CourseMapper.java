package mapper;

import pojo.Course;

import java.util.List;

public interface CourseMapper {
    void add(Course course);
    List<Course> list();
    void delete(int id);
    Course get(String cno);
    void update(Course course);
    void updateId(int id);
    List<Course> likeList(String likeKey);
    void alterAuto();
}
