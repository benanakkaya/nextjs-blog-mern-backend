import Category from "../models/Category.js";

export const NewCategory = async (req,res) => {

    const {name} = req.body;

    const categoryCheck = await Category.findOne({name: name.toLowerCase()});

    if(categoryCheck){
        return res.status(500).json({message:"Zaten böyle bir kategori mevcut!"})
    }

    const NewCategory = await Category.create({
        name: name
    })

    return res.status(201).json({message:"Kategori başarıyla oluşturuldu!",category: NewCategory})


}


export const GetCategories = async (req,res) => {

    const categories = await Category.find();

    return res.status(200).json(categories);

}

export const GetCategory = async (req,res) => {

    const {categoryID} = req.query;

    const category = await Category.findById(categoryID);

    if(!category){
        return res.status(404).json("Category not found");
    }

    return res.status(200).json(category);
}
