
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { translations } from '@/lib/translations';

export default function Riddle3() {
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
    if (answer.trim() === '18') {
      setSuccess(t.riddle3Success);
      setError('');
      setTimeout(() => {
        router.push('/riddle/4');
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
            <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {t.riddle3Stage}
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-green-400">
            {t.riddle3Title}
          </h1>
          <div className="bg-gray-900 rounded-2xl p-6 mb-8 border border-gray-600">
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{}</span>
              </div>
            </div>
            <div className="font-mono text-lg space-y-2">
              <p><span className="text-green-400">x</span> <span className="text-gray-400">=</span> <span className="text-yellow-400">3</span></p>
              <p><span className="text-green-400">y</span> <span className="text-gray-400">=</span> <span className="text-yellow-400">7</span></p>
              <p><span className="text-green-400">z</span> <span className="text-gray-400">=</span> <span className="text-green-400">x</span> <span className="text-purple-400">*</span> <span className="text-green-400">y</span></p>
              <p><span className="text-green-400">z</span> <span className="text-gray-400">=</span> <span className="text-green-400">z</span> <span className="text-purple-400">-</span> <span className="text-green-400">x</span></p>
              <p><span className="text-blue-400">print</span><span className="text-gray-400">(</span><span className="text-green-400">z</span><span className="text-gray-400">)</span></p>
            </div>
          </div>
          <p className="text-xl mb-8 text-center font-bold text-cyan-400">
            {t.riddle3Question}
          </p>
          <div className="flex flex-col items-center space-y-4">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="bg-gray-700 border-2 border-gray-600 rounded-2xl px-6 py-4 w-full max-w-md text-center text-lg focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500 focus:ring-opacity-30 transition-all duration-300"
              placeholder={t.yourAnswer}
            />
            <button
              onClick={checkAnswer}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 w-full sm:w-auto shadow-lg hover:shadow-xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={!!success}
            >
              🧮 {t.checkAnswer}
            </button>
            {error && <p className="text-red-400 mt-4 bg-red-900/20 border border-red-500/20 rounded-2xl p-3">{error}</p>}
            {success && <p className="text-green-400 mt-4 bg-green-900/20 border border-green-500/20 rounded-2xl p-3 font-bold text-lg">{success}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
