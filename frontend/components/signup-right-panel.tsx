'use client'

import { useState, useEffect } from 'react';
export default function SignupRightPanel() {

  const [displayText, setDisplayText] = useState('');
  const fullText = 'The study solution you have been waiting for';
  const [isTypingComplete, setIsTypingComplete] = useState(false);
    
    useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);
    return(
         <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-primary/80 via-primary/50 to-secondary/50 rounded-xl m-2 overflow-hidden relative">     
            <div className="flex flex-col items-center gap-8 p-12">
                <h1 className="text-4xl font-bold text-left min-h-[3rem]">
                {displayText}
                {!isTypingComplete && <span className="animate-pulse">|</span>}
                </h1>
                
                <div className="flex flex-col gap-4 mt-4">
                <div 
                    className="bg-white rounded-2xl px-8 py-4 shadow-lg transform -translate-x-8"
                    style={{ opacity: isTypingComplete ? 1 : 0, transition: 'opacity 0.5s ease-in 0.2s' }}
                >
                    <p className="text-gray-700 font-medium">Smart recordings - AI-Powered transcriptions</p>
                </div>
                
                <div 
                    className="bg-white rounded-2xl px-8 py-4 shadow-lg transform translate-x-2"
                    style={{ opacity: isTypingComplete ? 1 : 0, transition: 'opacity 0.5s ease-in 0.4s' }}
                >
                    <p className="text-gray-700 font-medium">Get quick summaries and notes</p>
                </div>
                
                <div 
                    className="bg-white rounded-2xl px-8 py-4 shadow-lg transform -translate-x-6"
                    style={{ opacity: isTypingComplete ? 1 : 0, transition: 'opacity 0.5s ease-in 0.6s' }}
                >
                    <p className="text-gray-700 font-medium">AI insights for deep understanding</p>
                </div>
            </div>
      </div>
    </div>
    )

}