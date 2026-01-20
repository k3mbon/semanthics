import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  useEffect(() => {
    document.title = "404 - Halaman Tidak Ditemukan | Simatika";
    
    // Optional: Restore title on unmount if needed
    // return () => document.title = "Simatika";
  }, []);

  return (
    <div className="relative w-screen h-dvh flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-sky-light to-sky-dark font-fredoka">
      {/* Background Overlay - Consistent with Home */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/LATAR2.png')` 
        }}
        role="img"
        aria-label="Background image of the application"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
        {/* Animated 404 Text */}
        <h1 className="error-code text-8xl md:text-9xl text-white mb-4 animate-bounce">
          404
        </h1>
        
        <h2 className="error-message text-2xl md:text-4xl text-white mb-8 font-bold tracking-wide">
          Halaman Tidak Ditemukan
        </h2>
        
        <p className="text-white text-lg md:text-xl mb-10 max-w-md mx-auto drop-shadow-md">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>

        {/* Navigation Actions */}
        <div className="flex flex-col md:flex-row gap-6">
          <Link 
            to="/" 
            className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-full text-xl font-bold shadow-lg hover:bg-yellow-500 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}
            aria-label="Kembali ke Beranda"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Kembali ke Beranda
          </Link>
          
          <a 
            href="mailto:support@undiksha.ac.id" 
            className="bg-white text-blue-600 px-8 py-3 rounded-full text-xl font-bold shadow-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}
            aria-label="Hubungi Bantuan"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Bantuan
          </a>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-4 text-white/80 text-sm md:text-base font-medium">
        FIP UNDIKSHA
      </div>
    </div>
  );
}
