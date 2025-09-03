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
  const [customFields, setCustomFields] = useState([]);
  const [fontColor, setFontColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(32);
  const [selectedFont, setSelectedFont] = useState("Yummy");
  const [fontSettings, setFontSettings] = useState({
    name: { font: "Yummy", size: 32, color: "#000000" },
  });
  const [positions, setPositions] = useState({
    name: { x: 100, y: 100 },
  });
  const [generated, setGenerated] = useState([]);
  const [activeField, setActiveField] = useState("name");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [scale, setScale] = useState({ x: 1, y: 1 });

  // ✅ Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // ✅ Load custom font on mount
  useEffect(() => {
    const loadFonts = async () => {
      // Load Yummy font
      const yummyFont = new FontFace("Yummy", "url(/src/assets/Yummy.ttf) format('truetype')");
      await yummyFont.load();
      document.fonts.add(yummyFont);
      console.log("Font Yummy loaded!");

      const xbFont = new FontFace("xb", "url(/src/assets/xb.ttf) format('truetype')");
      await xbFont.load();
      document.fonts.add(xbFont);
      console.log("Font Yummy loaded!");

      // Load Google Fonts
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&family=Tajawal:wght@200;300;400;500;700;800;900&family=Almarai:wght@300;400;700;800&family=Readex+Pro:wght@160;200;300;400;500;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      console.log("Google Fonts loaded!");
    };
    loadFonts();
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

  // ✅ Add new custom field
  const addCustomField = () => {
    const newId = `field_${Date.now()}`;
    const newField = {
      id: newId,
      label: `الحقل ${customFields.length + 1}`,
      values: ""
    };

    // Add position for new field first
    const newPosition = { x: 300, y: 100 + (customFields.length * 50) };

    setCustomFields(prev => [...prev, newField]);
    setPositions(prev => ({
      ...prev,
      [newId]: newPosition
    }));

    // Add font settings for new field
    setFontSettings(prev => ({
      ...prev,
      [newId]: { font: "Yummy", size: 32, color: "#000000" }
    }));

    // Set as active field
    setActiveField(newId);
  };

  // ✅ Add multiple custom fields at once
  const addMultipleFields = (count = 5) => {
    const newFields = [];
    const newPositions = {};

    for (let i = 0; i < count; i++) {
      const newId = `field_${Date.now()}_${i}`;
      const newField = {
        id: newId,
        label: `الحقل ${customFields.length + i + 1}`,
        values: ""
      };

      newFields.push(newField);
      newPositions[newId] = {
        x: 300 + (i * 20),
        y: 100 + ((customFields.length + i) * 50)
      };
    }

    setCustomFields(prev => [...prev, ...newFields]);
    setPositions(prev => ({
      ...prev,
      ...newPositions
    }));

    // Set first new field as active
    if (newFields.length > 0) {
      setActiveField(newFields[0].id);
    }
  };

  // ✅ Remove custom field
  const removeCustomField = (fieldId) => {
    setCustomFields(prev => prev.filter(field => field.id !== fieldId));

    // Remove position for deleted field
    setPositions(prev => {
      const newPositions = { ...prev };
      delete newPositions[fieldId];
      return newPositions;
    });

    // Remove font settings for deleted field
    setFontSettings(prev => {
      const newFontSettings = { ...prev };
      delete newFontSettings[fieldId];
      return newFontSettings;
    });

    // If deleted field was active, switch to name
    if (activeField === fieldId) {
      setActiveField("name");
    }
  };

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

    if (namesArr.length === 0) {
      alert("أدخل الأسماء أولاً!");
      return;
    }

    const results = [];

    for (let i = 0; i < namesArr.length; i++) {
      const name = namesArr[i];

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
      const nameFontSettings = fontSettings.name || { font: "Yummy", size: 32, color: "#000000" };
      ctx.font = `${nameFontSettings.size}px "${nameFontSettings.font}", Arial, sans-serif`;
      ctx.fillStyle = nameFontSettings.color;
      ctx.fillText(name, positions.name.x, positions.name.y);

      // ✅ Draw all custom fields
      customFields.forEach(field => {
        if (positions[field.id] && field.values) {
          const fieldValues = field.values.split("\n").map(v => v.trim()).filter(Boolean);
          const value = fieldValues[i] || "";

          if (value) {
            const fieldFontSettings = fontSettings[field.id] || { font: "Yummy", size: 32, color: "#000000" };
            ctx.font = `${fieldFontSettings.size}px "${fieldFontSettings.font}", Arial, sans-serif`;
            ctx.fillStyle = fieldFontSettings.color;
            ctx.fillText(`${field.label}: ${value}`, positions[field.id].x, positions[field.id].y);
          }
        }
      });

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
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <TemplateUpload handleUpload={handleUpload} />
          <NamesInput names={names} setNames={setNames} />
          <GradesInput
            customFields={customFields}
            setCustomFields={setCustomFields}
            addCustomField={addCustomField}
            removeCustomField={removeCustomField}
            addMultipleFields={addMultipleFields}
          />
          <Settings
            activeField={activeField}
            setActiveField={setActiveField}
            positions={positions}
            setPositions={setPositions}
            fontSize={fontSize}
            setFontSize={setFontSize}
            fontColor={fontColor}
            setFontColor={setFontColor}
            selectedFont={selectedFont}
            setSelectedFont={setSelectedFont}
            customFields={customFields}
            fontSettings={fontSettings}
            setFontSettings={setFontSettings}
          />

          <GenerateButton generateCertificates={generateCertificates} template={template} names={names} />
          <CertificatesPreview generated={generated} downloadAll={downloadAll} />
        </div>

        <div className="space-y-4">
          <TemplatePreview
            template={template}
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
