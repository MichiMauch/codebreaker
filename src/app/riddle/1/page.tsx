
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { translations } from '@/lib/translations';

export default function Riddle1() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [language, setLanguage] = useState<'de' | 'en'>('de');
  const router = useRouter();
  
  const t = translations[language];
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'de' | 'en';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const checkAnswer = () => {
    if (answer.toLowerCase() === 'i am code') {
      setSuccess(t.riddle1Success);
      setError('');
      setTimeout(() => {
        router.push('/riddle/2');
      }, 3000);
    } else {
      setError(t.wrongAnswer);
      setSuccess('');
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-cyan-500/10" />
      <div className="relative z-10 max-w-3xl w-full">
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-700/50">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-cyan-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {t.riddle1Stage}
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-green-500 bg-clip-text text-transparent">
            {t.riddle1Title}
          </h1>
          <div className="bg-gray-700/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-600/50">
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">01</span>
              </div>
            </div>
            <p className="text-lg sm:text-xl font-mono text-center text-green-400 break-words leading-relaxed">
              &ldquo;01001001 00100000 01100001 01101101 00100000 01000011 01101111 01100100 01100101&rdquo;
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="bg-gray-700/80 border-2 border-gray-600/70 rounded-2xl px-6 py-4 w-full max-w-md text-center text-lg focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/30 transition-all duration-300 backdrop-blur-sm"
              placeholder={t.yourAnswer}
            />
            <button
              onClick={checkAnswer}
              className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 w-full sm:w-auto shadow-lg hover:shadow-xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={!!success}
            >
              {t.checkAnswer}
            </button>
            {error && <p className="text-red-400 mt-4 bg-red-900/20 border border-red-500/20 rounded-2xl p-3">{error}</p>}
            {success && <p className="text-green-400 mt-4 bg-green-900/20 border border-green-500/20 rounded-2xl p-3 font-bold text-lg">{success}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
