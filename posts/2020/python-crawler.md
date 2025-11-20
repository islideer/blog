---
layout: 'post'
title: '记一次使用 Python 爬取 B 站 up 主信息经历'
date: 2020-11-29
quicklink: true
top_image: 'https://i.loli.net/2020/11/29/esjylJK4a256W3L.png'
excerpt: '非常简单的一个 Python 爬虫程序爬取 B 站 up 主的粉丝数和 up 主的 id，仅用于学习'
---


## 需求

尽可能获取 B 站美食博主列表 按照粉丝数排序 最终目的是能找出粉丝数前列 up 主的 id 名

## 思路

- 将几个包含很多美食区视频的网页的 url 存起来
- 通过请求 url 拿到尽可能多的投稿视频的链接
- 通过视频链接拿到 up 主的主页链接 并分析出 up 主的 uid
- 通过 uid 请求信息接口 拿到 up 主的 id 以及粉丝数

## 用到的库及其作用

`csv` : 读写 csv 文件
`json` : 读写 json 文件
`time` : 进行延时操作
`random` : 随机数功能实现
`codecs` : 打开文件 (解决中文写入文件后乱码问题)
`requests` : 请求库
`selenium` : 模拟浏览器
`UserAgent` : 随机 UA 库
`threading` : 多线程库
`BeautifulSoup` : 解析 HTML 与 XML 的库

## 遇到的问题以及解决方案

### 拿不到 html 结构

可能是因为**没有设置 UA** 服务器无法确认请求是否由用户发出

提前设置好请求头 UA(浏览器标识), **伪装成浏览器, 模拟用户正常请求**, 防止 ip 被 ban ~~如果已经被 ban 那就算啦~~

这里可以自己设置 UA 为指定浏览器标识 也可以用库来随机生成

这里**建议使用 `fake_useragent` 库来随机生成 UA 标识**

安装 `fake_useragent`:

```bash
pip insatll fake_useragent
```

使用:

```py
from fake_useragent import UserAgent
UA = UserAgent().random
headers = {'User-Agent': UA}
```

### 拿到的 html 结构不完整

可能是因为**网页动态加载**的(拿到网页并用浏览器解析之后还需要 js 来动态更新网页内容), 导致拿到的网页的 html 结构残缺, 拿不到想要的数据

可以**使用 `Selenium` 库来模拟浏览器爬虫** 这样他会**等到网页加载完全**再拿出网页的 html

安装 `Selenium`:

```bash
pip install selenium
```

下载你使用的对应版本的浏览器驱动:

- Firefox: [geckodriver](https://github.com/mozilla/geckodriver/releases)
- Chrome: [chromedriver](https://npm.taobao.org/mirrors/chromedriver)
- IE: [IEDriverServer](http://selenium-release.storage.googleapis.com/index.html)
- Edge: [MicrosoftWebDriver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver)
- Opera: [operadriver](https://github.com/operasoftware/operachromiumdriver/releases)
- PhantomJS: [phantomjs](http://phantomjs.org/)

使用:

```py
# driver = webdriver.Firefox()   # Firefox浏览器
# driver = webdriver.Chrome()    # Chrome浏览器
# driver = webdriver.Ie()        # Internet Explorer浏览器
# driver = webdriver.Edge()      # Edge浏览器
# driver = webdriver.Opera()     # Opera浏览器
# driver = webdriver.PhantomJS() # PhantomJS

# 这里使用对应的浏览器标识创建实例
browser = webdriver.Chrome()
browser.get(web)
# html 即为拿到的网页html结构字符串
html = browser.page_source
```

### 无法永久保存且不会乱码的数据

我太菜了 不会使数据库 所以只能存本地了 为了数据后续处理的方便 这里**使用了 `csv` 文件格式存数据**

同时使用了 `codecs` 打开文件来防止乱码

`csv` 格式文件很简单 Excel 也能打开并处理

Python 里有 `csv` 库来读写 `csv` 格式文件

安装 `csv` 及 `codecs` 库:

```bash
pip install csv codecs
```

使用:

```py
filename = "data.csv"
# ab 为追加 wb 为覆盖  更详细的内容自行搜索
csv_file = codecs.open(filename, 'ab', "gbk")
# 打开实例
csv_writer = csv.writer(csv_file)
# 写入表头
csv_writer.writerow(("第一项","第二项"))
info = (1,2)
infos = [(1, 2), (3, 4)]
# 写入一行数据
csv_writer.writerow(info)
# 写入多行数据
csv_writer.writerow(infos)
```

### 返回的数据是 json 格式

使用 `json` 库处理

安装 `json` 库:

```bash
pip install json
```

使用:

```py
import json
jsonData  = '{"name": "Viki"}'
# json字符串转为Python的字典(或者其他数据)
data = json.load(jsonData)
print(data['name']) # Viki
# Python的字典(或者其他数据)转为json字符串
jsonStr = json.dumps(data)
print(jsonStr) '{"name": "Viki"}'
```

### 爬取速度太慢

使用 `threading` 库实现**多线程**

安装 `threading`:

```bash
pip install threading
```

使用:

```py
lst = [123, 456, 789]
def double(n):
    return n*n
for n in lst:
    double_thread = threading.Thread(target=double, args=(n))
    double_thread.start()
```

## 代码实现

```py
import csv
import json
import time
import random
import codecs
import urllib
import requests
import threading
from bs4 import BeautifulSoup
from selenium import webdriver
from fake_useragent import UserAgent

biliFoodUrls = [
    'https://www.bilibili.com/v/food',
    'https://www.bilibili.com/v/food/make',
    'https://www.bilibili.com/v/food/rural',
    'https://www.bilibili.com/v/food/record',
    'https://www.bilibili.com/v/food/detective',
    'https://www.bilibili.com/v/food/measurement',
    'https://www.bilibili.com/v/popular/rank/food'
]


def grabVideoUrl(url, videoUrls, upUrls, upUids, upInfos, browser):
    if not url:
        return
    if url[0] == '/':
        url = 'https:'+url
    if 'bilibili.com/video' in url:
        videoUrls.append(url)
        print(f'捕获到视频url:\t{url}')
    elif 'space.bilibili.com' in url:
        upUrls.append(url)
        print(f'捕获到up主url:\t{url}')


def getVideosUrl(videoUrls, upUrls, upUids, upInfos, browser):
    for web in biliFoodUrls:
        print(f"开始处理页面:\t{web}")
        browser.get(web)
        html = browser.page_source
        webBf = BeautifulSoup(html, 'html.parser')
        al = webBf.find_all("a")
        for a in al:
            url = a.get('href')
            args = (url, videoUrls, upUrls, upUids, upInfos, browser)
            video_thread = threading.Thread(target=grabVideoUrl, args=args)
            video_thread.start()


def grabUpsUrl(videoUrl, videoUrls, upUrls, upUids, upInfos, browser):
    print(f"开始处理视频url:\t{videoUrl}")
    headers = {
        'User-Agent': UserAgent().random,
        'Upgrade-Insecure-Requests': '1',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, sdch, br',
        'Accept-Language': 'zh-CN,zh;q=0.8',
    }
    html = requests.request('GET', videoUrl, headers=headers).content
    webBf = BeautifulSoup(html, "html.parser")
    upDiv = webBf.find(id='v_upinfo')
    if not upDiv:
        print(f"获取视频up主信息遭到拦截\t{videoUrl}")
        return
    upUrl = upDiv.find_all('a')[0].get('href')
    if upUrl[0] == '/':
        upUrl = 'https:' + upUrl
    upUrls.append(upUrl)
    print(f'捕获到up主url:\t{upUrl}')


def getUpsUrl(videoUrls, upUrls, upUids, upInfos, browser):
    for videoUrl in videoUrls:
        args = (videoUrl, videoUrls, upUrls, upUids, upInfos, browser)
        upUrl_thread = threading.Thread(target=grabUpsUrl, args=args)
        upUrl_thread.start()


def getUpsId(videoUrls, upUrls, upUids, upInfos, browser):
    for upUrl in upUrls:
        if not upUrl:
            continue
        upUid = upUrl.split("#")[0].split('/')[-1]
        upUids.append(upUid)
        print(f'捕获到up主id:\t{upUid}')


def getUpsInfo(videoUrls, upUrls, upUids, upInfos, browser):
    api = 'https://api.bilibili.com/x/web-interface/card?jsonp=jsonp&mid='
    ids = set(upUids)
    upUids = list(ids)

    for index, upUid in enumerate(upUids):

        print(f"开始处理mid:{upUid}\t进度:{index+1}/{len(upUids)}")

        headers = {
            'User-Agent': UserAgent().random,
            'Upgrade-Insecure-Requests': '1',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, sdch, br',
            'Accept-Language': 'zh-CN,zh;q=0.8',
        }

        res = requests.request('GET', f"{api}{upUid}", headers=headers)
        data = res.json()['data']
        n = 0

        while((not data) and n < 100):
            print(f"请求遭到服务器拦截  重试第{n+1}次中...\t总进度:{index+1}/{len(upUids)}")
            headers = {
                'User-Agent': UserAgent().random,
                'Upgrade-Insecure-Requests': '1',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate, sdch, br',
                'Accept-Language': 'zh-CN,zh;q=0.8',
            }
            res = requests.request('GET', f"{api}{upUid}", headers=headers)
            n += 1
            data = res.json()['data']

        if n == 100:
            continue

        print(f"读取up主信息(mid={upUid})成功")

        # if not data:
        #     print(f"读取up主信息(mid={upUid})的请求遭到服务器拦截")
        #     continue

        upName = data['card']['name']
        follower = data['follower']
        mid = data['card']['mid']
        upInfos.append({'id': upName, 'follower': follower, 'mid': mid})

    upInfos = sorted(upInfos, key=lambda upInfo: upInfo['follower'])

    print("写入Excel文件中...")
    filename = "bili.csv"
    bili_csv = codecs.open(filename, 'ab', "gbk")
    bili_csv_writer = csv.writer(bili_csv)

    for upInfo in upInfos:
        msg = f"写入中\tUp主id:{upInfo['id']}\t粉丝数:{upInfo['follower']}\tmid={upInfo['mid']}"
        print(msg)

        info = (upInfo['id'], upInfo['follower'], upInfo['mid'])
        try:
            bili_csv_writer.writerow(info)
        except:
            continue

    bili_csv.close()

    print(f"写入到{filename}完成  本次共爬取到{len(upInfos)}个up主信息")


def main(browser):
    videoUrls = []
    upUrls = []
    upUids = []
    upInfos = []
    getVideosUrl(videoUrls, upUrls, upUids, upInfos, browser)
    getUpsUrl(videoUrls, upUrls, upUids, upInfos, browser)
    time.sleep(20)
    getUpsId(videoUrls, upUrls, upUids, upInfos, browser)
    getUpsInfo(videoUrls, upUrls, upUids, upInfos, browser)


if __name__ == '__main__':
    browser = webdriver.Chrome()
    for i in range(100):
        print(f"开始第{i+1}次爬取...")
        main(browser)
    browser.close()

```

### 参考

[Selenium Python 教程 - 知乎](https://zhuanlan.zhihu.com/p/111859925)
