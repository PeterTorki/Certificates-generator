export default function NamesInput({ names, setNames }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">1️⃣ أدخل الأسماء</label>
      <textarea
        className="w-full border border-gray-300 dark:border-gray-600 rounded p-3 
                   focus:ring-2 focus:ring-blue-500 
                   text-gray-900 dark:text-gray-100 
                   bg-white dark:bg-gray-900"
        rows="6"
        placeholder="اكتب اسم كل طالب في سطر مستقل"
        value={names}
        onChange={(e) => setNames(e.target.value)}
        dir="rtl"
      />
    </div>
  );
}
