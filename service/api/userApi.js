var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');

var conn = mysql.createConnection(models.mysql);

conn.connect(function(err){
    if(err){
        console.log("链接失败");
        console.log(err.code);
    }else{
        console.log("链接成功");
        let sql = $sql.user.create_table;
        conn.query(sql, function(err,result){
            if(err){
              console.log(err.code);
            }else{
              console.log("创建表成功");
            }
        });
        // let sql=$sql.user.delete_table;
        // conn.query(sql,(err,res)=>{
        //   if (err) {
        //     console.log(err.code);
        //   } else {
        //     console.log('delete successfully');
        //     let sql = $sql.user.create_table;
        //     conn.query(sql, function(err,result){
        //         if(err){
        //           console.log(err.code);
        //         }else{
        //           console.log("创建表成功")
        //         }
        //     })
        //   }
        // });
    }
});

var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err');
    } else {
        console.log(ret);
        res.send(ret);
    }
}

var dateStr = function(str) {
    return new Date(str.slice(0,7));
}

router.post('/countUser', (req, res) => {
  let sql = $sql.user.count_user;
  console.log('enter count: $(sql)');
  conn.query(sql, (err,result)=>{
    if (err) {
      console.log(err);
    } else {
      console.log(result[0].num)
      if (result[0].num == 0) {
        res.status(200).json({num:'0'})
        return;
      }
    }
    console.log('err -1')
    res.status(200).json({num:'-1'})
  });
});

router.post('/setupSys', (req, res) => {
    let sql = $sql.user.count_user;
    conn.query(sql, (err,result)=>{
      if (err) {
        console.log(err)
      } else if (result[0].num == 0) {
        console.log('sys admin num: ',result[0].num);
        let sql = $sql.user.add;
        let params = req.body;
        console.log(params);
        console.log(params.birth);
        conn.query(sql, [params.name, params.account, params.pass, params.checkPass,
                        params.email, params.phone, params.card, dateStr(params.birth), params.sex, params.auth], function(err, result) {
            if (err) {
                console.log(err);
            }
            if (result) {
                jsonWrite(res, result);
            }
        });
      }
    });
});

// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    console.log(params.birth);
    conn.query(sql, [params.name, params.account, params.pass, params.checkPass,
                    params.email, params.phone, params.card, dateStr(params.birth), params.sex], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//查找用户接口
router.post('/login', (req, res) => {
    var sql_name = $sql.user.select_name;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
    var keywords = JSON.parse(Object.keys(params)[0]);
    if (keywords.name) {
        sql_name += " where username ='"+ keywords.name +"'";
        console.log(sql_name);
    }
    conn.query(sql_name, keywords.name, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            var resultArray = result[0];
            console.log(resultArray);
            console.log(keywords);
            if(resultArray.password === keywords.password) {
                jsonWrite(res, result);
            } else {
                res.send('0')   //username
            }
        }
    })
});

//获取用户信息
router.get('/getUser', (req, res) => {
    var sql_name = $sql.user.select_name;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
    console.log(params);
    if (params.name) {
        sql_name += "where username ='"+ params.name +"'";
    }
    conn.query(sql_name, params.name, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            jsonWrite(res, result);
        }
    })
});

//更新用户信息
router.post('/updateUser', (req, res) => {
    var sql_update = $sql.user.update_user;
    var params = req.body;
    console.log(params);
    if (params.id) {
        sql_update  += " email = '" + params.email +
                        "',phone = '" + params.phone +
                        "',card = '" + params.card +
                        "',birth = '" + params.birth +
                        "',sex = '" + params.sex +
                        "' where id ='"+ params.id + "'";
    }
    conn.query(sql_update, params.id, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        if (result.affectedRows === undefined) {
            res.send('更新失败，请联系管理员')   //查询不出username，data 返回-1
        } else {
            res.send('ok');
        }
    })
});

//更改密码
router.post('/modifyPassword', (req, res) => {
    var sql_modify = $sql.user.update_user;
    var params = req.body;
    console.log(params);
    if (params.id) {
        sql_modify +=  " password = '" + params.pass +
                        "',repeatPass = '" + params.checkPass +
                        "' where id ='"+ params.id + "'";
    }
    conn.query(sql_modify, params.id, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result.affectedRows === undefined) {
            res.send('修改密码失败，请联系管理员')   //查询不出username，data 返回-1
        } else {
            res.send('ok');
        }
    })
});

module.exports = router;
