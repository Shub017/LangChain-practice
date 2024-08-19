// Code without langchain
import 'dotenv/config'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { ChatPromptTemplate } from '@langchain/core/prompts';

// // For authentication, we will 
// const genAI = new GoogleGenerativeAI(process.env.google_AI)

// async function run() {
//     const model = genAI.getGenerativeModel({model: "gemini-pro"})
//     console.log(model);

//     const prompt = "Who is Luke skywalker in starwars? Explain little bit about him.";
//     const response = await model.generateContent(prompt);
//     console.log(response.response.text());
// }

// run();

// With llms:

// Creating model that can used repeatedly 
// const llm = new ChatGoogleGenerativeAI({
//     model: "gemini-1.5-pro",
//     temperature: 0,
//     maxRetries: 2,
//     apiKey: process.env.google_AI
//     // other params...
//   });

// //   Use case 1
//   const aiMsg = await llm.invoke([
//     [
//       "system",
//       "You are a helpful assistant that translates English to French. Translate the user sentence.",
//     ],
//     ["human", "I love programming."],
//   ]);
//   console.log(aiMsg.content);

// //   Use case 2
//   const aiMsg2 = await llm.invoke([
//     ["system", "Answer the question with details"],
//     ["human", "What is Java Script?"]
//   ]);

//   console.log(aiMsg2.content);


//   Note-: Observer How we do not have to repeatedly define our model and isntead
//      we could use the same one again and again


// Text to chat

// Providing conversation or context for answering a prompt

// import 'dotenv/config';
// import { ChatGoogleGenerativeAI } from 'langchain';

// Creating model that can be used repeatedly
const llm = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-pro",
    temperature: 0,
    maxRetries: 2,
    apiKey: process.env.GOOGLE_AI // Ensure this environment variable is correctly set
});

// // Function to include conversation history
// async function getResponseWithHistory(conversationHistory, newPrompt) {
//     // Append the new prompt to the conversation history
//     const fullConversation = [
//         ["system", "You are a helpful assistant."],
//         ...conversationHistory, // Include the conversation history
//         ["human", newPrompt] // The new user prompt
//     ];

//     // Invoke the model with the full conversation
//     const aiMsg = await llm.invoke(fullConversation);
//     return aiMsg.content;
// }

// // Example usage
// const conversationHistory = [
//     ["human", "Hey my name is Shubham"],
//     ["assistant", "Hey Shubham! How can I help you?"],
    
// ];

// const newPrompt = "Tell me something about yourself in brief";

// const response = await getResponseWithHistory(conversationHistory, newPrompt);
// console.log(response);



let memoryBuffer = [];

function addToMemoryBuffer(role, message) {
    memoryBuffer.push([role, message]);
}

// Response with memory:
async function getResponseWithMemory(newPrompt) {
    try {
        // Include system message and memory buffer in the conversation
        const fullConversation = [
            ["system", "You are a helpful assistant. Respond based on the conversation history."],
            ...memoryBuffer,
            ["human", newPrompt]
        ];

        // Get response from the model
        const aiMsg = await llm.invoke(fullConversation);

        // Add the new response to memory buffer
        addToMemoryBuffer("assistant", aiMsg.content);

        return aiMsg.content;
    } catch (error) {
        console.error('Error generating response:', error);
        // Handle or log the error as needed
    }
}


// Example usage
const userPrompt1 = "Hey my name is Albert?";
const response1 = await getResponseWithMemory(userPrompt1);
console.log('Response 1:', response1);

const userPrompt2 = "What is 1+1?";
const response2 = await getResponseWithMemory(userPrompt2);
console.log('Response 2:', response2);

const userPrompt3 = "What is my name?";
const response3 = await getResponseWithMemory(userPrompt3);
console.log('Response 3:', response3);
