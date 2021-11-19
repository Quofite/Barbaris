using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace GitClient {

    // модель json файла с ссылкой на gh
    public class JsonLink {
        public string Link { get; set; }
    }

    public partial class MainWindow : Window {
        public MainWindow() {
            InitializeComponent();
        }

        // получение ссылки на git репозиторий в json
        private async Task SetInJson(string workingDir, string gitlink) {
            // открытие json файла
            using (FileStream fs = new FileStream("gitlink.json", FileMode.OpenOrCreate)) {
                // создание объекта json
                JsonLink link = new JsonLink() { Link = gitlink };
                await JsonSerializer.SerializeAsync<JsonLink>(fs, link);
            }
            // перемещение json'a из папки с приложением в рабочую папку
            File.Move("./gitlink.json", dirTextBox.Text + @"/gitlink.json");
        }

        // получение сслыки на гитхаб из json'а
        private async Task GetFromJson(string workingDir) {
            // открытие файла
            using (FileStream fs = new FileStream(workingDir + @"\gitlink.json", FileMode.OpenOrCreate)) {
                // и его парсинг с установкой ссылки в текстовое поле
                JsonLink link = await JsonSerializer.DeserializeAsync<JsonLink>(fs);
                gitLink.Text = link.Link;
            }
        }


        // получение папок и файлов в них
        private void GetDirs(string workingDir, int marginLeft) {
            string[] dirs = Directory.GetDirectories(workingDir);   // массив со всеми папками
            // перебирание папок
            foreach (string dir in dirs) {
                // получение только названия папки(без c:\\...)
                string[] splited = dir.Split("\\");
                string sp = splited[^1];

                // если эта папка - НЕ папка гита, модулей ноды, билды и т.п...
                if (sp != ".git" && sp != "node_modules" && sp != "bin" && sp != "obj") {
                    // то создаем чекбокс с названием папки, с обработчиками состояния и добавляем его на панель
                    CheckBox checkbox = new CheckBox { Content = sp, FontSize = 16, Height = 20, Margin = new Thickness(marginLeft, 10, 0, 0), IsChecked = true };
                    checkbox.Checked += dircheckbox_Checked;
                    checkbox.Unchecked += dircheckbox_Unchecked;
                    stackPanel.Children.Add(checkbox);

                    // получаем подкаталоги и файлы из этой директории
                    GetDirs(dir, marginLeft + 30);
                    GetFiles(dir, marginLeft + 30);
                }
                else if (sp != ".git") {    // если это пакеты ноды, билды и т.п., то просто добавим их в гит, но без дочерних файлов/директорий
                    CheckBox checkbox = new CheckBox { Content = sp, FontSize = 16, Height = 20, Margin = new Thickness(marginLeft, 10, 0, 0), IsChecked = true };
                    stackPanel.Children.Add(checkbox);
                }
            }
        }

        // получение файлов происходит похожим образом, просто без вывода дочерних папок/файлов и проверки на названия
        private void GetFiles(string workingDir, int marginLeft) {
            string[] files = Directory.GetFiles(workingDir);
            foreach (string file in files) {
                string[] splited = file.Split("\\");
                CheckBox checkbox = new CheckBox { Content = splited[^1], FontSize = 16, Height = 20, Margin = new Thickness(marginLeft, 10, 0, 0), IsChecked = true };
                checkbox.Unchecked += checkbox_Unchecked;
                checkbox.Checked += checkbox_Checked;
                stackPanel.Children.Add(checkbox);
            }
        }


        // ---------------------------------------------------------------------- обработчики событий кнопок
        // открытие директории
        private void openDirBtn_Click(object sender, RoutedEventArgs e) {
            string workingDir = @dirTextBox.Text;                   // получение пути
            gitLink.Text = "Ссылка на удаленный репозиторий";       // отчистка ссылки на гитхаб
            gitStatusBar.Text = string.Empty;                       // отчистка строки состояния гита
            stackPanel.Children.Clear();                            // отчистка stack panel
            File.WriteAllText(workingDir + "\\.gitignore", string.Empty);

            // если директоирия существует
            if (Directory.Exists(workingDir)) {
                // если есть папка гита
                if (Directory.Exists(workingDir + @"\.git")) {
                    // установка сообщения об инициализации гита
                    gitStatusBar.Text += "git initialized";

                    // если есть ссылка на гитхаб, то получаем
                    if (File.Exists(workingDir + @"\gitlink.json"))
                        GetFromJson(workingDir);
                }
                else {  // в противном случае создаем git init
                    File.WriteAllText("./gitinitscript.bat",
                        "cd " + workingDir + "\n" +
                        "git init \n"
                    );
                    Process.Start("./gitinitscript.bat");
                    MessageBox.Show("Рабочая директория Git инициализирована в " + workingDir);
                    gitStatusBar.Text = "Git инициализировн";
                    File.Create("./.gitignore");
                    FileInfo batnik = new FileInfo("./gitinitscript.bat");
                    batnik.Delete();
                }

                // получение папок и файлов из основного каталога
                GetDirs(workingDir, 10);
                GetFiles(workingDir, 10);
            }
        }

        // git add
        private void gitAddBtn_Click(object sender, RoutedEventArgs e) {
            File.WriteAllText("./gitadd.bat", $"cd {dirTextBox.Text} \n" + "git add .");
            Process.Start("./gitadd.bat");
            MessageBox.Show("Файлы успешно добавлены в ожидание");
            FileInfo batnik = new FileInfo("./gitadd.bat");
            batnik.Delete();
        }

        // git commit
        private void gitCommitBtn_Click(object sender, RoutedEventArgs e) {
            File.WriteAllText("./gitcommit.bat", $"cd {dirTextBox.Text} \n" + $"git commit -m \"{comment.Text}\"");
            Process.Start("./gitcommit.bat");
            MessageBox.Show("Файлы успешно отправлены в локальный репозиторий Git");
            FileInfo batnik = new FileInfo("./gitcommit.bat");
            batnik.Delete();
        }

        // git push
        private void gitPushBtn_Click(object sender, RoutedEventArgs e) {
            if (gitLink.Text == string.Empty) {
                MessageBox.Show("Нет ссылки на репозиторий");
                return;
            }

            File.WriteAllText("./gitpush.bat", $"cd {dirTextBox.Text} \n" + $"git remote add origin {gitLink.Text} \n" + "git push -u origin master");
            Process.Start("./gitpush.bat");
            MessageBox.Show("Файлы успешно загруженны на удаленный репозиторий");
            FileInfo batnik = new FileInfo("./gitpush.bat");
            batnik.Delete();
        }

        // сохранение ссылки на гитхаб в json файле внутри рабочего каталога
        private void saveLinkBtn_Click(object sender, RoutedEventArgs e) {
            SetInJson(dirTextBox.Text, gitLink.Text);
        }
        

        // ---------------------------------------------------------------------- обработчики событий для чекбоксов
        private void checkbox_Unchecked(object sender, RoutedEventArgs e) {
            CheckBox checkBox = (CheckBox)sender;
            SetFileInIgnore(checkBox.Content.ToString());
        }

        private void checkbox_Checked(object sender, RoutedEventArgs e) {
            CheckBox checkBox = (CheckBox)sender;
            RemoveFileFromIgnore(checkBox.Content.ToString());
        }

        private void dircheckbox_Unchecked(object sender, RoutedEventArgs e) {
            CheckBox checkBox = (CheckBox)sender;
            SetFileInIgnore("/" + checkBox.Content.ToString());
        }

        private void dircheckbox_Checked(object sender, RoutedEventArgs e) {
            CheckBox checkBox = (CheckBox)sender;
            RemoveFileFromIgnore("/" + checkBox.Content.ToString());
        }

        // не совсем обработчики событий, но непосредственно с ними связаны
        private void SetFileInIgnore(string filepath) {
            File.AppendAllText(dirTextBox.Text + "\\.gitignore", filepath + "\n");  // запись неотмеченный галочкой файлов/каталогов в gitignore
        }

        private void RemoveFileFromIgnore(string filepath) {
            // поиск и удаление отмеченных файлов/директорий из gitignore
            System.Collections.Generic.IEnumerable<string> re = File.ReadAllLines(dirTextBox.Text + "\\.gitignore").Where(s => !s.Contains(filepath));
            File.WriteAllLines(dirTextBox.Text + "\\.gitignore", re);
        }

        // ----------------------------------------------------------------- плейсхолдеры для текстовых полей
        private void comment_GotFocus(object sender, RoutedEventArgs e) {
            if (comment.Text == "Комментарий")
                comment.Text = string.Empty;
        }

        private void comment_LostFocus(object sender, RoutedEventArgs e) {
            if (string.IsNullOrWhiteSpace(comment.Text))
                comment.Text = "Комментарий";
        }

        private void gitLink_GotFocus(object sender, RoutedEventArgs e) {
            if (gitLink.Text == "Ссылка на удаленный репозиторий")
                gitLink.Text = string.Empty;
        }

        private void gitLink_LostFocus(object sender, RoutedEventArgs e) {
            if (string.IsNullOrWhiteSpace(gitLink.Text))
                gitLink.Text = "Ссылка на удаленный репозиторий";
        }
    }
}
