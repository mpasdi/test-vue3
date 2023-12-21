/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true // 解决 defineProps 等 未引入的报错
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
        vueIndentScriptAndStyle: true
      }
    ],
    '@typescript-eslint/no-explicit-any': ['off'], // 关闭any警告
    '@typescript-eslint/no-var-requires': 0, //设置的0 ，没有使用引用报错
    // 有没有使用的变量
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }
    ]
  }
}
