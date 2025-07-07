
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { translations } from '@/lib/translations';

export default function Riddle4() {
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
    const cleanedAnswer = answer.trim().toLowerCase();
    if (['', 'leer', 'empty', 'empty string'].includes(cleanedAnswer)) {
      setSuccess(t.riddle4Success);
      setError('');
      setTimeout(() => {
        router.push('/riddle/5');
      }, 3000);
    } else {
      setError(t.wrongAnswer);
      setSuccess('');
      setTimeout(() => {
        router.push('/riddle/1');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-3xl w-full">
        <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-700">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {t.riddle4Stage}
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-orange-400">
            {t.riddle4Title}
          </h1>
          <div className="bg-gray-700 rounded-2xl p-6 mb-8 border border-gray-600">
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">#</span>
              </div>
            </div>
            <p className="text-lg mb-4 text-center text-gray-300">
              {t.riddle4Text1}
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <p className="text-lg font-mono text-center break-all text-orange-400">
                e3b0c44298fc1c149afbf4c8996fb924
              </p>
            </div>
            <p className="text-md text-center italic text-gray-400">
              {t.riddle4Hint}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="bg-gray-700 border-2 border-gray-600 rounded-2xl px-6 py-4 w-full max-w-md text-center text-lg focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500 focus:ring-opacity-30 transition-all duration-300 disabled:opacity-50"
              placeholder={t.yourAnswer}
              disabled={!!success}
            />
            <button
              onClick={checkAnswer}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 w-full sm:w-auto shadow-lg hover:shadow-xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
              disabled={!!success}
            >
              🔐 {t.checkAnswer}
            </button>
            {error && <p className="text-red-400 mt-4 bg-red-900/20 border border-red-500/20 rounded-2xl p-3">{error}</p>}
            {success && <p className="text-green-400 mt-4 bg-green-900/20 border border-green-500/20 rounded-2xl p-3 font-bold text-lg">{success}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
