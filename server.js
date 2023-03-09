const express = require("express")
const offerRouter = require("./routes/offerRouter")
const playerRouter = require("./routes/playerRouter")
const app = express()
require("./configDB/configDB")

// pass incoming payload
app.use(express.json())
require("dotenv").config()


// login
app.use("/api/v1/offers/", playerRouter)

// routes
app.use("/api/v1/offers/", offerRouter)


const PORT = process.env.PORT || 9000
app.listen(PORT, console.log(`Server is up and running at PORT ${PORT}`))