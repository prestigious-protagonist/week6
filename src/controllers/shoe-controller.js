const ProductService = require("../services/product-service");
this.ProductService = new ProductService();
const {sequelize} = require("../models/index");
const ValidationError = require("../utils/errorHandlers/ValidationError");
const AppError = require("../utils/errorHandlers/AppError");
const create = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const product = await this.ProductService.create(req.body, {transaction});
        await transaction.commit();
        res.status(201).json({
            success: true,
            status: 201,
            message: "Successfully created the product",
            data:[product]
        })
    } catch (error) {
        await transaction.rollback();
        if (error instanceof ValidationError) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        if (error instanceof AppError) {
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

const update = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const product = await this.ProductService.update(req.body, {transaction});
        await transaction.commit();
        res.status(201).json({
            success: true,
            status: 201,
            message: "Successfully updated the product",
            data:[product]
        })
    } catch (error) {
        await transaction.rollback();
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


const removeColor = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const product = await this.ProductService.removeColor(req.body, {transaction});
        await transaction.commit();
        res.status(201).json({
            success: true,
            status: 201,
            message: "Successfully removed the variant",
            data:[product]
        })
    } catch (error) {
        await transaction.rollback();
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


const removeProduct = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const product = await this.ProductService.removeProduct(req.body, {transaction});
        await transaction.commit();
        res.status(201).json({
            success: true,
            status: 201,
            message: "Successfully removed the variant",
            data:[product]
        })
    } catch (error) {
        await transaction.rollback();
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


const addSize = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const product = await this.ProductService.addSize(req.body, {transaction});
        await transaction.commit();
        res.status(201).json({
            success: true,
            status: 201,
            message: "Successfully added new sizes",
            data:[product]
        })
    } catch (error) {
        console.log(error)
        await transaction.rollback();
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


const removeSize = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const product = await this.ProductService.removeSize(req.body, {transaction});
        await transaction.commit();
        res.status(201).json({
            success: true,
            status: 201,
            message: "Successfully removed sizes",
            data:[product]
        })
    } catch (error) {
        await transaction.rollback();
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



const uploadImage = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const product = await this.ProductService.uploadImage(req.body, {transaction});
        await transaction.commit();
        res.status(201).json({
            success: true,
            status: 201,
            message: "Successfully updated the Image",
            data:[product]
        })
    } catch (error) {
        await transaction.rollback();
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



const getVariants = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        console.log(req.params.shoeId)
        const product = await this.ProductService.getVariants(req.params.shoeId, {transaction});
        await transaction.commit();
        res.status(201).json({
            success: true,
            status: 201,
            message: "Successfully fetched the variants",
            data:[product]
        })
    } catch (error) {
        console.log(error)
        await transaction.rollback();
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

module.exports = {
    create,
    update,
    removeColor,
    removeProduct,
    addSize,
    removeSize,
    uploadImage,
    getVariants
}