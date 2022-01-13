/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1641367425528_8259';

  // add your middleware config here
  config.middleware = [];
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };
  // config/config.default.js
  // add middleware robot
  config.middleware = [
    'robot',
  ];
  config.security = {
    csrf: {
      ignore: '/api',
    },
  };

  config.jwt = {
    // 加密字符串
    secret: '123456',
    sign: {
      expiresIn: 3600 * 2, // 多少s后过期
      // expiresIn: 10,
    },

  };
  config.session = {
    key: 'SESSION_ID',
    maxAge: 3600 * 2 * 1000, // 毫秒
    renew: true, // 延长会话有效期
  };
  // robot's configurations
  config.robot = {
    ua: [
      /Baiduspider/i,
    ],
  };


  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'zhangqi123',
      // 数据库名
      database: 'test',
      dateStrings: true,
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    onerror: {
      all(err, ctx) {
        ctx.status = 200;
        ctx.body = { status: err.status, message: err.message };
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
