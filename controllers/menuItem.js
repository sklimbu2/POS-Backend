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
            if(fs.existsSync(path)){
                if(await fs.rm(filepath)){
                    console.log('Item image deleted....')
                }
            }
            else{}
            res.status(201).json({ success: true, message: 'Menu Item deleted successfully....'} )
        }
        else{
            console.log('Item image deletion unsuccessfull....')
        }
    }catch(err){
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete Menu Item...' });
    } 
}
module.exports={
    deleteMenuItem ,
    getAllImages 
}