export default function TemplatePreview({ template, activeField, imgRef, handlePickPosition }) {
  return (
    template && (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 relative inline-block">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">4️⃣ اضغط على الصورة لتحديد موقع النص المختار</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">النص سيبدأ من النقطة التي تحددها ويُكتب من اليمين للشمال</p>

        <div className="mb-4">
          <strong className="text-gray-700 dark:text-gray-200">النص المختار حالياً: </strong>
          <span className="text-blue-600 dark:text-blue-400">
            {activeField === "name" ? "الاسم" : "الحقل المخصص"}
          </span>
        </div>

        <img
          ref={imgRef}
          src={template}
          alt="template"
          onClick={handlePickPosition}
          className="block cursor-crosshair border-2 border-gray-300 dark:border-gray-500 rounded hover:border-blue-500 dark:hover:border-blue-400 transition-colors select-none"
          draggable={false}
        />
      </div>
    )
  );
}
