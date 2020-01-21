package controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import pojo.Course;
import service.CourseService;
import util.Msg;

import java.util.List;

@Controller
@RequestMapping("")
public class CourseController {
    @Autowired
    CourseService courseService;

    @RequestMapping("doShowCourse")
    @ResponseBody
    public Msg doShowCourse(@RequestParam(value = "pn",defaultValue = "1") Integer pn,@RequestParam(value = "courseText") String searchKey){
        List<Course> courses;
        PageHelper.startPage(pn,10);
        if(searchKey==null||searchKey==""){
            courses=courseService.list();
        }else{
            courses=courseService.likeList(searchKey);
        }
        PageInfo page=new PageInfo(courses,10);
        return Msg.success().add("pageInfo",page);
    }

    @RequestMapping(value = "addCourse")
    @ResponseBody
    public Object addCourse(@RequestParam String course) {
        //进行非空验证
        if (course == null || "".equals(course)) {
            return "noCourse";
        }else{
            //course 转换成 json 对象，再转成 ordinary 对象
            JSONObject courseObject = JSONObject.fromObject(course);
            Course bean= (Course) courseObject.toBean(courseObject,Course.class);
            try{
                if(courseService.cnoIsExit(bean.getCno())){
                    return "exit";
                }else{
                    courseService.add(bean);
                    return "success";
                }
            }catch (Exception e){
                return "failed";
            }
        }
    }

    @RequestMapping("deleteCourse")
    @ResponseBody
    public Object deleteCourse(@RequestParam int id){
        if(id<=0){
            return "noId";
        }
        try{
            courseService.delete(id);
            return "success";
        }catch (Exception e){
            return "failed";
        }
    }


    @RequestMapping("makeUpCname")
    @ResponseBody
    public Msg makeUpCname(@RequestParam String gradeCno){
        Course course=courseService.get(gradeCno);
        return Msg.success().add("gradeCname",course.getCname());
    }

    @RequestMapping("updateCourse")
    @ResponseBody
    public Object updateCourse(@RequestParam String course){
        //进行非空验证
        if (course == null || "".equals(course)) {
            return "noCourse";
        }else{
            //course 转换成 json 对象，再转成 ordinary 对象
            JSONObject courseObject = JSONObject.fromObject(course);
            Course bean= (Course) courseObject.toBean(courseObject,Course.class);
            try{
                //如果存在一模一样的学生信息，说明无任何更新
                Course course1=courseService.get(bean.getCno());
                if(bean.exit(course1)){
                    return "exit";
                }else{
                    courseService.update(bean);
                    return "success";
                }
            }catch (Exception e){
                return "failed";
            }
        }
    }
}
