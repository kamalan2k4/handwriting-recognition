from fastapi import FastAPI, File, UploadFile
import torch
from PIL import Image
from transformers import TrOCRProcessor, VisionEncoderDecoderModel
import io
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Enable CORS for both local and production frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://handwriting-recognition-phi.vercel.app/"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the pre-trained TrOCR model
print("🔄 Loading Model...")
try:
    processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-handwritten")
    model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-handwritten")
    model.to("cpu")  # Ensure model runs on CPU to avoid memory crashes
    print("✅ Model Loaded Successfully")
except Exception as e:
    print(f"❌ Model Load Failed: {e}")

def recognize_handwriting(image: Image.Image):
    try:
        pixel_values = processor(images=image, return_tensors="pt").pixel_values
        with torch.no_grad():
            generated_ids = model.generate(pixel_values)
        text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
        print("🔍 Recognized Text:", text)
        return text
    except Exception as e:
        print(f"❌ Error in recognition: {e}")
        return "Recognition Failed"

@app.post("/recognize")
async def recognize_handwritten_math(file: UploadFile = File(...)):
    try:
        image = Image.open(io.BytesIO(await file.read())).convert("RGB")
        image.save("received_image.png")  # Debugging
        print("✅ Image saved as received_image.png")

        recognized_text = recognize_handwriting(image)
        return {"latex": recognized_text}
    except Exception as e:
        print(f"❌ Error processing request: {e}")
        return {"error": "Failed to process image"}

# Port binding for Render
PORT = int(os.getenv("PORT", 8000))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)
