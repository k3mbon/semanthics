import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';

import VideoPlayerComponent from '../components/VideoPlayerComponent';

// Data for the topics
const topics = {
  penjumlahan: {
    id: 'penjumlahan',
    title: 'Belajar Penjumlahan',
    video: '/penjumlahan.belajar/2 Penjumlahan.mp4',
    poster: '/penjumlahan.belajar/2 Penjumlahan-Cover.jpg',
    gameLink: '/penjumlahan',
    theme: 'yellow',
    sequence: 2,
    metadata: {
        type: 'penjumlahan',
        format: 'mp4',
        thumbnailFormat: 'jpg'
    }
  },
  pengurangan: {
    id: 'pengurangan',
    title: 'Belajar Pengurangan',
    video: '/pengurangan.belajar/3 Pengurangan.mp4',
    poster: '/pengurangan.belajar/3 Pengurangan-Cover.jpg',
    gameLink: '/pengurangan',
    theme: 'green',
    sequence: 3,
    metadata: {
        type: 'pengurangan',
        format: 'mp4',
        thumbnailFormat: 'jpg'
    }
  },
  perkalian: {
    id: 'perkalian',
    title: 'Belajar Perkalian',
    video: '/perkalian.belajar/4 Perkalian.mp4',
    poster: '/perkalian.belajar/4 Perkalian-Cover.jpg',
    gameLink: '/perkalian',
    theme: 'purple',
    sequence: 4,
    metadata: {
        type: 'perkalian',
        format: 'mp4',
        thumbnailFormat: 'jpg'
    }
  },
  pembagian: {
    id: 'pembagian',
    title: 'Belajar Pembagian',
    video: '/pembagian.belajar/5 Pembagian.mp4',
    poster: '/pembagian.belajar/5 Pembagian-Cover.jpg',
    gameLink: '/pembagian',
    theme: 'blue',
    sequence: 5,
    metadata: {
        type: 'pembagian',
        format: 'mp4',
        thumbnailFormat: 'jpg'
    }
  }
};

// Component for the Header (used in Video View)
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 left-0 w-full z-50 bg-[#2563EB] shadow-md px-4 md:px-10 py-3 flex justify-between items-center font-fredoka">
            <Link to="/" className="flex items-center gap-4 text-white no-underline">
                <img src="/Semanthics_Logo.png" alt="Simatika Logo" className="h-10 md:h-12 w-auto object-contain" />
                <span className="text-2xl md:text-3xl tracking-wide font-fredoka" style={{ fontWeight: 700, fontStyle: "normal" }}>SIMATIKA</span>
            </Link>

            {/* Mobile Menu Button */}
            <button 
                className="md:hidden text-white text-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                ☰
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 text-white text-lg font-medium">
                <Link to="/" className="hover:text-yellow-300 transition-colors">Beranda</Link>
                <Link to="/belajar" className="hover:text-yellow-300 transition-colors">Materi</Link>
                <Link to="/berlatih" className="hover:text-yellow-300 transition-colors">Latihan</Link>
                <Link 
                    to="/penjumlahan" 
                    className="bg-[#FCD34D] text-blue-900 px-6 py-2 rounded-full font-bold hover:bg-[#fbbf24] transition-transform hover:scale-105"
                >
                    Mulai
                </Link>
            </nav>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-[#2563EB] flex flex-col items-center gap-4 py-4 md:hidden shadow-lg">
                    <Link to="/" className="text-white hover:text-yellow-300" onClick={() => setIsMenuOpen(false)}>Beranda</Link>
                    <Link to="/belajar" className="text-white hover:text-yellow-300" onClick={() => setIsMenuOpen(false)}>Materi</Link>
                    <Link to="/berlatih" className="text-white hover:text-yellow-300" onClick={() => setIsMenuOpen(false)}>Latihan</Link>
                    <Link 
                        to="/penjumlahan" 
                        className="bg-[#FCD34D] text-blue-900 px-6 py-2 rounded-full font-bold"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Mulai
                    </Link>
                </div>
            )}
        </header>
    );
};

// Component for Topic Selection (The Cards)
const TopicSelection = () => {
  return (
    <div className="h-dvh w-full overflow-y-auto overflow-x-hidden bg-gray-50 font-nunito bg-fixed flex flex-col"
         style={{ backgroundImage: "url('/latar.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      <Header />

      <div className="flex-1 w-full flex flex-col items-center justify-center py-10 px-4">
          <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Left Side Text */}
            <div className="md:w-1/4 text-center md:text-left mb-8 md:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 drop-shadow-sm font-fredoka">Ayo Belajar</h1>
                <p className="mt-4 text-gray-600 text-lg hidden md:block">Pilih materi yang ingin kamu pelajari hari ini!</p>
            </div>

                {/* Cards Grid */}
                <div className="flex-1 flex flex-wrap justify-center gap-8 md:gap-6 lg:gap-8">
                    {/* Penjumlahan */}
                    <Link to="penjumlahan" className="card group relative w-[220px] h-[321px] bg-white rounded-[10px] overflow-hidden flex flex-col justify-center items-center shadow-[0_14px_26px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[5px] hover:scale-[1.005] hover:shadow-[0_24px_36px_rgba(0,0,0,0.11)]">
                        {/* Overlay */}
                        <div className="absolute w-[118px] h-[118px] rounded-full top-[70px] left-[51px] bg-[#ffd861] z-0 transition-transform duration-300 group-hover:scale-[4]"></div>
                        
                        {/* Circle Icon */}
                        <div className="relative z-10 w-[131px] h-[131px] rounded-full bg-white border-2 border-[#ffd861] flex justify-center items-center transition-all duration-300 group-hover:bg-[#ffd861] group-hover:border-[#ffeeba]">
                            {/* Inner Circle (using pseudo-element simulation or nested div) */}
                            <div className="absolute w-[118px] h-[118px] rounded-full bg-[#ffd861] transition-colors duration-300 group-hover:bg-[#ffeeba]"></div>
                            
                            {/* SVG */}
                            <svg width="71px" height="76px" viewBox="0 0 71 76" className="relative z-20">
                                <circle cx="35.5" cy="38" r="35.5" fill="#D98A19"/>
                                <line x1="35.5" y1="18" x2="35.5" y2="58" stroke="#FFFFFF" strokeWidth="5"/>
                                <line x1="18" y1="38" x2="53" y2="38" stroke="#FFFFFF" strokeWidth="5"/>
                            </svg>
                        </div>
                        
                        <p className="text-[17px] text-[#4C5656] mt-[30px] z-20 transition-colors duration-300 group-hover:text-[#4C5656] font-nunito font-bold">Penjumlahan</p>
                    </Link>

                    {/* Pengurangan */}
                    <Link to="pengurangan" className="card group relative w-[220px] h-[321px] bg-white rounded-[10px] overflow-hidden flex flex-col justify-center items-center shadow-[0_14px_26px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[5px] hover:scale-[1.005] hover:shadow-[0_24px_36px_rgba(0,0,0,0.11)]">
                        <div className="absolute w-[118px] h-[118px] rounded-full top-[70px] left-[51px] bg-[#B8F9D3] z-0 transition-transform duration-300 group-hover:scale-[4]"></div>
                        <div className="relative z-10 w-[131px] h-[131px] rounded-full bg-white border-2 border-[#B8F9D3] flex justify-center items-center transition-all duration-300 group-hover:bg-[#B8F9D3] group-hover:border-[#e2fced]">
                            <div className="absolute w-[118px] h-[118px] rounded-full bg-[#B8F9D3] transition-colors duration-300 group-hover:bg-[#e2fced]"></div>
                            <svg width="64px" height="72px" viewBox="0 0 64 72" className="relative z-20">
                                <circle cx="32" cy="36" r="32" fill="#59A785"/>
                                <rect x="14" y="34" width="36" height="4" fill="#FFFFFF"/>   
                            </svg>
                        </div>
                        <p className="text-[17px] text-[#4C5656] mt-[30px] z-20 transition-colors duration-300 group-hover:text-[#4C5656] font-nunito font-bold">Pengurangan</p>
                    </Link>

                    {/* Perkalian */}
                    <Link to="perkalian" className="card group relative w-[220px] h-[321px] bg-white rounded-[10px] overflow-hidden flex flex-col justify-center items-center shadow-[0_14px_26px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[5px] hover:scale-[1.005] hover:shadow-[0_24px_36px_rgba(0,0,0,0.11)]">
                        <div className="absolute w-[118px] h-[118px] rounded-full top-[70px] left-[51px] bg-[#CEB2FC] z-0 transition-transform duration-300 group-hover:scale-[4]"></div>
                        <div className="relative z-10 w-[131px] h-[131px] rounded-full bg-white border-2 border-[#CEB2FC] flex justify-center items-center transition-all duration-300 group-hover:bg-[#CEB2FC] group-hover:border-[#F0E7FF]">
                            <div className="absolute w-[118px] h-[118px] rounded-full bg-[#CEB2FC] transition-colors duration-300 group-hover:bg-[#F0E7FF]"></div>
                            <svg width="78px" height="60px" viewBox="0 0 78 60" className="relative z-20">
                                <circle cx="39" cy="30" r="30" fill="#AC8BE9"/>
                                <line x1="20" y1="20" x2="58" y2="40" stroke="#FFFFFF" strokeWidth="6"/>
                                <line x1="20" y1="40" x2="58" y2="20" stroke="#FFFFFF" strokeWidth="6"/>
                            </svg>
                        </div>
                        <p className="text-[17px] text-[#4C5656] mt-[30px] z-20 transition-colors duration-300 group-hover:text-white font-nunito font-bold">Perkalian</p>
                    </Link>

                    {/* Pembagian */}
                    <Link to="pembagian" className="card group relative w-[220px] h-[321px] bg-white rounded-[10px] overflow-hidden flex flex-col justify-center items-center shadow-[0_14px_26px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[5px] hover:scale-[1.005] hover:shadow-[0_24px_36px_rgba(0,0,0,0.11)]">
                        <div className="absolute w-[118px] h-[118px] rounded-full top-[70px] left-[51px] bg-[#DCE9FF] z-0 transition-transform duration-300 group-hover:scale-[4]"></div>
                        <div className="relative z-10 w-[131px] h-[131px] rounded-full bg-white border-2 border-[#DCE9FF] flex justify-center items-center transition-all duration-300 group-hover:bg-[#DCE9FF] group-hover:border-[#f1f7ff]">
                            <div className="absolute w-[118px] h-[118px] rounded-full bg-[#DCE9FF] transition-colors duration-300 group-hover:bg-[#f1f7ff]"></div>
                            <svg width="66px" height="77px" viewBox="0 0 66 77" className="relative z-20">
                                <circle cx="33" cy="20" r="15" fill="#AFCEFF"/>
                                <circle cx="33" cy="56" r="15" fill="#AFCEFF"/>
                                <rect x="28" y="31" width="10" height="15" fill="#3B6CB7"/>  
                            </svg>
                        </div>
                        <p className="text-[17px] text-[#4C5656] mt-[30px] z-20 transition-colors duration-300 group-hover:text-[#4C5656] font-nunito font-bold">Pembagian</p>
                    </Link>
                </div>
          </div>
      </div>
    </div>
  );
};

// Component for Video Player
const VideoPlayer = () => {
    const { topicId } = useParams();
    const topic = topics[topicId];
    const navigate = useNavigate();

    if (!topic) {
        return <div className="h-dvh flex items-center justify-center text-2xl">Materi tidak ditemukan</div>;
    }

    return (
        <div className="h-dvh w-full bg-cover bg-center bg-fixed flex flex-col overflow-y-auto overflow-x-hidden" style={{ backgroundImage: "url('/LATAR2.png')" }}>
            <Header />
            
            <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 relative z-0">
                {/* Dark Overlay Box */}
                <div className="w-full max-w-4xl bg-black/60 backdrop-blur-sm rounded-3xl p-6 md:p-10 flex flex-col items-center shadow-2xl animate-fade-in">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-fredoka">{topic.title}</h2>
                    
                    {/* Video Container */}
                    <VideoPlayerComponent 
                        src={topic.video} 
                        poster={topic.poster} 
                        title={topic.title} 
                    />
                </div>

                {/* Motivational Text Box */}
                <div className="mt-8 bg-white rounded-2xl py-6 px-10 shadow-lg max-w-2xl w-full text-center transform hover:scale-105 transition-transform duration-300">
                    <p className="text-gray-700 text-lg md:text-xl font-medium font-nunito">
                        Ayo kita belajar anak-anak dengan semangat dan penuh keceriaan!
                    </p>
                </div>

                {/* Navigation Buttons */}
                <div className="mt-8 flex gap-4 pb-8">
                     <Link to="/belajar" className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full backdrop-blur-md transition-all">
                        ← Kembali ke Materi
                     </Link>
                     <Link to={topic.gameLink} className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-6 py-2 rounded-full font-bold shadow-lg transition-all">
                        Mulai Latihan →
                     </Link>
                </div>
            </div>
        </div>
    );
};

// Main Component with Routes
const Belajar = () => {
  return (
    <Routes>
      <Route index element={<TopicSelection />} />
      <Route path=":topicId" element={<VideoPlayer />} />
    </Routes>
  );
};

export default Belajar;
