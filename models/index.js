var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const User = db.define('user', {
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, unique: true, validate: { isEmail: true }, allowNull: false }
});

const Page = db.define('page', {
    title: { type: Sequelize.STRING, allowNull: false },
    urlTitle: { type: Sequelize.STRING, allowNull: false },
    content: { type: Sequelize.TEXT, allowNull: false },
    status: Sequelize.ENUM('open', 'closed'),
    date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
},
    {
        getterMethods: {
            route() {
                return '/wiki/${this.urlTitle}'
            }
        }
    }
);

Page.hook('beforeValidate', (page, options) => {
    page.urlTitle = generateUrlTitle(page.title);
});

Page.belongsTo(User);

module.exports = {
    Page: Page,
    User: User,
    db: db
};


function generateUrlTitle(title) {
    if (title) {
        // Removes all non-alphanumeric characters from title
        // And make whitespace underscore
        return title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
        // Generates random 5 letter string
        return Math.random().toString(36).substring(2, 7);
    }
}