import { Link } from 'react-router-dom';

const Info = () => {
  return (
    <div className="h-dvh w-full overflow-y-auto font-inter text-gray-900 relative">
       {/* Background */}
       <div 
        className="fixed inset-0 z-[-2] bg-cover bg-center blur-[8px]"
        style={{ backgroundImage: "url('/LATAR3.png')" }}
       ></div>
       <div className="fixed inset-0 z-[-1] bg-white/40"></div>

       <div className="flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-4xl w-full mx-auto mb-6">
            <Link to="/" className="inline-flex items-center text-blue-800 hover:text-blue-900 font-bold bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm transition-all hover:shadow-md">
                <span className="mr-2 text-xl">←</span> Kembali ke Menu
            </Link>
         </div>

         <div className="max-w-4xl w-full mx-auto space-y-10">
           {/* Header */}
           <header className="text-center">
             <h1 className="text-4xl font-bold text-blue-900">Tim Pengembang</h1>
             <p className="text-lg text-blue-700 mt-2">Menghadirkan Solusi Digital Inovatif & Profesional</p>
           </header>

           {/* Tentang Kami */}
           <section className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-8 border border-blue-100">
             <h2 className="text-2xl font-bold text-blue-800 mb-4">Tentang Kami</h2>
             <p className="text-gray-700 mb-2">
              Kami adalah tim pengembang profesional yang fokus menciptakan media pembelajaran digital yang inklusif, interaktif, dan ramah bagi semua siswa, dengan pendekatan Universal Design for Learning (UDL) yang responsif terhadap kebutuhan beragam.
              Dengan menerapkan pendekatan fleksibel dan adaptif, kami menjamin aksesibilitas, efektivitas, dan kualitas tinggi dalam setiap solusi yang kami kembangkan.
             </p>
           </section>

           {/* Tim Penulis */}
           <section className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-8 border border-blue-100">
             <h2 className="text-2xl font-bold text-blue-800 mb-6">Tim Penulis</h2>
             <div className="flex flex-col md:flex-row items-center gap-6">
               <img src="/dosen1.png" alt="Drs. I Made Suarjana, M.Pd" className="w-40 h-40 rounded-full object-cover border-4 border-blue-600 shadow-md" />
               <div>
                 <h3 className="text-xl font-semibold text-gray-800">Drs. I Made Suarjana, M.Pd</h3>
                 <p className="text-sm text-blue-600 mb-2">Dosen Undiksha</p>
                 <p className="text-gray-700">"Dosen PGSD Undiksha yang berfokus pada pengembangan strategi pembelajaran inovatif untuk siswa sekolah dasar melalui pemanfaatan media digital dan teknologi interaktif guna mendukung pembelajaran yang menyenangkan dan inklusif."</p>
               </div>
             </div>
           </section>

           {/* Tim Pengembang 1 */}
           <section className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-8 border border-blue-100">
             <h2 className="text-2xl font-bold text-blue-800 mb-6">Tim Pengembang</h2>
             <div className="flex flex-col md:flex-row items-center gap-6">
               <img src="/mahasiswa1.png" alt="Kristian" className="w-40 h-40 rounded-full object-cover border-4 border-blue-600 shadow-md" />
               <div>
                 <h3 className="text-xl font-semibold text-gray-800">Kristian</h3>
                 <p className="text-sm text-blue-600 mb-2">Mahasiswa Undiksha</p>
                 <p className="text-gray-700">"Mahasiswa PGSD yang aktif mengembangkan media pembelajaran interaktif berbasis digital untuk mendukung pembelajaran yang menyenangkan dan inklusif di jenjang sekolah dasar."</p>
               </div>
             </div>
           </section>

           {/* Tim Pengembang 2 */}
           <section className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-8 border border-blue-100">
             <h2 className="text-2xl font-bold text-blue-800 mb-6">Tim Pengembang</h2>
             <div className="flex flex-col md:flex-row items-center gap-6">
               <img src="/mahasiswa2.png" alt="Ni Made Armi" className="w-40 h-40 rounded-full object-cover border-4 border-blue-600 shadow-md" />
               <div>
                 <h3 className="text-xl font-semibold text-gray-800">Ni Made Armi</h3>
                 <p className="text-sm text-blue-600 mb-2">Mahasiswa Undiksha</p>
                 <p className="text-gray-700">"Mahasiswa PGSD yang aktif mengembangkan media pembelajaran interaktif berbasis digital untuk mendukung pembelajaran yang menyenangkan dan inklusif di jenjang sekolah dasar."</p>
               </div>
             </div>
           </section>

           {/* Teknologi */}
           <section className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-8 border border-blue-100">
             <h2 className="text-2xl font-bold text-blue-800 mb-4">Teknologi & Tools</h2>
             <div className="flex flex-wrap gap-3">
               {['React', 'Tailwind CSS', 'JavaScript', 'Vite', 'Figma', 'Git'].map((tech, i) => (
                 <span key={i} className={`px-4 py-2 rounded-lg font-medium ${
                   tech === 'React' ? 'bg-blue-100 text-blue-900' :
                   tech === 'Tailwind CSS' ? 'bg-green-100 text-green-800' :
                   tech === 'JavaScript' ? 'bg-yellow-100 text-yellow-800' :
                   tech === 'Vite' ? 'bg-gray-100 text-gray-800' :
                   tech === 'Figma' ? 'bg-purple-100 text-purple-800' :
                   'bg-red-100 text-red-800'
                 }`}>{tech}</span>
               ))}
             </div>
           </section>

           {/* Kontak */}
           <section className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-8 border border-blue-100">
             <h2 className="text-2xl font-bold text-blue-800 mb-4">Kontak</h2>
             <ul className="space-y-2 text-gray-700">
               <li><strong>Alamat:</strong> Jln. Udayana No. 11, Singaraja, Kec. Buleleng, Kabupaten Buleleng, Bali.</li>
               <li><strong>Kode Pos:</strong> 81116 Undiksha</li>
               <li><strong>Telepon:</strong> 0362-31372</li>
               <li><strong>Email:</strong> <a href="mailto:humas@undiksha.ac.id" className="text-blue-600 hover:underline">humas@undiksha.ac.id</a></li>
             </ul>
           </section>
         </div>
       </div>
    </div>
  );
};

export default Info;
