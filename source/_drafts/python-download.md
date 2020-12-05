```python
import requests
from tqdm import tqdm
from urllib.request import urlopen
from urllib import parse

def download(url, filename):
    """
    @param: url to download file
    @param: dst place to put the file
    :return: bool
    """
    # 获取文件长度
    try:
        file_size = int(urlopen(url).info().get('Content-Length', -1))
    except Exception as e:
        # print(f"请求异常:e")
        return False

    # 判断文件是否已经存在
    if os.path.exists(filename):
        # 获取文件大小
        start = os.path.getsize(filename)
    else:
        # 初始大小为0
        start = 0

    # 判断大小一致，表示本地文件存在
    if start >= file_size:
        print("文件已经存在 无需重复下载")
        return file_size

    header = {"Range": "bytes=%s-%s" %
              (start, file_size), "User-Agent": 'Mozila 5.0'}
    config = {
        'unit': 'B',
        'total': file_size,
        'initial': start,
        'unit_scale': True,
        'desc': f"{filename}:"
    }

    progress_bar = tqdm(**config)

    # 开始下载
    req = requests.get(url, headers=header, stream=True)
    try:
        with(open(filename, 'ab')) as f:
            for chunk in req.iter_content(chunk_size=1024):
                if chunk:
                    f.write(chunk)
                    progress_bar.update(1024)
    except Exception as e:
        print(e)
        return False

    progress_bar.close()
    return True

kana_d = {
    'a': ['あ', 'ア'],'i': ['い', 'イ'],'u': ['う', 'ウ'],'e': ['え', 'エ'],'o': ['お', 'オ'],
    'ka': ['か', 'カ'],'ki': ['き', 'キ'],'ku': ['く', 'ク'],'ke': ['け', 'ケ'],'ko': ['こ', 'コ'],
    'sa': ['さ', 'サ'],'si': ['し', 'シ'],'su': ['す', 'ス'],'se': ['せ', 'セ'],'so': ['そ', 'ソ'],
    'ta': ['た', 'タ'],'ti': ['ち', 'チ'],'tu': ['つ', 'ツ'],'te': ['て', 'テ'],'to': ['と', 'ト'],
    'na': ['な', 'ナ'],'ni': ['に', 'ニ'],'nu': ['ぬ', 'ヌ'],'ne': ['ね', 'ネ'],'no': ['の', 'ノ'],
    'ha': ['は', 'ハ'],'hi': ['ひ', 'ヒ'],'hu': ['ふ', 'フ'],'he': ['へ', 'ヘ'],'ho': ['ほ', 'ホ'],
    'ma': ['ま', 'マ'],'mi': ['み', 'ミ'],'mu': ['む', 'ム'],'me': ['め', 'メ'],'mo': ['も', 'モ'],
    'ra': ['ら', 'ラ'],'ri': ['り', 'リ'],'ru': ['る', 'ル'],'re': ['れ', 'レ'],'ro': ['ろ', 'ロ'],
    'ya': ['や', 'ヤ'],'yu': ['ゆ', 'ユ'],'yo': ['よ', 'ヨ'],'wa': ['わ', 'ワ'],'wo': ['を', 'ヲ'],
    'n': ['ん', 'ン']
}

for i, j in kana_d.items():
    baseUrl = 'http://res.hjfile.cn/pt/m/jp/50yin/audio'
    url = f"{baseUrl}/{parse.quote(j[0])}.mp3"
    print(url)
    download(url, f"{i}.mp3")
```
