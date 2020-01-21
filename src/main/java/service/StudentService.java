package service;

import pojo.Student;

import java.util.List;

public interface StudentService {
    void add(Student student);
    List<Student> list();
    void delete(String sno);
    Student get(String sno);
    void update(Student student);
    List<Student> likeList(String likeKey);
    boolean snoIsExit(String sno);
}
