import fastapi
from starlette.middleware.cors import CORSMiddleware
from config import settings
import cohere
from pydantic import BaseModel

app = fastapi.FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

@app.post("/generate")
def generate(request: PromptRequest):
    co = cohere.ClientV2(settings.COHERE_API_KEY)
    response = co.chat(
        model="command-r-plus",
        messages=[
            {
                "role": "user",
                "content": request.prompt
            }
        ]
    )
    
    return {"message": response.message.content[0].text}