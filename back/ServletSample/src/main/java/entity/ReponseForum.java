package entity;


import com.google.gson.annotations.Expose;

import javax.persistence.*;

@Entity
@Table(name="response")
public class ReponseForum {
    @Expose
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="response_id")
    private int response_id;

    @Expose
    @Column(name="autor")
    private String authour;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    @Expose
    @Column(name="message")
    private String message;

    @ManyToOne(cascade = CascadeType.MERGE,fetch = FetchType.EAGER)
    @JoinColumn(name="forum_message_id", nullable=false)
    ForumMessage correspondingMessage;

    public ReponseForum(String userName, String message) {
        this.authour = userName;
        this.message = message;
    }

    public ReponseForum() {

    }
    public int getResponse_id() {
        return response_id;
    }

    public void setResponse_id(int response_id) {
        this.response_id = response_id;
    }

    public String getAuthour() {
        return authour;
    }

    public void setAuthour(String authour) {
        this.authour = authour;
    }

    public ForumMessage getCorrespondingMessage() {
        return correspondingMessage;
    }

    public void setCorrespondingMessage(ForumMessage correspondingMessage) {
        this.correspondingMessage = correspondingMessage;
    }



}
