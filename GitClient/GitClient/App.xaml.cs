using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;

namespace GitClient {
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    /// 

    public partial class App : Application {
        public string[] Params { get; set; }

        protected override void OnStartup(StartupEventArgs e) {
            Params = e.Args;

            base.OnStartup(e);
        }
    }
}
