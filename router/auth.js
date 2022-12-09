import express from "express";
import database from "../config/db.js";


const router = express.Router();
const conn = database;


let authData = {
    id: '',
    password: '',
}

router.get('/', (req, res) => {
    res.render('login.ejs', { title: '로그인페이지', id: null });
})
router.post('/login', (req, res) => {
    authData.id = req.body.id;
    authData.password = req.body.password;
    const loginSQL = `SELECT * FROM ACCOUNT_TEST WHERE UID = '${authData.id}' AND UPW = '${authData.password}'`;
    conn.query(loginSQL, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log(result.rowCount);
            if (result.rowCount) {
                let userInfo = {
                    user_id: authData.id,
                    is_logined: true
                }
                req.session.userInfo = userInfo;
                req.session.save(function (err) {
                    if (err) throw err;
                    console.log(req.session);
                    res.redirect('/');
                })
            }
            else { res.redirect('/auth') };
        }
    });

});
router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) throw err;
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        res.redirect('/');
    });
});

export default router;