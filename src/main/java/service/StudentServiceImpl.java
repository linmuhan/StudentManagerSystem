package service;

import mapper.StudentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pojo.Student;

import java.util.List;
@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    StudentMapper studentMapper;

    @Override
    public void add(Student student) {
        studentMapper.add(student);
    }

    @Override
    public List<Student> list() {
        return studentMapper.list();
    }

    @Override
    public void delete(String sno) {
        studentMapper.delete(sno);
    }

    @Override
    public Student get(String sno) {
        return studentMapper.get(sno);
    }

    @Override
    public void update(Student student) {
        studentMapper.update(student);
    }

    @Override
    public List<Student> likeList(String likeKey) {
        return studentMapper.likeList(likeKey);
    }

    @Override
    public boolean snoIsExit(String sno) {
        Student student=studentMapper.get(sno);
        if(student==null){
            return false;
        }
        return true;
    }

}
