export default function Settings({
  activeField,
  setActiveField,
  positions,
  fontSize,
  setFontSize,
  fontColor,
  setFontColor,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">✏️ اختر الحقل النشط</label>
      <select
        className="w-full border p-2 rounded dark:bg-gray-900 dark:text-gray-100"
        value={activeField}
        onChange={(e) => setActiveField(e.target.value)}>
        <option value="name">الاسم</option>
        <option value="grade">الدرجة</option>
      </select>

      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">🔠 حجم الخط</label>
      <input
        type="number"
        min="10"
        max="120"
        value={fontSize}
        onChange={(e) => setFontSize(Number(e.target.value))}
        className="w-full border p-2 rounded dark:bg-gray-900 dark:text-gray-100"
      />

      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">🎨 لون الخط</label>
      <input
        type="color"
        value={fontColor}
        onChange={(e) => setFontColor(e.target.value)}
        className="w-16 h-10 border rounded cursor-pointer"
      />
    </div>
  );
}
