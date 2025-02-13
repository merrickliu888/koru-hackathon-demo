import PIL.Image
from google import genai
from cohere import ClientV2 as CohereClient
from constants_and_types import ProcessImageResponse, ProcessedImage, GENERATED_FORM_JSON_SCHEMA

async def process_images(gemini_client: genai.Client, images: list[PIL.Image.Image]):
    prompt = "Extract the text from the image. Provide the title and description of the image."
    contents = images + [prompt]
    print("CONTENTSS", contents)
    response = await gemini_client.aio.models.generate_content(
        model='gemini-2.0-flash',
        contents=contents,
        config={
            'response_mime_type': 'application/json',
            'response_schema': ProcessImageResponse,
        },
    )
    return response.parsed

async def generate_form(cohere_client: CohereClient, additional_info: str, processed_images: list, topics: dict = None):
    # Convert ProcessedImage objects to document format
    documents_text = ""
    if processed_images:
        for i, image in enumerate(processed_images):
            documents_text += f"\nDocument {i + 1}:\nTitle: {image[1][0].title}\nDescription: {image[1][0].description}\n"

    # Add topics to the prompt if provided
    topics_str = ""
    if topics:
        topics_str = "\nPeriod topics:\n" + "\n".join([f"{k}: {v}" for k, v in topics.items() if v])

    response = await cohere_client.chat(
        model="command-r-plus",
        messages = [
            {
                "role": "user",
                "content": f"Generate a JSON Lesson plan based on the following documents:{documents_text}\n{topics_str}\nTeacher's context: {additional_info}\n\nRespond only with a JSON object that has the following fields: deliverables (array of strings), morning_routine (string), period_1 through period_8 (strings), morning_recess (string), lunch (string), afternoon_recess (string), and other_notes (string)",
            }
        ],
        response_format={
            "type": "json_object",
            "schema": GENERATED_FORM_JSON_SCHEMA
        },
        temperature=0.2,
    )

    print("RESPONSEE", response.message.content)
    return response.message.content[0].text


