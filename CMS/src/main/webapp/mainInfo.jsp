<%@ page language="java" contentType="text/html; charset=UTF-8"
    import="com.barbaris.cms.OutputingFiles" pageEncoding="UTF-8"%>

<div id="mainInfoContent" style="border: 1px solid; width: 100%;" class="mt-5 container">	
	<% 
		String filepath = (String)request.getAttribute("path");
		out.print(new OutputingFiles().main(filepath));
	%>

</div>