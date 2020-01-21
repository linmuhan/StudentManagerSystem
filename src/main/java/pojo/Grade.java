package pojo;

public class Grade {
    //学号
    private String sno;
    //课程号
    private String cno;
    //课程名
    private String cname;
    //成绩
    private int score;
    //补考成绩
    private int secondScore;

    public String getSno() {
        return sno;
    }

    public void setSno(String sno) {
        this.sno = sno;
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

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getSecondScore() {
        return secondScore;
    }

    public void setSecondScore(int secondScore) {
        this.secondScore = secondScore;
    }

    public boolean exit(Grade g){
        if(this.getSno().equals(g.getSno())
                && this.getCno().equals(g.getCno())
                && this.getCname().equals(g.getCname())
                && this.getScore() == g.getScore()
                && this.getSecondScore() == g.getSecondScore()){
            return true;
        }
        return false;
    }
}
