const express = require("express");
const mongoose = require("mongoose");

const tweetUser = require("../model/tweetUser");


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tweeteruser = await tweetUser.find();
        res.status(200).json(tweeteruser)
    } catch (error) {
        res.status(401).json({message:error.message});
    }
})

router.post('/', async (req, res) => {
    const newTweeterUser = new tweetUser({
        first: req.body.first,
        last: req.body.last,
        handle: req.body.handle
    })
    try {
        await newTweeterUser.save();
        res.redirect('/');
    } catch (error) {
        res.status(409).json({ message:error.message });
    }
})


module.exports = router;