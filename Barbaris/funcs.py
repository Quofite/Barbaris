import os
import csv
import json
import traceback
import subprocess

from PyQt5 import QtWidgets
from PyQt5.QtWidgets import QMessageBox, QFileDialog, QPushButton


def make_popup(header, text):
    mbox = QMessageBox()
    mbox.setWindowTitle(header)
    mbox.setText(text)
    mbox.setStandardButtons(QMessageBox.Close)
    mbox.exec_()


# ---------------------------------------- КНОПКИ НА ПРАВОЙ ПАНЕЛИ
# открытие ggc
def open_ggc():
    with open("pathes.json", 'r') as file:
        path = json.load(file)

    try:
        subprocess.Popen([os.curdir + path['ggc']])
    except Exception:
        make_popup("Ошибка", "Файл GitClient.exe не найден в корневой папке Barbaris: " + os.curdir + path['ggc'])


# открыть ggc при нажатии на проект
def open_ggc_from_projs(arg):
    with open("pathes.json", 'r') as file:
        path = json.load(file)

    try:
        subprocess.Popen([os.curdir + path['ggc'], arg])
    except Exception:
        make_popup("Ошибка", "Файл GitClient.exe не найден в корневой папке Barbaris: " + os.curdir + path['ggc'])
        print(traceback.format_exc())


# открыть backuper
def open_backuper():
    make_popup("Недоступно", "Это приложение еще не создано")


# открыть IDE
def open_ide():
    with open("pathes.json", 'r') as file:
        path = json.load(file)

    try:
        subprocess.Popen([path['ide']])
    except Exception:
        make_popup("Ошибка", "Путь к IDE не установлен. Установите его в конфигураторе")


# открыть IDE при нажатии на проект
def open_ide_from_projs(arg):
    with open("pathes.json", 'r') as file:
        path = json.load(file)

    try:
        subprocess.Popen([path['ide'], arg])
    except Exception:
        make_popup("Ошибка", "Путь к IDE не установлен. Установите его в конфигураторе")


# открыть калькулятор
def open_calc():
    with open("pathes.json", 'r') as file:
        path = json.load(file)

    try:
        subprocess.Popen([path['calculator']])
    except Exception:
        make_popup("Исключение", traceback.format_exc())


# открыть конвертор в ico
def open_convertor():
    with open("pathes.json", 'r') as file:
        path = json.load(file)

    try:
        os.startfile(os.path.abspath(os.curdir) + path['convertor'])
    except Exception:
        make_popup("Исключение", traceback.format_exc())


# ------------------------------------------ ВСЕ, СВЯЗАННОЕ С ПРОЕКТАМИ
# добавить проект в список
def add_proj(main_window, vbox):
    file = str(QFileDialog.getExistingDirectory(main_window, "Выберете директорию"))
    splitted = file.split('/')
    projname = splitted[len(splitted) - 1]
    proj = [projname, file]

    with open("projects.csv", 'a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(proj)

    show_projs(vbox)


# показать проекты из списка
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


# открыть проект из списка
def open_proj(path):
    open_ide_from_projs(path)
    open_ggc_from_projs(path)


# ------------------------------------------ КОНФИГУРАТОР
# сохранить пути в json
def save_config(idePath, backuperPath="none", ggcPath="\\GitClient.exe", calcPath="\\Calculator.exe", convPath="none"):
    updated = {"ide": idePath,
               "ggc": ggcPath,
               "backuper": backuperPath,
               "convertor": convPath,
               "calculator": calcPath}
    json.dumps(updated)

    with open("pathes.json", 'w') as file:
        file.write(str(updated).replace("\'", "\""))


# достать пути из json
def get_config():
    with open("pathes.json", 'r') as file:
        return json.load(file)
