import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, Maximize, X, FastForward, Info } from 'lucide-react';

const MentorVideoPlayer = ({ video, onEnded, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[999] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-6xl aspect-video bg-black rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(79,70,229,0.2)] border border-white/10"
        onMouseMove={() => {
          setShowOverlay(true);
          clearTimeout(window.overlayTimeout);
          window.overlayTimeout = setTimeout(() => isPlaying && setShowOverlay(false), 3000);
        }}
      >
        
        {/* Real Video Element */}
        <video 
          ref={videoRef}
          src={video.videoUrl}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onEnded={onEnded}
          onClick={togglePlay}
          poster={video.thumbnail}
          autoPlay
          playsInline
        />

        {/* Overlay when Paused */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-20 pointer-events-none"
            >
              <div className="text-center space-y-6">
                <button 
                  onClick={togglePlay}
                  className="w-24 h-24 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform pointer-events-auto"
                >
                  <Play size={40} fill="currentColor" className="ml-2" />
                </button>
                <div>
                  <h2 className="text-3xl font-black text-white">{video.title}</h2>
                  <p className="text-indigo-400 font-bold uppercase tracking-widest text-sm">Click to resume the session</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Controls */}
        <motion.div 
          animate={{ opacity: showOverlay || !isPlaying ? 1 : 0, y: showOverlay || !isPlaying ? 0 : -20 }}
          className="absolute top-0 inset-x-0 p-8 flex justify-between items-start bg-gradient-to-b from-black/80 via-black/40 to-transparent z-30"
        >
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
              <Play size={24} fill="currentColor" />
            </div>
            <div>
              <div className="text-white font-black text-xl">{video.title}</div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-400/10 px-2 py-0.5 rounded border border-indigo-400/20">AI Mentor</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{video.category} • {video.duration}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onEnded()}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-xs font-black text-white transition-all border border-white/10"
            >
              <FastForward size={16} /> Skip to Quiz
            </button>
            <button 
              onClick={onClose}
              className="p-3 text-white/60 hover:text-white bg-white/10 hover:bg-rose-600 backdrop-blur-md rounded-2xl transition-all border border-white/10"
            >
              <X size={24} />
            </button>
          </div>
        </motion.div>

        {/* Bottom Controls */}
        <motion.div 
          animate={{ opacity: showOverlay || !isPlaying ? 1 : 0, y: showOverlay || !isPlaying ? 0 : 20 }}
          className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-30"
        >
          {/* Progress Bar */}
          <div 
            onClick={handleSeek}
            className="w-full h-2 bg-white/10 rounded-full mb-8 relative overflow-hidden cursor-pointer group"
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] opacity-0 group-hover:opacity-100 transition-opacity scale-150" />
            </motion.div>
          </div>

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-8">
              <button 
                onClick={togglePlay} 
                className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl hover:bg-white hover:text-slate-950 transition-all"
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
              </button>
              
              <div className="hidden md:flex items-center gap-4">
                <Volume2 size={20} className="text-gray-400" />
                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-indigo-500" />
                </div>
              </div>

              <div className="text-sm font-black font-mono tracking-tighter text-gray-400">
                <span className="text-white">
                  {videoRef.current ? Math.floor(videoRef.current.currentTime / 60) : '00'}:
                  {videoRef.current ? Math.floor(videoRef.current.currentTime % 60).toString().padStart(2, '0') : '00'}
                </span> / {video.duration}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-3 text-gray-400 hover:text-white transition-colors">
                <Info size={20} />
              </button>
              <button className="p-3 text-gray-400 hover:text-white transition-colors">
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>,
    document.body
  );
};

export default MentorVideoPlayer;
