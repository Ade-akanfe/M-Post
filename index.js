const express = require("express")
const http = require("http")
const cors = require("cors")
const axios = require("axios")


const app = express()

app.use(express.json())
app.use(cors())

const posts = {}

app.post("/post", async (req, res) => {
    try {
        const { title } = req.body
        const id = new Date().getTime()
        posts[id] = {
            id,
            title
        }

        await axios.post("http://localhost:4005/create-event", { type: "Post Creation", id, title })

        res.status(201).send("succesfull")
    }
    catch (error) {
        res.status(500).send(error.message)
    }
})

app.get("/post", (req, res, next) => {
    try {
        res.status(201).send(posts)
    }
    catch (error) {
        res.status(500).send(error.message)
    }
})

app.post("/accept-event", (req, res) => {
    res.send({})
})

const server = http.createServer(app)

server.listen(4000, () => {
    console.log("Post Service started on port 4000")
})