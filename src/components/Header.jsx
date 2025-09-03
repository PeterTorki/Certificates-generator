export default function Header({ isDarkMode, toggleDarkMode }) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">🎓 مولد الشهادات</h1>
          <p className="text-blue-100 dark:text-blue-200">قم بإنشاء شهادات متعددة بسهولة</p>
        </div>
        <button
          onClick={toggleDarkMode}
          className="bg-white/20 hover:bg-white/30 dark:bg-black/20 dark:hover:bg-black/30 text-white p-3 rounded-lg transition-colors"
          title={isDarkMode ? "تبديل للوضع الفاتح" : "تبديل للوضع الداكن"}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
}
