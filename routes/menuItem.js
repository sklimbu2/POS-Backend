const express = require('express')
const router = express()

const {
    getAllImages,
    deleteMenuItem
} = require('../controllers/menuItem')

router.route('/').delete(deleteMenuItem).get(getAllImages)
module.exports = router