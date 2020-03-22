---
layout: post
title: C语言常见算法
date: 2019-11-13
---

## 循环实现: 不定数组的排序

```c++
#include <stdio.h>
int main(){

    int n = 0, i, j, t, l[100];
    //输入小于100的任意个数的数字,回车为终止符
    do
        scanf("%d", &l[n++]);
    while (getchar() != '\n');
    for (i = 0; i < n - 1; i++)
        for (j = i + 1; j < n; j++)
            if (l[j] >= l[i]){
                t = l[i];
                l[i] = l[j];
                l[j] = t;
            }
    for (i = 0; i < n; i++)
        printf("%d ", l[i]);
    return 0;

}

```

## 递归实现:倒序输出字符串

```c++
#include <stdio.h>
void rev();
int main(){
    rev();
}
void rev(){
    char c;
    scanf("%c", &c);
    if (c != '\n'){
        rev();
        printf("%c", c);
    }
}
```

## 递归实现: 输出斐波那契数列前20项

```c++
#include<stdio.h>
int f(int n); 
int main() {

	int i=1;
	//循环输出第i项
	for(; i<=20; i++)
		printf("第%d位: %d\n",i,f(i));

}
//定义一个函数, 输出斐波那契数列第n项
int f(int n) {

    //用三元运算符判断并递归调用f()函数
	return (n==1|n==2)?1:(f(n-1)+f(n-2));

}

```

## for循环实现:打印三角形

```c++
#include <iostream>
using namespace std;
int main(){
    int n;    //定义图形高度n
    cin >> n; //输入n
    for (int i = 1; i <= n; i++){
        //外层循环控制高度
        for (int k = i; k < n; k++)
            cout << " ";
        //内层第一个循环打印空格，至于循环起始值和边界值仔细看应该不难明白
        for (int j = 1; j <= i; j++)
            cout << "*";
        //内层第二个循环打印图形组成字符"*"，这个j的边界之根据字符个数和行号的关系找得规律
        cout << endl; //打完一行时输出换行
    }
    return 0;
}
```

## 递归实现: 阶乘、组合数

```c++
#include <stdio.h>
//封装一个递归调用函数fac↓
long long fac(int n){

    return (n==0||n==1)?1:n*fac(n-1);

}
//封装一个求组合数的函数yoo↓
long long yoo(int n, int m){

    return fac(n) / fac(m) * fac(n - m);

}
//主函数开始↓
int main(void){

    int z, answer;
    scanf("%d", &z);
    answer = fac(z);
    printf("answer = %lld", answer);

}

```

## 指针实现:倒序输出字符串(原创)

```c++
#include <stdio.h>
void rev(char *p);
int main() {
	char x[30];
	scanf("%s",x);
    //x传递的是x字符串的首地址↓
	rev(x);
}
void rev(char *p) {
	//找到字符串的'\0'结束标志的位置↓
	while(*p!='\0') p++;;
	//从最后位置(--p)开始往前输出 ↓
	do printf("%c",*(--p));
	while(*p!='\0');
}
```

## 已知三边长求三角形面积

```c++
#include <iostream>
#include <cmath>
using namespace std; 
int main(){

    float a, b, c, s, s2;
    printf("Please enter the length of the three sides : ");
    cin >> a >> b >> c;
    s2 = 1.0 / 2 * (a + b + c);
    //sqrt是开方函数,在math库中
    s = sqrt(s2 * (s2 - a) * (s2 - b) * (s2 - c));
    //endl(最后为小写字母 l)表示焦点定位到最后一行末尾↓
    cout << "Area = " << s << endl;

}

```

## 递归实现:倒序输出整数(原创)

```c++
#include <stdio.h>
long long rev(long long n); 
int main() {
	int x;
	scanf("%d",&x);
	printf("%d",rev(x));
}
long long rev(long long n) {
	if(n<9) return n; 
	printf("%d",n%10);
	if(n/10!=0) rev(n/10);
}
```

## 指针实现: 输出数组中最大数(原创)

```c++
#include <stdio.h>
void max(int *p, int n); 
int main() {

	int x[20],y,n=0;
	do { //输入n个数,可负,0结束输入
		scanf("%d",&y);
		if(y!=0) x[n++]=y;
		else break;
	} while(1);
	max(x,n);

}
void max(int *p, int n) {

	//定义一个新指针q记录最大值的地址
	int *q=p;
	//n个数需要判断n-1次 
	for(; n>1; n--)
		if(*q>=*p) p++;
	printf("%d",*p);

}

```

## 二进制与十进制的转化

```c++
#include <stdio.h>
#include <math.h>
int binary_decimal(int n);
int decimal_binary(int n);
int main(){
    int n;
    char c;
    printf("Instructions:\n");
    printf("1. convert binary to decimal.\n");
    printf("2. convert decimal to binary.\n");
    scanf("%c", &c);
    if (c == '1'){
        printf("Enter a binary number: ");
        scanf("%d", &n);
        printf("%d in binary = %d in decimal", n, binary_decimal(n));
    }
    if (c == '2'){
        printf("Enter a decimal number: ");
        scanf("%d", &n);
        printf("%d in decimal = %d in binary", n, decimal_binary(n));
    }
    return 0;
}
 /* Function to convert decimal to binary.*/
int decimal_binary(int n){ 
    int rem, i = 1, binary = 0;
    while (n != 0){
        rem = n % 2;
        n /= 2;
        binary += rem * i;
        i *= 10;
    }
    return binary;
}
/* Function to convert binary to decimal.*/
int binary_decimal(int n) {
    int decimal = 0, i = 0, rem;
    while (n != 0){
        rem = n % 10;
        n /= 10;
        decimal += rem * pow(2, i);
        ++i;
    }
    return decimal;
}
```

