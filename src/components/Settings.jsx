export default function Settings({
  activeField,
  setActiveField,
  positions,
  setPositions,
  fontSize,
  setFontSize,
  fontColor,
  setFontColor,
  selectedFont,
  setSelectedFont,
  customFields,
  fontSettings,
  setFontSettings,
}) {
  const fontOptions = [
    { value: "Yummy", label: "Yummy - خط عربي جميل", preview: "أبجد هوز حطي" },
    { value: "Cairo", label: "Cairo - خط عربي أنيق", preview: "أبجد هوز حطي" },
    { value: "Tajawal", label: "Tajawal - خط عربي واضح", preview: "أبجد هوز حطي" },
    { value: "Almarai", label: "Almarai - خط عربي عصري", preview: "أبجد هوز حطي" },
    { value: "Readex Pro", label: "Readex Pro - خط إنجليزي", preview: "ABCD EFGH" },
    { value: "xb", label: "xb - خط عربي", preview: "أبجد هوز حطي" },
  ];

  // Get current field font settings
  const currentFontSettings = fontSettings[activeField] || { font: "Yummy", size: 32, color: "#000000" };

  // Update font settings for current field
  const updateFontSettings = (field, value) => {
    setFontSettings(prev => ({
      ...prev,
      [activeField]: {
        ...prev[activeField],
        [field]: value
      }
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">✏️ اختر الحقل النشط</label>
      <select
        className="w-full border p-2 rounded dark:bg-gray-900 dark:text-gray-100"
        value={activeField}
        onChange={(e) => setActiveField(e.target.value)}>
        <option value="name">الاسم</option>
        {customFields.map((field) => (
          <option key={field.id} value={field.id}>
            {field.label || `الحقل ${field.id}`}
          </option>
        ))}
      </select>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-700">
        <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
          إعدادات الخط لـ: {activeField === 'name' ? 'الاسم' : customFields.find(f => f.id === activeField)?.label || 'الحقل'}
        </p>
      </div>

      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">🔤 نوع الخط</label>
      <select
        className="w-full border p-2 rounded dark:bg-gray-900 dark:text-gray-100"
        value={currentFontSettings.font}
        onChange={(e) => updateFontSettings('font', e.target.value)}>
        {fontOptions.map((font) => (
          <option key={font.value} value={font.value}>
            {font.label}
          </option>
        ))}
      </select>

      {/* معاينة الخط */}
      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">معاينة الخط:</p>
        <p
          className="text-lg font-medium"
          style={{
            fontFamily: `"${currentFontSettings.font}", Arial, sans-serif`,
            color: currentFontSettings.color
          }}
        >
          {fontOptions.find(f => f.value === currentFontSettings.font)?.preview || "أبجد هوز حطي"}
        </p>
      </div>

      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">🔠 حجم الخط</label>
      <input
        type="number"
        min="10"
        max="120"
        value={currentFontSettings.size}
        onChange={(e) => updateFontSettings('size', Number(e.target.value))}
        className="w-full border p-2 rounded dark:bg-gray-900 dark:text-gray-100"
      />

      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">🎨 لون الخط</label>
      <input
        type="color"
        value={currentFontSettings.color}
        onChange={(e) => updateFontSettings('color', e.target.value)}
        className="w-16 h-10 border rounded cursor-pointer"
      />

      {/* عرض موقع الحقل النشط */}
      {activeField && positions[activeField] && (
        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-700">
          <p className="text-sm text-green-700 dark:text-green-300 mb-2">
            موقع {activeField === 'name' ? 'الاسم' : customFields.find(f => f.id === activeField)?.label || 'الحقل'}:
          </p>

          {/* Input fields للمواقع */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">X:</label>
              <input
                type="number"
                value={Math.round(positions[activeField].x)}
                onChange={(e) => {
                  const newX = Number(e.target.value);
                  setPositions(prev => ({
                    ...prev,
                    [activeField]: { ...prev[activeField], x: newX }
                  }));
                }}
                className="w-full border border-gray-300 dark:border-gray-500 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="X position"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Y:</label>
              <input
                type="number"
                value={Math.round(positions[activeField].y)}
                onChange={(e) => {
                  const newY = Number(e.target.value);
                  setPositions(prev => ({
                    ...prev,
                    [activeField]: { ...prev[activeField], y: newY }
                  }));
                }}
                className="w-full border border-gray-300 dark:border-gray-500 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Y position"
              />
            </div>
          </div>

          {/* عرض القيم الحالية */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-600 dark:text-gray-400">X:</span>
              <span className="ml-1 font-mono">{Math.round(positions[activeField].x)}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Y:</span>
              <span className="ml-1 font-mono">{Math.round(positions[activeField].y)}</span>
            </div>
          </div>

          {/* أزرار تحكم سريعة */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => {
                setPositions(prev => ({
                  ...prev,
                  [activeField]: { x: 100, y: 100 }
                }));
              }}
              className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-2 py-1 rounded text-xs transition-colors"
              title="إعادة تعيين للموقع الافتراضي"
            >
              إعادة تعيين
            </button>
            <button
              onClick={() => {
                const currentPos = positions[activeField];
                setPositions(prev => ({
                  ...prev,
                  [activeField]: { x: currentPos.x + 10, y: currentPos.y }
                }));
              }}
              className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-2 py-1 rounded text-xs transition-colors"
              title="تحريك 10 بكسل لليمين"
            >
              →
            </button>
            <button
              onClick={() => {
                const currentPos = positions[activeField];
                setPositions(prev => ({
                  ...prev,
                  [activeField]: { x: currentPos.x - 10, y: currentPos.y }
                }));
              }}
              className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-2 py-1 rounded text-xs transition-colors"
              title="تحريك 10 بكسل لليسار"
            >
              ←
            </button>
            <button
              onClick={() => {
                const currentPos = positions[activeField];
                setPositions(prev => ({
                  ...prev,
                  [activeField]: { x: currentPos.x, y: currentPos.y - 10 }
                }));
              }}
              className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-2 py-1 rounded text-xs transition-colors"
              title="تحريك 10 بكسل لأعلى"
            >
              ↑
            </button>
            <button
              onClick={() => {
                const currentPos = positions[activeField];
                setPositions(prev => ({
                  ...prev,
                  [activeField]: { x: currentPos.x, y: currentPos.y + 10 }
                }));
              }}
              className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-2 py-1 rounded text-xs transition-colors"
              title="تحريك 10 بكسل لأسفل"
            >
              ↓
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
