import subprocess

from PyQt5 import QtCore, QtGui, QtWidgets

import funcs


class Ui_MainWindow(object):
    def setupUi(self, main_window):
        main_window.setObjectName("MainWindow")
        main_window.setEnabled(True)
        main_window.resize(900, 570)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Fixed, QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(main_window.sizePolicy().hasHeightForWidth())
        main_window.setSizePolicy(sizePolicy)
        main_window.setMinimumSize(QtCore.QSize(900, 570))
        main_window.setMaximumSize(QtCore.QSize(900, 570))
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap("Barbaris.ico"), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        main_window.setWindowIcon(icon)
        self.centralwidget = QtWidgets.QWidget(main_window)
        self.centralwidget.setObjectName("centralwidget")
        self.addProjBtn = QtWidgets.QPushButton(self.centralwidget)
        self.addProjBtn.setGeometry(QtCore.QRect(10, 10, 191, 61))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.addProjBtn.setFont(font)
        self.addProjBtn.setObjectName("addProjBtn")
        self.openGGCBtn = QtWidgets.QPushButton(self.centralwidget)
        self.openGGCBtn.setGeometry(QtCore.QRect(700, 80, 191, 61))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.openGGCBtn.setFont(font)
        self.openGGCBtn.setObjectName("openGGCBtn")
        self.openIDEBtn = QtWidgets.QPushButton(self.centralwidget)
        self.openIDEBtn.setGeometry(QtCore.QRect(700, 150, 191, 61))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.openIDEBtn.setFont(font)
        self.openIDEBtn.setObjectName("openIDEBtn")
        self.openCalcBtn = QtWidgets.QPushButton(self.centralwidget)
        self.openCalcBtn.setGeometry(QtCore.QRect(700, 220, 191, 61))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.openCalcBtn.setFont(font)
        self.openCalcBtn.setObjectName("openCalcBtn")
        self.openPngIcoConBtn = QtWidgets.QPushButton(self.centralwidget)
        self.openPngIcoConBtn.setGeometry(QtCore.QRect(700, 290, 191, 61))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.openPngIcoConBtn.setFont(font)
        self.openPngIcoConBtn.setObjectName("openPngIcoConBtn")
        self.openConfBtn = QtWidgets.QPushButton(self.centralwidget)
        self.openConfBtn.setGeometry(QtCore.QRect(700, 360, 191, 61))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.openConfBtn.setFont(font)
        self.openConfBtn.setObjectName("openConfBtn")
        self.projPane = QtWidgets.QListWidget(self.centralwidget)
        self.projPane.setGeometry(QtCore.QRect(10, 80, 681, 481))
        self.projPane.setVerticalScrollBarPolicy(QtCore.Qt.ScrollBarAlwaysOn)
        self.projPane.setHorizontalScrollBarPolicy(QtCore.Qt.ScrollBarAlwaysOff)
        self.projPane.setSizeAdjustPolicy(QtWidgets.QAbstractScrollArea.AdjustToContents)
        self.projPane.setAlternatingRowColors(False)
        self.projPane.setObjectName("projPane")
        self.confProjsBtn = QtWidgets.QPushButton(self.centralwidget)
        self.confProjsBtn.setGeometry(QtCore.QRect(210, 10, 191, 61))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.confProjsBtn.setFont(font)
        self.confProjsBtn.setObjectName("confProjsBtn")
        self.updBtn = QtWidgets.QPushButton(self.centralwidget)
        self.updBtn.setGeometry(QtCore.QRect(410, 10, 191, 61))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.updBtn.setFont(font)
        self.updBtn.setObjectName("updBtn")
        main_window.setCentralWidget(self.centralwidget)

        self.retranslateUi(main_window)
        QtCore.QMetaObject.connectSlotsByName(main_window)

        self.functional()
        funcs.show_projs(self.projPane)

    def retranslateUi(self, main_window):
        _translate = QtCore.QCoreApplication.translate
        main_window.setWindowTitle(_translate("MainWindow", "Barbaris Launcher"))
        self.addProjBtn.setText(_translate("MainWindow", "Добавить проект"))
        self.openGGCBtn.setText(_translate("MainWindow", "Открыть GGC"))
        self.openIDEBtn.setText(_translate("MainWindow", "Открыть IDE"))
        self.openCalcBtn.setText(_translate("MainWindow", "Открыть\n""Калькулятор"))
        self.openPngIcoConBtn.setText(_translate("MainWindow", "Открыть png-ico\n"" конвертор"))
        self.openConfBtn.setText(_translate("MainWindow", "Открыть\n""конфигуратор путей"))
        self.confProjsBtn.setText(_translate("MainWindow", "Редактировать"))
        self.updBtn.setText(_translate("MainWindow", "Обновить"))

    def functional(self):
        self.openGGCBtn.clicked.connect(funcs.open_ggc)
        self.openIDEBtn.clicked.connect(funcs.open_ide)
        self.openCalcBtn.clicked.connect(funcs.open_calc)
        self.openPngIcoConBtn.clicked.connect(funcs.open_convertor)
        self.openConfBtn.clicked.connect(self.show_config)
        self.confProjsBtn.clicked.connect(self.show_conf_projs)
        self.addProjBtn.clicked.connect(lambda: funcs.add_proj(self.centralwidget, self.projPane))
        self.updBtn.clicked.connect(self.update_projs)

    def show_config(self):
        self.confWin = ConfigWindow()
        self.confWin.show()

    @staticmethod
    def show_conf_projs():
        subprocess.Popen(["notepad", "projects.csv"])

    def update_projs(self):
        self.projPane.clear()
        funcs.show_projs(self.projPane)


class Ui_pathConfig(object):
    def setupUi(self, pathConfig):
        pathConfig.setObjectName("pathConfig")
        pathConfig.resize(460, 260)
        pathConfig.setMinimumSize(QtCore.QSize(460, 260))
        pathConfig.setMaximumSize(QtCore.QSize(460, 260))
        font = QtGui.QFont()
        font.setPointSize(14)
        pathConfig.setFont(font)
        self.centralwidget = QtWidgets.QWidget(pathConfig)
        self.centralwidget.setObjectName("centralwidget")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(10, 10, 71, 31))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.label.setFont(font)
        self.label.setObjectName("label")
        self.label_2 = QtWidgets.QLabel(self.centralwidget)
        self.label_2.setGeometry(QtCore.QRect(10, 50, 81, 31))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.label_2.setFont(font)
        self.label_2.setObjectName("label_2")
        self.label_3 = QtWidgets.QLabel(self.centralwidget)
        self.label_3.setGeometry(QtCore.QRect(10, 90, 71, 31))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.label_3.setFont(font)
        self.label_3.setObjectName("label_3")
        self.label_4 = QtWidgets.QLabel(self.centralwidget)
        self.label_4.setGeometry(QtCore.QRect(10, 130, 111, 31))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.label_4.setFont(font)
        self.label_4.setObjectName("label_4")
        self.label_5 = QtWidgets.QLabel(self.centralwidget)
        self.label_5.setGeometry(QtCore.QRect(10, 170, 71, 31))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.label_5.setFont(font)
        self.label_5.setObjectName("label_5")
        self.saveBtn = QtWidgets.QPushButton(self.centralwidget)
        self.saveBtn.setGeometry(QtCore.QRect(10, 200, 111, 51))
        font = QtGui.QFont()
        font.setPointSize(10)
        self.saveBtn.setFont(font)
        self.saveBtn.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        self.saveBtn.setObjectName("saveBtn")
        self.idePath = QtWidgets.QLineEdit(self.centralwidget)
        self.idePath.setGeometry(QtCore.QRect(140, 10, 311, 20))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.idePath.setFont(font)
        self.idePath.setObjectName("idePath")
        self.backuperPath = QtWidgets.QLineEdit(self.centralwidget)
        self.backuperPath.setGeometry(QtCore.QRect(140, 50, 311, 20))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.backuperPath.setFont(font)
        self.backuperPath.setObjectName("backuperPath")
        self.ggcPath = QtWidgets.QLineEdit(self.centralwidget)
        self.ggcPath.setGeometry(QtCore.QRect(140, 90, 311, 20))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.ggcPath.setFont(font)
        self.ggcPath.setObjectName("ggcPath")
        self.calcpath = QtWidgets.QLineEdit(self.centralwidget)
        self.calcpath.setGeometry(QtCore.QRect(140, 130, 311, 20))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.calcpath.setFont(font)
        self.calcpath.setObjectName("calcpath")
        self.convPath = QtWidgets.QLineEdit(self.centralwidget)
        self.convPath.setGeometry(QtCore.QRect(140, 170, 311, 20))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.convPath.setFont(font)
        self.convPath.setObjectName("convPath")
        pathConfig.setCentralWidget(self.centralwidget)

        self.retranslateUi(pathConfig)
        QtCore.QMetaObject.connectSlotsByName(pathConfig)

        self.functions()
        self.set_pathes()

    def retranslateUi(self, pathConfig):
        _translate = QtCore.QCoreApplication.translate
        pathConfig.setWindowTitle(_translate("pathConfig", "Конфигуратор путей"))
        self.label.setText(_translate("pathConfig", "IDE"))
        self.label_2.setText(_translate("pathConfig", "Backuper"))
        self.label_3.setText(_translate("pathConfig", "GitClient"))
        self.label_4.setText(_translate("pathConfig", "Калькулятор"))
        self.label_5.setText(_translate("pathConfig", "png-ico"))
        self.saveBtn.setText(_translate("pathConfig", "Сохранить"))

    def functions(self):
        self.saveBtn.clicked.connect(
            lambda: funcs.save_config(self.idePath.text(), self.backuperPath.text(), self.ggcPath.text(),
                                      self.calcpath.text(), self.convPath.text()))

    def set_pathes(self):
        data = funcs.get_config()
        self.idePath.setText(data['ide'])
        self.backuperPath.setText(data['backuper'])
        self.ggcPath.setText(data['ggc'])
        self.calcpath.setText(data['calculator'])
        self.convPath.setText(data['convertor'])


"""
class Ui_conf_projs_window(object):
    def setupUi(self, conf_projs_window):
        conf_projs_window.setObjectName("conf_projs_window")
        conf_projs_window.resize(509, 421)
        self.centralwidget = QtWidgets.QWidget(conf_projs_window)
        self.centralwidget.setObjectName("centralwidget")
        self.listWidget = QtWidgets.QListWidget(self.centralwidget)
        self.listWidget.setGeometry(QtCore.QRect(0, 40, 511, 381))
        self.listWidget.setVerticalScrollBarPolicy(QtCore.Qt.ScrollBarAlwaysOn)
        self.listWidget.setHorizontalScrollBarPolicy(QtCore.Qt.ScrollBarAlwaysOff)
        self.listWidget.setObjectName("listWidget")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(10, 10, 341, 21))
        font = QtGui.QFont()
        font.setPointSize(12)
        self.label.setFont(font)
        self.label.setObjectName("label")
        conf_projs_window.setCentralWidget(self.centralwidget)

        self.retranslateUi(conf_projs_window)
        QtCore.QMetaObject.connectSlotsByName(conf_projs_window)
        funcs.show_config_projs(self.listWidget)

    def retranslateUi(self, conf_projs_window):
        _translate = QtCore.QCoreApplication.translate
        conf_projs_window.setWindowTitle(_translate("conf_projs_window", "Удаление проектов"))
        self.label.setText(_translate("conf_projs_window", "Нажмите на проект, чтобы удалить его"))
"""


class ConfigWindow(QtWidgets.QMainWindow, Ui_pathConfig):
    def __init__(self, parent=None):
        super(ConfigWindow, self).__init__(parent)
        self.setupUi(self)


"""
class ProjsConfigWindow(QtWidgets.QMainWindow, Ui_conf_projs_window):
    def __init__(self, parent=None):
        super(ProjsConfigWindow, self).__init__(parent)
        self.setupUi(self)
"""


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())
