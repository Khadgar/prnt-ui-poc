# Simple UI to create art

This application integrates [ChatGPT3](https://openai.com/blog/chatgpt/) and [DALL-E 2](https://openai.com/dall-e-2/) to revolutionize the way you create art! You can easily select and combine different properties from various pictures to generate unique and personalized pieces of art. Simply choose the features you like, and let the AI do the rest. Whether you're a professional artist or just looking to have some fun, this is a perfect tool for unlocking your creativity

# Local Development Steps

1. Install dependencies
   ```
   npm install
   ```
2. Install `netlify-cli`
   ```bash
   npm install netlify-cli -g
   ```
3. Add the required environment variables to `.env` file
   ```bash
   REACT_APP_CloudFront_Url="<Your image storage>"
   OpenAI_Key="<Your OpenAI API key>"
   ```
4. Run development server
   ```bash
   ntl dev
   ```
5. Open http://localhost:8888/
