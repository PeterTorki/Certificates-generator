export default function CertificatesPreview({ generated, downloadAll, zipFileName, setZipFileName }) {
  return (
    generated.length > 0 && (
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          📜 الشهادات المولدة ({generated.length})
        </h2>

        {/* Input لاسم ملف ZIP */}
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            📦 اسم ملف ZIP:
          </label>
          <input
            type="text"
            value={zipFileName}
            onChange={(e) => setZipFileName(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-500 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="أدخل اسم ملف ZIP"
            dir="rtl"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            سيتم حفظ جميع الشهادات في ملف ZIP بهذا الاسم
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {generated.map((cert, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img src={cert.image} alt={`شهادة ${cert.name}`} className="w-full" />
              <div className="p-3 bg-gray-50 dark:bg-gray-700">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">{cert.name}</p>
                <a
                  href={cert.image}
                  download={`certificate-${cert.name || idx + 1}.png`}
                  className="block text-center bg-blue-500 dark:bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                >
                  💾 تحميل
                </a>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={downloadAll}
          className="w-full bg-green-500 dark:bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 dark:hover:bg-green-700 transition-all shadow-lg mt-4"
        >
          📦 تحميل جميع الشهادات كملف ZIP "{zipFileName}.zip"
        </button>
      </div>
    )
  );
}
