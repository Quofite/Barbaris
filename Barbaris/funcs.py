import os
import csv
import json

from PyQt5.QtWidgets import QMessageBox, QFileDialog


def make_popup(header, text):
    mbox = QMessageBox()
    mbox.setWindowTitle(header)
    mbox.setText(text)
    mbox.setStandardButtons(QMessageBox.Close)
    mbox.exec_()


# ---------------------------------------- КНОПКИ НА ПРАВОЙ ПАНЕЛИ
def open_ggc():
    try:
        os.startfile(r'C:\Users\marga\Desktop\Barbaris\GitClient.exe')
    except Exception:
        make_popup("Ошибка", "Файл GitClient.exe не найден в корневой папке Barbaris")


def open_autosaver():
    make_popup("Недоступно", "Это приложение еще не создано")


def open_vsc():
    try:
        os.startfile(r'C:\CodingUtilities\Microsoft VS Code\Code.exe')
    except Exception:
        make_popup("Ошибка", "Visual Studio Code не найден на вашем ПК, установите его")


def open_calc():
    try:
        os.startfile(r'C:\Users\marga\Desktop\Barbaris\Calculator.exe')
    except Exception:
        make_popup("Ошибка", "Calculator.exe не найден в корневой папке Barbaris")


def open_convertor():
    make_popup("Недоступно", "Это приложение еще не создано")


# ------------------------------------------ ВСЕ, СВЯЗАННОЕ С ПРОЕКТАМИ
def add_proj(main_window):
    file = str(QFileDialog.getExistingDirectory(main_window, "Выберете директорию"))
    splitted = file.split('/')
    projname = splitted[len(splitted) - 1]
    proj = [projname, file]

    with open("projects.csv", 'a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(proj)


def show_projs(vbox):
    with open("projects.csv", 'r', newline='') as file:
        reader = csv.reader(file)
        for row in reader:
            print(row[0] + " - " + row[1])


# ------------------------------------------ КОНФИГУРАТОР
def save_config(vscPath, backuperPath="none", ggcPath="\\GitClient.exe", calcPath="\\Calculator.exe", convPath="none"):
    updated = {"vsc": vscPath,
               "ggc": ggcPath,
               "backuper": backuperPath,
               "convertor": convPath,
               "calculator": calcPath}
    json.dumps(updated)

    with open("pathes.json", 'w') as file:
        file.write(str(updated).replace("\'", "\""))


def get_config():
    with open("pathes.json", 'r') as file:
        return json.load(file)
