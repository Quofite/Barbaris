# BARBARIS

Barbaris - это сборка приложений для упрощения работы с кодом.<br>
В её состав входят: 
1) Лаунчер с возможностью запуска проектов;
2) Графический клиент для Git и GitHub;
3) Конвертор изображений из .png в .ico;
4) Бекапер для сохранения резервных копий ваших проектов;

Пройдемся по каждому из этих приложений по отдельности.

<hr>

### Barbaris Launcher
![](https://img.shields.io/badge/Code-JavaScript-informational?style=flat-square&logo=javascript&logoColor=white&color=5194f0)
![](https://img.shields.io/badge/Framework-Electron.js-informational?style=flat-square&logo=electron&logoColor=white&color=5194f0)<br>
![barbaris-main](https://sun9-66.userapi.com/impg/yPGqjiMseQrEPuGr7dwdGFZRNxNhuMKmRq96wA/Xel0w1C3LnM.jpg?size=1382x787&quality=96&sign=5c9a949322a36983070deb939d8b6dc4&type=album)<br>
Прошу любить и жаловать - лаунчер!<br>
Возможно, он не самый красивый и интуитивно понятный, но зато какой функциональный.<br>

Для начала, его главный функционал - открытие проектов. В центральном окне на скриншоте Вы видете 3 проекта,
но вы можете добавлять сколько угодно. Для того, чтобы добавить проект, достаточно нажать на соответствущую
кнопку в верхнем левом углу приложения и выбрать нужную папку, после чего проект добавится в csv файл в корневой
папке Barbaris. После нажатия на проект, он откроет IDE, которую вы установили (об этом чуть позже), сохранит все файлы, как резервную копию и откроет Ваш проект в Графическом клиенте GIT.

### Немного о конфигураторе путей
![path-config](https://sun9-88.userapi.com/impg/-lggmQvuQGhIgl6riQ6s8P1h-YudqKUnFumGIQ/YGZhR14v3aQ.jpg?size=692x493&quality=96&sign=cae9ccb5a7afe8aa0bcc5a15a72b247a&type=album)<br>
Это маленькое, но очень полезное окошко поможет Вам установить все директории для приложений, нужных для
работы Barbaris. По умолчанию, тут уже прописаны все пути, кроме IDE, которую Вы должны установить сами, в
зависимости от Ваших предпочтений. Остальные пути Вы тоже можете изменить, если все приложения у Вас лежат
по разным директориям.

<hr>

### GitClient
![](https://img.shields.io/badge/Code-CSharp-informational?style=flat-square&logo=csharp&logoColor=white&color=5194f0)
![](https://img.shields.io/badge/Framework-WPF-informational?style=flat-square&logo=windows&logoColor=white&color=5194f0)<br>
![ggc](https://sun9-55.userapi.com/impg/CagoimG78QsSGWF9Wc2CVSM6nnU-u1DM0WEv0w/zY4sYgfWkRk.jpg?size=901x706&quality=96&sign=31a4d0fcdff259be1afd9fcd0f8c1ce0&type=album)<br>
Несомненно, использование Git Bash поднимает Вас в глазах общественности тем, что вы используете ТеРмИнАл,
но зачем усложнять жизнь, если есть наш Графический Клиент GIT?

Его использование крайне просто:<br>
Тут есть 2 варианта - Вы открыли его через .exe и Вы открыли его вместе с проектом.
1) Через .exe:
    1) Нажимаете кнопку "Открыть папку" и выбираете там нужную директорию или вручную вводите путь и
    нажимаете "Открыть папку".
    2) Ждёте, пока консоль закроется, если все пройдет успешно, приложение так и напишет, а в верху будет
    соответствующая надпись.
    3) У тех файлов или директорий, которые не нужны в коммите, убираете галочку.
    4) Нажимаете кнопку "добавить", ждете пока консоль закроется.
    5) Пишете какой-нибудь комментарий в соответствующее поле, нажимаете "коммит", ждёте закрытия консоли.
    6) Если необходимо использовать GitHub и удаленный репозиторий, то в поле для ссылки указываете https-ссылку на репозитоий. Если необходимо сохранить ссылку, то нажимаете на соответствующую конпку.
    7) Нажимаете конпку "push", ждете чуть дльше обычного, пока консоль закроется.
2) Через лаунчер:<br>
    Проворачиваете те же самые шаги, что и в туториале выше, но без первых двух (т.е. начиная с №3)
    
<hr>

### Backuper
![](https://img.shields.io/badge/Code-C++-informational?style=flat-square&logo=cplusplus&logoColor=white&color=5194f0)<br>
На самом деле, это приложение не предназначено для использования без лаучнера, но если так хочется, то вот команда
запуска: <b>.\Backuper.exe "xcopy /E /Y *путь_для_копии* *путь_куда_копировать*"</b>

Обратите внимание, что *путь_куда_копировать* <b>НЕ ДОЛЖЕН НАХОДИТСЯ В ДИРЕКТОРИИ ДЛЯ КОПИРОВАНИЯ</b>.

<hr>

### PNG-ICO Convertor
![](https://img.shields.io/badge/Code-Python-informational?style=flat-square&logo=python&logoColor=white&color=5194f0)
![](https://img.shields.io/badge/Library-Pillow-informational?style=flat-square&logo=python&logoColor=white&color=5194f0)
![](https://img.shields.io/badge/Framework-Tkinter-informational?style=flat-square&logo=windows&logoColor=white&color=5194f0)<br>
![png-ico](https://sun9-78.userapi.com/impg/QgLVlsTWX8H6B1dA7wT3veyO14qwrwE5mtqzmg/AD6FRVMOdJQ.jpg?size=295x273&quality=96&sign=0751c99e645360616380db4f3c9e7d5d&type=album)<br>
Приложение, с самым простым функционалом в мире - кладешь в папку с .exe файлом конверотора .png картинки,
а на выходе вместе с ними получаешь их .ico варианты.

![explorer](https://sun9-45.userapi.com/impg/iJUppd27J0V1cIiGcZp-EzfNMEYE43ApELcV3A/hDEBFIOhGas.jpg?size=619x374&quality=96&sign=7e2749ffd479c6dbc968b3e894a860d3&type=album, "вот эта папка") Сюда, не в корневую папку

<hr>

#### Заключение
Если у Вас есть вопросы по работе приложений или если Вы нашли какие-либо ошибки, то пишите разработчикам:
- https://vk.com/gleb.nikitin1
- https://vk.com/doogls

ReadMe по сайту ищите в соответствующей папке в GitHub-репозитории

#### Другие полезные ссылки:
- https://github.com/Quofite/Barbaris
- http://barbaris.novostroi.org
