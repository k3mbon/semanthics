import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Panduan = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    document.title = 'Panduan | Simatika';
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(e => console.log('Autoplay blocked:', e));
    }
  }, []);

  return (
    <div className="relative w-screen h-dvh flex flex-col items-center justify-center overflow-hidden bg-cover bg-center font-nunito"
         style={{ backgroundImage: "url('/LATAR2.png')" }}>
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>

      {/* Main Content Card */}
      <div className="relative z-10 w-[90%] max-w-2xl bg-white/95 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-white/50 animate-fade-in">
        
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#FF8F00] font-fredoka flex items-center justify-center gap-3 drop-shadow-sm">
            <span>📘</span> Panduan Bermain
          </h1>
        </div>

        {/* Instructions List */}
        <div className="space-y-6 text-gray-700 text-lg md:text-xl leading-relaxed">
          <div className="flex items-start gap-4">
            <span className="text-2xl mt-1">🧒</span>
            <p>Masukkan nama kamu dan kata rahasia di halaman login untuk memulai petualangan.</p>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="text-2xl mt-1">🔐</span>
            <p>Gunakan kata rahasia <span className="font-bold text-gray-900 bg-yellow-100 px-2 py-0.5 rounded">12345678</span> agar bisa masuk.</p>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="text-2xl mt-1">🎮</span>
            <p>Kamu akan belajar Matematika Numerasi</p>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="text-2xl mt-1">🧠</span>
            <p>
              Ikuti Petunjuk &{' '}
              <a 
                href="/assets/BUKU PANDUAN SIMATIKA - 30725.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#FF8F00] font-bold hover:underline hover:text-[#e68100] transition-colors"
              >
                Baca Buku Panduan
              </a>
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 flex justify-center">
          <Link 
            to="/" 
            className="group relative bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8 py-3 rounded-full font-bold text-lg shadow-[0_4px_0_rgb(29,78,216)] active:shadow-none active:translate-y-[4px] transition-all duration-200 flex items-center gap-3"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="group-hover:-translate-x-1 transition-transform"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Kembali
          </Link>
        </div>
      </div>

      {/* Mascot Character */}
      <img 
        src="/KARAKTER1.png" 
        alt="Karakter Simatika" 
        className="fixed bottom-0 right-0 w-32 md:w-48 lg:w-64 drop-shadow-2xl z-20 pointer-events-none transition-transform hover:scale-105"
      />

      {/* Background Audio */}
      <audio ref={audioRef} loop>
        <source src="/LATAR1.mp3" type="audio/mpeg" />
        Browser kamu tidak mendukung elemen audio.
      </audio>

    </div>
  );
};

export default Panduan;
