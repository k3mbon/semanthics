import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

const baseUrl = "https://tp21undiksha.my.id/simatika.30725/";
const pages = [
    "menu.html",
    "info.html",
    "index.html",
    "pop.up.belajar.html",
    "pop.up.berlatih.html"
];

const assetsDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir);
}

async function downloadFile(url, filename) {
    try {
        const response = await axios.get(url, { responseType: 'stream' });
        const filePath = path.join(assetsDir, filename);
        await pipeline(response.data, fs.createWriteStream(filePath));
        console.log(`Downloaded: ${filename}`);
    } catch (error) {
        console.error(`Failed to download ${filename}: ${error.message}`);
    }
}

async function fetchPage(pageName) {
    try {
        const url = baseUrl + pageName;
        console.log(`Fetching ${url}...`);
        const response = await axios.get(url);
        const html = response.data;
        
        // Save HTML for analysis
        fs.writeFileSync(`analysis_${pageName}`, html);
        
        const $ = cheerio.load(html);
        
        // Find and download images
        $('img').each((i, elem) => {
            const src = $(elem).attr('src');
            if (src && !src.startsWith('http')) {
                downloadFile(baseUrl + src, src);
            }
        });

        // Find and download audio
        $('source').each((i, elem) => {
            const src = $(elem).attr('src');
            if (src && !src.startsWith('http')) {
                downloadFile(baseUrl + src, src);
            }
        });

        // Find background images in inline styles (simple check)
        // Note: parsing CSS is complex, this is a basic check for the known one
        if (html.includes("LATAR2.png")) {
            downloadFile(baseUrl + "LATAR2.png", "LATAR2.png");
        }
        
         // Check for other assets or scripts
        $('script').each((i, elem) => {
            const src = $(elem).attr('src');
            if (src && !src.startsWith('http')) {
                 downloadFile(baseUrl + src, src);
            }
        });
        
         $('link[rel="stylesheet"]').each((i, elem) => {
            const href = $(elem).attr('href');
            if (href && !href.startsWith('http')) {
                 downloadFile(baseUrl + href, href);
            }
        });

    } catch (error) {
        console.error(`Error fetching ${pageName}:`, error.message);
    }
}

async function main() {
    for (const page of pages) {
        await fetchPage(page);
    }
}

main();
