package filters;

import dao.MonnaieDao;
import dao.PortefeuilleDao;
import dao.UserDao;
import entity.Monnaie;
import entity.Portefeuille;
import entity.User;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class FilterAllow implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {



    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
      try{
          ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Origin", "*");
          ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Methods", "GET, OPTIONS, HEAD, PUT, POST, DELETE");
          ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
          filterChain.doFilter(servletRequest, servletResponse);
      }catch (Exception e){
          System.out.println("her");
      }

    }

    @Override
    public void destroy(){
    }
}
