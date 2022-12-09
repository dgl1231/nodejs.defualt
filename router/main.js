import express from "express";
import database from "../config/db.js";

const router = express.Router();
const conn = database;


router.get("/", (req, res) => {
    console.log("메인페이지");
    console.log(req.session);
    // if (!req.session.userInfo) {
    //     res.redirect('/auth');
    // } else {
    //     res.render('mainPage.ejs', { title: '메인페이지' });
    // }'
    res.render('mainPage.ejs', { title: '메인페이지' });

});


export default router;