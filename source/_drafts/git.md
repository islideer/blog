## git 常用命令

- 查看远程仓库

```bash
git remote -v
```

- 拉取更改

```bash
git pull
```

- 发布更改

```bash
git push
```

- 软撤销

仅仅撤销上一个 commit 不改动文件

```bash
git reset --soft HEAD^
```

- 硬撤销

撤销 commit 的同时, 删除文件所有改动, 还原到上一个 commit 的状态

```bash
git reset --hard HEAD^
```

如不小心误删了改动 可以先查看撤销记录, 找到要还原的记录的唯一识别码,再还原

```bash
git reflog
git reset --hard 2deae34
```
