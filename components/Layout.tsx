
import React from 'react';
import { SportCategory } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeCategory: SportCategory;
  onCategoryChange: (cat: SportCategory) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeCategory, onCategoryChange }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onCategoryChange(SportCategory.ALL)}>
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <i className="fas fa-trophy text-slate-900 text-xl"></i>
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">
              QAZAQ<span className="text-yellow-500">SPORT</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button className="text-sm font-medium hover:text-yellow-500 transition-colors">Видео</button>
            <button className="text-sm font-medium hover:text-yellow-500 transition-colors">Тікелей эфир</button>
            <button className="text-sm font-medium hover:text-yellow-500 transition-colors">Сұхбат</button>
            <div className="h-4 w-px bg-slate-700"></div>
            <div className="relative group">
              <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-all">
                <i className="fas fa-search text-slate-400"></i>
              </button>
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block px-4 py-2 rounded-full bg-yellow-500 text-slate-900 text-sm font-bold hover:bg-yellow-400 transition-all">
              ЖАЗЫЛУ
            </button>
            <button className="md:hidden text-2xl">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="bg-slate-900 border-b border-slate-800 overflow-x-auto custom-scrollbar">
          <div className="container mx-auto px-4 py-2 flex items-center gap-4">
            {Object.values(SportCategory).map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                  <i className="fas fa-trophy text-slate-900"></i>
                </div>
                <span className="text-lg font-black uppercase italic">
                  QAZAQ<span className="text-yellow-500">SPORT</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                Қазақстандағы және әлемдегі спорттың ең өзекті жаңалықтары. Бізбен бірге жеңіске жетіңіз!
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Бөлімдер</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="hover:text-yellow-500 cursor-pointer">Жаңалықтар</li>
                <li className="hover:text-yellow-500 cursor-pointer">Сараптама</li>
                <li className="hover:text-yellow-500 cursor-pointer">Рейтингтер</li>
                <li className="hover:text-yellow-500 cursor-pointer">Фотобаян</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Қолдау</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="hover:text-yellow-500 cursor-pointer">Кері байланыс</li>
                <li className="hover:text-yellow-500 cursor-pointer">Жарнама</li>
                <li className="hover:text-yellow-500 cursor-pointer">Құпиялылық саясаты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Әлеуметтік желілер</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-500 hover:text-slate-900 transition-all">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-500 hover:text-slate-900 transition-all">
                  <i className="fab fa-telegram"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-500 hover:text-slate-900 transition-all">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-900 text-center text-slate-500 text-xs">
            © 2024 Qazaq Sport Live. Барлық құқықтар қорғалған.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
