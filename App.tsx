
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import NewsCard from './components/NewsCard';
import LiveScores from './components/LiveScores';
import { fetchLatestNews, fetchLiveScores } from './services/geminiService';
import { SportCategory, NewsItem, LiveScore } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SportCategory>(SportCategory.ALL);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [scores, setScores] = useState<LiveScore[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingScores, setLoadingScores] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadData = useCallback(async () => {
    setLoadingNews(true);
    try {
      const newsData = await fetchLatestNews(activeCategory);
      setNews(newsData);
    } finally {
      setLoadingNews(false);
    }
  }, [activeCategory]);

  const loadScores = useCallback(async () => {
    setLoadingScores(true);
    try {
      const scoresData = await fetchLiveScores();
      setScores(scoresData);
    } finally {
      setLoadingScores(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadData, refreshKey]);

  useEffect(() => {
    loadScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (cat: SportCategory) => {
    setActiveCategory(cat);
  };

  return (
    <Layout activeCategory={activeCategory} onCategoryChange={handleCategoryChange}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left/Middle Column - News */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Headline */}
          {!loadingNews && news.length > 0 && (
            <section className="animate-in fade-in slide-in-from-top-4 duration-500">
              <NewsCard news={news[0]} featured={true} />
            </section>
          )}

          {/* News Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">
                {activeCategory === SportCategory.ALL ? 'Соңғы жаңалықтар' : `${activeCategory}`}
              </h2>
              <button 
                onClick={() => setRefreshKey(prev => prev + 1)}
                className="text-xs font-bold text-slate-500 hover:text-yellow-500 transition-colors flex items-center gap-2"
              >
                <i className={`fas fa-sync-alt ${loadingNews ? 'fa-spin' : ''}`}></i>
                ЖАҢАРТУ
              </button>
            </div>

            {loadingNews ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl h-80 animate-pulse"></div>
                ))}
              </div>
            ) : news.length > 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.slice(1).map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-dashed border-slate-800">
                <i className="fas fa-newspaper text-5xl text-slate-700 mb-4"></i>
                <p className="text-slate-500 font-medium">Кешіріңіз, қазірше жаңалықтар табылмады.</p>
              </div>
            )}
          </section>

          {/* Newsletter Box */}
          <section className="bg-slate-900 rounded-2xl p-8 border border-yellow-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <i className="fas fa-paper-plane text-9xl -rotate-12"></i>
            </div>
            <div className="relative z-10 max-w-xl">
              <h3 className="text-2xl font-black mb-2 uppercase">Дайджестке жазылыңыз</h3>
              <p className="text-slate-400 text-sm mb-6">Апталық ең маңызды спорттық оқиғаларды поштаңызға тікелей алыңыз.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Email мекенжайыңыз" 
                  className="flex-grow bg-slate-950 border border-slate-800 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-yellow-500 transition-all"
                />
                <button className="bg-yellow-500 text-slate-900 font-black rounded-full px-8 py-3 text-sm hover:bg-yellow-400 transition-all uppercase">
                  ЖАЗЫЛУ
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Scores & Trends */}
        <div className="lg:col-span-4 space-y-8">
          <LiveScores scores={scores} loading={loadingScores} />
          
          {/* Trending Section */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="font-black text-lg uppercase tracking-wider mb-6">ТРЕНДТЕ</h3>
            <div className="space-y-6">
              {[
                { rank: '01', text: 'Шавкат Рахмонов келесі жекпе-жегі туралы айтты', category: 'MMA' },
                { rank: '02', text: 'Евро-2024: Фавориттер тізімі өзгерді', category: 'ФУТБОЛ' },
                { rank: '03', text: 'Геннадий Головкин жаңа лауазымға ие болды', category: 'БОКС' },
                { rank: '04', text: 'Қазақстан құрамасының жаңа бапкері кім?', category: 'ЛОКАЛ' }
              ].map((trend) => (
                <div key={trend.rank} className="flex gap-4 group cursor-pointer">
                  <span className="text-2xl font-black text-slate-800 group-hover:text-yellow-500 transition-colors">{trend.rank}</span>
                  <div>
                    <span className="text-[10px] font-bold text-yellow-500 uppercase block mb-1">{trend.category}</span>
                    <p className="text-sm font-bold text-slate-200 line-clamp-2 leading-snug group-hover:text-white">{trend.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
