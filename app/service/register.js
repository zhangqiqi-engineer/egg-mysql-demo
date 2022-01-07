'use strict';

const Service = require('egg').Service;
const md5 = require('md5');


class RegisterService extends Service {

  // 注册
  async registerIndex(queryName, queryPass, phone, email, gender) {
    const queryUserName = await this.app.mysql.get('user', {
      userName: queryName,
    });
    const returnData = {
      userName: queryName,
      password: md5(queryPass),
      phone,
      email,
      gender,
    };
    if (!queryUserName) {
      const result = await this.app.mysql.insert('user', returnData);
      console.log(result);
      return {
        code: 1,
        msg: '新增一条数据成功',
        state: 'success',
      };
    }
    return {
      code: 0,
      msg: '该用户名已注册',
      state: 'false',
    };

  }

  // 登陆
  async loginIndex(queryName, queryPass) {
    const ctx = this.ctx;
    const returnData = {};
    const existUser = await this.getUserByName(queryName);
    if (!existUser) {
      return {
        code: 0,
        msg: '用户不存在',
        state: 'false',
      };
    } // 用户不存在
    const checkPasswordResult = this.checkPassword(existUser, queryPass);
    if (!checkPasswordResult) {
      return {
        code: 0,
        msg: '密码错误',
        state: 'false',
      };// 密码错误
    }
    console.log('existUser', existUser);
    if (existUser.status === 0) {
      returnData.message = existUser.status;
      return returnData;
    } else if (existUser.status === 1) {
      returnData.message = existUser.status;
      ctx.session.user_id = existUser.user_id;
      return returnData;
    } else if (existUser.status === 2) {
      returnData.message = existUser.status;
      return returnData;
    }
    return {
      code: 1,
      msg: '登陆成功',
      state: 'success',
    };// 成功


  }

  async getUserByName(userName) {
    const user = await this.app.mysql.get('user', {
      userName,
    });
    return user;
  }

  async checkPassword(userInfo, userSubmitPassword) {
    const dbPassword = userInfo.password;
    const md5 = require('md5');
    return dbPassword === md5(userSubmitPassword);
  }

}
module.exports = RegisterService;
