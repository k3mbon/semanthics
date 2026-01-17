# Simatika - Math Learning Platform

Simatika is an interactive educational web application designed to help students learn mathematics (Addition, Subtraction, Multiplication, Division) through gamified experiences.

## Features

- **Interactive Games**: Drag-and-drop mechanics for solving math problems.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Branding**: Custom "Simatika" branding with Fredoka One typography.
- **Video Learning**: Integrated video lessons for each topic.
- **Video Compression Module**: Built-in tool to optimize video assets.

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd semanthics
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

## Video Compression Module

This project includes a comprehensive video compression tool located in `scripts/compress_video.js`. It supports multiple formats, configurable settings, and quality validation.

### Prerequisites

The compression module uses `ffmpeg-static`, so no external FFmpeg installation is required.

### Usage

Run the compression script using Node.js:

```bash
node scripts/compress_video.js --input <input_file> --output <output_file> [options]
```

### Options

- `--input <path>`: Path to the source video file (Required).
- `--output <path>`: Path where the compressed video will be saved (Required).
- `--res <WxH>`: Target resolution (e.g., `1280x720`, `640x360`).
- `--bitrate <rate>`: Target video bitrate (e.g., `1000k`, `500k`).
- `--codec <codec>`: Video codec (default: `libx264`).

### Examples

**Basic Compression:**
```bash
node scripts/compress_video.js --input public/video.mp4 --output public/video_compressed.mp4
```

**Advanced Compression (Resize & Bitrate):**
```bash
node scripts/compress_video.js --input public/video.mp4 --output public/video_mobile.mp4 --res 640x360 --bitrate 500k
```

### Testing the Module

To verify the compression functionality, you can generate a sample video and compress it:

1.  **Generate Sample Video:**
    ```bash
    node scripts/generate_sample.js
    ```
    This creates `sample_video.mp4` in the root directory.

2.  **Compress the Sample:**
    ```bash
    node scripts/compress_video.js --input sample_video.mp4 --output compressed_sample.mp4 --res 640x360 --bitrate 500k
    ```

3.  **Verify:**
    Check the console output for the "Reduction" percentage summary.

## Development

- `npm run dev`: Start dev server.
- `npm run build`: Build for production.
- `npm run test`: Run unit tests.
- `npm run lint`: Run ESLint.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
