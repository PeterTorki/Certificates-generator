export default function GenerateButton({ generateCertificates, template, names }) {
  return (
    <button
      onClick={generateCertificates}
      disabled={!template || !names}
      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg">
      ✨ توليد الشهادات
    </button>
  );
}
