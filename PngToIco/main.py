import os
from PIL import Image

png_images = [image for image in os.listdir() if image.endswith('.png')]
for png_image in png_images:
    try:
        new_file = png_image.split('.')[0] + '.ico'
        Image.open(png_image).save(new_file)
    except IOError as err:
        print("произошла ошибка в прочтении файла {}".format(png_image))
