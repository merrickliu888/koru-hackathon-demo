import fastapi
from starlette.middleware.cors import CORSMiddleware
from fastapi import Request, Depends, UploadFile, Form
from google import genai
from cohere import AsyncClientV2 as CohereClient
from clients import inject_google_genai_client, inject_cohere_client
from llm import process_images, generate_form
from constants_and_types import ChatRequest
from fastapi.responses import StreamingResponse
import json
import io
import PIL.Image

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

    async def stream_response():
        stream = cohere_client.chat_stream(
            model="command-r-plus",
            messages=messages,
        )
        async for chunk in stream:
            if chunk.type == "content-delta":
                yield chunk.delta.message.content.text

    return StreamingResponse(stream_response(), media_type="text/event-stream")

@app.post("/api/generate-lesson-plan")
async def generate_lesson_plan(
    files: list[UploadFile] = None,
    additionalInformation: str = Form(...),
    period1_topic: str = Form(None),
    period2_topic: str = Form(None),
    period3_topic: str = Form(None),
    period4_topic: str = Form(None),
    period5_topic: str = Form(None),
    period6_topic: str = Form(None),
    period7_topic: str = Form(None),
    period8_topic: str = Form(None),
    gemini_client: genai.Client = Depends(inject_google_genai_client),
    cohere_client: CohereClient = Depends(inject_cohere_client)
):
    topics = {
        "period1": period1_topic,
        "period2": period2_topic,
        "period3": period3_topic,
        "period4": period4_topic,
        "period5": period5_topic,
        "period6": period6_topic,
        "period7": period7_topic,
        "period8": period8_topic,
    }
    
    processed_images = []
    if files:
        # Convert uploaded files to PIL Images
        for file in files:
            contents = await file.read()
            image = PIL.Image.open(io.BytesIO(contents))
            processed_images.append(image)
            
        processed_images = await process_images(gemini_client, processed_images)
    
    print("PROCESSED IMAGESSS", processed_images)
    form = await generate_form(cohere_client, additionalInformation, processed_images, topics)
    return {"form": form}
