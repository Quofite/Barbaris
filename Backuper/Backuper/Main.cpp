#include <stdio.h>
#include <stdlib.h>
#include <clocale>
#include <string>
#include <iostream>
using namespace std;

int main(int argc, char* argv[]) {
    
    setlocale(LC_ALL, "Russian");

    if (!system(NULL)) {
        puts("��������� ��������� ����������(��� �� ������, ����� ������ ��� 0_0 ???)");
        exit(EXIT_FAILURE);
    }

    if (argc == 1) {
        cout << "��� ��������� ����� ���� �������� ���� � ����������.\n";
        cout << "���������� �������� ������� xcopy � ������� E � Y � ����� ������: \n";
        cout << "������� ����������, ������� ���� ���������, � ����� ����������, ���� ���� ���������";

        cout << "\n������� ���-���� ��� ��������";
        string a;
        cin >> a;
    }
    else {
        system(argv[1]);
    }

    return 0;
}