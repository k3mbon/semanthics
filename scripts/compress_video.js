import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to parse args
const getArg = (name) => {
    const index = process.argv.indexOf(`--${name}`);
    return index > -1 ? process.argv[index + 1] : null;
};

const inputPath = getArg('input');
const outputPath = getArg('output');
const resolution = getArg('res'); // e.g., 1280x720
const bitrate = getArg('bitrate'); // e.g., 1000k
const codec = getArg('codec') || 'libx264'; // default h264

if (!inputPath || !outputPath) {
    console.error('Usage: node scripts/compress_video.js --input <file> --output <file> [--res <WxH>] [--bitrate <rate>] [--codec <codec>]');
    process.exit(1);
}

const absInput = path.resolve(process.cwd(), inputPath);
const absOutput = path.resolve(process.cwd(), outputPath);

if (!fs.existsSync(absInput)) {
    console.error(`Error: Input file not found: ${absInput}`);
    process.exit(1);
}

console.log(`\nStarting compression:`);
console.log(`Input: ${absInput}`);
console.log(`Output: ${absOutput}`);
if (resolution) console.log(`Resolution: ${resolution}`);
if (bitrate) console.log(`Bitrate: ${bitrate}`);
console.log(`Codec: ${codec}\n`);

const command = ffmpeg(absInput);

if (resolution) {
    command.size(resolution);
}
if (bitrate) {
    command.videoBitrate(bitrate);
}

command
    .videoCodec(codec)
    .on('start', (commandLine) => {
        console.log('Spawned Ffmpeg with command: ' + commandLine);
    })
    .on('progress', (progress) => {
        // Simple progress bar
        const percent = progress.percent ? progress.percent.toFixed(1) : '0.0';
        process.stdout.write(`\rProcessing: ${percent}% done`);
    })
    .on('error', (err) => {
        console.error('\nError occurred: ' + err.message);
        process.exit(1);
    })
    .on('end', () => {
        console.log('\nProcessing finished successfully!');
        
        // Quality Validation: Check size reduction
        const inputStats = fs.statSync(absInput);
        const outputStats = fs.statSync(absOutput);
        const reduction = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(2);
        
        console.log(`\n--- Summary ---`);
        console.log(`Original Size: ${(inputStats.size / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Compressed Size: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Reduction: ${reduction}%`);
        console.log(`----------------`);
    })
    .save(absOutput);
