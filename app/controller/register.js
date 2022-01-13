'use strict';

const Controller = require('egg').Controller;

class RegisterController extends Controller {

  // 注册
  async registerIndex() {
    const ctx = this.ctx;
    const queryName = ctx.request.body.userName ? ctx.request.body.userName : 'zhangqi';
    const queryPass = ctx.request.body.password ? ctx.request.body.password : '123456';
    const queryEmail = ctx.request.body.email ? ctx.request.body.email : 'zhangqi';
    const queryGender = ctx.request.body.gender ? ctx.request.body.gender : '123456';
    const queryPhone = ctx.request.body.phone ? ctx.request.body.phone : '123456';

    ctx.body = await ctx.service.register.registerIndex(queryName, queryPass, queryPhone, queryEmail, queryGender);

  }


  // 登陆
  async loginIndex() {
    const { ctx, app } = this;
    const queryUserName = ctx.request.body.userName ? ctx.request.body.userName : 'zhangqi';
    const queryPass = ctx.request.body.password ? ctx.request.body.password : '123456';
    // 生成token
    const token = app.jwt.sign({ queryUserName }, app.config.jwt.secret);
    ctx.session.token = token;
    ctx.body = await ctx.service.register.loginIndex(queryUserName, queryPass, token);
  }

  // 更新密码
  async updatePassword() {
    const { ctx } = this;
    const { password, id } = ctx.request.body;
    ctx.body = await ctx.service.register.updatePassword(id, password);

  }

  // 退出登录
  async logOut() {
    const { ctx } = this;
    ctx.session.token = null;
    ctx.body = {
      code: 1,
      msg: '退出成功',
      state: 'success',
    };

  }

}

module.exports = RegisterController;
