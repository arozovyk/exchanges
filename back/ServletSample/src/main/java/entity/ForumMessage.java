package entity;

import com.google.gson.annotations.Expose;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
@Entity
@Table(name="forum_message")
public class ForumMessage {
    @Expose
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="forum_message_id")
    private int forum_message_id;
    @Expose
    @Column(name="username")
    private String username;
    @Expose
    @Column(name="message")
    private String message;
    @Expose
    @Column(name="subject")
    private String subject;
    @Expose
    @Column(name="date")
    private Date date;

    @OneToMany(cascade = CascadeType.MERGE,fetch = FetchType.EAGER,mappedBy="correspondingMessage")
    private Set<ReponseForum> items;

    public void addResponse(ReponseForum r){
        if(items==null){
            items=new HashSet<>();
        }
        items.add(r);
    }

    public Set<ReponseForum> getItems() {
        return items;
    }

    public void setItems(Set<ReponseForum> items) {
        this.items = items;
    }

    public ForumMessage(){

    }

    public ForumMessage( String userName, String message, String subject, Date date) {
        this.username = userName;
        this.message = message;
        this.subject = subject;
        this.date = date;
        this.items=new HashSet<>();
    }


    public int getForum_message_id() {
        return forum_message_id;
    }

    public void setForum_message_id(int forum_message_id) {
        this.forum_message_id = forum_message_id;
    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String userName) {
        this.username = userName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "ForumMessage{" +
                "forum_message_id=" + forum_message_id +
                ", username='" + username + '\'' +
                ", message='" + message + '\'' +
                ", subject='" + subject + '\'' +
                ", date=" + date +
                ", items=" + items +
                '}';
    }
}
