import os
import csv
import json

from PyQt5 import QtWidgets
from PyQt5.QtWidgets import QMessageBox, QFileDialog, QPushButton


def make_popup(header, text):
    mbox = QMessageBox()
    mbox.setWindowTitle(header)
    mbox.setText(text)
    mbox.setStandardButtons(QMessageBox.Close)
    mbox.exec_()


# ---------------------------------------- КНОПКИ НА ПРАВОЙ ПАНЕЛИ
def open_ggc():
    with open("pathes.json", 'r') as file:
        path = json.load(file)

    try:
        os.startfile(os.curdir + path['ggc'])
    except Exception:
        make_popup("Ошибка", "Файл GitClient.exe не найден в корневой папке Barbaris")


def open_autosaver():
    make_popup("Недоступно", "Это приложение еще не создано")


def open_vsc():
    with open("pathes.json", 'r') as file:
        path = json.load(file)

    try:
        os.startfile(os.curdir + path['vsc'])
    except Exception:
        make_popup("Ошибка", "Путь к VS Code не установлен. Установите его в конфигураторе")


def open_calc():
    with open("pathes.json", 'r') as file:
        path = json.load(file)

    try:
        os.startfile(os.curdir + path['calculator'])
    except Exception:
        make_popup("Ошибка", "Calculator.exe не найден в корневой папке Barbaris")


def open_convertor():
    make_popup("Недоступно", "Это приложение еще не создано")


# ------------------------------------------ ВСЕ, СВЯЗАННОЕ С ПРОЕКТАМИ
def add_proj(main_window, vbox):
    file = str(QFileDialog.getExistingDirectory(main_window, "Выберете директорию"))
    splitted = file.split('/')
    projname = splitted[len(splitted) - 1]
    proj = [projname, file]

    with open("projects.csv", 'a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(proj)

    show_projs(vbox)


def show_projs(vbox):
    vbox.clear()

    with open("projects.csv", 'r', newline='') as file:
        reader = csv.reader(file)
        for row in reader:
            text = "{name} ({path})".format(name=row[0], path=row[1])
            btn = QPushButton(text)
            btn.resize(400, 60)
            btn.clicked.connect(lambda: open_proj(row[1]))
            listWidgetItem = QtWidgets.QListWidgetItem()
            listWidgetItem.setSizeHint(btn.sizeHint())
            vbox.addItem(listWidgetItem)
            vbox.setItemWidget(listWidgetItem, btn)


def open_proj(path):
    # TODO: по пути будет открываться gitclient, там надо сделать открытие проги с параметром-путём, который сразу запишется в поле проекта
    # TODO: тоже самое будет с backuper'ом и vsc
    # TODO: калькулятор и конвертор открываться не будут
    print(path)


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
