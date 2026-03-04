import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Berlatih = () => {
  const [isPerkalianLocked, setIsPerkalianLocked] = useState(true);
  const [isPembagianLocked, setIsPembagianLocked] = useState(true);

  useEffect(() => {
    // Check completion status from localStorage
    const penjumlahanCompleted = JSON.parse(localStorage.getItem('penjumlahan_completed') || '[]');
    const penguranganCompleted = JSON.parse(localStorage.getItem('pengurangan_completed') || '[]');
    
    // Assuming 5 questions per module (based on soals array length in respective files)
    const TOTAL_QUESTIONS = 5;
    
    const isPenjumlahanDone = penjumlahanCompleted.length === TOTAL_QUESTIONS;
    const isPenguranganDone = penguranganCompleted.length === TOTAL_QUESTIONS;
    
    // Unlock if both previous modules are fully completed
    const unlocked = isPenjumlahanDone && isPenguranganDone;
    
    setIsPerkalianLocked(!unlocked);
    setIsPembagianLocked(!unlocked);
  }, []);

  const handleLockedClick = (e) => {
    if (isPerkalianLocked) {
      e.preventDefault();
      alert("Selesaikan semua soal Penjumlahan dan Pengurangan terlebih dahulu untuk membuka kunci ini!");
    }
  };

  return (
    <div className="font-inter bg-[#1a202c] min-h-screen flex justify-center items-center p-5 box-border">
       <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-[1200px] w-full justify-center">
            {/* Kartu Penjumlahan */}
            <div className="bg-[#2d3748] rounded-2xl p-6 text-center text-[#e2e8f0] shadow-md flex flex-col justify-between items-center transition-transform duration-300 hover:-translate-y-1">
                <h2 className="text-2xl font-semibold mb-4">Penjumlahan</h2>
                <Link to="/berlatih/penjumlahan">
                    <button className="px-6 py-3 rounded-xl font-bold text-white border-none cursor-pointer relative overflow-hidden transition-all duration-300 shadow-[0_0_15px_#10b981] bg-[#10b981] hover:opacity-90 hover:scale-105">Buka</button>
                </Link>
            </div>

            {/* Kartu Pengurangan */}
            <div className="bg-[#2d3748] rounded-2xl p-6 text-center text-[#e2e8f0] shadow-md flex flex-col justify-between items-center transition-transform duration-300 hover:-translate-y-1">
                <h2 className="text-2xl font-semibold mb-4">Pengurangan</h2>
                <Link to="/berlatih/pengurangan">
                    <button className="px-6 py-3 rounded-xl font-bold text-white border-none cursor-pointer relative overflow-hidden transition-all duration-300 shadow-[0_0_15px_#ec4899] bg-[#ec4899] hover:opacity-90 hover:scale-105">Buka</button>
                </Link>
            </div>

            {/* Kartu Perkalian */}
            <div className={`bg-[#2d3748] rounded-2xl p-6 text-center text-[#e2e8f0] shadow-md flex flex-col justify-between items-center transition-transform duration-300 ${isPerkalianLocked ? 'opacity-75' : 'hover:-translate-y-1'}`}>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 justify-center">
                  Perkalian
                  {isPerkalianLocked && <span className="text-xl">🔒</span>}
                </h2>
                <Link to={isPerkalianLocked ? "#" : "/berlatih/perkalian"} onClick={handleLockedClick}>
                    <button 
                      className={`px-6 py-3 rounded-xl font-bold text-white border-none cursor-pointer relative overflow-hidden transition-all duration-300 shadow-[0_0_15px_#f97316] bg-[#f97316] ${isPerkalianLocked ? 'cursor-not-allowed grayscale opacity-70' : 'hover:opacity-90 hover:scale-105'}`}
                      disabled={isPerkalianLocked}
                    >
                      {isPerkalianLocked ? 'Terkunci' : 'Buka'}
                    </button>
                </Link>
            </div>

            {/* Kartu Pembagian */}
            <div className={`bg-[#2d3748] rounded-2xl p-6 text-center text-[#e2e8f0] shadow-md flex flex-col justify-between items-center transition-transform duration-300 ${isPembagianLocked ? 'opacity-75' : 'hover:-translate-y-1'}`}>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 justify-center">
                  Pembagian
                  {isPembagianLocked && <span className="text-xl">🔒</span>}
                </h2>
                <Link to={isPembagianLocked ? "#" : "/berlatih/pembagian"} onClick={handleLockedClick}>
                    <button 
                      className={`px-6 py-3 rounded-xl font-bold text-white border-none cursor-pointer relative overflow-hidden transition-all duration-300 shadow-[0_0_15px_#3b82f6] bg-[#3b82f6] ${isPembagianLocked ? 'cursor-not-allowed grayscale opacity-70' : 'hover:opacity-90 hover:scale-105'}`}
                      disabled={isPembagianLocked}
                    >
                      {isPembagianLocked ? 'Terkunci' : 'Buka'}
                    </button>
                </Link>
            </div>
       </div>
    </div>
  );
};

export default Berlatih;
