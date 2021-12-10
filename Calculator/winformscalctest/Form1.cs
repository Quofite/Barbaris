using System;
using System.Windows.Forms;

namespace winformscalctest
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        public string first;                    //первая строчка
        public string second;                   //вторая строчка
        public bool isPlus = false;             //проверка на сложение
        public bool isMinus = false;            //проверка на вычитание
        public bool isMulty = false;            //проверка на умножение (кста там кнопка Mul делит, а кнопка Div умножает)
        public bool isDivide = false;           //проверка на деление (см. выше)
        public bool isPower = false;            //проверка на степень
        public bool isTwoPI = false;            //проверка на 2 числа пи
        public bool isTwoE = false;             //проверка на 2 числа Е
        public bool isKorenPressed = false;     //проверка на корень
        public bool isTwoFloat = false;         //проверка на 2 запятых
        public double a = 0;                    //первое число

        //---------------------------------ЦИФРЫ-------------------------------------

        private void button1_Click(object sender, EventArgs e)  
        {
            textBox.Text += "1";
        }

        private void button2_Click(object sender, EventArgs e)
        {
            textBox.Text += "2";
        }

        private void button3_Click(object sender, EventArgs e)
        {
            textBox.Text += "3";
        }

        private void button4_Click(object sender, EventArgs e)
        {
            textBox.Text += "4";
        }

        private void button5_Click(object sender, EventArgs e)
        {
            textBox.Text += "5";
        }

        private void button6_Click(object sender, EventArgs e)
        {
            textBox.Text += "6";
        }

        private void button7_Click(object sender, EventArgs e)
        {
            textBox.Text += "7";
        }

        private void button8_Click(object sender, EventArgs e)
        {
            textBox.Text += "8";
        }

        private void button9_Click(object sender, EventArgs e)
        {
            textBox.Text += "9";
        }

        private void button10_Click(object sender, EventArgs e)
        {
            textBox.Text += "0";
        }

        // -------------------------------ДЕЙСТВИЯ-----------------------------

        private void buttonAdd_Click(object sender, EventArgs e)
        {
            first = textBox.Text;
            a = double.Parse(first);
            textBox.Text = "";
            isPlus = true;
            isTwoE = false;
            isTwoFloat = false;
            isTwoPI = false;
        }

        private void buttonMin_Click(object sender, EventArgs e)
        {
            if (textBox.Text == "")     //если нужно отрицательное число
            {
                textBox.Text += "-";
            }
            else                        //и если нет
            {
                first = textBox.Text;
                a = double.Parse(first);
                textBox.Text = "";
                isMinus = true;
                isTwoE = false;
                isTwoFloat = false;
                isTwoPI = false;
            }
        }

        //----------------------------УРАВНЕНИЕ------------------------------------

        private void buttonEq_Click(object sender, EventArgs e)
        {
            double b = 0;   //второе число
            double c = 0;   //ответ
            bool isSecEmp = false;  //если 2 числа нет

            int ak = 0;
            int bk = 0;

            if (textBox.Text == "error: imposible to [x!]")
            {
                textBox.Text = "";
            }

            if (isKorenPressed == true) //если корень нажат
            {
                isSecEmp = true;        //пустая строчка 2 числа
                string str = textBox.Text;

                if (str[0] == '√')  //если корень =  1 знак
                {
                    string str2 = "";
                    for (int i = 1; i < str.Length; i++)
                    {
                        str2 += str[i];
                    }
                    bk = int.Parse(str2);
                    c = Math.Sqrt(bk);
                }
                else                //и если нет
                {
                    bool isKoren = false;
                    string str2 = "";
                    string str3 = "";
                    for (int i = 0; i < str.Length; i++)
                    {
                        if (str[i] != '√' && isKoren == false)
                        {
                            str2 += str[i];
                        }
                        else if (str[i] == '√')
                        {
                            isKoren = true;
                        }
                        else if (str[i] != '√' && isKoren == true)
                        {
                            str3 += str[i];
                        }
                    }
                    ak = int.Parse(str2);
                    bk = int.Parse(str3);
                    c = ak * Math.Sqrt(bk);
                    isKoren = false;
                }
            }
            else if(isKorenPressed == false) //если корень не нажат
            {
                second = textBox.Text;
                if (second == "")   //если 2 строчка пустая
                {
                    isSecEmp = true;
                    c = a;
                }
            }

            if (isSecEmp == false)  //если 2 строчка не пустая
            {
                b = double.Parse(second);

                if (isPlus == true)
                {
                    c = a + b;
                }
                else if (isMinus == true)
                {
                    c = a - b;
                }
                else if (isMulty == true)
                {
                    c = a * b;
                }
                else if (isDivide == true)
                {
                    c = a / b;
                }
                else if (isPower == true)
                {
                    c = (double)Math.Pow(a, b);
                }
            }
            
            textBox.Text = c.ToString(); //вывод ответа

            //----------------ОБНУЛЕНИЕ----------------

            isPlus = false;                        
            isMulty = false;
            isMinus = false;
            isDivide = false;
            isTwoPI = false;
            isTwoE = false;
            isKorenPressed = false;
        }

        //---------------------------------------ДЕЙСТВИЯ_2------------------------

        private void buttonDiv_Click(object sender, EventArgs e)
        {
            first = textBox.Text;
            a = double.Parse(first);
            textBox.Text = "";
            isMulty = true;
            isTwoE = false;
            isTwoFloat = false;
            isTwoPI = false;
        }

        //---------------------------------------------------------------------------

        private void buttonMul_Click(object sender, EventArgs e)
        {
            first = textBox.Text;
            a = double.Parse(first);
            textBox.Text = "";
            isDivide = true;
            isTwoE = false;
            isTwoFloat = false;
            isTwoPI = false;
        }

        //---------------------------------------------------------------------------

        private void buttonPow_Click(object sender, EventArgs e)
        {
            first = textBox.Text;
            a = double.Parse(first);
            textBox.Text = "";
            isPower = true;
            isTwoE = false;
            isTwoFloat = false;
            isTwoPI = false;
        }

        //---------------------------------------------------------------------------

        private void buttonClear_Click(object sender, EventArgs e)
        {
            textBox.Text = "";
            first = "";
            second = "";
            isTwoPI = false;
            isTwoE = false;
            isTwoFloat = false;
            isKorenPressed = false;
        }

        //---------------------------------------------------------------------------

        private void buttonBack_Click(object sender, EventArgs e)  //удаляет последний символ из textBox
        {
            string c = "";

            if (textBox.Text == "error: imposible to [x!]")
            {
                textBox.Text = "";
            }
            else
            {
                for (int i = 0; i < textBox.Text.Length - 1; i++)
                {
                    c += textBox.Text[i];
                }
                textBox.Text = c;
            }

            for (int i = 0; i < textBox.Text.Length; i++)   //фикс для запятой
            {
                if (textBox.Text[i] == ',')
                {
                    isTwoFloat = true;
                    break;
                }
                else
                {
                    isTwoFloat = false;
                    continue;
                }
            }
        }

        //---------------------------------------------------------------------------

        private void buttonPi_Click(object sender, EventArgs e)
        {
            if (isTwoPI == false && isTwoE == false && isTwoFloat == false)  //проверка на 2 и более числа пи
            {
                textBox.Text += Math.PI.ToString();
                isTwoPI = true;
            }
            else
            {
                textBox.Text += "";
            }
        }

        //---------------------------------------------------------------------------

        private void buttonFloat_Click(object sender, EventArgs e)
        {
            if (isTwoPI == false && isTwoE == false && isTwoFloat == false)    //проверка на 2 запятых
            {
                if (textBox.Text == "")     //чтобы перед запятой стояла цифра
                {
                    textBox.Text += "0,";
                }
                else
                {
                    textBox.Text += ",";
                }

                isTwoFloat = true;
            }
            else
            {
                textBox.Text += "";
            }
        }

        //---------------------------------------------------------------------------

        private void buttonFactorial_Click(object sender, EventArgs e)
        {
            int f = 1;      //начальное число факториала
            int ch = 0;     //переменная для tryparce
            bool success = int.TryParse(textBox.Text, out ch);  //если целое число, то ок, а если нет то следующая строчка

            if (success == false)
            {
                textBox.Text = "0";
            }
            else if (int.Parse(textBox.Text) > 1 && success == true)        //если все ок
            {
                for (int i = 2; i < int.Parse(textBox.Text) + 1; ++i)
                {
                    f = f * i;
                }
                textBox.Text = f.ToString();
            }
            else if (int.Parse(textBox.Text) == 1 && success == true)       //если возводят еденицу
            {
                textBox.Text = "1";
            }
            else if (int.Parse(textBox.Text) < 1 && success == true)        //если возвдят число меньше единицы
            {
                textBox.Text = "error: imposible to [x!]";
            }
        }

        //---------------------------------------------------------------------------

        private void buttonKoren_Click(object sender, EventArgs e)
        {
            if (isKorenPressed == false)    //тоже самое что и в пи, и в запятой
            {
                textBox.Text += "√";
                isKorenPressed = true;
            }
            else
            {
                textBox.Text += "";
            }
        }

        //---------------------------------------------------------------------------

        private void buttonE_Click(object sender, EventArgs e)
        {
            if (isTwoPI == false && isTwoE == false && isTwoFloat == false) //тоже самое что и в пи, и в запятой, и в корне
            {
                textBox.Text += Math.E;
                isTwoE = true;
            }
            else
            {
                textBox.Text += "";
            }
        }

        //---------------------------------------------------------------------------

        private void buttonInfo_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Калькулятор принимает значения от ±5,0 × 10^−324 до ±1,7 × 10^308");
        }

        //---------------------------------------------------------------------------

        private void buttonEsc_Click(object sender, EventArgs e)
        {
            Application.ExitThread();
        }
    }
}