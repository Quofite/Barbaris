module com.launcher.launcher {
    requires javafx.controls;
    requires javafx.fxml;

    requires org.kordamp.bootstrapfx.core;
    requires json.simple;

    opens com.launcher.launcher to javafx.fxml;
    exports com.launcher.launcher;
}