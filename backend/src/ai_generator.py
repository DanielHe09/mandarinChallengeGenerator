#script for sending a request to openAI

import os 
import json
from openai import OpenAI
from typing import Dict, Any 
from dotenv import load_dotenv


load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

#uses the typing library to specify that the function returns a dictionary with str keys and 'Any' values
def generate_challenge_with_ai(difficulty: str) -> Dict[str, Any]:
    #three quotation marks make it a "docstring": special type of string that serves as documentation for the function
    system_prompt = """You are an expert mandarin (language) challenge creator. 
    Your task is to generate a mandarin question with multiple choice answers.
    The question should be appropriate for the specified difficulty level.

    MCQ rules:
    - Exactly 4 options (A–D implicit by index 0–3), ONE clearly correct answer.
    - Options must be similar in length and style; no “All/None of the above”.
    - No duplicate or near-identical options; avoid clues from punctuation/length.
    - Use plausible distractors: minimal pairs, near-synonyms, wrong measure words, incorrect word order, or aspect/particle errors.
    - Keep content culturally neutral and classroom-safe.

    For easy questions: Very short, clear recognition tasks. Match characters to meaning, tones, or simple vocab. Example: “Which one means 'apple'?”
    For medium questions: Slightly longer sentences (≤15 characters). Grammar fill-in-the-blank, short sentence meaning, or basic comprehension.
    For hard questions: Short passages (20–40 characters) or tricky grammar distinctions, but still answerable in one multiple-choice selection. Examples:
        Pick the correct sentence order from 4 options.
        Choose the correct particle (了/过/着) in context.
        Identify which sentence is grammatically correct.
        Select the best translation for a short phrase.

    Return the challenge in the following JSON structure:
    {
        "title": "The question title",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correct_answer_id": 0, // Index of the correct answer (0-3)
        "explanation": "Detailed explanation of why the correct answer is right"
    }

    Make sure the options are plausible but with only one clearly correct answer.
    """    
    try:
        #use the chat completions API instead of the Assistants API since it is better for simple one off conversations
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messsages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Generate a {difficulty} difficulty coding challenge"}
            ],
            response_format={"type": "json_object"},
            #the higher temperature you give the more random and creative a response the model wil give
            temperature=0.5
        )

        #downloading the chatGPT response and checking that all required_fields are in the response
        content = response.choices[0].message.content
        challenge_data= json.loads(content)

        required_fields = ["title", "options", "correct_answer_id", "explanation"]
        for field in required_fields:
            if field not in challenge_data:
                raise ValueError(f"Missing required field: {field}")

        return challenge_data

    except Exception as e:
        print(e)
            