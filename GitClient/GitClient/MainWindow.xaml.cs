using System;
using System.Diagnostics;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace GitClient {
    public partial class MainWindow : Window {
        public MainWindow() {
            InitializeComponent();
        }

        private void openDirBtn_Click(object sender, RoutedEventArgs e) {
            string workingDir = @dirTextBox.Text;
            string filesTextBox = string.Empty;


            if (Directory.Exists(workingDir)) {
                if (Directory.Exists(workingDir + @"\.git"))
                    filesBox.Text += "git initialized \n";
                else {
                    File.WriteAllText("./gitinitscript.bat",
                        "cd " + workingDir + "\n" +
                        "git init \n"
                    );
                    Process.Start("./gitinitscript.bat");
                    MessageBox.Show("Git forlder has benn initialized at " + workingDir);
                }

                string[] dirs = Directory.GetDirectories(workingDir);
                foreach (string dir in dirs) {
                    filesTextBox += dir;
                    filesTextBox += "\n";
                }

                string[] files = Directory.GetFiles(workingDir);
                foreach (string file in files) {
                    filesTextBox += file;
                    filesTextBox += "\n";
                }

                filesBox.Text += filesTextBox;
            }
        }
    }
}
