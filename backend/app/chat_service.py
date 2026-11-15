import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load environment variables
load_dotenv()

MODEL_NAME = "gemini-3.5-flash-lite"


def generate_chat_response(message, train_context="", history=None):
    """
    Generate a RailPulse AI chatbot response.

    message: Current passenger question
    train_context: Verified information supplied by the backend
    history: Previous conversation messages
    """

    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        return "Gemini API key is not configured. Please check the backend .env file."

    if not message or not message.strip():
        return "Please enter a question."

    try:
        client = genai.Client(
            api_key=api_key,
            http_options=types.HttpOptions(timeout=60000)
        )

        conversation_history = ""

        if history:
            for item in history[-8:]:
                role = item.get("role", "user")
                content = item.get("content", "")

                if role in ("user", "assistant") and content:
                    conversation_history += (
                        f"{role.upper()}: {content}\n"
                    )

        prompt = f"""
You are RailPulse AI, an intelligent railway passenger assistant.

YOUR RESPONSIBILITIES:
1. Answer passenger questions in simple, helpful language.
2. Explain train delays and estimated arrival information.
3. Help passengers understand connecting-train risks.
4. Explain RailPulse AI features when asked.
5. Understand follow-up questions using conversation history.

IMPORTANT RULES:
- Use only the verified backend information provided below.
- Never invent train locations, timings, delays, stations or availability.
- If information is missing, clearly say that it is not available.
- Do not claim that you can book, cancel or rebook tickets.
- Do not claim that train data is live.
- RailPulse AI currently uses simulated demonstration data.
- Distinguish scheduled arrival from predicted arrival.
- Be honest about uncertainty.
- Keep answers clear and reasonably concise.

VERIFIED TRAIN INFORMATION:
{train_context if train_context else "No train information has been supplied for this question."}

PREVIOUS CONVERSATION:
{conversation_history if conversation_history else "No previous conversation."}

CURRENT PASSENGER QUESTION:
{message}

Answer the passenger now.
"""

        response = client.interactions.create(
            model=MODEL_NAME,
            input=prompt
        )

        answer = response.output_text

        if not answer:
            return "I couldn't generate a response. Please try again."

        return answer.strip()

    except Exception as error:
        print("RailPulse Gemini Error:", str(error))
        return (
            "I'm having trouble connecting to the AI service right now. "
            "Please try again shortly."
        )