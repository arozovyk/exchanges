package service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dao.ForumDao;
import dao.ReponseForumDao;
import entity.ForumMessage;
import entity.ReponseForum;
import exceptions.NotUniqueException;
import org.hibernate.Session;
import util.HibernateUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;


public class ForumGestionnaire extends HttpServlet {

    Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
    Gson gson2 = new Gson();

    private static Map<String, ArrayList<ReponseForum>> responsesMap;
    private static ArrayList<ReponseForum> reponsesForum;
    static List<ForumMessage> forumMessageList;
    static int currForumId=3;
    {
        forumMessageList = new ArrayList<>();
        responsesMap = new HashMap<>();
        reponsesForum = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            reponsesForum.add(new ReponseForum( "User" + i, "Response" + i));
        }
        responsesMap.put("0", reponsesForum);


        for (int i = 0; i < 3; i++) {
               forumMessageList.add(new ForumMessage(
                       "User" + i, messagesForForum[i], sujetsForForum[i],
                       new Date(System.currentTimeMillis())
               ));
        }
    }

    private static final String[] messagesForForum = {
            "Comment bien trader en bourse",
            "Les maisons les plus belles",
            "La vache a mangé mon portefeuille"
    };
    private static final String[] sujetsForForum = {
            "Biens immobiliers",
            "Offres",
            "Divers"
    };


    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //SUPPRIMER UNE REPONSE
        ReponseForumDao reponseForumDao = new ReponseForumDao();
        String[] reqParts = req.getRequestURI().split("/");
        Map<Object, Object> paramsDelete = gson.fromJson(req.getReader(), Map.class);
        Double d = (Double) paramsDelete.get("id");
        System.out.println("deleting "+d.intValue());
        reponseForumDao.deleteReponseForum(d.intValue());

    }


    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //MODIFIER UNE REPONSE
        ReponseForumDao reponseForumDao = new ReponseForumDao();
        String[] reqParts = req.getRequestURI().split("/");
        Map<Object, Object> paramsDelete = gson.fromJson(req.getReader(), Map.class);
        String id = reqParts[3];
        String mess = (String) paramsDelete.get("message");
        System.out.println("updating "+id);
        ReponseForum rp = reponseForumDao.getReponseForum(Integer.parseInt(id));
        rp.setMessage(mess);
        reponseForumDao.updateReponseForum(rp);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        ForumDao forumDao = new ForumDao();
        ReponseForumDao reponseForumDao = new ReponseForumDao();
        Map<String, String> paramsPost = gson.fromJson(request.getReader(), Map.class);
        String employeeJsonString = "ok";
        String[] reqParts = request.getRequestURI().split("/");
        try {


            String respJson = "error post";
            switch (reqParts.length) {
                case 3:
                    //AJOUT UNE NOUVELLE FILE DE DISCUTION
                    String username = paramsPost.get("username")!=null?paramsPost.get("username"):"Unknown";
                    String message = paramsPost.get("message");
                    String subject = paramsPost.get("subject");
                    synchronized (forumMessageList) {
                    //    forumMessageList.add(
                        //        new ForumMessage(currForumId++,username,message,subject,
                        //                new Date(System.currentTimeMillis()))
                        //                );
                    }
                    ForumMessage fm = new ForumMessage(username,message,subject,
                                            new Date(System.currentTimeMillis()));
                    forumDao.saveForumMessage(fm);

                    break;
                case 4:
                    // AJOUT REPONSE A UN MESSAGE
                    ReponseForum fr= new ReponseForum(
                            paramsPost.get("userName"),
                            paramsPost.get("messageToSend"));
                    fr.setCorrespondingMessage(forumDao.getForumMessage(Integer.parseInt(reqParts[3])));
                    reponseForumDao.saveReponseForum(fr);
                    respJson = gson.toJson(fr);
                    break;
                case 5:
                    break;
            }
            System.out.println("Req GET:"+request.getRequestURI()+" rep "+respJson);

            PrintWriter out = response.getWriter();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.print(respJson);
            out.flush();
        } catch (Exception e) {
            System.out.println(e.getCause());
        }

    }



    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        ForumDao forumDao = new ForumDao();
        ReponseForumDao reponseForumDao = new ReponseForumDao();
        String respJson = "";
        //storeInSessionAndRespond(request, response);

        try {
/*
            String res = (String) getServletContext().getAttribute("USD_full");
            if (res != null) {
                System.out.println(res);
            } else {
                System.out.println("not yet been fetched");
            }*/

            String[] reqParts = request.getRequestURI().split("/");


            switch (reqParts.length) {
                case 3:
                    //all forum messages (threads)

                    respJson = this.gson.toJson( forumDao.getAllForumMessage());
                    break;
                case 4:
                    //one particular messages
                    int id = Integer.parseInt(reqParts[3]);
                    //    respJson = gson.toJson(new ForumMessage(
                    //            id, "User" + id, messagesForForum[id], sujetsForForum[id],
                    //             new Date(System.currentTimeMillis())));
                    respJson = this.gson.toJson(forumDao.getForumMessage(Integer.parseInt(reqParts[3])));

                    break;
                case 5:
                    //responses for the message
                    respJson = this.gson.toJson( reponseForumDao.getAllReponseForum(reqParts[3]));


            }
            System.out.println("Req POST :"+request.getRequestURI()+" rep "+respJson);
            PrintWriter out = response.getWriter();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.print(respJson);
            out.flush();
        } catch (Exception e) {
            System.out.println(e.getClass());
        }
    }


}
