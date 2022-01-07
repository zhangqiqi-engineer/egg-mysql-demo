'use strict';

const Controller = require('egg').Controller;

class RegisterController extends Controller {

  // 注册
  async registerIndex() {
    const ctx = this.ctx;
    const queryName = ctx.request.body.userName ? ctx.request.body.userName : 'zhangqi';
    const queryPass = ctx.request.body.password ? ctx.request.body.password : '123456';
    const queryEmail = ctx.request.body.email ? ctx.request.body.email : 'zhangqi';
    const queryGender = ctx.request.body.password ? ctx.request.body.gender : '123456';
    const queryPhone = ctx.request.body.phone ? ctx.request.body.phone : '123456';

    ctx.body = await ctx.service.register.registerIndex(queryName, queryPass, queryPhone, queryEmail, queryGender);

  }


  // 登陆
  async loginIndex() {
    const ctx = this.ctx;
    const queryUserName = ctx.request.body.userName ? ctx.request.body.userName : 'zhangqi';
    const queryPass = ctx.request.body.password ? ctx.request.body.password : '123456';
    ctx.body = await ctx.service.register.loginIndex(queryUserName, queryPass);
  }


}

module.exports = RegisterController;
