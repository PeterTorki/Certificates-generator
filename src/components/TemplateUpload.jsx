export default function TemplateUpload({ handleUpload }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-2">1️⃣ ارفع قالب الشهادة</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
