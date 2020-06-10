package entity;

import com.google.gson.annotations.Expose;

import javax.persistence.*;

@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Expose
    @Column(name="id")
    private int idUser;
    @Expose
    @Column(name="name", unique = true)
    String name ;
    @Expose
    @Column(name="password")
    String password;
    @Expose
    @Column(name="pseudo")
    String pseudo;


    public User() {

    }
    public User(String pseudo, String name, String password) {
        this.pseudo=pseudo;
        this.name = name;
        this.password = password;
    }

    public User(String pseudo, String name, String password,int id ) {
        this.pseudo=pseudo;
        this.name = name;
        this.idUser=id;
        this.password = password;
    }
    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }


    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
