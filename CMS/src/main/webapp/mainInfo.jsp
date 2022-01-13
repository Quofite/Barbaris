<%@ page language="java" contentType="text/html; charset=UTF-8"
    import="com.barbaris.cms.OutputingFiles" pageEncoding="UTF-8"%>

<div id="mainInfoContent" style="border: 1px solid; width: 100%;" class="mt-5 container">	
	<% 
		String filepath = (String)request.getAttribute("path");
		
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
	
		out.print(new OutputingFiles().main(cookie.getValue().toString()));
	%>

</div>