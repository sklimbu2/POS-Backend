const path = require('path')
const fs= require('fs')
const { uploadProcessedData, getAllData, updateDocument, deleteDocument, uploadNewFood, Firebase_GetFoodData } = require('../controllers/firebase');
const getAllOrders = async (req, res) => {
  const data = await getAllData()
  res.send(JSON.stringify(data))
}
const createOrder = async (req, res) => {
    try {
        await uploadProcessedData(req.body);
        res.status(201).json({ success: true, message: 'Order created and data uploaded' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create order' });
    }
}

const updateOrder = async(req, res) => {
    const docId= req.params
    const data = req.body
    try{
        await updateDocument(docId, data)  
        res.status(201).json({ success: true, message: 'Order Updated successfully....'} )
    }catch(err){
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create order' });
    }
}
const deleteOrder = async (req, res) => {
   try{
        await deleteDocument(req.params)  
        res.status(201).json({ success: true, message: 'Order deleted successfully....'} )
    }catch(err){
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create order' });
    }
}
const UploadNewFood = async(req, res) =>{
    try{
        if(!req.files || !req.files.image){
            return res.status(400).json({
                success: false,
                message: 'No image file uploaded'
            })
        }

        const image = req.files.image
        const uploadDir = './images'
        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir, {recursive: true})
        }

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(image.name)
        const filename = `food-${uniqueSuffix}${ext}`
        const filepath = path.join(uploadDir, filename)

        await image.mv(filepath)

        const foodData = {
            name : req.body.foodName,
            price : parseFloat(req.body.price),
            category: req.body.category,
            imageUrl: `/images/${filename}`
        }
        await uploadNewFood(foodData)
        res.status(201).json({
            success: true,
            message: 'Food item created successfully',
            data: foodData
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Server error during upload',
            error: error.message
        })
    }
}
const getFoodData = async(req,res) => {
    const data = await Firebase_GetFoodData()
    res.status(200).send(JSON.stringify(data))
}
module.exports = {
    getAllOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    UploadNewFood,
    getFoodData 
}