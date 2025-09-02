import { useState, useRef, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import "./App.css";

// Components
import Header from "./components/Header.jsx";
import TemplateUpload from "./components/TemplateUpload";
import NamesInput from "./components/NamesInput";
import GradesInput from "./components/GradesInput";
import Settings from "./components/Settings";
import GenerateButton from "./components/GenerateButton";
import CertificatesPreview from "./components/CertificatesPreview";
import TemplatePreview from "./components/TemplatePreview";

export default function App() {
  const [template, setTemplate] = useState(null);
  const [names, setNames] = useState("");
  const [grades, setGrades] = useState("");
  const [positions, setPositions] = useState({
    name: { x: 100, y: 100 },
    grade: { x: 300, y: 100 },
  });
  const [fontSize, setFontSize] = useState(32);
  const [generated, setGenerated] = useState([]);
  const [activeField, setActiveField] = useState("name");

  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [scale, setScale] = useState({ x: 1, y: 1 });

  // Update scale factors whenever template or positions change
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
      setGenerated([]);
    }
  };

  const handlePickPosition = (e) => {
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale.x; // Convert back to natural image coords
    const y = (e.clientY - rect.top) / scale.y;

    setPositions((prev) => ({
      ...prev,
      [activeField]: { x, y },
    }));
  };

  const generateCertificates = () => {
    if (!template) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.src = template;
    img.onload = () => {
      const certs = [];

      const namesArr = names
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const gradesArr = grades
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      namesArr.forEach((name, idx) => {
        const grade = gradesArr[idx] || "";

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        ctx.font = `${fontSize}px "Tahoma", "Arial", sans-serif`;
        ctx.fillStyle = "black";
        ctx.direction = "rtl";
        ctx.textAlign = "right";

        const studentName = name;
        const studentGrade = grade ? `درجة: ${grade}` : "";

        ctx.fillText(studentName, positions.name.x, positions.name.y);
        if (studentGrade) {
          ctx.fillText(studentGrade, positions.grade.x, positions.grade.y);
        }

        const dataURL = canvas.toDataURL("image/png");
        certs.push({
          image: dataURL,
          name: studentName,
        });
      });

      setGenerated(certs);
    };
  };

  const downloadAll = () => {
    const zip = new JSZip();

    generated.forEach((cert, idx) => {
      const fileName = cert.name.replace(/[\\/:*?"<>|]/g, "_") || `certificate-${idx + 1}`;
      const imgData = dataURLtoBlob(cert.image);
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

  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([uintArray], { type: "image/png" });
  };

  return (
    <div className="p-6 space-y-4 max-w-6xl mx-auto" dir="rtl">
      <Header />

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
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
          />
          <GenerateButton generateCertificates={generateCertificates} template={template} names={names} />
          <CertificatesPreview generated={generated} downloadAll={downloadAll} />
        </div>

        {/* Preview Section */}
        <div className="space-y-4">
          <TemplatePreview
            template={template}
            activeField={activeField}
            imgRef={imgRef}
            handlePickPosition={handlePickPosition}
          />
        </div>
      </div>

      {/* Hidden canvas */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
