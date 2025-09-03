import { useState, useRef, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import "./App.css";

import Header from "./components/Header.jsx";
import TemplateUpload from "./components/TemplateUpload";
import NamesInput from "./components/NamesInput";
import GradesInput from "./components/GradesInput";
import Settings from "./components/Settings";
import GenerateButton from "./components/GenerateButton";
import CertificatesPreview from "./components/CertificatesPreview";
import TemplatePreview from "./components/TemplatePreview";
import { jsPDF } from "jspdf";

export default function App() {
  const [template, setTemplate] = useState(null);
  const [templateImage, setTemplateImage] = useState(null); // For natural dimensions
  const [names, setNames] = useState("");
  const [grades, setGrades] = useState("");
  const [fontColor, setFontColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(32);
  const [positions, setPositions] = useState({
    name: { x: 100, y: 100 },
    grade: { x: 300, y: 100 },
  });
  const [generated, setGenerated] = useState([]);
  const [activeField, setActiveField] = useState("name");
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [scale, setScale] = useState({ x: 1, y: 1 });

  // ✅ Load custom font on mount
  useEffect(() => {
    const loadFont = async () => {
      const font = new FontFace("Yummy", "url(/src/assets/Yummy.ttf) format('truetype')");
      await font.load();
      document.fonts.add(font);
      console.log("Font Yummy loaded!");
    };
    loadFont();
  }, []);

  // ✅ Update scale when template or positions change
  useEffect(() => {
    if (!imgRef.current) return;

    const img = imgRef.current;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    const displayedWidth = img.clientWidth;
    const displayedHeight = img.clientHeight;

    setScale({
      x: displayedWidth / naturalWidth,
      y: displayedHeight / naturalHeight,
    });
  }, [template, positions]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTemplate(url);

      const img = new Image();
      img.onload = () => {
        setTemplateImage(img);
      };
      img.src = url;

      setGenerated([]);
    }
  };

  const handlePickPosition = (e) => {
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale.x;
    const y = (e.clientY - rect.top) / scale.y;

    setPositions((prev) => ({
      ...prev,
      [activeField]: { x, y },
    }));
  };
  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([uintArray], { type: "image/png" });
  };

  const generateCertificates = async () => {
    if (!templateImage) {
      alert("Upload a template first!");
      return;
    }

    await document.fonts.ready;
    console.log("All fonts are ready, drawing now...");

    const namesArr = names
      .split("\n")
      .map((n) => n.trim())
      .filter(Boolean);

    const gradesArr = grades
      .split("\n")
      .map((g) => g.trim())
      .filter(Boolean);

    const results = [];

    for (let i = 0; i < namesArr.length; i++) {
      const name = namesArr[i];
      const grade = gradesArr[i] || "";

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = templateImage.naturalWidth;
      canvas.height = templateImage.naturalHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(templateImage, 0, 0);

      ctx.fillStyle = fontColor;
      ctx.textAlign = "right";
      ctx.direction = "rtl";

      // ✅ Draw Name
      ctx.font = `${fontSize}px "Yummy", Arial, sans-serif`;
      ctx.fillText(name, positions.name.x, positions.name.y);

      // ✅ Draw Grade if exists
      if (grade) {
        ctx.fillText(`درجة: ${grade}`, positions.grade.x, positions.grade.y);
      }

      const dataURL = canvas.toDataURL("image/png");
      results.push({ image: dataURL, name });
    }

    setGenerated(results);
  };

  const downloadAll = () => {
    if (generated.length === 0) {
      alert("No certificates generated yet!");
      return;
    }

    const zip = new JSZip();

    generated.forEach((cert, idx) => {
      const fileName = cert.name.replace(/[\\/:*?"<>|]/g, "_") || `certificate-${idx + 1}`;
      const imgData = dataURLtoBlob(cert.image); // Convert base64 to Blob
      zip.file(`${fileName}.png`, imgData);
    });

    zip
      .generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 9 },
      })
      .then((content) => {
        saveAs(content, "certificates.zip");
      })
      .catch((err) => {
        console.error("Error generating ZIP file:", err);
      });
  };

  return (
    <div className="p-6 space-y-4 max-w-6xl mx-auto" dir="rtl">
      <Header />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <TemplateUpload handleUpload={handleUpload} />
          <NamesInput names={names} setNames={setNames} />
          <GradesInput grades={grades} setGrades={setGrades} />
          <Settings
            activeField={activeField}
            setActiveField={setActiveField}
            positions={positions}
            fontSize={fontSize}
            setFontSize={setFontSize}
            fontColor={fontColor}
            setFontColor={setFontColor}
          />

          <GenerateButton generateCertificates={generateCertificates} template={template} names={names} />
          <CertificatesPreview generated={generated} downloadAll={downloadAll} />
        </div>

        <div className="space-y-4">
          <TemplatePreview
            template={template}
            ff
            activeField={activeField}
            imgRef={imgRef}
            handlePickPosition={handlePickPosition}
          />
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
