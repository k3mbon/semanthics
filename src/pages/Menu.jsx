import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Menu() {
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.play().catch(e => console.log('Autoplay blocked:', e));
    }
  }, []);

  return (
    <div className="relative w-screen h-dvh flex flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-sky-light to-sky-dark font-fredoka">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/LATAR2.png')` 
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-4 md:p-10">
        {/* Header */}
        <header className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 justify-center md:justify-start">
             <img src="/Semanthics_Logo.png" alt="Simatika Logo" className="h-12 md:h-20 w-auto object-contain drop-shadow-md" />
             <div className="text-4xl md:text-6xl text-white tracking-widest drop-shadow-md text-center md:text-left font-fredoka" style={{ letterSpacing: "-1px", textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', fontWeight: 700, fontStyle: "normal" }}>
               SIMATIKA
             </div>
          </div>
          <nav className="flex flex-wrap justify-center items-center gap-4 md:gap-8 font-fredoka">
            <a 
              href="https://go.undiksha.ac.id/materisimatika" 
              className="text-white text-xl md:text-3xl no-underline hover:text-yellow-400 transition-colors duration-300 relative overflow-hidden"
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
            >
              Materi
            </a>
            <Link 
              to="/info" 
              className="text-white text-xl md:text-3xl no-underline hover:text-yellow-400 transition-colors duration-300 relative overflow-hidden"
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
            >
              Informasi
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-yellow-400 text-gray-800 px-4 py-2 md:px-6 md:py-3 rounded-full text-xl md:text-3xl font-bold shadow-lg hover:bg-yellow-500 transform hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden flex items-center justify-center cursor-pointer border-none"
              style={{ boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.3)' }}
            >
              Keluar
            </button>
          </nav>
        </header>

        {/* Center Menus */}
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center max-h-full overflow-y-auto p-4">
            <Link 
              to="/panduan"
              className="bg-white rounded-3xl px-6 py-6 md:px-8 md:py-10 text-lg md:text-xl font-medium no-underline shadow-xl hover:scale-105 transition-transform duration-200 relative overflow-hidden flex flex-col items-center text-blue-500 w-48 md:w-auto"
              style={{ boxShadow: '0 6px 24px rgba(0, 0, 0, 0.15)' }}
            >
               <img src="/PANDUAN.png" alt="Panduan" className="w-12 h-12 md:w-16 md:h-16 block mb-2 mx-auto" />
               Buku Panduan
            </Link>
            <Link 
              to="/belajar"
              className="bg-white rounded-3xl px-6 py-6 md:px-8 md:py-10 text-lg md:text-xl font-medium no-underline shadow-xl hover:scale-105 transition-transform duration-200 relative overflow-hidden flex flex-col items-center text-orange-500 w-48 md:w-auto"
              style={{ boxShadow: '0 6px 24px rgba(0, 0, 0, 0.15)' }}
            >
               <img src="/AYO.BELAJAR.png" alt="Belajar" className="w-12 h-12 md:w-16 md:h-16 block mb-2 mx-auto" />
               Ayo Belajar
            </Link>
             <Link 
              to="/berlatih"
              className="bg-white rounded-3xl px-6 py-6 md:px-8 md:py-10 text-lg md:text-xl font-medium no-underline shadow-xl hover:scale-105 transition-transform duration-200 relative overflow-hidden flex flex-col items-center text-green-600 w-48 md:w-auto"
              style={{ boxShadow: '0 6px 24px rgba(0, 0, 0, 0.15)' }}
            >
               <img src="/LATIHAN.SOAL.png" alt="Berlatih" className="w-12 h-12 md:w-16 md:h-16 block mb-2 mx-auto" />
               Ayo Berlatih
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full flex justify-center items-end relative h-10">
             {/* Dots */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2.5">
               {[...Array(5)].map((_, i) => (
                 <div key={i} className={`w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer transition-colors duration-300 ${i === 0 ? 'bg-white' : 'bg-white/60'}`} />
               ))}
            </div>
            
            {/* Bottom Right AI */}
            <div className="absolute bottom-0 right-0 text-white text-sm md:text-xl drop-shadow-sm">
              FIP UNDIKSHA
            </div>
        </div>
      </div>

      <audio ref={audioRef} loop autoPlay>
        <source src="/LATAR1.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

// Removed export default at the bottom since we export the function directly

