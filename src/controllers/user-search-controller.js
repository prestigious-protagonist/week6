const SearchService = require("../services/user-search-service");
this.SearchService = new SearchService();
const {sequelize} = require("../models/index");


const Redis = require("ioredis");
const ClientError = require("../utils/errorHandlers/ClientError");
const { REDIS_HOST, REDIS_PORT, REDIS_PASS } = require("../config/server-config");
const redis = new Redis({
    host: REDIS_HOST,
     port: REDIS_PORT,
     password: REDIS_PASS
 })
 redis.on("connect", () => {
     console.log("Redis Connected")
 })


const getAll = async (req, res) => {
    try {
        const isExists = await redis.exists("product");
        if (isExists) {
            const Products = await redis.get("product");
            if (!Products) {
                return res.status(500).json({ error: "Cache data is null" });
            }
            return res.status(200).json({
                success: true,
                status: 200,
                message: "Products fetched from cache",
                data: JSON.parse(Products)
            });
        }
        
        const product = await this.SearchService.getAll();
        if (!product || product.length === 0) {
            return res.status(404).json({ error: "No products found" });
        }
        
        await redis.setex("product", 200, JSON.stringify(product));
        res.status(200).json({
            success: true,
            status: 200,
            message: "Successfully fetched products",
            data: product
        });
        
    } catch (error) {
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        if(error.err) {
            res.status(404).json({
                success: false,
                status: 404,
                message: error.err,
            })
        }
        res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong"
        })
    }
}

const getByBrand = async (req, res) => {
    try {
        const product = await this.SearchService.getByBrand(req.query);
        res.status(201).json({
            success: true,
            status: 201,
            message: "Successfully fetched Products.",
            data:[product]
        })
    } catch (error) {
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong"
        })
    }
}


const getById = async (req, res) => {
    try {
        const product = await this.SearchService.getById(req.params);
        res.status(201).json({
            success: true,
            status: 201,
            message: "Successfully fetched the Product.",
            data: product
        })
    } catch (error) {
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong"
        })
    }
}

const getByvariantId = async (req, res) => {
    try {
        const product = await this.SearchService.getByvariantId(req.params);
        res.status(201).json({
            success: true,
            status: 201,
            message: "Successfully fetched the variant.",
            data: product
        })
    } catch (error) {
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong"
        })
    }
}



const addToFavourites = async (req, res) => {
    const t = await sequelize.transaction()
    try {
        console.log("AAGYAA")
        let userId =  req.headers["x-user-id"]
        const product = await this.SearchService.addToFavourites({shoeId: req.params.shoeId, userId}, {t});
        res.status(201).json({
            success: true,
            status: 201,
            message: "Product added to favourites.",
            data: product
        })
    } catch (error) {
        
        await t.rollback()
        
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong"
        })
    }
}


const getFavourites = async (req, res) => {
    const t = await sequelize.transaction()
    try {
        let userId =  req.headers["x-user-id"]
        const product = await this.SearchService.getFavourites(userId, {t});
        res.status(201).json({
            success: true,
            status: 201,
            message: "Fetched favourites.",
            data: product
        })
    } catch (error) {
        
        await t.rollback()
        
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong"
        })
    }
}



const removeFavourite = async (req, res) => {
    const t = await sequelize.transaction()
    try {
        const data ={
            userId: req.headers["x-user-id"],
            productId: req.params.productId
        }
        const product = await this.SearchService.removeFavourite(data, {t});
        res.status(201).json({
            success: true,
            status: 200,
            message: "Removed from favourites.",
            data: product
        })
    } catch (error) {
        
        await t.rollback()
        
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong"
        })
    }
}

const checkFavourite = async (req, res) => {
    const t = await sequelize.transaction()
    try {
        const data ={
            userId: req.headers["x-user-id"],
            productId: req.params.id
        }
        const product = await this.SearchService.checkFavourite(data, {t});
        res.status(201).json({
            success: true,
            status: 200,
            data: product
        })
    } catch (error) {
        
        await t.rollback()
        
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong"
        })
    }
}

module.exports = {
    getAll,
    getByBrand,
    getById,
    getByvariantId,
    addToFavourites,
    getFavourites,
    removeFavourite,
    checkFavourite
}