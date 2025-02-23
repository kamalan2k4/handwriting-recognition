# ✍️ Handwriting Recognition Web App

## 📌 Overview
This project is a **handwriting recognition web application** that allows users to write on a **canvas** using a **stylus (or mouse)** and converts handwritten text into machine-readable format. The application supports mathematical expressions and symbols.

The backend uses **Microsoft's TrOCR (Transformer-based OCR model)** for handwriting recognition, while the frontend provides an **interactive, stylized UI**.

## 🚀 Live Demo
🔗 **Backend API**: [https://your-render-url.onrender.com/docs](https://your-render-url.onrender.com/docs)  
🔗 **Frontend**: [https://your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)

## 📸 Screenshots
| Writing on Canvas | Recognized Output |
|------------------|------------------|
| ![Canvas](./screenshots/canvas.png) | ![Output](./screenshots/output.png) |

## 🏗️ Tech Stack
- **Frontend**: Next.js (React 19), Tailwind CSS, Framer Motion, Three.js
- **Backend**: FastAPI, Uvicorn
- **Machine Learning Model**: TrOCR (Microsoft Transformer OCR)
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## 🧠 **Why TrOCR for Handwriting Recognition?**
### ✅ **Advantages of TrOCR:**
- Uses **Vision Transformers (ViT) and GPT-like architecture** for **better recognition accuracy**.
- Pre-trained on diverse handwriting datasets, making it **robust for real-world usage**.
- **No manual feature engineering required**—it learns directly from raw image inputs.

### 🔍 **Why Not Other Models?**
| Model | Reason Not Selected |
|--------|-------------------|
| Tesseract OCR | Works better for printed text, struggles with handwriting. |
| EasyOCR | Less accurate for complex handwriting. |
| CRNN + CTC | Requires additional pre-processing for training. |

Based on our evaluation, **TrOCR outperforms other models for handwritten text recognition**.

---

## 🛠️ **Installation & Setup**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/kamalan2k4/handwriting-recognition.git
cd handwriting-recognition
```

### **2️⃣ Backend Setup**
#### 📌 **Requirements:** Python 3.10+
```bash
cd backend
python -m venv env  # Create a virtual environment
source env/bin/activate  # Activate environment (Linux/macOS)
# For Windows: env\Scripts\activate
pip install -r requirements.txt  # Install dependencies
uvicorn main:app --host 0.0.0.0 --port 8000 --reload  # Start server
```
🔗 Open API docs at: **[http://localhost:8000/docs](http://localhost:8000/docs)**

### **3️⃣ Frontend Setup**
#### 📌 **Requirements:** Node.js 18+
```bash
cd ../frontend
npm install  # Install dependencies
npm run dev  # Start development server
```
🔗 Open frontend at: **[http://localhost:3000](http://localhost:3000)**

---

## 🖥️ **Project Structure**
```
handwriting-recognition/
│── backend/            # FastAPI Backend
│   ├── main.py         # API Endpoints
│   ├── requirements.txt # Dependencies
│   ├── runtime.txt      # Python version for Render
│── frontend/           # Next.js Frontend
│   ├── app/page.tsx    # Main UI
│   ├── components/     # UI Components
│── README.md           # Documentation
```

---

## 🚀 **Deployment**
### **Deploy Backend on Render**
1️⃣ Go to **Render Dashboard** → Create **New Web Service**
2️⃣ Connect **GitHub Repo** → Set Environment Variables:
   ```
   PYTHON_VERSION=3.10.12
   PORT=8000
   ```
3️⃣ **Build Command:**
   ```bash
   pip install -r requirements.txt
   ```
4️⃣ **Start Command:**
   ```bash
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

### **Deploy Frontend on Vercel**
1️⃣ Go to **Vercel Dashboard** → Import GitHub Repo
2️⃣ Set Environment Variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-render-url.onrender.com
   ```
3️⃣ Click **Deploy** 🚀

---

## 📜 **License**
This project is **open-source** under the [MIT License](LICENSE).

## 📞 **Contact**
If you have any questions, feel free to **reach out**:
📧 Email: [your-email@example.com](mailto:your-email@example.com)  
🐦 Twitter: [@yourhandle](https://twitter.com/yourhandle)  

🔥 **Star this repo** if you found it useful! ⭐

