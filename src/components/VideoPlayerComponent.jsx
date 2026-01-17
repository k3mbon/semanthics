import React, { useState, useRef, useEffect } from 'react';

const VideoPlayerComponent = ({ src, poster, title }) => {
    const videoRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleLoadStart = () => setIsLoading(true);
        const handleCanPlay = () => setIsLoading(false);
        const handleWaiting = () => setIsLoading(true);
        const handlePlaying = () => {
            setIsLoading(false);
            setIsPlaying(true);
        };
        const handlePause = () => setIsPlaying(false);
        const handleError = () => {
            setIsLoading(false);
            setError(true);
        };

        videoElement.addEventListener('loadstart', handleLoadStart);
        videoElement.addEventListener('canplay', handleCanPlay);
        videoElement.addEventListener('waiting', handleWaiting);
        videoElement.addEventListener('playing', handlePlaying);
        videoElement.addEventListener('pause', handlePause);
        videoElement.addEventListener('error', handleError);

        // Check if already ready
        if (videoElement.readyState >= 3) {
            setIsLoading(false);
        }

        return () => {
            videoElement.removeEventListener('loadstart', handleLoadStart);
            videoElement.removeEventListener('canplay', handleCanPlay);
            videoElement.removeEventListener('waiting', handleWaiting);
            videoElement.removeEventListener('playing', handlePlaying);
            videoElement.removeEventListener('pause', handlePause);
            videoElement.removeEventListener('error', handleError);
        };
    }, [src]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    };

    return (
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg group">
            {/* Loading Spinner */}
            {isLoading && !error && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50 backdrop-blur-sm">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/80">
                    <div className="text-center text-white p-4">
                        <p className="text-red-400 font-bold mb-2">Gagal memuat video</p>
                        <p className="text-sm">Format video tidak didukung atau file tidak ditemukan.</p>
                    </div>
                </div>
            )}

            {/* Play Button Overlay (Initial or Paused) */}
            {!isPlaying && !isLoading && !error && (
                <div 
                    className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 hover:bg-black/30 transition-colors cursor-pointer group-hover:opacity-100"
                    onClick={togglePlay}
                >
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/50 hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            )}

            <video
                ref={videoRef}
                className="w-full h-full object-contain"
                poster={poster}
                preload="auto"
                controls={isPlaying} // Show native controls only when playing
                playsInline
                controlsList="nodownload" // Optional: discourage downloading
            >
                <source src={src} type="video/mp4" />
                <p className="text-white p-4 text-center">
                    Browser Anda tidak mendukung tag video. Silakan upgrade browser Anda.
                </p>
            </video>
        </div>
    );
};

export default VideoPlayerComponent;
