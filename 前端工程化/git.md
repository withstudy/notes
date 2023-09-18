## git

[常用命令](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

* 撤回commit

```
git reset --soft HAED~1
```

> --soft
> 不删除工作空间的改动代码 ，撤销commit，不撤销git add file
>
> --hard
> 删除工作空间的改动代码，撤销commit且撤销add

