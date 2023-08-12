import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
  organization: process.env.ORGANIZATION_KEY,
});

const openai = new OpenAIApi(configuration);

// const completion = await openai.createChatCompletion({
//   model: "gpt-3.5-turbo",
//   messages: [{ role: "user", content: "hello world" }],
//   // temperature: 0.7,
// });
// console.log(completion.data.choices[0].message);

app.get("/", (req, res) => {
  res.status(200).send({
    message: "hello from gpt",
  });
});

// export const chatbot = async (req, res) => {
//   try {
//     const { messages } = req.body;
//     // const { messages } = JSON.parse(req.body);

//     // define how chatgpt talks in initial message
//     const systemMessage = {
//       role: "system",
//       // content: "Explain all concepts like I am 20 years old",
//       content: "You are NewsGPT helpful assistant technologies news chatbot",
//     };

//     const { response } = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       // messages: [{ role: "user", content: "Hello world" }],
//       messages: [systemMessage, messages],
//       temperature: 0.7,
//       // max_tokens: 300,
//     });
//     if (response) {
//       if (response.data.choices[0].message) {
//         return res.status(200).json(
//           // {
//           //   message: response.data.choices[0].message,
//           // }
//           response.data.choices[0].message
//         );
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({ message: err.message });
//   }
// };
const systemMessage = {
  role: "system",
  content: "You are NewsGPT helpful assistant technologies news chatbot",
};

app.post("/", async (req, res) => {
  const { message } = req.body;
  // const messages = { role: "user", content: "Hello world" };

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    // messages: [systemMessage, `${message}`],
    messages: [{ role: "user", content: {"Hello world"} }],
    // temperature: 0.7,
  });

  res.json({
    message: response.data.choices[0].message,
  });
});

app.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});
