module.exports = {
    "hooks": {
        "pre-commit": "commitlint --edit $1", // 提交的时候 进行eslint检查
    }
}