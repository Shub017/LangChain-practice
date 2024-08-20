import fs from 'fs';
import pdf from 'pdf-parse';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import 'dotenv/config';

// Function to extract text from a PDF file
const extractTextFromPDF = async (pdfPath) => {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdf(dataBuffer);
  return data.text;
};

// Function to generate interview questions using Google Generative AI
const generateInterviewQuestions = async (text) => {
  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-pro",
    // temperature: 0, //can vary between 0 to 1 and in some implementation can go beyond 1
    maxRetries: 2,
    apiKey: process.env.google_AI, // Ensure your API key is set in .env file
  });

  const prompt = `Based on the following candidate profile, generate a set of relevant interview questions:\nExperience: ${text.Experience}\nTech Stack: ${text.Tech_stack}\nTechnologies: ${text.Technologies}\nPlease generate around 5-10 interview questions.`;

  const response = await llm.invoke([
     ["user", prompt]
  ]);

  return response.content;
};

// Main function
const main = async () => {
  const pdfPath = './Shubham_Upadhyay_Updated.pdf'; // Ensure this path is correct

  // Step 1: Extract text from the PDF
  const extractedTextRaw = await extractTextFromPDF(pdfPath);
  console.log(extractedTextRaw);
  // Simulated extraction of relevant data from the raw text
  const extractedText = {
    Experience: '5 years',
    Tech_stack: 'MERN',
    Technologies: 'NodeJS, Python, MongoDB, ReactJS, ExpressJS, HTML, CSS, JavaScript, DSA, SQL'
  };

  // Step 2: Generate interview questions based on the extracted text
  const interviewQuestions = await generateInterviewQuestions(extractedText);

  console.log('Generated Interview Questions:');
  console.log(interviewQuestions);
};

main();

//link for gemini embedding: https://python.langchain.com/v0.2/docs/integrations/text_embedding/google_generative_ai/
