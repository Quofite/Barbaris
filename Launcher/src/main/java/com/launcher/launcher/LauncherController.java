package com.launcher.launcher;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.layout.VBox;
import javafx.scene.text.Font;
import javafx.stage.DirectoryChooser;
import javafx.stage.Stage;
import java.io.File;

public class LauncherController {

    @FXML
    private VBox projpane;

    private Stage primStage;

    public void SetPrimStage(Stage s){
        primStage = s;
    }

    @FXML
    public void addProject(ActionEvent actionEvent) {
        final DirectoryChooser directoryChooser = new DirectoryChooser();
        File dir = directoryChooser.showDialog(primStage);

        MemoryUtils.addProjectsInMem(dir.getName(), dir.getAbsolutePath());
    }

    @FXML
    public void loadProjects(ActionEvent e) {
        projpane.getChildren().clear();

        String projects = MemoryUtils.getProjectsFormMem();
        String[] duals = projects.split(";");
        Button[] btns = new Button[duals.length - 1];
        for (int i = 0; i < duals.length - 1; i++) {
            String[] splited = duals[i].split(",");
            String result = splited[0] + " (" + splited[1] + ")";

            Button btn = new Button(result);
            btn.setPrefSize(410.0, 80.0);
            btn.setFont(new Font("Arial", 18));

            btns[i] = btn;
        }

        for (Button btn : btns) {

            projpane.getChildren().add(btn);
        }
    }

}