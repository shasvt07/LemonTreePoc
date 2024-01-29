import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";
globalThis.fetch = fetch;


const genAI = new GoogleGenerativeAI("AIzaSyDOI4I-arrZ3zkgLi16N1W117iL4x0vOME");


export async function geminiScanImageData(image) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
      const messages = [
        {
          role: "user",
          content: [
            { type: "text", text: "What’s in this image?" },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ];
      const result = await model.getImageDetails(image);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      return text;
    } catch (error) {
      console.error(error); // Rethrow the error to handle it in the calling code
    }
  }
  