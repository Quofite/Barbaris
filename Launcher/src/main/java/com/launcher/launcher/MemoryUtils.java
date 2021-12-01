package com.launcher.launcher;

import javafx.scene.control.Alert;
import javafx.scene.control.ButtonType;

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
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setTitle("Ошибка");
            alert.setHeaderText("Ошибка");
            alert.setContentText("Нечего выводить - добавте проект");
            alert.showAndWait().ifPresent(rs -> {
                if (rs == ButtonType.OK)
                    alert.close();
            });
        }

        return result.toString();
    }

}
