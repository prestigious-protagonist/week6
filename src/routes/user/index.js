const express = require("express");
const router = express.Router();
const checkJwt = require("../../middlewares/index")
const SearchController = require("../../controllers/user-search-controller")
router.get('/get-all-products',(req, res, next)=>{
    console.log(req.headers.authorization)
    next()
},checkJwt, (req,res, next) => {
    console.log("*************")
    console.log(req.auth)
    console.log(req.headers)
    next()
} ,SearchController.getAll)
router.get('/get-by-Id/:id', SearchController.getById)
router.get('/get-by-variantId/:id', SearchController.getByvariantId)

router.post('/addToFavourites/:shoeId', SearchController.addToFavourites)
router.get('/getFavourites', SearchController.getFavourites)
router.get('/checkFavourite/:id', SearchController.checkFavourite)

router.delete('/removeFavourite/:productId', SearchController.removeFavourite)
router.get('/search', SearchController.getByBrand)
router.get('/', (req, res)=> {
    res.send("YBE")
})
module.exports = router;