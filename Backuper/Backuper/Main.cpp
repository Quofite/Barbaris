#include <stdio.h>
#include <stdlib.h>
#include <clocale>
#include <string>
#include <iostream>
#include <io.h>
#include <fcntl.h>
using namespace std;

int main(int argc, char* argv[]) {
    
    _setmode(_fileno(stdout), _O_U16TEXT);
    _setmode(_fileno(stdin), _O_U16TEXT);
    _setmode(_fileno(stderr), _O_U16TEXT);

    if (!system(NULL)) {
        puts("Командный процессор недоступен(что ты сделал, чтобы убрать его 0_0 ???)");
        exit(EXIT_FAILURE);
    }

    if (argc == 1) {
        cout << "Эта программа может быть запущена лишь с параметром.\n";
        cout << "Параметром является команда xcopy с флагами E и Y и двумя путями: \n";
        cout << "Сначала директорию, которую надо сохранять, а затем директорию, куда надо сохранять";

        cout << "\nНажмите Enter для закрытия";
        string a;
        cin >> a;
    }
    else {
        system(argv[1]);
    }

    return 0;
}