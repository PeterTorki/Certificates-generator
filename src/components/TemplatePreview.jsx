export default function TemplatePreview({ template, activeField, imgRef, handlePickPosition }) {
  return (
    template && (
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200 relative inline-block">
        <p className="text-sm font-medium text-gray-700 mb-2">4️⃣ اضغط على الصورة لتحديد موقع النص المختار</p>
        <p className="text-xs text-gray-500 mb-2">النص سيبدأ من النقطة التي تحددها ويُكتب من اليمين للشمال</p>

        <div className="mb-4">
          <strong>النص المختار حالياً: </strong>
          {activeField === "name" ? "الاسم" : "الدرجة"}
        </div>

        <img
          ref={imgRef}
          src={template}
          alt="template"
          onClick={handlePickPosition}
          className="block cursor-crosshair border-2 border-gray-300 rounded hover:border-blue-500 transition-colors select-none"
          draggable={false}
        />
      </div>
    )
  );
}
