---
layout: post
title: 每一个前端都应该了解的常见 Linux 命令
date: 2023-02-14
excerpt: 什么？你连基本的 Linux 操作还不会？要不我们重开吧。
---

~~都情人节了（今天 2/14），让我看看是谁还赖在电脑前啊？哦，原来是我，那没事了（~~

学习一些常用的 Linux 命令有助于提高我们的工作效率。哪怕是作为一个前端，也应该有所了解。

> 另外，由于 MacOS 是基于 Unix 的，以下列出的命令在 MacOS 上也能正常使用。

## 一、基础篇

### 1. cd

全称 change directory，意为切换目录，用于切换当前工作目录。

```bash
# 切换到用户根目录，如 /root 或 /home/viki 等
cd ~ # 或者不带任何参数 cd

# 可使用绝对路径或者相对路径
cd ./src

# 切换到上一个工作目录
cd -

# 切换到父目录
cd ..
```

### 2. ls

全称 list，意为罗列，用于列出出当前工作目录下的文件和子目录。

```bash
# 查看当前工作路径下的文件和子目录
ls

# 包括隐藏文件（-a），并列出详细信息（-l）
ls -al

# 按文件大小排序（-S），-t 时间顺序，-X 扩展名字母升序
ls -alS
```

### 3. rm

全称 remove，意为“删除”，用于删除文件或目录。

```bash
# 安全删除一个或多个文件或目录（带有提示）
rm -ri temp1 temp2 temp3

# 强制删除一个或多个文件或目录，慎用
rm -rf temp1 temp2 temp3

# 通过 glob 模式匹配删除多个指定文件，可用 ls 命令事先确认
rm *.txt
rm *.{png,jp{,e}g}
rm src/**/*.d.ts
```

> 关于 glob 模式匹配，参考[这篇文章](https://github.com/whinc/whinc.github.io/issues/18)。

### 4. cp

全称 copy，意为“复制”，用于复制文件或目录。

```bash
# 拷贝文件
cp file1.txt file2.txt
# 拷贝目录（-r 意为递归）
cp -r temp temp2
```

### 5. mv

全称 move，意为“移动”，常用于移动或重命名文件或目录。

```bash
# 移动文件，将所有 jpg 文件移动到 images 目录
mv *.jpg images
# 重命名文件
mv file1.txt file2.txt
```

### 6. mkdir

全称 make directory，新建目录。

```bash
# 创建目录
mkdir temp

# 创建多个目录
mkdir temp temp2 temp3

# 递归创建（当中间的目录路径不存在时不会报错，会自动创建）
mkdir -p temp/src/images
```

### 7. cat

全称 concatenate，意为“连接”，它可以读取、创建和合并文件，并将其内容写入到标准输出。

```bash
# 查看文件内容，-n 显示行号，-s 合并空行，如下输出当前的 Linux 发行版的名称
cat -ns /etc/issue

# 创建文件，执行完命令后，继续输入文件内容，Ctrl/Command + D 保存
cat > file.txt

# 重定向文件内容
cat file1.txt > file2.txt # 文件存在则覆盖
cat file1.txt >> file2.txt # 文件存在则追加

# 合并文件
cat demo1.txt demo2.txt > demo.txt
```

### 8. touch

意为“触摸”，用于修改文件或者目录的时间属性，包括存取时间和更改时间。

若文件不存在，系统会建立一个新的文件。所以**常常被用于新建空文件**。

```bash
# 将目标文件的访问和修改时间改为当前时间，不存在则新建空文件
touch demo.txt
```

### 9. pwd

全称 print working directory，意为"打印当前工作目录"。

### 10. sudo

全称 superuser do，意为使用"超级用户执行"（某些命令）。

```bash
# 以超级用户权限执行 apt 命令
sudo apt update
```

### 11. whoami

who am i，意为“我是谁”，查看当前用户的用户名。

### 12. clear

意为“清除”，清空终端输出。

### 13. uptime

意为“正常运行时间”，显示系统已运行了多长时间、当前时间、已登录的用户数以及系统平均负载。

```bash
# 系统启动时长
uptime -p

# 系统启动时间
uptime -s
```

### 14. passwd

全称 password，意为“密码”，此命令用于修改用户密码。

```bash
# 更改当前用户密码
passwd

# 使用超级用户权限更改其他用户密码
sudo passwd viki
```

### 15. date

意为“日期”，格式化查看、设置系统当前日期时间，**查看、转换时间戳**等。

```bash
# 查看系统当前时间
date

# 格式化输出系统时间
date +"%Y/%m/%d %H:%M:%S %A"

# 设置系统当前时间
date --set="20190601 17:30"

# 查看当前时间戳（10位）
date +%s

# 转换目标时间戳（10位）
date -d @1676382887
```

附：同步互联网时间的命令：

```bash
# 安装 ntpdate
sudo apt-get install ntpdate
# 执行时间同步
sudo ntpdate time.windows.com
sudo hwclock --localtime --systohc
```

### 16. top

top 提供了实时的对系统处理器的状态监视，能够实时显示系统中各个进程的资源占用状况，类似于 Windows 的任务管理器。

top 是一个动态显示过程，即可以通过用户按键来不断刷新当前状态。

### 17. history

意为“历史”，用于显示带有行号的整个历史记录列表。

```bash
# 查看近 20 条历史
history -20

# 获取上一条命令（没啥用）
!!

# 当执行某一大串命令时忘记加 sudo 时非常有用
sudo !!
```

### 18. man

全称 manual，意为“手册”，用于查看命令帮助。

```bash
# 查看 curl 的命令帮助
man curl
```

## 二、进阶篇

> 部分工具或命令可能不自带，需要手动安装。

### lsof

全称 list open files，意为列出打开的文件列表，在 Unix 中一切（包括网络套接口）都是文件。

这个命令非常强大，大多数时候用它来从系统获得与网络连接相关的信息。

```bash
# 显示所有网络连接
lsof -i

# 显示所有 ipv6 连接
lsof -i 6

# 显示所有 udp 连接
lsof -i udp

# 查看指定端口相关信息
lsof -i :8000

# 查看指定端口范围相关信息
lsof -i :8000-9000

# 获取占用了指定端口的程序进程的 pid
lsof -t -i :8000

# 列出指定用户打开的所有内容
lsof -u Viki

# 杀死指定用户所做的一切事情
kill -9 `lsof -t -u Viki`

# 查看指定进程 ID 已打开的内容
lsof -p 10075
```

### ping

ping 指令常使用**互联网控制报文协议**（ICMP），向目标主机发出要求回应的信息，来确认目标主机是否运作正常。

常用于：

- 确定网络和各个外部主机的状态。
- 跟踪和隔离硬件与软件问题。
- 测试、评估和管理网络。

```bash
# ping 目标主机，需要手动终止
ping viki.moe

# 指定收发数据包的次数为 6
ping -c 6 viki.moe

# 发送周期为三秒，每次发送 1024 字节
ping -i 3 -s 1024 viki.moe
```

**ping 结果代表的意义**

- byte 数据包大小单位，即字节
- time 响应时间，越小说明速度越快
- icmp_seq 发送的 ICMP 包的序号
- TTL 即 Time to Live，数据包的生存时间

> TTL（Time to Live）是 IP 数据包的生存时间，它的数值是在传输过程中逐渐减少的，每经过一个路由器就会减 1，当 TTL 减为 0 时，该数据包将被丢弃。在 ping 命令中，ttl 表示发送 ICMP 回显请求时，数据包的生存时间。可以通过 ping 命令查看从一台计算机到另一台计算机所经过的路由器的数量，TTL 值会显示每一次经过路由器后的值。

### ssh

### df

### kill

### chmod

### chown

### ps

### tar

### grep

### curl

### wget

### dig

### netstat

### nslookup

### ifconfig

### ip

### gzip

## 参考

- [Arch manual pages](https://man.archlinux.org/)
- [Linux 教程](https://www.myfreax.com/linux-tutorial/)
- [前端应该会的 32 个 Linux 常用命令](https://mp.weixin.qq.com/s/4qBEmiO-ABNPyYxil3EqTg)
