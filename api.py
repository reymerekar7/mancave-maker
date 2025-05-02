# api.py   ← put at the project root or in a backend/ folder
import base64
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os
from PIL import Image
import io
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"])

client = OpenAI()  # uses OPENAI_API_KEY from env

PROMPT = (
    "Turn this room into a cozy man cave with a realistic furniture layout "
    "and warm lighting. Keep the perspective consistent."
)

@app.post("/api/transform")
async def transform_room(room: UploadFile = File(...)):
    # Read the image file
    image_bytes = await room.read()
    
    # Convert to PIL Image to ensure proper format
    image = Image.open(io.BytesIO(image_bytes))
    
    # Convert to RGB if necessary (handles PNG with alpha channel)
    if image.mode in ('RGBA', 'LA') or (image.mode == 'P' and 'transparency' in image.info):
        image = image.convert('RGB')
    
    # Save to bytes with JPEG format
    output = io.BytesIO()
    image.save(output, format='JPEG', quality=95)
    image_bytes = output.getvalue()
    
    # Create a file-like object with the correct MIME type
    file_obj = io.BytesIO(image_bytes)
    file_obj.name = "image.jpg"  # This sets the MIME type
    
    resp = client.images.edit(
        model="gpt-image-1",
        image=[file_obj],
        prompt=PROMPT,
        size="1024x1024",
        n=1,
    )
    b64 = resp.data[0].b64_json
    return {"b64": b64}                        # front-end can <img src="data:..."></file>