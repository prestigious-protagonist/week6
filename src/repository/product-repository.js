const {shoes, shoeImages, shoeVariants, sizes} = require("../models/index");
class ProductRepository {
    async create(data, options) {
        try {
            const product  = await shoes.create(data,options);
            
            return product;
        } catch (error) {
            console.log(error);
            console.log("Error at repository layer.")
            throw error;
        }
    }

   

    async variantsUploader(data, options) {
        try {
            const variantsUploader = await shoeVariants.create(data, options);
            return variantsUploader;
        } catch (error) {
            throw error;
        }
    }

    async addSizeStock(data, options) {
        try {
            const addSize = await sizes.create(data, options);
            return addSize;
        } catch (error) {
            throw error;
        }
    }
    async productExists({shoeId}, options) {
        try {
            const productExists = await shoes.findOne({
                where:{
                    id: shoeId
                }
            }, options)
            return productExists;
        } catch (error) {
            throw error;
        }
    }

    async colorExists({color, shoeId}, options) {
        try {
            const colorExists = await shoeVariants.findOne({
                where:{
                    color,
                    shoeId
                }
            }, options)
            return colorExists;
        } catch (error) {
            throw error;
        }
    }

    async deleteColor({color, shoeId}, options) {
        try {
            await shoeVariants.destroy({
                where:{
                    color,
                    shoeId
                }
            }, options)
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct({shoeId}, options) {
        try {
            await shoes.destroy({
                where:{
                    id: shoeId
                }
            }, options)
            return true;
        } catch (error) {
            throw error;
        }
    }

    async removeSize({variantsId, size}, options) {
        //deleting size shouldn't delete the color as a single color may have diff sizes
        try {
            await sizes.destroy({
                where:{
                    variantsId, 
                    size
                }
            }, options)
            return true;
        } catch (error) {
            throw error;
        }
    }

    async uploadImage({variantsId, imageUrl, shoeId}, options) {
        try {
            const image = await shoeImages.create({
                variantsId,
                imageUrl,
                shoeId
            }, options)
            return image;
        } catch (error) {
            throw error;
        }
    }

    async ImageExists({variantsId, shoeId}, options) {
        try {
            const image = await shoeImages.findAll({
                variantsId,
                shoeId
            }, options)
            return image;
        } catch (error) {
            throw error;
        }
    }
    async removeImage({variantsId, shoeId}, options) {
        try {
            const image = await shoeImages.destroy({
                where:{
                    variantsId,
                    shoeId

                }
            }, options)
            return image;
        } catch (error) {
            throw error;
        }
    }
    async getVariants(shoeId, options) {
        try {
            const shoeVariantList = await shoeVariants.findAll({
                where:{
                    shoeId,
                }
            }, options)
            return shoeVariantList;
        } catch (error) {
            throw error;
        }
    }
    
    
    
}
module.exports = ProductRepository;