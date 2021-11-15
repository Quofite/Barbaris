using System.Diagnostics;
using System.IO;
using System.Windows;
using System.Windows.Controls;

namespace GitClient {
    public partial class MainWindow : Window {
        public MainWindow() {
            InitializeComponent();
        }

        private void openDirBtn_Click(object sender, RoutedEventArgs e) {
            string workingDir = @dirTextBox.Text;
            gitStatusBar.Text = string.Empty;
            stackPanel.Children.Clear();


            if (Directory.Exists(workingDir)) {
                if (Directory.Exists(workingDir + @"\.git"))
                    gitStatusBar.Text += "git initialized";
                else {
                    File.WriteAllText("./gitinitscript.bat",
                        "cd " + workingDir + "\n" +
                        "git init \n"
                    );
                    Process.Start("./gitinitscript.bat");
                    MessageBox.Show("Рабочая директория Git инициализирована в " + workingDir);
                    gitStatusBar.Text += "Git инициализировн";
                    FileInfo batnik = new FileInfo("./gitinitscript.bat");
                    batnik.Delete();
                }

                string[] dirs = Directory.GetDirectories(workingDir);
                foreach (string dir in dirs) {
                    string[] splited = dir.Split("\\");
                    CheckBox checkbox = new CheckBox { Content = splited[splited.Length - 1], FontSize = 16, Height = 20 };
                    stackPanel.Children.Add(checkbox);
                }

                string[] files = Directory.GetFiles(workingDir);
                foreach (string file in files) {
                    string[] splited = file.Split("\\");
                    CheckBox checkbox = new CheckBox { Content = splited[splited.Length - 1], FontSize = 16, Height = 20 };
                    stackPanel.Children.Add(checkbox);
                }
            }
        }

        private void gitAddBtn_Click(object sender, RoutedEventArgs e) {
            File.WriteAllText("./gitadd.bat", $"cd {dirTextBox.Text} \n" + "git add ."); // пока git add ., потом сделаем с чекбоксами
            Process.Start("./gitadd.bat");
            MessageBox.Show("Файлы успешно добавлены в ожидание");
            FileInfo batnik = new FileInfo("./gitadd.bat");
            batnik.Delete();
        }

        private void gitCommitBtn_Click(object sender, RoutedEventArgs e) {
            File.WriteAllText("./gitcommit.bat", $"cd {dirTextBox.Text} \n" + $"git commit -m \"{comment.Text}\"");
            Process.Start("./gitcommit.bat");
            MessageBox.Show("Файлы успешно отправлены в локальный репозиторий Git");
            FileInfo batnik = new FileInfo("./gitcommit.bat");
            batnik.Delete();
        }

        private void comment_GotFocus(object sender, RoutedEventArgs e) {
            if (comment.Text == "Комментарий")
                comment.Text = string.Empty;
        }

        private void comment_LostFocus(object sender, RoutedEventArgs e) {
            if (string.IsNullOrWhiteSpace(comment.Text))
                comment.Text = "Комментарий";
        }
    }
}
