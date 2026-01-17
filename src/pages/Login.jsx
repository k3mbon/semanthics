import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = 0.1;
        audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "12345678") {
      navigate('/');
    } else {
      alert("Kata rahasia salah! Coba lagi ya.");
    }
  };

  return (
    <div className="relative w-screen min-h-dvh flex flex-col items-center justify-center overflow-hidden font-fredoka py-10">
      {/* Background with Overlay */}
       <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/LATAR1.png')` 
        }}
      />
      <div className="fixed inset-0 bg-black/30 z-0"></div>

      {/* Login Container */}
      <div className="relative z-10 p-8 bg-white/90 rounded-2xl shadow-2xl max-w-sm w-full transition-transform duration-300 hover:scale-105 mx-4">
        <h2 className="text-4xl font-bold text-center mb-6 text-[#0aa5ff]" style={{ textShadow: '1px 1px #ffd700' }}>🎮 Ayo Masuk!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="username" className="block text-sm font-medium mb-1 text-gray-700">🧒 Nama Kamu</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Contoh: Budi123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-200 ease-in-out"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700">🔒 Kata Rahasia</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-200 ease-in-out"
            />
          </div>
          <button 
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-xl w-full transform transition duration-300 hover:scale-105 shadow-lg"
          >
            🚀 Masuk Sekarang
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-5">
          Kamu Perlu Panduan? 
          <a href="https://go.undiksha.ac.id/panduansimatika" className="text-pink-500 hover:text-pink-700 font-semibold ml-1"> Panduan!</a>
        </p>
      </div>

      {/* Mascot */}
      <img src="/KARAKTER1.png" alt="Maskot" className="fixed bottom-[-2px] right-[5px] w-[150px] md:w-[200px] z-[1001] animate-bounce-float hidden md:block" style={{ animation: 'bounceIn 1.5s ease-out forwards, float 3s ease-in-out infinite' }} />
      <div className="fixed bottom-[200px] md:bottom-[300px] right-[25px] bg-white/85 text-black px-4 py-2 rounded-2xl font-fredoka text-base z-[1002] shadow-md animate-bounce-in hidden md:block">
        "Ayo, minta guru masukkan sandinya dulu."
      </div>

       <audio ref={audioRef} autoPlay loop>
        <source src="/LATAR1.mp3" type="audio/mpeg" />
      </audio>
      
      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0.5) translateY(200px); opacity: 0; }
          60% { transform: scale(1.1) translateY(-20px); opacity: 1; }
          80% { transform: scale(0.95) translateY(10px); }
          100% { transform: scale(1) translateY(0); }
        }
        @keyframes float {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default Login;
