const user = require('../path/to/user'); // הזן את הנתיב המדויק לקובץ user
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const UserServer = {
    login: (req, res) => {
        const { Username, Password } = req.body;
        let users = JSON.parse(localStorage.getItem('user') || '[]');
        if (!users.length) {
            localStorage.setItem('user', JSON.stringify(user));
            users = user;
        }
        const findUser = users.find(x => x.Username === Username && x.Password === Password);
        if (!findUser) {
            res.redirect('/signUp'); // Redirect to sign up page if user not found
            return;
        }
        res.send(findUser);
    },

    signUp: (req, res) => {
        const { Username, Password, Name, Phone, Email, Tz } = req.body;
        let users = JSON.parse(localStorage.getItem('user') || '[]');
        if (!users.length) {
            localStorage.setItem('user', JSON.stringify(user));
            users = user;
        }
        if (!Username || !Name || !Password || !Phone || !Email || !Tz) {
            // לא נשלח מידע
            res.status(400);
            return res.send('לא מולאו כל הפרטים');
        }
        if (users.filter(x => x.Username === Username || x.Email === Email).length) {
            // אם כבר קיים
            res.status(400);
            return res.send('שם משתמש או מייל כבר תפוס');
        }
        const Id = users.length > 0 ? users[users.length - 1].Id + 1 : 1;
        const newUser = { Id, Username, Password, Name, Phone, Email, Tz };
        users.push(newUser);
        localStorage.setItem('user', JSON.stringify(users));
        res.send(newUser);
    }
}

module.exports = UserServer;
