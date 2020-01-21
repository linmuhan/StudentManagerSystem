package controller;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import pojo.OrdinaryUser;
import pojo.RootUser;
import service.OrdinaryUserService;
import service.RootUserService;
import service.StudentService;

@Controller
@RequestMapping("")
public class LoginController {

    @Autowired
    RootUserService rootUserService;

    @Autowired
    OrdinaryUserService ordinaryUserService;

    @Autowired
    StudentService studentService;

    @RequestMapping("login")
    public ModelAndView login(){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("login");
        return mav;
    }

    @RequestMapping("ordinaryVerify")
    @ResponseBody
    public Object ordinaryVerify(@RequestParam String ordinaryUser){

        //后台非空验证
        if(ordinaryUser == null || "".equals(ordinaryUser)){
            return "noData";
        }else{

            //user 转换成 json 对象，再转成 ordinary 对象
            JSONObject userObject = JSONObject.fromObject(ordinaryUser);
            OrdinaryUser userObj= (OrdinaryUser) userObject.toBean(userObject,OrdinaryUser.class);
            try {
                if(!ordinaryUserService.loginCodeIsExit(userObj.getUserName())){//不存在这个登录账号
                    return "noUserName";
                }else{
                    //登录成功
                    if(ordinaryUserService.verifyOrdinary(userObj.getUserName(),userObj.getPassword())){
                        //验证成功
                        return "success";
                    }else{
                        //密码错误
                        return "pwError";
                    }
                }
            } catch (Exception e) {
                //登录失败
                return "failed";
            }
        }
    }

    @RequestMapping("rootVerify")
    @ResponseBody
    public Object rootVerify(@RequestParam String rootUser){

        //后台非空验证
        if(rootUser == null || "".equals(rootUser)){
            return "noData";
        }else{

            //user 转换成 json 对象，再转成 ordinary 对象
            JSONObject userObject = JSONObject.fromObject(rootUser);
            RootUser userObj= (RootUser) userObject.toBean(userObject,RootUser.class);
            try {
                if(!rootUserService.loginCodeIsExit(userObj.getUserName())){//不存在这个登录账号
                    return "noUserName";
                }else{
                    //登录成功
                    if(rootUserService.verifyRoot(userObj.getUserName(),userObj.getPassword())){
                        //验证成功
                        return "success";
                    }else{
                        //密码错误
                        return "pwError";
                    }
                }
            } catch (Exception e) {
                //登录失败
                return "failed";
            }
        }
    }



    @RequestMapping("ordinaryIndex")
    public ModelAndView ordinaryLogin(){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("ordinaryIndex");
        return mav;
    }

    @RequestMapping("rootIndex")
    public ModelAndView rootLogin(){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("rootIndex");
        return mav;
    }
}
