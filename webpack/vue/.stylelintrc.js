module.exports = {
    plugins: ['stylelint-prettier', 'stylelint-less'],
    extends: [
        'stylelint-config-standard',
        'stylelint-config-recess-order',
        'stylelint-prettier/recommended'
    ],
    overrides: [
        {
            files: [`**/*.{vue,html}`],
            customSyntax: 'postcss-html'
        }
    ],
    // 配置 rules
    rules: {
        // 开启 Prettier 自动格式化功能
        'prettier/prettier': true
    }
}
