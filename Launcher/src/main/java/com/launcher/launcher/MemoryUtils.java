package com.launcher.launcher;

import java.io.*;

public class MemoryUtils {
    public static void addProjectsMem(String name, String path) {
        try(FileWriter writer = new FileWriter("projects.txt", true)){
            String proj = name + " " + path;
            writer.append(proj);
            writer.append('\n');
            writer.flush();
        }
        catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }

}
