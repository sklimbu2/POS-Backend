const   {Firebase_DeleteMenuItem} = require('../controllers/firebase') 
const fs = require('fs')
const getAllImages = async(req, res) => {
    const path = `${__dirname}/../images/`
    try{
        if(fs.existsSync(path)){
        const files = await fs.promises.readdir(path)
        const imageData = files.map(file=>({
            filename:file
        }))

      res.json({
        count: files.length,
        name: imageData
      })
}else{console.log('file path not found')}
    }catch(err){
        console.log('Error reading directory')
    }
}
const deleteMenuItem = async(req, res) => {
    const {ItemName, ImageUrl} = req.query
    try{
        if(await Firebase_DeleteMenuItem(ItemName)){
            const path=`${__dirname}/..${ImageUrl}`
            try{
            if(fs.existsSync(path)){
                console.log('file path found...')
                await fs.promises.rm(path)
                console.log('Item image deleted....')
                
            }
            }catch(fsError){
                console.error("Failed to delete image:", fsError);
            }
        }
        else{
            console.log('Item image deletion unsuccessfull....')
        }
    }catch(err){
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete Menu Item...' });
    } 
}
const deleteImage = async(req, res)=>{
    const {ImageUrl} = req.query
    if(ImageUrl){
        const path=`${__dirname}/../images/${ImageUrl}`
        console.log('Path:', path)
        if(fs.existsSync(path)){
            console.log('path found for given image')
            await fs.promises.rm(path)
        }
        else{
            console.log('Path not Found for image')
        }
    }else{}
}
module.exports={
    deleteMenuItem ,
    getAllImages,
    deleteImage
}