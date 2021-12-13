import os

from PIL import Image as Img
from tkinter import *


def convert():
    png_images = [image for image in os.listdir() if image.endswith('.png')]
    for png_image in png_images:
        try:
            new_file = png_image.split('.')[0] + '.ico'
            Img.open(png_image).save(new_file)
        except IOError as err:
            print("произошла ошибка в прочтении файла {}".format(png_image))


root = Tk()
root.title("PNG в ICO Конвертор")
root.geometry("300x250")

label1 = Label(text="Положи .png изображения в папку с этим файлом \n и на выходе в этой же папке получишь .ico")
label1.pack()

btn = Button(text="Конвертировать", font="16", command=convert)
btn.pack()

root.mainloop()
