package service;

import pojo.Course;

import java.util.List;

public interface CourseService {
    void add(Course course);
    List<Course> list();
    void delete(int id);
    Course get(String cno);
    void update(Course course);
    List<Course> likeList(String likeKey);
    boolean cnoIsExit(String cno);
}

