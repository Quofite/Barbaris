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
        puts("��������� ��������� ����������(��� �� ������, ����� ������ ��� 0_0 ???)");
        exit(EXIT_FAILURE);
    }

    if (argc == 1) {
        cout << "��� ��������� ����� ���� �������� ���� � ����������.\n";
        cout << "���������� �������� ������� xcopy � ������� E � Y � ����� ������: \n";
        cout << "������� ����������, ������� ���� ���������, � ����� ����������, ���� ���� ���������";

        cout << "\n������� Enter ��� ��������";
        string a;
        cin >> a;
    }
    else {
        system(argv[1]);
    }

    return 0;
}