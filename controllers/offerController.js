const Player = require("../models/loginSchema/loginSchema");
const Offer = require("../models/offersSchema/offersSchema");



// create offer
const offerCreateCtrl = async (req, res, next) => {
    const {
        offer_id,
        offer_title,
        offer_description,
        content,
        schedule,
        target,
        pricing,
        player,

    } = req.body
    try {
        //1. Find the player who is creating
        const player = await Player.findById(req.userAuth)
        if (!player) {
            return res.status(401).json("Access is denied")
        }
        const offer = await Offer.create({
            offer_id,
            offer_title,
            offer_description,
            content,
            schedule,
            target,
            pricing,
            player,

        })
        await offer.save()
        res.status(200).json({
            status: 'Success',
            data: offer,
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}

// fetch offer
const offerFetchCtrl = async (req, res) => {
    const { age, installed_days } = req.body
    const validOffers = []
    try {
        const offer = await Offer.find({})
        offer.filter((offer) => {
            const rules = offer.target.split("and")
            //['age > 25', 'installed_days < 5']
            rules.forEach((rule) => {
                let ruleKey = {}
                if (rule.includes(">")) {
                    ruleKey = {
                        key: rule.trim().split(">")[0].trim(),
                        value: parseInt(rule.trim().split(">")[1]),
                    }
                    if (req.body[ruleKey] > ruleKey.value) {
                        validOffers.push(offer)
                    }
                }
                else {
                    ruleKey = {
                        key: rule.trim().split("<")[0].trim(),
                        value: parseInt(rule.trim().split("<")[1]),
                    }
                    validOffers.push(offer)
                }
            })
        })
        res.status(200).json({
            status: 'Success',
            data: validOffers,
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}

// update offer
const offerUpdateCtrl = async (req, res) => {
    const { offer_title,
        offer_description,
        content,
        schedule,
        target,
        pricing,

    } = req.body
    try {
        const offer = await Offer.findById(req.params.id)
        // console.log(req.params.id);
        if (offer.player.toString() !== req.userAuth.toString()) {
            return next(appErr('You are not allowed to update this offer', 403))
        }

        await Offer.findByIdAndUpdate(req.params.id, {
            offer_id,
            offer_title,
            offer_description,
            content,
            schedule,
            target,
            pricing,
            // photo: req && req.file ? req.file.path : undefined,
        }, {
            new: true
        })
        res.status(200).json({
            status: 'Success',
            data: offer,
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}
// update offer
const offerDeleteCtrl = async (req, res) => {

    try {
        const offer = await Offer.findById(req.params.id)
        // console.log(req.params.id);
        if (offer.player.toString() !== req.userAuth.toString()) {
            return next(appErr('You are not allowed to delete this offer', 403))
        }
        await Offer.findByIdAndDelete(req.params.id)
        res.status(400).json({
            message: "offer deleted successfully"
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = {
    offerCreateCtrl,
    offerFetchCtrl,
    offerUpdateCtrl,
    offerDeleteCtrl
}