package com.launcher.launcher;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

import java.io.FileWriter;
import java.io.IOException;

public class JsonUtils {
    public static void addProjectsJson(String name, String path) throws IOException {
        LauncherApplication la = new LauncherApplication();
        JSONObject jsonObject = la.jsonObject;

        jsonObject.put("name", name);
        jsonObject.put("path", path);

        String json = jsonObject.toJSONString();

        try(FileWriter writer = new FileWriter("projectsJson.json", true)){
            writer.append(json);
            writer.flush();
        }
        catch (IOException e){
            System.out.println(e.getMessage());
        }
    }

}
