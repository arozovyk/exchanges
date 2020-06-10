package Listeners;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dao.MonnaieDao;
import dao.PortefeuilleDao;
import dao.UserDao;
import entity.Monnaie;
import entity.Portefeuille;
import entity.User;

import javax.servlet.ServletContext;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.Callable;

public class FetchRates implements Runnable {
    private final ServletContext servletContext;
    public FetchRates(ServletContext servletContext) {
        this.servletContext=servletContext;
    }


    @Override
    public void run() {
        // Setting URL
       String url_str = "https://prime.exchangerate-api.com/v5/2beb90de765748112421bf10/latest/USD";
        try {

        URL url = new URL(url_str);
        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.connect();

        JsonParser jp = new JsonParser();
        JsonElement root = jp.parse(new InputStreamReader((InputStream) request.getContent()));
        JsonObject jsonobj = root.getAsJsonObject();
        String req_result = jsonobj.toString();
        servletContext.setAttribute("USD_full",req_result);

        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("error fetching");
        }

        // INITIALIZER LA BASE
        MonnaieDao monnaieDao = new MonnaieDao();
        UserDao userDao = new UserDao();
        User def = new User();
        def.setName("a");
        def.setPassword("a");
        def.setPseudo("a");
        userDao.saveUser(def);


        //MonnaieDao monnaieDao = new MonnaieDao();
        PortefeuilleDao portefeuilleDao = new PortefeuilleDao() ;
        Portefeuille portefeuille = new Portefeuille();

        Monnaie m = new Monnaie("EUR",3030);
        Monnaie m1 = new Monnaie("DOL",4040);
        Monnaie m2 = new Monnaie("RUB",3232);
        m1.setPortefeuille(portefeuille);
        m2.setPortefeuille(portefeuille);
        m.setPortefeuille(portefeuille);
        Set<Monnaie> set = new HashSet<>();
        set.add(m);
        set.add(m1);
        set.add(m2);
        portefeuille.setOwner(def);
        portefeuille.setCurrencies(set);
        portefeuilleDao.savePortefeuille(portefeuille);
        monnaieDao.saveMonnaie(m);
        monnaieDao.saveMonnaie(m2);
        monnaieDao.saveMonnaie(m);

        System.out.println("Done fetching");
    }
}
