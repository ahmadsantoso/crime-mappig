const router = require('express').Router();
const User = require('../../component/model/user')

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
})

module.exports = router;