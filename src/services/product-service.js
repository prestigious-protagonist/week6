const { UUIDV4 } = require("sequelize");
const ProductRepository = require("../repository/product-repository");
const { v4: uuidv4 } = require('uuid');
const ValidationError = require("../utils/errorHandlers/ValidationError");
const ClientError = require("../utils/errorHandlers/ClientError");
class ProductService {
    constructor() {
        this.ProductRepository = new ProductRepository();
    }
    async create(data, options) {
        try {

            let product = await this.ProductRepository.create({...data, id:uuidv4()}, options);
            if(!product) {
               
               throw new ClientError({
                "success": false,
                "status": 400,
                "name": "BadRequestError",
                "message": "Product could not be created",
                "explanation": "The request data may be invalid or missing required fields."
                })
            }



            




            //if size color stock all are available then -> upload the variants
            if(data.size && data.color && data.stock) {
                console.log(product.dataValues.id) 
                
                const areVariantsUploaded = await this.ProductRepository.variantsUploader({
                    id: uuidv4(),
                    
                    color: data.color,
                    
                    shoeId: product.dataValues.id
                }, options)
                
                if(!areVariantsUploaded) 
                    throw new ClientError({
                        statusCode: 400,
                        name: "VariantUploadError",
                        message: "Failed to upload product variant",
                        explanation: "The variant could not be added. Please check the input data and try again."
                    });
                product = {...product, 
                    variantsData: areVariantsUploaded
                }
                console.log(areVariantsUploaded)
                const uploadSizeStock = await this.ProductRepository.addSizeStock({
                    variantsId: areVariantsUploaded.dataValues.id,
                    size: data.size,
                    stock: data.stock,
                }, options)
                if(!uploadSizeStock) 
                    throw new ClientError({
                        statusCode: 400,
                        name: "SizeStockUploadError",
                        message: "Failed to upload size and stock information",
                        explanation: "The size and stock data could not be added. Ensure the variant exists and try again."
                    });
                product = {...product, 
                    StockSizeData: uploadSizeStock
                }
            }
            // we are making diff functions too as these options are also part of patch requests
            
            return product;
        } catch (error) {
            
            if(error.name == 'SequelizeValidationError') {
                throw new ValidationError({
                    name: 'SequelizeValidationError',
                    message:  error.errors[0].message,
                    explanation: error.errors[0].type  
                })
            }
            
            throw error;
        }
    }

    async update({shoeId, color, size, stock}, options) {
        //shoeId
        // color
        // size
        // stock
        try {
            //check prod exists or not
            const productExists = await this.ProductRepository.productExists({shoeId}, options);
            if (!productExists) {
                throw new ClientError({
                    statusCode: 404,
                    name: "ProductNotFoundError",
                    message: "Product does not exist",
                    explanation: `No product found with the given shoeId: ${shoeId}.`
                });
            }
            
            //check if color already exists
            const colorExists = await this.ProductRepository.colorExists({shoeId, color}, options);
            if (colorExists) {
                throw new ClientError({
                    statusCode: 400,
                    name: "ColorAlreadyExistsError",
                    message: "Variant with this color already exists",
                    explanation: `A variant with color '${color}' already exists for shoeId: ${shoeId}.`
                });
            }
        
            //color doesnt exists -> create a variant
            const addColor = await this.ProductRepository.variantsUploader({id: uuidv4(),color, shoeId}, options);
            if (!addColor) {
                throw new ClientError({
                    statusCode: 500,
                    name: "VariantCreationError",
                    message: "Failed to create a product variant",
                    explanation: "An unexpected error occurred while creating a new variant. Please try again."
                });
            }
           
            const addSize = await this.ProductRepository.addSizeStock({variantsId: addColor.dataValues.id, size, stock},options)
            if (!addSize) {
                throw new ClientError({
                    statusCode: 500,
                    name: "SizeStockUploadError",
                    message: "Failed to add size and stock",
                    explanation: `Could not add size '${size}' with stock '${stock}' for variantId: ${addColor.dataValues.id}.`
                });
            }
            
            return addSize;

        } catch (error) {
            
            throw error;
        }
    }

    async removeColor(data, options) {
        try {
            const colorExists = await this.ProductRepository.colorExists(data, options);
            if (!colorExists) {
                throw new ClientError({
                    statusCode: 404,
                    name: "ColorNotFoundError",
                    message: "Color variant not found",
                    explanation: `No variant with color '${data.color}' exists for shoeId: ${data.shoeId}.`
                });
            }

            const deleteColor = await this.ProductRepository.deleteColor(data, options);
            if (!deleteColor) {
                throw new ClientError({
                    statusCode: 500,
                    name: "ColorDeletionError",
                    message: "Failed to delete color variant",
                    explanation: `An error occurred while attempting to delete color '${data.color}' for shoeId: ${data.shoeId}.`
                });
            }
            return true; 
        } catch (error) {
            throw error;
        }
    }
    async removeProduct({shoeId}, options) {
        try {
            const productExists = await this.ProductRepository.productExists({shoeId}, options);
            if (!productExists) {
                throw new ClientError({
                    statusCode: 404,
                    name: "ProductNotFoundError",
                    message: "Product not found",
                    explanation: `No product exists with shoeId: ${shoeId}.`
                });
            }
            
            const deleteProduct = await this.ProductRepository.deleteProduct({shoeId}, options);
            if (!deleteProduct) {
                throw new ClientError({
                    statusCode: 500,
                    name: "ProductDeletionError",
                    message: "Failed to delete product",
                    explanation: `An error occurred while attempting to delete the product with shoeId: ${shoeId}.`
                });
            }
            return true; 
        } catch (error) {
            throw error;
        }
    }

    async addSize({variantsId, size, stock}, options) {
        try {
           
            
            const addSizeStock = await this.ProductRepository.addSizeStock({variantsId, size, stock}, options)
            if (!addSizeStock) {
                throw new ClientError({
                    statusCode: 500,
                    name: "SizeStockAdditionError",
                    message: "Failed to add size and stock",
                    explanation: `An error occurred while attempting to add size: ${size} and stock: ${stock} for variantId: ${variantsId}.`
                });
            }
            return addSizeStock;
        } catch (error) {
            
            throw error;
        }
    }

    async removeSize({variantsId, size}, options) {
        try {
           
            
            const removeSize = await this.ProductRepository.removeSize({variantsId, size}, options)
            if (!removeSize) {
                throw new ClientError({
                    statusCode: 500,
                    name: "SizeRemovalError",
                    message: "Failed to remove size",
                    explanation: `An error occurred while attempting to remove size: ${size} for variantId: ${variantsId}.`
                });
            }
            return removeSize;
        } catch (error) {
            
            throw error;
        }
    }

    async uploadImage(data, options) {
        try {
           
            // img for this variant already exists then remove that
            const exists = await this.ProductRepository.ImageExists(data, options)
            console.log(exists.length)
            if(exists.length>0) {
                console.log("deleteing the images")
                // then remove it
                const deleteCount = await this.ProductRepository.removeImage(data, options) 
            }
            const img = await this.ProductRepository.uploadImage(data, options)
            if (!img) {
                throw new ClientError({
                    statusCode: 500,
                    name: "ImageUploaderError",
                    message: "Failed to upload Image",
                    explanation: `An error occurred while attempting to upload image.`
                });
            }
            return img;
        } catch (error) {
            
            throw error;
        }
    }
    async getVariants(data, options) {
        try {
           
            
            const variants = await this.ProductRepository.getVariants(data, options)
            if (!variants) {
                throw new ClientError({
                    statusCode: 500,
                    name: "ResouruceEmpty",
                    message: "Failed to fetch variants",
                    explanation: `An error occurred while attempting to fetch variants.`
                });
            }
            return variants;
        } catch (error) {
            
            throw error;
        }
    }

}

module.exports = ProductService;