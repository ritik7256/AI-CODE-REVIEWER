const express = require("express");
const aiRoutes = require("./routes/ai.routes")
require("dotenv").config()
const cors = require("cors")
const path = require("path")
const app = express();

const _dirname = path.resolve()
app.use(cors({
    origin: "https://ai-code-reviewer-ze81.onrender.com/"
}))
app.use(express.json())
app.use("/ai", aiRoutes)

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get("*", (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})
app.listen(3000, (req, res) => {
    console.log("server started")
})
