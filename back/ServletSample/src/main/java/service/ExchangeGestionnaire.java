package service;

import com.google.gson.*;
import dao.*;
import entity.ForumMessage;
import entity.Portefeuille;
import entity.ReponseForum;
import entity.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

public class ExchangeGestionnaire extends HttpServlet {
    Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

    public String fetchRatesDynamic(String curr){
        String url_str = "https://prime.exchangerate-api.com/v5/2beb90de765748112421bf10/latest/"+curr;
        try {
            URL url = new URL(url_str);
            HttpURLConnection request = (HttpURLConnection) url.openConnection();
            request.connect();

            JsonParser jp = new JsonParser();
            JsonElement root = jp.parse(new InputStreamReader((InputStream) request.getContent()));
            JsonObject jsonobj = root.getAsJsonObject();
            String req_result = jsonobj.toString();
            return req_result;

        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("error fetching");
        }
        return "error fetching end";
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        MonnaieDao monnaieDao = new MonnaieDao();
        PortefeuilleDao portefeuilleDao = new PortefeuilleDao();
        UserDao userDao = new UserDao();
        String respJson = "";
        //storeInSessionAndRespond(request, response);

        try {

            String res = (String) getServletContext().getAttribute("USD_full");
            if (res != null) {
                System.out.println(res);
            } else {
                System.out.println("not yet been fetched");
            }

            String[] reqParts = request.getRequestURI().split("/");


            switch (reqParts.length) {
                case 3:
                    break;
                case 4:
                    if(reqParts[2].equals("rates")){
                        // CONTACTER L'API EXTERNE (DOLLAR EST CONNACTE PAR DEFAUT TOUTES LES 60 MIN)
                        String curr=reqParts[3];
                        if(!curr.equals("USD"))
                            res=fetchRatesDynamic(reqParts[3]);
                        respJson =gson.toJson(gson.fromJson(res,Map.class).get("conversion_rates"));


                    }else{
                        //RECUPERER LE PORTEFEUILLE DE L'UTILISATEUR LOGGE
                        User u = userDao.getUser(reqParts[3]);
                        Portefeuille p = portefeuilleDao.getPortefeuille(u.getIdUser());
                        System.out.println("size cuerr"+ p.getCurrencies().size());
                        respJson = gson.toJson(p.getCurrencies());
                    }

                    break;
                case 5:
                    //responses for the message


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
