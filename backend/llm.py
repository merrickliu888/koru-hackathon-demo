import PIL.Image
from google import genai
from cohere import ClientV2 as CohereClient
from constants_and_types import ProcessImageResponse, ProcessedImage, GENERATED_FORM_JSON_SCHEMA

async def process_images(gemini_client: genai.Client, images: list[PIL.Image.Image]):
    prompt = "Extract the text from the image. Provide the title and description of the image."
    contents = images + [prompt]
    response = await gemini_client.aio.models.generate_content(
        model='gemini-2.0-flash',
        contents=contents,
        config={
            'response_mime_type': 'application/json',
            'response_schema': ProcessImageResponse,
        },
    )
    return response.parsed

async def generate_form(cohere_client: CohereClient, teacher_context: str, processed_images: list[ProcessedImage]):
    documents = [{"id": i, "data": {"text": processed_image.description, "title": processed_image.title}} for i, processed_image in enumerate(processed_images)]

    response = await cohere_client.chat(
        model="command-r-plus",
        messages = [
            {
                "role": "user",
                "content": f"Generate a JSON Lesson plan based on the following documents. Here is also some context provided by the teacher: {teacher_context}",
            }
        ],
        documents=documents,
        response_format={
            "type": "json_object",
            "schema": GENERATED_FORM_JSON_SCHEMA
        },
        temperature=0.2,
    )
    return response.text


