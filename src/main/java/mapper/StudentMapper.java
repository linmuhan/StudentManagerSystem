package mapper;

import pojo.Student;

import java.util.List;

public interface StudentMapper {
    void add(Student student);
    List<Student> list();
    void delete(String sno);
    Student get(String sno);
    void update(Student student);
    List<Student> likeList(String likeKey);
}
