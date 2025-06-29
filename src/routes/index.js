const express = require("express")
const router = express.Router();
const v1Router = require("./v1/index")
const userRouter = require("./user/index")
router.use('/v1', v1Router);
router.use('/user', userRouter);
router.get('/', (req, res)=> {
    res.send("Reached")
})
module.exports = router;