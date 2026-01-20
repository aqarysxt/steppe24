
import React, { useState } from 'react';
import { NewsItem } from '../types';
import { summarizeArticle } from '../services/geminiService';

interface NewsCardProps {
  news: NewsItem;
  featured?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, featured = false }) => {
  const [summary, setSummary] = useState<string[] | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const handleSummarize = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (summary) {
      setSummary(null);
      return;
    }
    setLoadingSummary(true);
    const result = await summarizeArticle(news.content);
    setSummary(result);
    setLoadingSummary(false);
  };

  if (featured) {
    return (
      <div className="group relative overflow-hidden rounded-2xl bg-slate-800 aspect-[16/9] md:aspect-[21/9]">
        <img
          src={`${news.image}?random=${news.id}`}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
          <span className="inline-block px-3 py-1 bg-yellow-500 text-slate-900 text-xs font-bold rounded-md mb-4 uppercase tracking-wider">
            {news.category}
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4 line-clamp-2 max-w-4xl leading-tight">
            {news.title}
          </h2>
          <p className="text-slate-300 text-sm md:text-base line-clamp-2 mb-6 max-w-3xl">
            {news.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="px-6 py-2.5 bg-white text-slate-900 rounded-full font-bold hover:bg-yellow-500 transition-colors">
              Толығырақ оқу
            </button>
            <button 
              onClick={handleSummarize}
              className="px-6 py-2.5 bg-slate-800/80 backdrop-blur border border-slate-700 text-white rounded-full font-bold hover:bg-slate-700 transition-colors flex items-center gap-2"
            >
              <i className={`fas ${loadingSummary ? 'fa-spinner fa-spin' : 'fa-bolt text-yellow-500'}`}></i>
              AI Түйіндеме
            </button>
          </div>
          
          {summary && (
            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h4 className="text-yellow-500 text-xs font-bold uppercase mb-2">Негізгі сәттер:</h4>
              <ul className="list-disc list-inside text-sm text-slate-200 space-y-1">
                {summary.map((point, i) => <li key={i}>{point}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all hover:shadow-2xl hover:shadow-yellow-500/5 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={`${news.image}?random=${news.id}`}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 px-2 py-1 bg-slate-900/80 backdrop-blur text-[10px] font-bold rounded text-yellow-500 uppercase">
          {news.category}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-2 uppercase font-semibold">
          <span>{news.date}</span>
          <span>•</span>
          <span>{news.author}</span>
        </div>
        <h3 className="font-bold text-lg mb-2 text-white line-clamp-2 leading-tight group-hover:text-yellow-500 transition-colors">
          {news.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2 mb-4">
          {news.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <button className="text-xs font-bold text-white hover:text-yellow-500 transition-colors flex items-center gap-1 uppercase">
            Оқу <i className="fas fa-arrow-right text-[10px]"></i>
          </button>
          <button 
            onClick={handleSummarize}
            disabled={loadingSummary}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-500 hover:text-slate-900 transition-all text-yellow-500"
            title="AI Түйіндеме"
          >
            <i className={`fas ${loadingSummary ? 'fa-spinner fa-spin' : 'fa-bolt'}`}></i>
          </button>
        </div>

        {summary && (
          <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs animate-in zoom-in-95 duration-200">
            <ul className="space-y-1 text-slate-300">
              {summary.map((point, i) => <li key={i} className="flex gap-2"><span className="text-yellow-500">•</span>{point}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
