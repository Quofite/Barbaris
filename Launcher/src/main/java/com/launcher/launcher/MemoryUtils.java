package com.launcher.launcher;

import java.io.*;

public class MemoryUtils {
    public static void addProjectsInMem(String name, String path) {
        try(FileWriter writer = new FileWriter("projects.txt", true)){
            String proj = name + "," + path + ";";
            writer.append(proj);
            writer.append('\n');
            writer.flush();
        }
        catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }

    public static String getProjectsFormMem() {
        StringBuilder result = new StringBuilder();
        try(FileReader reader = new FileReader("projects.txt")) {
            int c;
            while((c = reader.read()) != -1) {
                result.append((char) c);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return result.toString();
    }

}
