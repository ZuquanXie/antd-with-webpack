<h2 align="center">Antd with webpack</h2>

使用webpack作为构建工具，搭建基于[antd](https://github.com/ant-design/ant-design) UI框架的[React](https://github.com/facebook/react)项目

<h3 align="left">开发</h3>

```bash
npm start
```

通过浏览器访问http://localhost:3000

<h3 align="left">发布</h3>

```bash
npm run build
```

<h3 align="left">其他</h3>
热更新：默认启用了热更新
Less全局变量：由config目录下的less.js定义（主要用于重置antd的全局变量）
本地Node服务：由local-service目录下index.js定义（用于开发模式下的前端数据模拟）
