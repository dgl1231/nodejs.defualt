import express from "express";
import database from "../config/db.js";


const router = express.Router();
const conn = database;


let authData = {
    id: '',
    password: '',
}

router.get('/', (req, res) => {
    console.log("sID::::::::", req.sessionID);
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
                req.session.userID = authData.id;
                req.session.is_logined = true;
                req.session.save(function (err) {
                    console.log(req.session);
                    res.redirect("/");
                });
            }
            else { res.redirect('/auth') };
        }
    });

});
router.get('/logout', (req, res) => {
    console.log(req.sessionID);
    req.session.destroy(function (err) {
        if (err) throw err;
        req.session;
    });
    res.redirect('/');

});

export default router;