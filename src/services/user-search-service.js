const { UUIDV4 } = require("sequelize");
const SearchRepository = require("../repository/user-search-repository");
const { v4: uuidv4 } = require('uuid');
const ClientError = require("../utils/errorHandlers/ClientError");
class SearchService {
    constructor() {
        this.SearchRepository = new SearchRepository();
        
    }
    async getAll() {
        try {
            const response = await this.SearchRepository.getAll()
            if(!response) throw new ClientError({
               
                    "statusCode": 404,
                    "name": "NotFoundError",
                    "message": "No products found",
                    "explanation": "No products exist in the database."
                
            });
            return response
        } catch (error) {
            throw error
        }
    }

    async getByBrand(data) {
        try {
            const response = await this.SearchRepository.getByFiltration(data)
            if(!response || response.length<1) {
                throw new ClientError({
               
                    "statusCode": 404,
                    "name": "NotFoundError",
                    "message": "No products found",
                    "explanation": "No products exist in the database."
                
                });
            }
                
            return response
        } catch (error) {
            throw error
        }
    }

    async getById(data) {
        try {
            const response = await this.SearchRepository.getById(data)
            if(!response || response.length<1) {
                throw new ClientError({
               
                    "statusCode": 404,
                    "name": "NotFoundError",
                    "message": "Product Not found",
                    "explanation": "Product doesn't exist in the database."
                
                });
            }
                
            return response
        } catch (error) {
            throw error
        }
    }

    async getByvariantId(data) {
        try {
            const response = await this.SearchRepository.getByvariantId(data)
            if(!response || response.length<1) {
                throw new ClientError({
               
                    "statusCode": 404,
                    "name": "NotFoundError",
                    "message": "Variant Not found",
                    "explanation": "Variant doesn't exist in the database."
                
                });
            }
                
            return response
        } catch (error) {
            throw error
        }
    }
    async addToFavourites({userId, shoeId}, options) {
        try {
            console.log(userId)
            console.log(shoeId)
            // check if shoeId exists
            const exists  = await this.SearchRepository.getById({id: shoeId}, options)
            console.log(exists)
            if(!exists) {
                throw new ClientError({
                    success: false,
                    name: "Shoe doesn't exists",
                    message: "Couldn't find shoe in records.",
                    explanation: "Shoe doesn't exists in DB"
                })
            }
            // now that shoe exists , add to fav db
            const addToFavourites = await this.SearchRepository.addToFavourites({userId, shoeId}, options)
            if(!addToFavourites) {
                throw new ClientError({
                    success: false,
                    name: "Something went wrong",
                    message: "Couldn't add shoe to favourites.",
                    explanation: ""
                })
            }
            return addToFavourites
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getFavourites(data, options) {
        try {
          
        
            const getFavourites = await this.SearchRepository.getFavourites(data, options)
            if(!getFavourites ) {
                throw new ClientError({
                    success: false,
                    name: "Resource Empty",
                    message: "No favourites to show for now.",
                    explanation: ""
                })
            }
            return getFavourites
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    async removeFavourite(data, options) {
        try {
          
        
            const removeFavourite = await this.SearchRepository.removeFavourite(data, options)
            if(!removeFavourite) {
                throw new ClientError({
                    success: false,
                    name: "Error",
                    message: "Couldn't remove product from favorites.",
                    explanation: ""
                })
            }
            return removeFavourite
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    
    async checkFavourite(data, options) {
        try {
          
        
            const checkFavourite = await this.SearchRepository.checkFavourite(data, options)
            if(!checkFavourite) {
                throw new ClientError({
                    success: false,
                    name: "Error",
                    message: "Product doesn't exists in favourites.",
                    explanation: ""
                })
            }
            return checkFavourite
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    
}

module.exports = SearchService;