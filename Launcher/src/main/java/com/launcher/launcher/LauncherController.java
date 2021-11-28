package com.launcher.launcher;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.layout.AnchorPane;
import javafx.stage.DirectoryChooser;
import javafx.stage.Stage;

import java.io.File;
import java.io.IOException;

public class LauncherController {

    @FXML
    private TextArea textArea;

    private Stage primStage;

    public void SetPrimStage(Stage s){
        primStage = s;
    }

    @FXML
    public void addProject(ActionEvent actionEvent) throws IOException {
        final DirectoryChooser directoryChooser = new DirectoryChooser();
        File dir = directoryChooser.showDialog(primStage);
        final String[] name = {""};

        FXMLLoader loader = new FXMLLoader(LauncherApplication.class.getResource("name-dialog.fxml"));
        Stage dialogStage = new Stage();
        dialogStage.initOwner(primStage);
        dialogStage.setTitle("Введите название");

        Button btn = new Button("OK");
        AnchorPane.setBottomAnchor(btn, 10.0);
        AnchorPane.setLeftAnchor(btn, 250.0);
        AnchorPane.setTopAnchor(btn, 163.0);

        btn.setOnAction((ActionEvent e) -> {
            name[0] = textArea.getText();
        });

        Scene scene = new Scene(loader.load(), 320, 200);
        dialogStage.setScene(scene);
        dialogStage.show();

        MemoryUtils.addProjectsMem(name[0], dir.getAbsolutePath());
    }

}