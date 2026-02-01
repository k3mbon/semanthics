import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    document.title = 'Login | Simatika';
    if (audioRef.current) {
        audioRef.current.volume = 0.3;
        const playAudio = async () => {
            try {
                await audioRef.current.play();
            } catch (e) {
                console.log("Autoplay blocked:", e);
            }
        };
        playAudio();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "12345678") {
      localStorage.setItem('username', username);
      navigate('/');
    } else {
      alert("Kata rahasia salah! Coba lagi ya.");
    }
  };

  return (
    <div className="relative w-screen h-dvh flex flex-col items-center justify-center overflow-hidden font-nunito bg-cover bg-center"
         style={{ backgroundImage: "url('/LATAR2.png')" }}>
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>

      {/* Login Container */}
      <div className="relative z-10 w-[90%] max-w-md bg-white/95 backdrop-blur-sm rounded-[2rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-white/50 animate-fade-in mx-4">
        
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#0aa5ff] font-fredoka flex items-center justify-center gap-3 drop-shadow-sm"
            style={{ textShadow: '2px 2px 0px #FFD700' }}>
          <span>🎮</span> Ayo Masuk!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2 flex items-center gap-2 text-lg">
              <span className="text-xl">🧒</span> Nama Kamu
            </label>
            <input 
              type="text" 
              id="username" 
              placeholder="Contoh: Budi123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0aa5ff] focus:ring-4 focus:ring-[#0aa5ff]/20 outline-none transition-all text-gray-700 font-medium text-lg placeholder-gray-400 bg-gray-50/50"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2 flex items-center gap-2 text-lg">
              <span className="text-xl">🔒</span> Kata Rahasia
            </label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0aa5ff] focus:ring-4 focus:ring-[#0aa5ff]/20 outline-none transition-all text-gray-700 font-medium text-lg placeholder-gray-400 bg-gray-50/50"
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-[#EC4899] hover:bg-[#DB2777] text-white font-bold py-4 rounded-xl text-lg shadow-[0_4px_0_#9D174D] active:shadow-none active:translate-y-[4px] transition-all duration-200 flex items-center justify-center gap-2 mt-4 group"
          >
            <span className="group-hover:rotate-12 transition-transform duration-300">🚀</span> Masuk Sekarang
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-gray-600 mt-8 font-bold">
          Kamu Perlu Panduan? 
          <Link to="/panduan" className="text-[#EC4899] hover:text-[#DB2777] ml-1 hover:underline transition-colors">
            Panduan!
          </Link>
        </p>
      </div>

      {/* Mascot Character */}
      <img 
        src="/KARAKTER1.png" 
        alt="Karakter Simatika" 
        className="fixed bottom-0 right-0 w-32 md:w-48 lg:w-64 drop-shadow-2xl z-20 pointer-events-none transition-transform hover:scale-105"
      />

      {/* Speech Bubble */}
      <div className="fixed bottom-[140px] right-[20px] md:bottom-[200px] md:right-[180px] lg:bottom-[280px] lg:right-[220px] bg-white text-black px-6 py-4 rounded-2xl rounded-tr-none font-bold text-sm md:text-base shadow-xl z-30 animate-bounce-in max-w-[200px] md:max-w-xs text-center border-2 border-gray-100 transform rotate-[-2deg]">
        "Ayo, minta guru masukkan sandinya dulu."
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-white transform rotate-45 border-r-2 border-b-2 border-gray-100 hidden"></div>
      </div>

      {/* Background Audio */}
      <audio ref={audioRef} loop>
        <source src="/LATAR1.mp3" type="audio/mpeg" />
        Browser kamu tidak mendukung elemen audio.
      </audio>

      <style>{`
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3) translateY(100px); }
          50% { opacity: 1; transform: scale(1.05) translateY(-10px); }
          70% { transform: scale(0.9) translateY(5px); }
          100% { transform: scale(1) translateY(0) rotate(-2deg); }
        }
        .animate-bounce-in {
          animation: bounce-in 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
          animation-delay: 0.5s;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Login;
