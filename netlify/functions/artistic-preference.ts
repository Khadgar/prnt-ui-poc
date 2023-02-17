import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OpenAI_Key,
});
const openai = new OpenAIApi(configuration);

export interface ImageMetadata {
  style: string;
  technique: string;
  subject: string;
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    const payload = JSON.parse(event.body!) as ImageMetadata;
    const prompt = `I want you to act like an artist and your imagination. I'll give you the details to create a creative description for your latest art. Use the following style/styles: ${payload.style} use the following technique/techniques: ${payload.technique} and the subject/subjects of the art should be ${payload.subject}. Make the description in 2 sentences.`;
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      max_tokens: 150,
      prompt,
      temperature: 0.6,
    });
    const imgDescription = completion.data.choices[0].text ?? '';

    const image = await openai.createImage({
      prompt: imgDescription!,
      n: 1,
      size: '256x256',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ imgDescription, image: image.data.data[0].url }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify(error?.response?.data || { error: { message: error.message } }),
    };
  }
};

export { handler };
