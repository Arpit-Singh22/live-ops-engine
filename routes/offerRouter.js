const express = require("express")
const multer = require('multer')
const storage = require("../configDB/multer");
const { offerCreateCtrl,
    offerFetchCtrl,
    offerUpdateCtrl,
    offerDeleteCtrl } = require("../controllers/offerController")
const login = require("../middleware/login")
const offerRouter = express.Router()


// storage
const upload = multer({ storage: storage })

offerRouter.post("/create-offer", login, upload.single('image'), offerCreateCtrl)

// To fetch all offer
offerRouter.post("/fetch-all", offerFetchCtrl)

// to update offer
offerRouter.put("/update", login, offerUpdateCtrl)

// to delete offer
offerRouter.delete("/delete/:id", login, offerDeleteCtrl)

module.exports = offerRouter