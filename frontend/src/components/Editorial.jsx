import { useState, useRef, useEffect } from 'react';
import { Pause, Play } from 'lucide-react';

<<<<<<< HEAD


const Editorial = ({ secureUrl, thumbnailUrl, duration }) => {


=======
const Editorial = ({ secureUrl, thumbnailUrl, duration }) => {

>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
<<<<<<< HEAD

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
=======
  const [videoDuration, setVideoDuration] = useState(duration || 0);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlayPause = () => {
<<<<<<< HEAD
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update current time during playback
  useEffect(() => {
    const video = videoRef.current;
    
    const handleTimeUpdate = () => {
      if (video) setCurrentTime(video.currentTime);
    };
    
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, []);

  return (
    <div 
=======
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      // FIX: play() returns a Promise — must handle it to avoid AbortError
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            if (err.name !== 'AbortError') {
              console.error('Video play error:', err);
            }
            setIsPlaying(false);
          });
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setVideoDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('pause', handlePause);
    video.addEventListener('play', handlePlay);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('play', handlePlay);

      video.pause();
      video.src = '';
      video.load();
    };
  }, []);

  return (
    <div
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
      className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={secureUrl}
        poster={thumbnailUrl}
        onClick={togglePlayPause}
        className="w-full aspect-video bg-black cursor-pointer"
      />
<<<<<<< HEAD
      
      {/* Video Controls Overlay */}
      <div 
=======

      {/* Controls Overlay */}
      <div
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity ${
          isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="btn btn-circle btn-primary mr-3"
<<<<<<< HEAD
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause/>
          ) : (
            <Play/>
          )}
        </button>
        
=======
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>

>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
        {/* Progress Bar */}
        <div className="flex items-center w-full mt-2">
          <span className="text-white text-sm mr-2">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
<<<<<<< HEAD
            max={duration}
=======
            max={videoDuration || 0}
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
            value={currentTime}
            onChange={(e) => {
              if (videoRef.current) {
                videoRef.current.currentTime = Number(e.target.value);
<<<<<<< HEAD
=======
                setCurrentTime(Number(e.target.value));
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
              }
            }}
            className="range range-primary range-xs flex-1"
          />
          <span className="text-white text-sm ml-2">
<<<<<<< HEAD
            {formatTime(duration)}
=======
            {formatTime(videoDuration)}
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
          </span>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD

=======
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
export default Editorial;