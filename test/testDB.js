const moment = require('moment')
moment().format()
const fs = require('fs')
const path = require('path')

let m = async () => {
  const mongoose = require('mongoose')
  mongoose.Promise = global.Promise
  mongoose.connect('mongodb://zhongq26:QAZwsx26..@ds135433.mlab.com:35433/chihuo', {useMongoClient: true})
  mongoose.connection.on('error', console.log.bind(console, '连接mongoDb数据库错误'))
  await mongoose.connection.on('open', console.log.bind(console, '连接数据库成功'))

  // 加载models
  require('../app/models/admin')
  require('../app/models/dish_comment')
  require('../app/models/dish_type')
  require('../app/models/user')
  require('../app/models/shop_apply')
  require('../app/models/shop_order')
  require('../app/models/shop_type')
  require('../app/models/shop')
  require('../app/models/user_order')
  require('../app/models/menu')

  // 添加商铺申请
  const ShopApply = mongoose.model('ShopApply')
  let file = path.join(__dirname, '../db_vue/menumodels.json');
  fs.readFileSync(file, 'utf-8', function(err, data) {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
      // data.forEach(function(item,index){
      //   ShopApply.create(item)
      //   ShopApply.find({}).exec((err, shops) => {
      //     if (err) console.log(err)
      //     console.log(shops)
      //   })
      // })
    }
  });

}

m()