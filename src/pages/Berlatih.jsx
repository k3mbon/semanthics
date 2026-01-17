import { Link } from 'react-router-dom';

const Berlatih = () => {
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
            <div className="bg-[#2d3748] rounded-2xl p-6 text-center text-[#e2e8f0] shadow-md flex flex-col justify-between items-center transition-transform duration-300 hover:-translate-y-1">
                <h2 className="text-2xl font-semibold mb-4">Perkalian</h2>
                <Link to="/berlatih/perkalian">
                    <button className="px-6 py-3 rounded-xl font-bold text-white border-none cursor-pointer relative overflow-hidden transition-all duration-300 shadow-[0_0_15px_#f97316] bg-[#f97316] hover:opacity-90 hover:scale-105">Buka</button>
                </Link>
            </div>

            {/* Kartu Pembagian */}
            <div className="bg-[#2d3748] rounded-2xl p-6 text-center text-[#e2e8f0] shadow-md flex flex-col justify-between items-center transition-transform duration-300 hover:-translate-y-1">
                <h2 className="text-2xl font-semibold mb-4">Pembagian</h2>
                <Link to="/berlatih/pembagian">
                    <button className="px-6 py-3 rounded-xl font-bold text-white border-none cursor-pointer relative overflow-hidden transition-all duration-300 shadow-[0_0_15px_#3b82f6] bg-[#3b82f6] hover:opacity-90 hover:scale-105">Buka</button>
                </Link>
            </div>
       </div>
    </div>
  );
};

export default Berlatih;
