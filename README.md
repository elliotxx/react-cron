# antcloud-react-crons
基于 chensongtao/react-cron 进行改造。

改造内容：
1. 去掉 秒，兼容 Unix Cron


## Usage
    

```sh

demo:https://chensongtao.github.io/react-cron/src-index

组件依赖
    "react": "16.x",
    "antd": "^3.20.1",
    "classnames": "^2.2.6",



style依赖
    less 引入 @import '~antd/dist/antd.less' 或者
    js 引入 import 'antd/dist/antd.less'



yarn add antcloud-react-crons   npm install antcloud-react-crons --save


import {Cron, InputCron} from 'antcloud-react-crons'



Cron
    onChange
    value
    style // 内容的style
    className
    lang // 支持zh_CN/zh-CN/zh-Hans-CN/en_US/en-US
    type={['minute', 'hour', 'day', 'month', 'week']}


InputCron
    onChange
    value
    style // 内容的style
    width // input 的宽度
    lang // 支持zh_CN/zh-CN/zh-Hans-CN/en_US/en-US
    type={['minute', 'hour', 'day', 'month', 'week']}

```

## 1.带Input and Dropdown的cron表达式
```sh
<InputCron 
    onChange 
    value
    style={{ width: 576 }}
    lang='zh_CN'
    type={['minute', 'hour', 'day', 'month', 'week']}
/>
```
## 2.cron表达式
```sh
<Cron 
    onChange 
    value
    className
    style={{ width: 576 }}
    lang='zh_CN'
    type={['minute', 'hour', 'day', 'month', 'week']}
/>
```
## LICENSE

MIT
