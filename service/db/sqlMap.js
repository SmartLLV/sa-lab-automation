var sqlMap = {
    user: {
        add: 'insert into user (username, account, password, repeatPass, email, phone, card, birth, sex, auth) values (?,?,?,?,?,?,?,?,?,?)',
        select_name: 'select * from user',
        update_user: 'update user set',
        count_user: 'select count(*) as num from user',
        create_table: `create table if not exists user(username varchar(20) not null unique, account varchar(20), password varchar(20), repeatPass varchar(20), email varchar(20), phone varchar(11), card varchar(32), birth varchar(32), sex varchar(5), auth varchar(2))`,
        delete_table: 'drop table if exists user'
    }
}

module.exports = sqlMap;
