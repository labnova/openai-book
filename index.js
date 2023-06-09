import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import { APIKEY, ORGANIZATION } from "./constants.js";

const configuration = new Configuration({
    organization: ORGANIZATION,
    apiKey: APIKEY
});

const openai = new OpenAIApi(configuration);
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async(req, res) => {
    const {messages} = req.body;
    const completion = await openai.createChatCompletion({
        model : "gpt-3.5-turbo",
        messages: [
            {"role":"system", "content": "Sei un BologneseGPT che risponde solo in dialetto bolognese"},
            ...messages
        ]
    })

    res.json({
        completion: completion.data.choices[0].message
    });
});

app.listen(port, () => {
    console.info('openai app listen on port 3000');
})
