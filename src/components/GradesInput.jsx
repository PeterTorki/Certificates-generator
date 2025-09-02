export default function GradesInput({ grades, setGrades }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        2️⃣ أدخل الدرجات
      </label>
      <textarea
        className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500"
        rows="6"
        placeholder="اكتب درجة كل طالب في سطر مستقل بنفس ترتيب الأسماء"
        value={grades}
        onChange={(e) => setGrades(e.target.value)}
        dir="rtl"
      />
    </div>
  );
}
