import os
from openai import OpenAI # type: ignore
from dotenv import load_dotenv # type: ignore
load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_priority_suggestion(text: str) -> str:
    prompt = f"""
    Decide task priority: high, medium, low.

    Task: {text}

    Only return one word.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
    )

    return response.choices[0].message.content.strip().lower()