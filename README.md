# 项目基本配置

## commit相关

### 配置husky
使用git hook 完成相关配置
- pre-commit  配置在commit之间的处理 如lint-staged
- commit-msg 配置 commitlint 输出内容
Husky 版本大于4后 无法在package里配置相关内容
- npx husky install
- npx husky-init
- npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
- npx husky add .husky/pre-commit "npx --no-install lint-staged"
### 配置 lint-staged
Lint-staged > 13.0.0 版本mac报错，安装的是lint-staged@12
```json
"lint-staged": {
    "*.{js,ts,tsx.css,md}": "prettier --write ."
 }
```
### 配置 .prettierrc
```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth":4,
  "printWidth": 100,
  "proseWrap": "never",
  "arrowParens": "avoid",
  "overrides": [
    {
      "files": ".prettierrc",
      "options": {
        "parser": "json"
      }
    }
  ]
}
```
### 配置commitlint.config.js
```javascript
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'upd',
                'feat',
                'fix',
                'refactor',
                'docs',
                'chore',
                'style',
                'revert',
            ],
        ],
        'type-case': [0],
        'type-empty': [0],
        'scope-empty': [0],
        'scope-case': [0],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never'],
        'header-max-length': [0, 'always', 72],
    },
};
```
### 配置 commitizen、cz-customizable
package.js
```json
{
    "config":{
        "commitizen":{
            "path":"node_modules/cz-customizable"
        }
    }
}
```
.cz-config.js
```javascript
module.exports = {
  //可选类型
  types: [
    { value: 'feat', name: 'feat:   新功能' },
    { value: 'fix', name: 'fix:   修复' },
    { value: 'docs', name: 'docs:   文档变更' },
    { value: 'style', name: 'style:   代码格式(不影响代码运行的变动)' },
    {
      value: 'refactor',
      name: 'refactor:重构(既不是增加feature)，也不是修复bug'
    },
    { value: 'perf', name: 'perf:   性能优化' },
    { value: 'test', name: 'test:   增加测试' },
    { value: 'chore', name: 'chore:   构建过程或辅助功能的变动' },
    { value: 'revert', name: 'revert:   回退' },
    { value: 'build', name: 'build:   打包' },
    { value: 'revert', name: 'revert:   回退' }
  ],
  //消息步骤
  messages: {
    type: '请选择提交类型',
    customScope: '请输入修改范围(可选)',
    subject: '请简要描述提交(必填)',
    body: '请输入详细描述(可选)',
    footer: '请输入要关闭的issue(可选)',
    confirmCommit: '确认以上信息提交?(y/n)'
  },
  // 允许自定义范围
  allowCustomScopes:true,
  //跳过问题
  skipQuestion: ['body', 'footer', 'breaking'],
  //subject文字长度默认是
  subjectLimit: 100
}
```
防止配置全局的commitzen (git cz)，可以通过husky 配置 prepare-commit-msg的hook，
`npx husky add .husky/prepare-commit-msg "exec < /dev/tty && node_modules/.bin/cz --hook || true"`

### 配置 conventional-changelog-cli 
打印commit 日志
- 安装conventional-changelog-cli  npm install -D conventional-changelog-cli
- 配置scripts  
  - `"changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"`
- npm run changelog
相关指令
- `conventional-changelog -p angular -i CHANGELOG.md -s`
  以上命令中参数-p angular用来指定使用的 commit message 标准，假如想使用atom的标准，则是：
  `conventional-changelog -p atom -i CHANGELOG.md -s`
  参数-i CHANGELOG.md表示从 CHANGELOG.md 读取 changelog, -s 表示读写 changelog 为同一文件。需要注意的是，上面这条命令产生的 changelog 是基于上次 tag 版本之后的变更（Feature、Fix、Breaking Changes等等）所产生的，所以如果你想生成之前所有 commit 信息产生的 changelog 则需要使用这条命令：
  `conventional-changelog -p angular -i CHANGELOG.md -s -r 0`
  其中 -r 表示生成 changelog 所需要使用的 release 版本数量，默认为1，全部则是0。

## 代码质量检测
### 配置 eslint
- 安装eslint
- npx eslint --init 选择对应的  （运行场景选择 browser、node）
- 在scripts中新增"lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix",          npm run lint 测试是否配置可以
- 用 eslint-config-prettier 提供的规则集来覆盖掉eslint冲突的规则，并用eslint-plugin-prettier来使eslint使用prettier的规则来美化代码。
- 在lint-staged中配置eslint校验
