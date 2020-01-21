package controller;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import pojo.OrdinaryUser;
import service.OrdinaryUserService;

@Controller
@RequestMapping("")
public class RegisteredController {

    @Autowired
    OrdinaryUserService ordinaryUserService;

    @RequestMapping("Registered")
    public ModelAndView registered(){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("registered");
        return mav;
    }
    @RequestMapping("registeredVerify")
    @ResponseBody
    public Object registeredVerify(@RequestParam String ordinaryUser){
        //后台非空验证
        if(ordinaryUser == null || "".equals(ordinaryUser)){
            return "noData";
        }else{
            //user 转换成 json 对象，再转成 ordinary 对象
            JSONObject userObject = JSONObject.fromObject(ordinaryUser);
            OrdinaryUser userObj= (OrdinaryUser) userObject.toBean(userObject,OrdinaryUser.class);
            try{
                if(ordinaryUserService.ordinaryIsExit(userObj)){
                    return "exit";
                }else{
                    ordinaryUserService.add(userObj);
                    return "success";
                }
            }catch (Exception e){
                return "failed";
            }

        }
    }
}
