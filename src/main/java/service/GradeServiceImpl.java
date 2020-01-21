package service;

import mapper.GradeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pojo.Grade;

import java.util.List;
@Service
public class GradeServiceImpl implements GradeService {

    @Autowired
    GradeMapper gradeMapper;

    @Override
    public void add(Grade grade) {
        gradeMapper.add(grade);
    }

    @Override
    public List<Grade> list() {
        return gradeMapper.list();
    }

    @Override
    public void delete(String sno, String cno) {
        gradeMapper.delete(sno,cno);
    }

    @Override
    public Grade get(String sno, String cno) {
        return gradeMapper.get(sno,cno);
    }

    @Override
    public void update(Grade grade) {
        gradeMapper.update(grade);
    }

    @Override
    public List<Grade> likeList(String likeKey) {
        return gradeMapper.likeList(likeKey);
    }

    @Override
    public boolean gradeIsExit(String sno, String cno) {
        Grade grade=gradeMapper.get(sno,cno);
        if(grade==null){
            return false;
        }
        return true;
    }
}
