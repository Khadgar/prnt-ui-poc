import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OpenApi_Key,
});
const openai = new OpenAIApi(configuration);

export interface ImageMetadata {
  style: string;
  technique: string;
  subject: string;
}

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  try {
    const payload = JSON.parse(event.body!) as ImageMetadata;

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 150,
      prompt: `Make an image description from the following properties. style: ${payload.style} subject: ${payload.subject} and technique: ${payload.technique}`,
      temperature: 0.6,
    });
    const imgDescription = completion.data.choices[0].text ?? "";

    const image = await openai.createImage({
      prompt: imgDescription!,
      n: 1,
      size: "256x256",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ imgDescription, image: image.data.data[0].url }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.response.data),
    };
  }
};

export { handler };
