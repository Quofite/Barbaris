package com.barbaris.cms;

import java.io.File;

public class OutputingFiles {
	public String main(String fileName) {
		File dir = new File(fileName);
		
		StringBuilder response = new StringBuilder(" ");
		
		if(dir.isDirectory()) {
        	getFiles(dir, 0, response);
        }
		
		return response.toString();
	}
	
	private void getFiles(File path, int margin, StringBuilder writer) {
    	File[] files = path.listFiles();
    	for(File file : files) {
    		if(!file.isDirectory()) {
    			writer.append("<div style='margin-left: "+ margin + "px !important;'>" + file.getName() + "</div>");
    		}
    		else {
    			writer.append("<div style='margin-left: "+ margin + "px !important;'>" + file.getName() + "</div>");
            	getFiles(file, margin + 30, writer);
    		}
    	}
    }
}
