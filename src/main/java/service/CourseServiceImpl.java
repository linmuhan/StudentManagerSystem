package service;

import mapper.CourseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pojo.Course;

import java.util.List;
@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    CourseMapper courseMapper;

    @Override
    public void add(Course course) {
        courseMapper.alterAuto();
        courseMapper.add(course);
    }

    @Override
    public List<Course> list() {
        return courseMapper.list();
    }

    @Override
    public void delete(int id) {
        courseMapper.delete(id);
        courseMapper.updateId(id);
    }

    @Override
    public Course get(String cno) {
        return courseMapper.get(cno);
    }

    @Override
    public void update(Course course) {
        courseMapper.update(course);
    }

    @Override
    public List<Course> likeList(String likeKey) {
        return courseMapper.likeList(likeKey);
    }

    @Override
    public boolean cnoIsExit(String cno) {
        Course course=courseMapper.get(cno);
        if(course==null){
            return false;
        }
        return true;
    }
}
