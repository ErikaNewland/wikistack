var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const User=db.define('user', {
    name: {type: Sequelize.STRING,allowNull: false},
    email: {type: Sequelize.STRING, unique: true, isEmail: true, allowNull: false}
});

const Page = db.define('page', {
    title: {type: Sequelize.STRING, allowNull: false},
    urlTitle: {type: Sequelize.STRING, isUrl: true, allowNull: false},
    content: {type: Sequelize.TEXT,allowNull: false},
    status: Sequelize.ENUM('open', 'closed')
});

module.exports={
    Page: Page,
    User: User,
    db: db
};