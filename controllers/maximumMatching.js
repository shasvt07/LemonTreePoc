import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";
globalThis.fetch = fetch;
import dotenv from "dotenv";
dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_GENERATIVE_AI_API_KEY);


function validate(input){
  var arr = []
  if(input.includes('arr1')) arr.push('arr1');
  if(input.includes('arr2')) arr.push('arr2');
  if(input.includes('arr3')) arr.push('arr3');

  if(arr.length === 0) return [];
  if(arr.length > 1) return [];
  if(arr.length === 1) return arr;
}


export const maximumMatching = async (req,res) => {
    try { 

      const givenString = req.body.givenString;
      console.log(givenString);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const arrays = {
        arr1: ["check-in", "self-check-in process", "entry process", "check me in", "check-in-process"],
        arr2: ["check out", "self checkout", "self checkout process", "exit process", "check me out", "checkout process"],
        arr3: ["booking", "Walk-In", "book room", "book me a room", "book"],
      };
      const prompt = `Find the givenString maximum matches to which of the given varaitions array and give me the names of the arrays only else give no matches found as the we have 3 arrays arr1, arr2, arr3
      given arrays: 
      arr1: ["check in", "self check in process", "entry process", "check me in", "check in process"],
      arr2: ["booking", "Walk In", "book room", "book me a room", "book"],
      arr3: ["check out", "self checkout", "self checkout process", "exit process", "check me out", "checkout process"],
      `;
      const geminiInput = Object.values(arrays).flat().join(' ');
  
      const content = [
        { partType: 'Prompt', value: prompt },
        { partType: 'User', value: givenString },
        { partType: 'External', value: arrays},
      ];

      const input = Object.values(content).flat().join(' ');
  
      const result = await model.generateContent([prompt, givenString]);
      const response = await result.response;
      const text = await response.text();
      // console.log(response);
      console.log(text);
      const temp = validate(text);
      console.log(temp);
      if(temp.length===0) res.status(404).json("No matches found");
      else res.status(200).json(String(temp[0]));
      
    } catch (error) {
      // console.log(error.message);
      res.status(400).json({message:error.message});
    }
  };

