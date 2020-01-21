package pojo;

public class Student {
    //学生的学号
    private String sno;
    //学生的姓名
    private String sname;
    //学生的性别
    private String gender;
    //学生的出生日期
    private String birth;
    //定义学生的班级，因为class是关键字，所以以复数表示
    private String classes;
    //学生的专业
    private String major;
    //学生的系别
    private String college;

    public String getSno() {
        return sno;
    }

    public void setSno(String sno) {
        this.sno = sno;
    }

    public String getSname() {
        return sname;
    }

    public void setSname(String sname) {
        this.sname = sname;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBirth() {
        return birth;
    }

    public void setBirth(String birth) {
        this.birth = birth;
    }

    public String getClasses() {
        return classes;
    }

    public void setClasses(String classes) {
        this.classes = classes;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public boolean exit(Student t){
        if(this.sno.equals(t.sno)
                && this.sname.equals(t.sname)
                && this.birth.equals(t.birth)
                && this.classes.equals(t.classes)
                && this.gender.equals(t.gender)
                && this.college.equals(t.college)
                && this.major.equals(t.major)){
            return true;
        }
        return false;
    }
}
