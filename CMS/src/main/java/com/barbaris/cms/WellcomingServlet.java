package com.barbaris.cms;
import java.io.IOException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/wellcome")
public class WellcomingServlet extends HttpServlet {	
	private static final long serialVersionUID = 6469002442974325684L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String path = "/wellcome.html";
        ServletContext servletContext = getServletContext();
        
        Cookie[] cookies = request.getCookies();
		String cookieName = "path";
		Cookie cookie = null;
		if(cookies !=null) {
	    	for(Cookie c: cookies) {
	        	if(cookieName.equals(c.getName())) {
	            	cookie = c;
	            	break;
	        	}
	    	}
		}
		cookie.setMaxAge(0);
        
        RequestDispatcher requestDispatcher = servletContext.getRequestDispatcher(path);
        requestDispatcher.forward(request, response);
	}
}
