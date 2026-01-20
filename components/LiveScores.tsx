
import React from 'react';
import { LiveScore } from '../types';

interface LiveScoresProps {
  scores: LiveScore[];
  loading: boolean;
}

const LiveScores: React.FC<LiveScoresProps> = ({ scores, loading }) => {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sticky top-40">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-black text-lg uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          LIVE НӘТИЖЕЛЕР
        </h3>
        <button className="text-[10px] font-bold text-slate-500 hover:text-white uppercase">БАРЛЫҒЫ</button>
      </div>

      <div className="space-y-4">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse bg-slate-800 rounded-xl h-24"></div>
          ))
        ) : (
          scores.map((score) => (
            <div key={score.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition-all group">
              <div className="text-[10px] font-bold text-slate-500 uppercase mb-3 flex justify-between">
                <span>{score.league}</span>
                <span className={score.status === 'LIVE' ? 'text-red-500' : ''}>{score.status}</span>
              </div>
              
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-200 line-clamp-1">{score.homeTeam}</span>
                    <span className="text-lg font-black text-yellow-500">{score.status !== 'UPCOMING' ? score.homeScore : '-'}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-200 line-clamp-1">{score.awayTeam}</span>
                    <span className="text-lg font-black text-yellow-500">{score.status !== 'UPCOMING' ? score.awayScore : '-'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800/50 text-center">
                <span className="text-[10px] font-medium text-slate-500">{score.time}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 text-slate-950 overflow-hidden relative group cursor-pointer">
        <div className="relative z-10">
          <h4 className="font-black text-sm uppercase mb-1">PRO Пакет</h4>
          <p className="text-[10px] font-bold opacity-80 leading-tight">Тікелей эфирлер мен эксклюзивті контентке қол жеткізіңіз</p>
        </div>
        <i className="fas fa-play absolute -right-4 -bottom-4 text-6xl opacity-20 transition-transform group-hover:scale-125"></i>
      </div>
    </div>
  );
};

export default LiveScores;
