package com.launcher.launcher;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;
import org.json.simple.JSONObject;

import java.io.IOException;

public class LauncherApplication extends Application {
    public JSONObject jsonObject = new JSONObject();

    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(LauncherApplication.class.getResource("main-view.fxml"));
        LauncherController hc = new LauncherController();
        hc.SetPrimStage(stage);

        Scene scene = new Scene(fxmlLoader.load(), 900, 600);
        stage.setTitle("Hello!");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }
}