"use client";
import { useRef, useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

export default function HandwritingCanvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");

  useEffect(() => {
    clearCanvas();
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setRecognizedText("");
  };

  const processImage = async () => {
    const canvas = canvasRef.current;
    const imageBlob = await new Promise(resolve => canvas.toBlob(resolve, "image/png", 1.0));
    
    if (!imageBlob) {
      console.error("Canvas image capture failed.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageBlob, "canvas-drawing.png");
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recognize`, {
        method: "POST",
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setRecognizedText(data.latex || "Recognition failed");
    } catch (error) {
      console.error("Error recognizing handwriting", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white font-mono">
      {/* Fullscreen Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas className="w-full h-full">
          <ambientLight intensity={1} />
          <OrbitControls enableZoom={false} />
          <Stars radius={200} depth={150} count={8000} factor={8} fade speed={3} />
        </Canvas>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full">
        <motion.h1 
          className="text-5xl font-extrabold text-cyan-400 drop-shadow-lg mb-6 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Magic Handwriting Recognition
        </motion.h1>
        
        <motion.canvas
          ref={canvasRef}
          width={600}
          height={300}
          className="border-4 border-gray-700 rounded-lg shadow-2xl bg-black/70 backdrop-blur-md"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        <div className="flex gap-6 mt-6">
          <Button className="bg-red-600 px-6 py-3 rounded-lg hover:scale-105 transition-transform" onClick={clearCanvas}>Clear</Button>
          <Button className="bg-green-600 px-6 py-3 rounded-lg hover:scale-105 transition-transform" onClick={processImage}>Recognize</Button>
        </div>
        
        {recognizedText && (
          <motion.div 
            className="mt-6 p-6 border border-gray-700 bg-gray-900/90 rounded-lg text-center shadow-2xl backdrop-blur-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-cyan-300 mb-2">Recognized Expression:</p>
            <BlockMath math={recognizedText} className="text-2xl text-green-400" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
