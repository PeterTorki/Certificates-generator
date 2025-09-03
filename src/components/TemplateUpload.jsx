export default function TemplateUpload({ handleUpload }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">1️⃣ ارفع قالب الشهادة</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 
                   rounded focus:ring-2 focus:ring-blue-500
                   text-gray-900 dark:text-gray-100 
                   bg-white dark:bg-gray-900 file:mr-4 file:py-2 file:px-4 
                   file:rounded file:border-0 
                   file:text-sm file:font-semibold 
                   file:bg-blue-50 file:text-blue-700 
                   hover:file:bg-blue-100 
                   dark:file:bg-gray-700 dark:file:text-gray-200 
                   dark:hover:file:bg-gray-600"
      />
    </div>
  );
}
