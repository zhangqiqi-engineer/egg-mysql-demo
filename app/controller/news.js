'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const dataList = {
      list: [
        { id: 1, title: 'this is news 1', url: '/news/1', time: '1280977330748' },
        { id: 2, title: 'this is news 2', url: '/news/2', time: '1280977330748' },
      ],
    };

    // const ctx = this.ctx;
    // const page = ctx.query.page || 1;
    // const newsList = await ctx.service.news.list(page);
    await this.ctx.render('news/list.tpl', dataList);
  }
}

module.exports = NewsController;

