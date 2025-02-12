import fastapi
from starlette.middleware.cors import CORSMiddleware
from fastapi import Request, Depends, UploadFile
from google import genai
from cohere import ClientV2 as CohereClient
from clients import inject_google_genai_client, inject_cohere_client
from llm import process_images, generate_form

app = fastapi.FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("generate-lesson-plan")
async def generate_lesson_plan(request: Request, 
                               files: list[UploadFile] | None, 
                               gemini_client: genai.Client = Depends(inject_google_genai_client), 
                               cohere_client: CohereClient = Depends(inject_cohere_client)):
    body = await request.json()
    if files:
        processed_images = await process_images(gemini_client, files)
    else:
        processed_images = []
    form = await generate_form(cohere_client, body.context, processed_images)
    return {"form": form}
