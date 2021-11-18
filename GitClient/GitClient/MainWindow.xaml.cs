using System.Diagnostics;
using System.IO;
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

        // получение ссылки на git репозиторий из json
        private async Task SetInJson(string workingDir, string gitlink) {
            using (FileStream fs = new FileStream("gitlink.json", FileMode.OpenOrCreate)) {
                JsonLink link = new JsonLink() { Link = gitlink };
                await JsonSerializer.SerializeAsync<JsonLink>(fs, link);
            }
            File.Move("./gitlink.json", dirTextBox.Text + @"/gitlink.json");
        }

        private async Task GetFromJson(string workingDir) {
            using (FileStream fs = new FileStream(workingDir + @"\gitlink.json", FileMode.OpenOrCreate)) {
                JsonLink link = await JsonSerializer.DeserializeAsync<JsonLink>(fs);
                gitLink.Text = link.Link;
            }
        }

        // получение папок и файлов в них
        private void GetDirs(string workingDir, int marginLeft) {
            string[] dirs = Directory.GetDirectories(workingDir);
            foreach (string dir in dirs) {
                string[] splited = dir.Split("\\");
                string sp = splited[^1];

                if (sp != ".git" && sp != "node_modules" && sp != "bin" && sp != "obj") {
                    CheckBox checkbox = new CheckBox { Content = sp, FontSize = 16, Height = 20, Margin = new Thickness(marginLeft, 10, 0, 0) };
                    stackPanel.Children.Add(checkbox);

                    GetDirs(dir, marginLeft + 30);
                    GetFiles(dir, marginLeft + 30);
                }
                else if (sp != ".git") {
                    CheckBox checkbox = new CheckBox { Content = sp, FontSize = 16, Height = 20, Margin = new Thickness(marginLeft, 10, 0, 0) };
                    stackPanel.Children.Add(checkbox);
                }
            }
        }

        private void GetFiles(string workingDir, int marginLeft) {
            string[] files = Directory.GetFiles(workingDir);
            foreach (string file in files) {
                string[] splited = file.Split("\\");
                CheckBox checkbox = new CheckBox { Content = splited[^1], FontSize = 16, Height = 20, Margin = new Thickness(marginLeft, 10, 0, 0) };
                stackPanel.Children.Add(checkbox);
            }
        }

        // обработчики событий кнопок
        // открытие директории
        private void openDirBtn_Click(object sender, RoutedEventArgs e) {
            string workingDir = @dirTextBox.Text;                   // получение пути
            gitLink.Text = "Ссылка на удаленный репозиторий";       // отчистка ссылки на гитхаб
            gitStatusBar.Text = string.Empty;                       // отчистка строки состояния гита
            stackPanel.Children.Clear();                            // отчистка stack panel

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
                    FileInfo batnik = new FileInfo("./gitinitscript.bat");
                    batnik.Delete();
                }

                GetDirs(workingDir, 10);
                GetFiles(workingDir, 10);
            }
        }

        // git add
        private void gitAddBtn_Click(object sender, RoutedEventArgs e) {
            File.WriteAllText("./gitadd.bat", $"cd {dirTextBox.Text} \n" + "git add ."); // пока git add ., потом сделаем с чекбоксами
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

        // сохранение ссылки на гитхаб
        private void saveLinkBtn_Click(object sender, RoutedEventArgs e) {
            SetInJson(dirTextBox.Text, gitLink.Text);
        }


        // плейсхолдеры для текстовых полей
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
