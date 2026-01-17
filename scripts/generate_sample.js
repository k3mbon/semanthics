import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import path from 'path';
import fs from 'fs';

ffmpeg.setFfmpegPath(ffmpegPath);

const output = path.resolve(process.cwd(), 'sample_video.mp4');

console.log('Generating 5-second sample video...');

ffmpeg()
    .input('color=c=blue:s=1280x720:d=5')
    .inputFormat('lavfi')
    .output(output)
    .videoCodec('libx264')
    .on('end', () => {
        console.log(`Sample video created at: ${output}`);
    })
    .on('error', (err) => {
        console.error('Error creating sample:', err);
    })
    .run();
