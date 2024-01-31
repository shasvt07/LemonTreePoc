import { createRequire } from "module";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";
globalThis.fetch = fetch;
import { createWorker } from 'tesseract.js';
import { gptImage, scanGPTData } from "./openai.js";
import { geminiScanImageData } from "./gemini.js";
import dotenv from "dotenv";
import Dl from "../models/dl.js";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_GENERATIVE_AI_API_KEY);


const require = createRequire(import.meta.url);
const { ocrSpace } = require('ocr-space-api-wrapper');


async function parseData(input) {

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const msg = input;

      const inputmess = input;
      async function removeAdhaar(str) {
        // Replace the word "ADHAAR" with an empty string
        var result = str.replace(/ADHAAR/g, '');
        return result;
      }

      async function removebacktics(str) {
        // Replace the word "ADHAAR" with an empty string
        var result = str.replace(/```/g, '');
        return result;
      }

      var outputString =await removeAdhaar(inputmess);
      // console.log(outputString)
      const prompt = "Given a string extract the releavent information(name,date_of_birth(dd-mm-yyyy),address,gender,validity(dd-mm-yyyy))from it and convert to a json object.";
      const ans = outputString;
      const result = await model.generateContent([prompt, ans]);
      const response = await result.response;
      const finalrespose = await removebacktics(response.text());
      // const text = response.text();
      // console.log(finalrespose);
      return finalrespose;
}



// Function to check if a value matches a given pattern
const checkPattern = (userData) => {

// Regular expression patterns for each property format
const namePattern = /^[A-Za-z\s]+$/;
const dobPattern = /^\d{2}\/\d{2}\/\d{4}$/;
const validityPattern1 = /^\d{2}\/\d{2}\/\d{4}$/;
const validityPattern2 = /^\d{2}-\d{2}-\d{4}$/;

// Function to check if a value matches a given pattern
function isFormatValid(value, pattern) {
    return pattern.test(value);
}

if (
    isFormatValid(userData.name, namePattern) &&
    isFormatValid(userData.date_of_birth, dobPattern) &&
    isFormatValid(userData.validity, validityPattern1) || isFormatValid(userData.validity, validityPattern2)
) {
    return true;
} else {
    return false;
}

}
const scanTesseract = async (imageUrl) => {
  try{
    const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(imageUrl);
      await worker.terminate();
      if(text===undefined){
        res.status(404).json("Please try again")
      }
      // console.log(text);
      // return text;
  }catch(error){
    console.log(error);
  }
}

export const scanDl = async (req, res) =>{
  console.log(req.body);
  const { idImage } = req.body;
  try {
    if(idImage===undefined || idImage===null || idImage===""){
      res.status(404)
    }
    const url = 'data:image/jpeg;base64,'+idImage;
    const profilephoto = await imageExtraction(idImage);

    const ocrdata = await ocrSpace(url,{ apiKey: 'K89692836588957'});
    const text = ocrdata.ParsedResults[0].ParsedText;
      // const text = await scanTesseract(url);
      // const text = await gptImage(url);
      // const data = geminiScanImageData(url);
      // console.log(text);
    //   const str = await scanGPTData(text);
      // const str = geminiScanImageData(text);
      const str = await parseData(text);
      // console.log(str);
      const startIndex = str.indexOf('{');
      const endIndex = str.lastIndexOf('}') + 1;
      // Extract the object substring
      const objectStr = str.substring(startIndex, endIndex);
      // Parse the extracted object into a JavaScript object
      const data = eval('(' + objectStr + ')');
      // console.log(data);
      if(!data){
        res.status(404)
      }
      const userData = {
        name : data.name ? data.name : null,
        date_of_birth: data.date_of_birth? data.date_of_birth : null,
        gender: data.gender? data.gender : null,
        validity: data.validity ? data.validity : null,
        address: data.address ? data.address : null,
        photo: profilephoto ? 'data:image/jpeg;base64'+profilephoto : "https://cirrusindia.co.in/wp-content/uploads/2016/10/dummy-profile-pic-male1.jpg",

      }
      if(userData.date_of_birth === null || userData.name ===null  || userData.validity === null|| data.address === null){
        res.status(404)
      }
      if(!checkPattern(userData)){
        res.status(404)
      }
      
      console.log(userData);

      const newUserData = new Dl(userData);
      await newUserData.save();
      res.json(newUserData).status(200);
    }catch (error) {
      console.error(error);
      res.status(404).json(error)
    }
  }
