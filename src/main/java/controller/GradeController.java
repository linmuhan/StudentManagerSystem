package controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import pojo.Grade;
import service.CourseService;
import service.GradeService;
import service.StudentService;
import util.Msg;

import java.util.List;

@Controller
@RequestMapping("")
public class GradeController {

    @Autowired
    GradeService gradeService;
    @Autowired
    StudentService studentService;
    @Autowired
    CourseService courseService;

    @RequestMapping("doShowGrade")
    @ResponseBody
    public Msg doShowGrade(@RequestParam(value = "pn",defaultValue = "1") Integer pn,@RequestParam(value = "gradeText") String searchKey){
        List<Grade> grades;
        PageHelper.startPage(pn,10);
        if(searchKey==null||searchKey==""){
            grades=gradeService.list();
        }else{
            grades=gradeService.likeList(searchKey);
        }
        PageInfo page=new PageInfo(grades,10);
        return Msg.success().add("pageInfo",page);
    }

    @RequestMapping(value = "addGrade")
    @ResponseBody
    public Object addGrade(@RequestParam String grade) {
        //进行非空验证
        if (grade == null || "".equals(grade)) {
            return "noGrade";
        }else{
            //grade 转换成 json 对象，再转成 ordinary 对象
            JSONObject gradeObject = JSONObject.fromObject(grade);
            Grade bean= (Grade) gradeObject.toBean(gradeObject,Grade.class);
            try{
                if(!studentService.snoIsExit(bean.getSno())){
                    return "noSno";
                }
                if(!courseService.cnoIsExit(bean.getCno())){
                    return "noCno";
                }
                if(gradeService.gradeIsExit(bean.getSno(),bean.getCno())){
                    return "exit";
                }else{
                    gradeService.add(bean);
                    return "success";
                }
            }catch (Exception e){
                return "failed";
            }
        }
    }

    @RequestMapping("deleteGrade")
    @ResponseBody
    public Object deleteGrade(@RequestParam String gradeSno,@RequestParam String gradeCno){
        if((gradeSno==null||"".equals(gradeSno))||(gradeCno==null||"".equals(gradeCno))){
            return "noData";
        }
        try{
            //传入学号和课程号进行删除相关数据
            gradeService.delete(gradeSno,gradeCno);
            return "success";
        }catch (Exception e){
            return "failed";
        }
    }

    @RequestMapping("updateGrade")
    @ResponseBody
    public Object updateGrade(@RequestParam String grade){
        //进行非空验证
        if (grade == null || "".equals(grade)) {
            return "noGrade";
        }else{
            //grade 转换成 json 对象，再转成 ordinary 对象
            JSONObject gradeObject = JSONObject.fromObject(grade);
            Grade bean= (Grade) gradeObject.toBean(gradeObject,Grade.class);
            try{
                //如果存在一模一样的成绩信息，说明无任何更新
                Grade grade1=gradeService.get(bean.getSno(),bean.getCno());
                if(bean.exit(grade1)){
                    return "exit";
                }else{
                    gradeService.update(bean);
                    return "success";
                }
            }catch (Exception e){
                e.printStackTrace();
                return "failed";
            }
        }
    }
}
