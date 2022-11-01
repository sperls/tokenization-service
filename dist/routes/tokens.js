"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Read tokens');
});
router.post('/', (req, res) => {
    // const { secret } = req.body;
    // console.log('secret: ', secret);
    console.log('req.body: ', req);
    res.send('Write tokens');
});
router.put('/', (req, res) => {
    res.send('Update tokens');
});
router.delete('/', (req, res) => {
    res.send('Delete tokens');
});
exports.default = router;
