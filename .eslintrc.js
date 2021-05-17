module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['alloy', 'alloy/vue'],
  rules: {
    // 指令和样式属性可以重复
    'vue/no-duplicate-attributes': [
      'error',
      {
        allowCoexistClass: true,
        allowCoexistStyle: true,
      },
    ],
  },
};
