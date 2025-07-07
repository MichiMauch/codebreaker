'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { translations } from '@/lib/translations';

export default function Home() {
  const [groupName, setGroupName] = useState('');
  const [language, setLanguage] = useState<'de' | 'en'>('de');
  const router = useRouter();
  
  const t = translations[language];

  const startGame = () => {
    if (groupName.trim()) {
      localStorage.setItem('groupName', groupName);
      localStorage.setItem('language', language);
      router.push('/riddle/1');
    } else {
      const message = language === 'de' ? 'Bitte gib einen Gruppennamen ein.' : 'Please enter a group name.';
      alert(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
      <div className="relative z-10 max-w-4xl w-full">
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12 text-center border border-gray-700/50">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl sm:text-2xl mb-6 text-gray-300">
            {t.subtitle}
          </p>
          <div className="bg-gray-700/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-600/50">
            <p className="text-lg leading-relaxed text-gray-200">
              {t.description.replace('SEMIOS', 'SEMIOS_PLACEHOLDER').replace(language === 'de' ? '5 Rätsel' : '5 puzzles', 'PUZZLES_PLACEHOLDER').split('SEMIOS_PLACEHOLDER')[0]}
              <span className="font-bold text-cyan-400">SEMIOS</span>
              {t.description.replace('SEMIOS', 'SEMIOS_PLACEHOLDER').replace(language === 'de' ? '5 Rätsel' : '5 puzzles', 'PUZZLES_PLACEHOLDER').split('SEMIOS_PLACEHOLDER')[1].split('PUZZLES_PLACEHOLDER')[0]}
              <span className="font-bold text-cyan-400">{language === 'de' ? '5 Rätsel' : '5 puzzles'}</span>
              {t.description.replace('SEMIOS', 'SEMIOS_PLACEHOLDER').replace(language === 'de' ? '5 Rätsel' : '5 puzzles', 'PUZZLES_PLACEHOLDER').split('PUZZLES_PLACEHOLDER')[1]}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-6">
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-300 mb-2">{t.selectLanguage}</label>
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setLanguage('de')}
                  className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-300 ${
                    language === 'de'
                      ? 'bg-cyan-500 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  🇩🇪 Deutsch
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-300 ${
                    language === 'en'
                      ? 'bg-cyan-500 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  🇬🇧 English
                </button>
              </div>
            </div>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="bg-gray-700/80 border-2 border-gray-600/70 rounded-2xl px-6 py-4 w-full max-w-md text-center text-lg focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/30 transition-all duration-300 backdrop-blur-sm"
              placeholder={t.groupNamePlaceholder}
            />
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 text-lg w-full sm:w-auto shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              {t.startGame}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}