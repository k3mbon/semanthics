import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

const baseUrl = "https://tp21undiksha.my.id/simatika.30725/";
const publicDir = path.join(process.cwd(), 'public');

const assets = [
    // Videos
    { url: "penjumlahan.belajar/penjumlahan.belajar.mp4", dest: "penjumlahan.belajar/penjumlahan.belajar.mp4" },
    { url: "pengurangan.belajar/belajar.pengurangan.mp4", dest: "pengurangan.belajar/belajar.pengurangan.mp4" },
    { url: "perkalian.belajar/belajar.perkalian.mp4", dest: "perkalian.belajar/belajar.perkalian.mp4" },
    { url: "pembagian.belajar/belajar.pembagian.mp4", dest: "pembagian.belajar/belajar.pembagian.mp4" },
    { url: "PANDUAN SIMATIKA.mp4", dest: "PANDUAN SIMATIKA.mp4" },

    // Images - Common/Root
    { url: "KARAKTER2.png", dest: "KARAKTER2.png" },
    { url: "logo-undiksha.png", dest: "logo-undiksha.png" }, // Favicon/Root logo
    
    // Images - Subfolders (Duplicated or specific?)
    // Penjumlahan Belajar
    { url: "penjumlahan.belajar/logo.undiksha.png", dest: "penjumlahan.belajar/logo.undiksha.png" },
    { url: "penjumlahan.belajar/LATAR3.png", dest: "penjumlahan.belajar/LATAR3.png" },
    { url: "penjumlahan.belajar/poster.jpg", dest: "penjumlahan.belajar/poster.jpg" },

    // Penjumlahan Game
    { url: "penjumlahan/assets/BOLA.png", dest: "penjumlahan/assets/BOLA.png" },
    { url: "penjumlahan/assets/KELAPA.png", dest: "penjumlahan/assets/KELAPA.png" },
    { url: "penjumlahan/assets/KUE.png", dest: "penjumlahan/assets/KUE.png" },
    { url: "penjumlahan/assets/MANGGA.png", dest: "penjumlahan/assets/MANGGA.png" },
    { url: "penjumlahan/assets/AYAM.png", dest: "penjumlahan/assets/AYAM.png" },
    { url: "penjumlahan/LATAR3.png", dest: "penjumlahan/LATAR3.png" },
    { url: "penjumlahan/logo.undiksha.png", dest: "penjumlahan/logo.undiksha.png" },

    // Pengurangan Belajar
    { url: "pengurangan.belajar/logo.undiksha.png", dest: "pengurangan.belajar/logo.undiksha.png" },
    { url: "pengurangan.belajar/LATAR3.png", dest: "pengurangan.belajar/LATAR3.png" },
    { url: "pengurangan.belajar/poster.jpg", dest: "pengurangan.belajar/poster.jpg" },

    // Pengurangan Game (Assuming similar structure)
    { url: "pengurangan/assets/BOLA.png", dest: "pengurangan/assets/BOLA.png" }, // Check if exists
    { url: "pengurangan/assets/KELAPA.png", dest: "pengurangan/assets/KELAPA.png" },
    { url: "pengurangan/assets/KUE.png", dest: "pengurangan/assets/KUE.png" },
    { url: "pengurangan/assets/MANGGA.png", dest: "pengurangan/assets/MANGGA.png" },
    { url: "pengurangan/assets/AYAM.png", dest: "pengurangan/assets/AYAM.png" },
    { url: "pengurangan/LATAR3.png", dest: "pengurangan/LATAR3.png" },

    // Perkalian Belajar
    { url: "perkalian.belajar/logo.undiksha.png", dest: "perkalian.belajar/logo.undiksha.png" },
    { url: "perkalian.belajar/LATAR3.png", dest: "perkalian.belajar/LATAR3.png" },
    { url: "perkalian.belajar/poster.jpg", dest: "perkalian.belajar/poster.jpg" },

    // Pembagian Belajar
    { url: "pembagian.belajar/logo.undiksha.png", dest: "pembagian.belajar/logo.undiksha.png" },
    { url: "pembagian.belajar/LATAR3.png", dest: "pembagian.belajar/LATAR3.png" },
    { url: "pembagian.belajar/poster.jpg", dest: "pembagian.belajar/poster.jpg" },
    
    // Other Root assets likely needed
    { url: "LATAR1.png", dest: "LATAR1.png" },
    { url: "LATAR3.png", dest: "LATAR3.png" },
    { url: "KARAKTER1.png", dest: "KARAKTER1.png" },
    { url: "LATAR1.mp3", dest: "LATAR1.mp3" },
    { url: "dosen1.png", dest: "dosen1.png" },
    { url: "mahasiswa1.png", dest: "mahasiswa1.png" },
    { url: "mahasiswa2.png", dest: "mahasiswa2.png" },
    
    // Numbers for Penjumlahan (and others likely)
    { url: "penjumlahan/0.png", dest: "penjumlahan/0.png" },
    { url: "penjumlahan/1.png", dest: "penjumlahan/1.png" },
    { url: "penjumlahan/2.png", dest: "penjumlahan/2.png" },
    { url: "penjumlahan/3.png", dest: "penjumlahan/3.png" },
    { url: "penjumlahan/4.png", dest: "penjumlahan/4.png" },
    { url: "penjumlahan/5.png", dest: "penjumlahan/5.png" },
    { url: "penjumlahan/6.png", dest: "penjumlahan/6.png" },
    { url: "penjumlahan/7.png", dest: "penjumlahan/7.png" },
    { url: "penjumlahan/8.png", dest: "penjumlahan/8.png" },
    { url: "penjumlahan/9.png", dest: "penjumlahan/9.png" },
];

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

async function downloadFile(asset) {
    const url = baseUrl + asset.url;
    const localPath = path.join(publicDir, asset.dest);
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Skip if already exists and large (videos) to save time, or just overwrite?
    // Let's overwrite to be safe, but maybe check size?
    // For now, just download.
    
    console.log(`Downloading ${url}...`);
    try {
        const response = await axios.get(url, { responseType: 'stream' });
        await pipeline(response.data, fs.createWriteStream(localPath));
        console.log(`Success: ${localPath}`);
    } catch (error) {
        console.error(`Failed ${url}: ${error.message}`);
        // Try fallback for some assets if they are in root
        if (asset.dest.includes('/')) {
             const fallbackUrl = baseUrl + path.basename(asset.dest);
             // Logic to try fallback if needed, but for now just log error.
        }
    }
}

async function main() {
    // Process in chunks to avoid overwhelming
    const chunkSize = 5;
    for (let i = 0; i < assets.length; i += chunkSize) {
        const chunk = assets.slice(i, i + chunkSize);
        await Promise.all(chunk.map(downloadFile));
    }
}

main();
