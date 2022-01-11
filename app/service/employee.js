'use strict';

const Service = require('egg').Service;
const md5 = require('md5');

class EmployeeIService extends Service {
  // 查询用户
  async employeeIndex() {
    const res = await this.app.mysql.select('user');
    const data = [];
    for (const o of res) {
      data.push({ userName: o.user_name, gender: o.gender, email: o.email, phone: o.phone });
    }
    return data;
  }
  // 新增用户
  async employeeAdd(queryName, queryPass, email, gender, phone) {
    const queryUserName = await this.app.mysql.get('user', {
      user_name: queryName,
    });
    const returnData = {
      user_name: queryName,
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
  // 编辑用户
  async employeeUpdate(id, queryName, queryPass, email, gender, phone) {
    const returnData = {
      id,
      user_name: queryName,
      password: md5(queryPass),
      phone,
      email,
      gender,
    };
    const result = await this.app.mysql.update('user', returnData);
    console.log('result', result);
    const updateSuccess = result.affectedRows === 1;
    if (updateSuccess) {
      return {
        code: 1,
        msg: '更新成功',
        state: 'success',
      };
    }
    return {
      code: 0,
      msg: '更新失败',
      state: 'false',
    };


  }
}

module.exports = EmployeeIService;
