export default function Settings({
  activeField,
  setActiveField,
  positions,
  fontSize,
  setFontSize,
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        3️⃣ الإعدادات
      </label>
      <div className="space-y-3">
        <div>
          <label className="block mb-1 font-medium">اختر الحقل لتحديد موقعه:</label>
          <select
            value={activeField}
            onChange={(e) => setActiveField(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="name">الاسم</option>
            <option value="grade">الدرجة</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm">الموضع:</span>
          <span className="bg-gray-100 px-2 py-1 rounded">
            X: {Math.round(positions[activeField].x)}
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded">
            Y: {Math.round(positions[activeField].y)}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm">حجم الخط:</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(+e.target.value)}
            className="w-20 border border-gray-300 rounded p-1 focus:ring-2 focus:ring-blue-500"
            min="10"
            max="100"
          />
        </div>
      </div>
    </div>
  );
}
