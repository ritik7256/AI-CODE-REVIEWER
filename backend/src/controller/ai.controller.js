const generateContent = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
    const code = req.body.code;
    if (!code) return res.status(400).send("Prompt is required");

    try {
        const output = await generateContent(code);
        res.send(output);
    } catch (err) {
        res.status(500).send("Something went wrong: " + err.message);
    }
};
