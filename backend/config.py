import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    COHERE_API_KEY: str = os.getenv("COHERE_API_KEY")

settings = Settings()
