from fastapi import FastAPI, File, UploadFile
import torch
from PIL import Image
from transformers import TrOCRProcessor, VisionEncoderDecoderModel
import io
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load the pre-trained Microsoft TrOCR model
processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-handwritten")
model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-handwritten")

# def recognize_handwriting(image: Image.Image):
#     pixel_values = processor(images=image, return_tensors="pt").pixel_values
#     with torch.no_grad():
#         generated_ids = model.generate(pixel_values)
#     text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
#     return text

def recognize_handwriting(image: Image.Image):
    pixel_values = processor(images=image, return_tensors="pt").pixel_values
    with torch.no_grad():
        generated_ids = model.generate(pixel_values)
    text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
    
    print("🔍 Recognized Text:", text)  # Debugging Output
    return text


# @app.post("/recognize")
# async def recognize_handwritten_math(file: UploadFile = File(...)):
#     image = Image.open(io.BytesIO(await file.read())).convert("RGB")
#     recognized_text = recognize_handwriting(image)
#     return {"latex": recognized_text}
@app.post("/recognize")
async def recognize_handwritten_math(file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read())).convert("RGB")

    # Save the received image for debugging
    image.save("received_image.png")  
    print("✅ Image saved as received_image.png")

    recognized_text = recognize_handwriting(image)
    print("🔍 Recognized Text:", recognized_text)  # Debugging Output
    return {"latex": recognized_text}

