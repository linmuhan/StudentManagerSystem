package controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import pojo.Student;
import service.StudentService;
import util.Msg;

import java.util.List;

@Controller
@RequestMapping("")
public class StudentController {
    @Autowired
    StudentService studentService;

    @RequestMapping(value = "doShowStudent")
    @ResponseBody
    public Msg doShowStudent(@RequestParam(value = "pn", defaultValue = "1") Integer pn, @RequestParam(value = "studentText") String studentText) {
        List<Student> students;
        PageHelper.startPage(pn, 10);
        if (studentText == null || "".equals(studentText)) {
            students = studentService.list();
        } else {
            students = studentService.likeList(studentText);
        }
        PageInfo page = new PageInfo(students, 10);
        return Msg.success().add("pageInfo", page);
    }

    @RequestMapping(value = "addStudent")
    @ResponseBody
    public Object addStudent(@RequestParam String student) {
        //进行非空验证
        if (student == null || "".equals(student)) {
            return "noStudent";
        }else{
            //student 转换成 json 对象，再转成 ordinary 对象
            JSONObject studentObject = JSONObject.fromObject(student);
            Student bean= (Student) studentObject.toBean(studentObject,Student.class);
            try{
                if(studentService.snoIsExit(bean.getSno())){
                    return "exit";
                }else{
                    studentService.add(bean);
                    return "success";
                }
            }catch (Exception e){
                return "failed";
            }
        }
    }

    @RequestMapping("deleteStudent")
    @ResponseBody
    public Object deleteStudent(@RequestParam String studentSno){
        if(studentSno==null||"".equals(studentSno)){
            return "noSno";
        }
        try{
            studentService.delete(studentSno);
            return "success";
        }catch (Exception e){
            return "failed";
        }
    }

    @RequestMapping("updateStudent")
    @ResponseBody
    public Object updateStudent(@RequestParam String student){
        //进行非空验证
        if (student == null || "".equals(student)) {
            return "noStudent";
        }else{
            //student 转换成 json 对象，再转成 ordinary 对象
            JSONObject studentObject = JSONObject.fromObject(student);
            Student bean= (Student) studentObject.toBean(studentObject,Student.class);
            try{
                //如果存在一模一样的学生信息，说明无任何更新
                Student student1=studentService.get(bean.getSno());
                if(bean.exit(student1)){
                    return "exit";
                }else{
                    studentService.update(bean);
                    return "success";
                }
            }catch (Exception e){
                return "failed";
            }
        }
    }
}
