module.exports = {
    "hooks": {
        "pre-commit": "commitlint --edit $HUSKY_GIT_PARAMS", // 提交的时候 进行eslint检查
    }
}