
'use client';

import { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { sendSlackNotification } from '@/lib/slack';
import { translations } from '@/lib/translations';
import Image from 'next/image';

export default function FinalPage() {
  const [code, setCode] = useState(new Array(5).fill(''));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [language, setLanguage] = useState<'de' | 'en'>('de');
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  
  const t = translations[language];

  useEffect(() => {
    const savedGroupName = localStorage.getItem('groupName');
    const savedLanguage = localStorage.getItem('language') as 'de' | 'en';
    if (savedGroupName) {
      setGroupName(savedGroupName);
    }
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const correctCode = '12801';

  const handleChange = (element: ChangeEvent<HTMLInputElement>, index: number) => {
    if (isNaN(Number(element.target.value))) return; // Nur Zahlen erlauben

    const newCode = [...code];
    newCode[index] = element.target.value;
    setCode(newCode);

    // Fokus zum nächsten Feld
    if (element.target.value && index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Fokus zum vorherigen Feld bei Backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const checkCode = async () => {
    const enteredCode = code.join('');
    if (enteredCode === correctCode) {
      setError('');
      setSuccess(true);
      
      // Slack-Benachrichtigung senden
      try {
        await sendSlackNotification(groupName, language);
      } catch (error) {
        console.error('Slack notification failed:', error);
      }
    } else {
      setError(t.wrongCode);
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-transparent to-blue-500/15" />
      <div className="relative z-10 max-w-4xl w-full">
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12 text-center border border-gray-700/50">
          {!success ? (
            <>
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {t.finalTitle}
              </h1>
              <div className="bg-gray-700/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-600/50">
                <p className="text-xl text-gray-300">
                  {t.finalDescription.split('5')[0]}<span className="font-bold text-cyan-400">{language === 'de' ? '5-stelligen Code' : '5-digit code'}</span>{t.finalDescription.split('5')[1]}
                </p>
              </div>
              <div className="flex justify-center gap-3 mb-8">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputsRef.current[index] = el; }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-14 h-16 sm:w-16 sm:h-18 bg-gray-700/80 border-2 border-gray-600/70 rounded-2xl text-center text-2xl sm:text-3xl font-bold focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/30 transition-all duration-300 backdrop-blur-sm"
                  />
                ))}
              </div>
              <button
                onClick={checkCode}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 text-xl shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                {t.finalUnlock}
              </button>
              {error && <p className="text-red-400 mt-6 bg-red-900/20 border border-red-500/20 rounded-2xl p-4 text-lg">{error}</p>}
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="mb-8 relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-green-400/50 bg-gradient-to-br from-green-400/10 to-emerald-500/10 animate-pulse">
                  <Image
                    src="/ai.png"
                    alt="SEMIOS - The freed AI"
                    width={224}
                    height={224}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent text-center">
                {t.finalSuccessTitle}
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-green-400 mb-6 text-center">
                SEMIOS
              </p>
              <div className="bg-green-900/20 border border-green-500/20 rounded-2xl p-6 max-w-md">
                <p className="text-2xl text-green-400 font-semibold text-center">
                  {t.finalSuccessText1}
                </p>
                <p className="text-lg text-gray-300 mt-2 text-center">
                  {t.finalSuccessText2}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
