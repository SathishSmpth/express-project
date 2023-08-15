const express = require('express')
const uploadRouter = express.Router()

const upload = require('../config/multer.config')
const uploadController = require('../controller/uploadController')

uploadRouter.post('/upload-file', upload.array('image', 4), uploadController.upload_multiple_file)
uploadRouter.post('/upload-file/profile-picture', upload.array('image', 4), uploadController.upload_multiple_file)
uploadRouter.post('/delete-file/:key', uploadController.delete_file)

module.exports = uploadRouter