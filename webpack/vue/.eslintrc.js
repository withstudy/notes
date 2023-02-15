module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es2021": true,
        "commonjs": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        'plugin:prettier/recommended'
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        'prettier/prettier': [
            'warn',
            {
                endOfLine: 'auto'
            }
        ],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // else之前不允许有return
        'no-else-return': 'off',
        // 禁止出现多个空格
        'no-multi-spaces': 'error',
        'no-unreachable': 'off',
        // 禁止使用var
        'no-var': 'error',
        // 禁止多余的 return 语句
        'no-useless-return': 'warn',
        // 禁止出现未使用过的变量
        'no-unused-vars': 'warn'
    }
}
