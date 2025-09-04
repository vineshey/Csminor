import knowledgeBase from './knowledgeBase';

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

async function fetchGeminiAnswer(message) {
  const prompt = `You are a helpful and friendly chatbot for a skin health information website. Answer the user's question clearly and concisely. Do not provide medical diagnoses or advice. The user's question is: "${message}"`;

  const geminiRequest = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiRequest),
    });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't get an answer from Gemini.";
  } catch (error) {
    return "Sorry, there was an error connecting to Gemini.";
  }
}

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleUserMessage = async (message) => {
    const lowerCaseMessage = message.toLowerCase();
    let responseText = knowledgeBase['default'];

    for (const keyword in knowledgeBase) {
      if (lowerCaseMessage.includes(keyword)) {
        responseText = knowledgeBase[keyword];
        break;
      }
    }

    // If not found in knowledge base, call Gemini API
    if (responseText === knowledgeBase['default']) {
      responseText = await fetchGeminiAnswer(message);
    }

    const botMessage = this.createChatBotMessage(responseText);
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, botMessage],
    }));
  };
}

export default ActionProvider;