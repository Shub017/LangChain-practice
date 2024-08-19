import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import 'dotenv/config'



// Initialize the prompt template
const prompt = ChatPromptTemplate.fromTemplate("Tell me a {adjective} joke");


// Initialize the OpenAI chat model with the API key
const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY, 
    modelName: 'gpt-4', 
    temperature: 1.0
});

// Create the chain by piping the prompt into the model
const chain = prompt.pipe(llm);

// Function to get a reply from the model
async function getGPTReply(adjective) {
    try {
        const response = await chain.invoke({ adjective });
        console.log('GPT Reply:', response.content);
    } catch (error) {
        console.error('Error fetching GPT reply:', error);
    }
}

// Example usage
getGPTReply('funny');
