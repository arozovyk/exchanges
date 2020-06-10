package service;

import com.google.gson.Gson;
import dao.UserDao;
import entity.User;
import exceptions.NotUniqueException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.exception.ConstraintViolationException;
import util.HibernateUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

public class UserAccountGestionnaire extends HttpServlet {
    private Gson gson = new Gson();

    SessionFactory sessionFactory = HibernateUtil.getSessionFactory();



    private static Map<String, User> users;
    static int currentIdUser= 5; //attention plusieurs registration en meme temps

    public static String  [] pseudos ={
            "quickest",
            "first",
            "exciting",
            "painful",
            "ruthless",
            "lacking",
            "ceaseless",
            "grubby",
            "flippant",
            "flippanw"

    };

    {
        users = new HashMap<>();
        for (int i = 0; i < 5; i++) {
           users.put(String.valueOf(i), new User(pseudos[i],"user"+i,"password"+i,i));
        }
    }

    static class Response {
        User foundUser;
        boolean resultLogin;
    }





    public Object dbGetSingle(String query,Class<?> clazz){
        Transaction transaction = null;
        try (Session session = sessionFactory.openSession()) {
            transaction = session.beginTransaction();
            List objects = session.createQuery(query, clazz).list();
            if(objects!=null&&objects.size()>1){
                System.out.println("More Than one object found");
            }
            transaction.commit();
            return objects.get(0);
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }

        return null;
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        UserDao userDao = new UserDao();
        System.out.println("FirstServlet \"Service\" method(inherited) called");
        System.out.println("FirstServlet \"DoPost\" method called");
        Map<String, String> paramsPost = gson.fromJson(request.getReader(), Map.class);
        String[] reqParts = request.getRequestURI().split("/");
        try {
            String respJson = "error post";
            synchronized (users){
                switch (reqParts.length) {
                    case 3:

                        if(reqParts[2].equals("login")){
                            // LOGIN
                            String username = paramsPost.get("username");
                            String password = paramsPost.get("password");
                            Response r= new Response();
                            User user = (User) dbGetSingle("from User where name='"+username+"' and password='"+password+"'",User.class);
                            if(user!=null&& user.getPassword().equals(password)){
                                r.foundUser=user;
                                request.getSession().setAttribute("loggedUser",r.foundUser);
                                r.resultLogin=true;
                            }else{
                                r.resultLogin=false;
                            }
                            respJson = gson.toJson(r);
                        }else if (reqParts[2].equals("register")){
                            //INSCRIPTION
                            String username = paramsPost.get("username");
                            String password = paramsPost.get("password");
                            String pseudo = paramsPost.get("pseudo");
                            Response r= new Response();
                            User user = new User(pseudo,username,password);
                            r.foundUser=user;
                            r.resultLogin=true;
                            userDao.saveUser(user);

                            respJson=gson.toJson(r);

                        }





                        break;
                    case 4:
                        //save posted response
                        break;
                    case 5:
                        break;
                }
            }

            System.out.println(respJson);
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
        String respJson = "";
        UserDao userDao = new UserDao();
        //storeInSessionAndRespond(request, response);
        synchronized (users){
            try {
                String[] reqParts = request.getRequestURI().split("/");
                switch (reqParts.length) {
                    case 3:
                        // TOUT LES USERS
                            respJson=gson.toJson(userDao.getAllUser());
                        break;
                    case 4:
                        // SINGLE USER
                            respJson=gson.toJson(dbGetSingle("from User where id='"+reqParts[3]+"'",User.class));
                        break;
                    case 5:

                }

                System.out.println(respJson);
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

}
