'use strict';

const Controller = require('egg').Controller;

class EmployeeController extends Controller {

  // 查询员工列表
  async employeeIndex() {
    const ctx = this.ctx;

    ctx.body = await ctx.service.employee.employeeIndex();

  }
  // 新增
  async add() {
    const ctx = this.ctx;
    const { userName, password, email, gender, phone } = ctx.request.body;
    ctx.body = await ctx.service.employee.employeeAdd(userName, password, email, gender, phone);

  }
  //   // 删除
  async delete() {
    const ctx = this.ctx;
    const { id } = ctx.request.body;
    ctx.body = await ctx.service.employee.employeeDelete(id);

  }
  // 编辑
  async update() {
    const ctx = this.ctx;
    const { id, userName, email, gender, phone } = ctx.request.body;

    ctx.body = await ctx.service.employee.employeeUpdate(id, userName, email, gender, phone);

  }


}

module.exports = EmployeeController;
