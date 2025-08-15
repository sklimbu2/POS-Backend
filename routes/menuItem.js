const express = require('express')
const router = express()

const {
    getAllImages,
    deleteMenuItem,
    deleteImage
} = require('../controllers/menuItem')

router.route('/').delete(deleteMenuItem).get(getAllImages)
router.route('/image').delete(deleteImage)
module.exports = router