from supabase import acreate_client, AsyncClient as SupabaseClient
from google import genai
from cohere import ClientV2 as CohereClient
import os
from dotenv import load_dotenv

load_dotenv()

COHERE_API_KEY = os.getenv("COHERE_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

async def inject_supabase_client() -> SupabaseClient:
    return await acreate_client(SUPABASE_URL, SUPABASE_KEY)

def inject_cohere_client() -> CohereClient:
    return CohereClient(COHERE_API_KEY)

def inject_google_genai_client() -> genai.Client:
    return genai.Client(api_key=GEMINI_API_KEY)