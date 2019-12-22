---
layout: post
title: Hàm Trong C/C++.
parent: BaseC++
nav_oder: 1

---

# Typography
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---
## Hàm Con Trong C/C++
Bài toán quen thuộc đổi chỗ 2 số nguyên **a** và **b**
```c++
  a=a+b;
  b=a-b;
  a=a-b;
```
Việc đổi chỗ 2 số nguyên khiến ta mất 3 dòng. Nhưng nếu trong một chương trình cần thực hiện nhiều lần đổi chỗ 2 số nguyên,
khi đó việc viết đi viết lại 3 dòng cho một công việc giống nhau thì code sẽ rất dài và khó quan sát.

Giải pháp dùng hàm con trong C/C++.

### Điểm nổi bật của hàm :

* Chúng ta có thể sử dụng hàm cho một công việc nhiều lần trong chưong trình dù chỉ viết nó chính xác 1 lần.

* Chúng ta có thể gọi hàm ở bất kì đâu, bất kì thời gian nào trong Chưong trình.

* Dùng hàm giúp ta chia chưong trình thành các công việc riêng biệt dễ dàng.

### Định Nghĩa một hàm

```c++
Kiểu_dữ_liệu_trả_về  tên_hàm(các_tham_số_trong_hàm){
  nội dung hàm thực hiện.
}
```
### Kiểu dữ liệu trả vê:
* các kiểu biến trong C/C++: int, long long ,double,...
* void : không trả về gì cả.
### Các tham số của hàm:
* Tham số là đầu vào của hàm : ví dụ đổi chỗ 2 biến a và b thì a và b là tham số cần truyền vào.
* Hàm có thể không có tham số .
* Các tham số phân cách nhau bởi dấu **,**.
### Ví dụ Hàm trả về min của 2 số a và b
```c++
#include<stdio.h>
int giatrinhonhat(int a,int b){
    if(a<b){
        return a;
    }
    else return b;
}
int main(){
  int a,b;
  scanf("%d%d",&a,&b);
  int Min=giatrinhonhat(a,b);
  printf("%d",Min);
  return 0;
}
```
### Trong ví dụ trên:
* int : Là kiểu dữ liệu trả về.
* giatrinhonhat: Tên hàm.
* int a,int b : Các tham số của hàm.
* Bên trong hàm dùng câu lệnh return giống như hàm main() khi gặp return lập tức nó sẽ thoát ra khỏi hàm và trả về giá trị của hàm.

### Chưong trình đổi chỗ 2 số nguyên a và b.
```c++
#include<stdio.h>
void doicho(int a,int b){
    int temp;
    a=temp;
    a=b;
    b=temp;
    return ;// do kiểu trả về là void lên chỉ cần return ;
}
int main(){
  int a,b;
  a=5;
  b=10;
  doicho(a,b);
  printf("%d\n%d",a,b);
}
```
### Kết quả
```c++
5
10
```

**Tại sao giá trị a b vẫn không đổi chỗ cho nhau ?**.

Tạm thời chúng ta chỉ cần hiểu:

* Muốn thay đổi giá trị của biến truyền vào ta cần thêm kí tự **&** truớc biến khi định nghĩa hàm.

### Chưong trình sau khi sửa:
```c++
#include<stdio.h>
void doicho(int &a,int &b){
    int temp;
    a=temp;
    a=b;
    b=temp;
    return ;// do kiểu trả về là void lên chỉ cần return ;
}
int main(){
  int a,b;
  a=5;
  b=10;
  doicho(a,b);
  printf("%d\n%d",a,b);
}
```
### Kết quả
```c++
10
5
```
### Đệ Quy trong hàm.




