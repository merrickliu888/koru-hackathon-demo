from fastapi import UploadFile
from io import BytesIO
from pdf2image import convert_from_bytes
import PIL.Image

def convert_pdf_to_image(file_bytes: bytes):
    return convert_from_bytes(file_bytes)

async def process_files_to_images(files: list[UploadFile]):
    images = []

    for file in files:
        file_bytes = await file.read()
        if file.content_type == "application/pdf":
            images.append(convert_pdf_to_image(file_bytes))
        else:
            images.append(PIL.Image.open(BytesIO(file_bytes)))

    return images