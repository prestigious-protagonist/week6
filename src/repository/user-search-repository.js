
const { Op } = require("sequelize");
const {shoes, shoeVariants, sizes, shoeImages, favourites} = require("../models/index");

class SearchRepository {
    async getAll() {
        try {
            const shoeWithVariants = await shoes.findAll({
                include: [
                    { 
                        model: shoeVariants, 
                        as: 'variants',
                        include: [
                            { model: sizes, as: 'sizes' },
                            { 
                                model: shoeImages, 
                                as: 'images',
                                where: { variantsId: { [Op.ne]: null } }, // Ensures only images linked to variants are included
                                required: false // Prevents exclusion if no images exist
                            }
                        ]
                    }
                ]
            });
            
            

            return shoeWithVariants;
        } catch (error) {
            console.log(error);
            console.log("Error at repository layer.");
            throw error;
        }
    } 
    async getById(data) {
        try {
            const shoeWithVariants = await shoes.findByPk(data.id, {
                include: [
                    { 
                      model: shoeVariants, 
                      as: 'variants',
                      include: [{ model: sizes, as: 'sizes' }] 
                    },
                    { 
                      model: shoeImages, 
                      as: 'images' 
                    }
                  ]
                
            });

            return shoeWithVariants;
        } catch (error) {
            console.log(error);
            console.log("Error at repository layer.");
            throw error;
        }
    } 
    
    async getByFiltration(data) {
        try {
            let conditions = {}
            for(const key in data) {
                 if(key === "price" && data[key].startsWith("<")){
                    conditions[key] = {
                        [Op.lt]: Number(data[key].substring(1)) 
                    }
                }else if(key === "price" && data[key].startsWith("<=")){
                    conditions[key] = {
                        [Op.lte]: Number(data[key].substring(2)) 
                    }
                }else if(key === "price" && data[key].startsWith(">")){
                    conditions[key] = {
                        [Op.gt]: Number(data[key].substring(1)) 
                    }
                }else if(key === "price" && data[key].startsWith(">=")){
                    conditions[key] = {
                        [Op.gte]: Number(data[key].substring(2)) 
                    }
                }else{
                    conditions[key] = data[key]
                }
            }
            const response = await shoes.findAll({
                where: conditions
                ,
                include: [{ model: shoeVariants, as: 'variants',include:[{model: sizes, as: 'sizes'}] }]
              
                
            });

            return response;
        } catch (error) {
            console.log(error);
            console.log("Error at repository layer.");
            throw error;
        }
    } 
    async getByvariantId(data) {
        try {
            const shoeWithVariants = await shoeVariants.findByPk(data.id, {
                include: [
                    { model: shoeImages, as: 'images' },
                    { model: sizes, as: 'sizes' },
                    { model: shoes, as: 'shoe' }
                  ]
                
            });

            return shoeWithVariants;
        } catch (error) {
            console.log(error);
            console.log("Error at repository layer.");
            throw error;
        }
    }

    async addToFavourites(data, options) {
        try {
            const addToFavourites = await favourites.upsert(data, options)
            return addToFavourites 
        } catch (error) {
            console.log(error);
            console.log("Error at repository layer.");
            throw error;
        }
    }

    
    async getFavourites(data, options) {
        try {
            const getFavourites = await favourites.findAll({
                where:{
                    userId:data
                },
                include:[
                    {
                        model: shoes,
                        as: "shoeInfo",
                        include: [
                            {
                              model: shoeImages, // Include shoe images
                              as: 'images', // Alias used in the association
                            },
                            {
                                model: shoeVariants, // Include shoe images
                                as: 'variants', // Alias used in the association
                                include:[
                                    {
                                        model: sizes,
                                        as: "sizes"
                                    }
                                ]
                              }
                          ],

                    }
                ]
            }, options)
            return getFavourites 
        } catch (error) {
            console.log(error);
            console.log("Error at repository layer.");
            throw error;
        }
    }


    async removeFavourite(data, options) {
        try {
            const removeFavourite = await favourites.destroy({
                where:{
                    userId: data.userId,
                    shoeId: data.productId
                }
            }, options)
            if(!removeFavourite) return false
            return true 
        } catch (error) {
            console.log(error);
            console.log("Error at repository layer.");
            throw error;
        }
    }

    async checkFavourite(data, options) {
        try {
            const checkFavourite = await favourites.findOne({
                where:{
                    userId: data.userId,
                    shoeId: data.productId
                }
            }, options)
            if(!checkFavourite) return false
            return true 
        } catch (error) {
            console.log(error);
            console.log("Error at repository layer.");
            throw error;
        }
    }
    
}
module.exports = SearchRepository;