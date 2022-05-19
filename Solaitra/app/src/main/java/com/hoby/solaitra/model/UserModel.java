package com.hoby.solaitra.model;
public class UserModel {

    // string variables for our name and job
    private String lastname;
    private String firstname;
    private String sex;
    private String pseudo;
    private String password;

    public UserModel(String lastname, String firstname, String sex, String pseudo, String password) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.sex = sex;
        this.pseudo = pseudo;
        this.password = password;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFirstname(){
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
