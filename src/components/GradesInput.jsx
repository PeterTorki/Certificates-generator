export default function GradesInput({ customFields, setCustomFields, addCustomField, removeCustomField, addMultipleFields }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          2️⃣ الحقول المخصصة
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => addMultipleFields(5)}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
            title="إضافة 5 حقول دفعة واحدة"
          >
            + 5 حقول
          </button>
          <button
            onClick={() => addMultipleFields(10)}
            className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
            title="إضافة 10 حقول دفعة واحدة"
          >
            + 10 حقول
          </button>
          <button
            onClick={addCustomField}
            className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            + حقل واحد
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {customFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700">
            <div className="flex-1">
              <input
                type="text"
                placeholder="اسم الحقل (مثل: المادة، الدرجة، الملاحظة)"
                value={field.label}
                onChange={(e) => {
                  const newFields = [...customFields];
                  newFields[index].label = e.target.value;
                  setCustomFields(newFields);
                }}
                className="w-full border border-gray-300 dark:border-gray-500 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                dir="rtl"
              />
            </div>
            <div className="flex-1">
              <textarea
                placeholder={`أدخل قيم ${field.label || 'الحقل'} (سطر لكل طالب)`}
                value={field.values}
                onChange={(e) => {
                  const newFields = [...customFields];
                  newFields[index].values = e.target.value;
                  setCustomFields(newFields);
                }}
                rows="3"
                className="w-full border border-gray-300 dark:border-gray-500 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                dir="rtl"
              />
            </div>
            <button
              onClick={() => removeCustomField(field.id)}
              className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-2 py-1 rounded text-sm transition-colors"
              title="حذف هذا الحقل"
            >
              ×
            </button>
          </div>
        ))}

        {customFields.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700">
            لا توجد حقول مخصصة. اضغط "إضافة حقل واحد" أو "إضافة 5 حقول" لبدء الإضافة.
          </div>
        )}

        {customFields.length > 0 && (
          <div className="text-center text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 p-2 rounded">
            تم إضافة {customFields.length} حقل مخصص
          </div>
        )}
      </div>
    </div>
  );
}
