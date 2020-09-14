const router = require('express').Router();
const User= require('../../component/model/user')

router.post('/register', (req, res) => {
    res.send('Register')
})

module.exports = router;