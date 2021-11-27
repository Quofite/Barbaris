package com.launcher.launcher;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.stage.DirectoryChooser;
import javafx.stage.Stage;

import java.io.File;
import java.io.IOException;

public class LauncherController {

    private Stage primStage;

    public void SetPrimStage(Stage s){
        primStage = s;
    }

    @FXML
    public void addProject(ActionEvent actionEvent) throws IOException {
        final DirectoryChooser directoryChooser = new DirectoryChooser();
        File dir = directoryChooser.showDialog(primStage);
        String name = "testname";

        JsonUtils.addProjectsJson(name, dir.getAbsolutePath());
    }
}