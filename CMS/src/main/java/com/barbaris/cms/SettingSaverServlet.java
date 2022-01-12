package com.barbaris.cms;

import java.io.*;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/saveSettings")
public class SettingSaverServlet extends HttpServlet {
	private static final long serialVersionUID = 5648922569913779581L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		getServletContext().getRequestDispatcher("/mainPage").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String host = request.getParameter("host").toString();
		String login = request.getParameter("login").toString();
		String pass = request.getParameter("pass").toString();
		String db = request.getParameter("db").toString();
		String workingDir = request.getParameter("workingDir").toString();
		StringBuilder jsonStringB = new StringBuilder("{\n\t\"host\": \"");
		jsonStringB.append(host + "\", \n\t\"login\": \"");
		jsonStringB.append(login + "\", \n\t\"password\": \"");
		jsonStringB.append(pass + "\", \n\t\"database\": \"");
		jsonStringB.append(db + "\"\n}");
		String jsonString = jsonStringB.toString();
		
		try(FileOutputStream fos = new FileOutputStream(workingDir + "\\dbdata.json")) {
			byte[] buffer = jsonString.getBytes();
			fos.write(buffer, 0, buffer.length);
		} catch(IOException ex) {
			System.out.println(ex.getMessage());
		}
		
		doGet(request, response);
	}

}
