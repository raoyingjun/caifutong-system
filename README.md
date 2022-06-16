## 目录

[TOC]

## 项目介绍

xx系统
```
现网环境  https://xxx   （登录方式、账号、密码）
开发环境  https://xxx   （登录方式、账号、密码）
测试环境  https://xxx   （登录方式、账号、密码）
```

## 快速上手

### 1. 安装依赖

```
npm install
```

### 2. 本地开发

```
npm run serve
```

### 3. 代码构建

```
npm run build
```

### 4. 代码规范&修复

```
npm run lint # eslint校验
npm run lint-fix # eslint修复
npm run stylelint # stylelint校验
npm run stylelint-fix # stylelint修复
```

### 5. Git Hooks
- pre-commit：提交代码前的代码规范检查
- commit-msg：Commit 时对 Commit Message 进行规范约束

## 常见问题 

**Q: 代码规范详细配置说明**

公司代码规范：https://git.woa.com/standards/javascript/tree/master

**Q: commit message 说明**

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests or correcting existing tests
- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- chore: Other changes that don't modify src or test files
- revert: Reverts a previous commit

可以安装 git cz 工具来引导填写 Commit Message（基于 node_modules，无法预装）

```
npm install commitizen -g
```

```
commitizen init cz-conventional-changelog --dev --exact
```
比如：
- feat: 新增直播间模块
- fix: 修复滚动卡顿的问题

## 行为准则

- 代码一定要所有规则校验通过后才能提交，不允许绕开校验
- 命名规范
```
    整体格式化规范
        --主目录下有.eslintrc.js，即编码格式化规范
    
    文件夹命名规范
        --为小写字母的单词（尽量为名词），多层次可嵌套，如school、school/teacher
    
    文件命名规范
        --都为短横线(kebab-case)形式，包括公共组件component和页面view，如top-menu.vue
    
    方法和变量命名规范
        --都为camelCase（首字母小写）形式，如getUserInfo()，userId
```


## 如何加入

待补充

## 团队介绍

团队：TEG技术工程事业群/企业IT部/职能系统开发中心/公共策略开发组
成员：@adairyan

## 其他

### 主要技术栈

vue3

### UI 组件库

Element Plus：https://element-plus.gitee.io/zh-CN/guide/installation.html

### 前端监控

TAM：https://tam.woa.com/