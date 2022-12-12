import express from "express";
import database from "../config/db.js";

const router = express.Router();
const conn = database;


router.get("/", (req, res, next) => {
    req.session.reload(function () {
        console.log(req.session);
    });


    console.log("mainpage");
    // // if (!req.session.userInfo) {
    // //     res.redirect('/auth');
    // // } else {
    // //     res.render('mainPage.ejs', { title: '메인페이지' });
    // // }'
    res.render('mainPage.ejs', { title: 'mainpage' });

});


export default router;