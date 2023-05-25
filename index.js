import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"res.json(completion.data.choices[0].message);;


const configuration = new Configuration({
    organization: "",
    apiKey: ""
});

const openai = new OpenAIApi(configuration);
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", async(req, res) => {
    const completion = await openai.createChatCompletion({
        model : "gpt-3.5-turbo",
        messages: [
            {role: "user", content: "Chi ha costruito la statua del Nettuno di Bologna"}
        ]
    })

    res.json(completion.data.choices[0].message);
});

app.listen(port, () => {
    console.info('openai app listen on port 3000');
})
