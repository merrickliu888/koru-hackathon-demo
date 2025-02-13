import fastapi
from starlette.middleware.cors import CORSMiddleware
from fastapi import Request, Depends, UploadFile
from google import genai
from cohere import AsyncClientV2 as CohereClient
from clients import inject_google_genai_client, inject_cohere_client
from llm import process_images, generate_form
from constants_and_types import ChatRequest
from fastapi.responses import StreamingResponse
import json

app = fastapi.FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/chat")
async def chat(request: ChatRequest, cohere_client: CohereClient = Depends(inject_cohere_client)):
    messages = request.messages
    lesson_plan = request.lesson_plan
    user_prompt = messages[-1].content
    system_prompt = {
        "role": "system",
        "content": "You are a helpful assistant that can answer questions and help with tasks. Your goal is to help the user understand the contents of a lesson plan."
    }
    modified_prompt = "Here is the lesson plan: " + json.dumps(lesson_plan) + "\n\n" + "Here is the user's prompt: " + user_prompt
    messages[-1].content = modified_prompt
    messages = [system_prompt] + messages

    response = await cohere_client.chat(
        model="command-r-plus",
        messages=messages,
    )

    return response.message.content[0].text

@app.post("/api/generate-lesson-plan")
async def generate_lesson_plan(request: Request, 
                            #    files: list[UploadFile] | None, 
                               gemini_client: genai.Client = Depends(inject_google_genai_client), 
                               cohere_client: CohereClient = Depends(inject_cohere_client)):
    print("HERE")
    body = await request.json()
    # if files:
    #     processed_images = await process_images(gemini_client, files)
    # else:
    #     processed_images = []
    form = await generate_form(cohere_client, body["additionalInformation"], [])
    return {"form": form}
