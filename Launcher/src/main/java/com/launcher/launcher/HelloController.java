package com.launcher.launcher;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.stage.DirectoryChooser;
import javafx.stage.Stage;

import java.io.File;

public class HelloController {

    private Stage primStage;

    public void SetPrimStage(Stage s){
        primStage = s;
    }

    @FXML
    private Button addProjBtn;

    @FXML
    public void addProject(ActionEvent actionEvent) {
        final DirectoryChooser directoryChooser = new DirectoryChooser();
        File dir = directoryChooser.showDialog(primStage);
        addProjBtn.setText(dir.getName());
    }
}