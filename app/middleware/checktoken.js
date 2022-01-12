'use strict';

function checktoken() {
  return async function(ctx, next) {
    try {
      // 获取token
      const token = ctx.request.header.authorization.split(' ')[1];
      // 校验token
      const decode = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
      if (decode.queryUserName) {
        await next();
      } else {
        ctx.body = {
          code: 0,
          msg: '用户校验失败',
        };
      }
    } catch (e) {
      ctx.body = {
        code: 301,
        msg: 'token未通过验证',
      };
    }

  };
}

module.exports = checktoken;
