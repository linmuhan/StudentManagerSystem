package pojo;

public class Course {
    //课程序号
    private int id;
    //课程号
    private String cno;
    //课程名
    private String cname;
    //课时
    private int class_hour;
    //学分
    private int credit;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCno() {
        return cno;
    }

    public void setCno(String cno) {
        this.cno = cno;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public int getClass_hour() {
        return class_hour;
    }

    public void setClass_hour(int class_hour) {
        this.class_hour = class_hour;
    }

    public int getCredit() {
        return credit;
    }

    public void setCredit(int credit) {
        this.credit = credit;
    }

    public boolean exit(Course c){
        if(this.id == c.id
                && this.cno.equals(c.cno)
                && this.cname.equals(c.cname)
                && this.class_hour == c.class_hour
                && this.credit == c.credit){
            return true;
        }
        return false;
    }
}