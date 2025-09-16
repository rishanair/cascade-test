import {useState, useRef, useEffect} from 'react';
import {Player} from '@remotion/player';
import {HelloWorld} from '../components/HelloWorld';

export default function Home() {
  const [timeline, setTimeline] = useState({
    videoTracks: [
      {id: 1, name: "Clip1", start: 0, duration: 5},
      {id: 2, name: "Clip2", start: 6, duration: 3}, // note: not overlapping
    ],
    audioTrack: [
      {id: "a1", name: "Music", start: 0, duration: 10}
    ],
  });

  const totalDuration = 15; // seconds
  const pixelsPerSecond = 50;

  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef(null);

  // For dragging
  const [dragging, setDragging] = useState(null);

  const handleTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = clickX / pixelsPerSecond;
    setCurrentTime(newTime);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime * 30); // fps = 30
    }
  };

  const handleMouseDown = (clip, e) => {
    e.stopPropagation();
    setDragging({
      id: clip.id,
      startX: e.clientX,
      originalStart: clip.start,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;

      const deltaX = e.clientX - dragging.startX;
      const deltaSeconds = deltaX / pixelsPerSecond;

      setTimeline(prev => {
        return {
          ...prev,
          videoTracks: prev.videoTracks.map(c => {
            if (c.id === dragging.id) {
              let newStart = dragging.originalStart + deltaSeconds;

              // Constraint 1: not less than 0
              if (newStart < 0) newStart = 0;

              // Constraint 2: not beyond timeline
              if (newStart + c.duration > totalDuration) {
                newStart = totalDuration - c.duration;
              }

              // Constraint 3: not overlapping others
              const others = prev.videoTracks.filter(o => o.id !== c.id);
              const overlap = others.some(o =>
                !(newStart + c.duration <= o.start || newStart >= o.start + o.duration)
              );
              if (overlap) {
                return c; // don’t move if overlap
              }

              return {...c, start: newStart};
            }
            return c;
          })
        };
      });
    };

    const handleMouseUp = () => {
      if (dragging) {
        setDragging(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <div style={{height: "100vh", display: "flex", flexDirection: "column"}}>
      {/* Video Player */}
      <Player
        ref={playerRef}
        component={HelloWorld}
        durationInFrames={totalDuration * 30}
        fps={30}
        compositionWidth={640}
        compositionHeight={360}
        inputProps={{title: "My First Video"}}
        style={{width: "100%", height: "360px", background: "white"}}
        onFrameUpdate={(frame) => setCurrentTime(frame / 30)}
      />

      {/* Timeline UI */}
      <div
        style={{
          flex: 1,
          background: "#222",
          position: "relative",
          padding: "10px",
          cursor: "pointer"
        }}
        onClick={handleTimelineClick}
      >
        {/* Video Clips */}
        <div style={{position: "relative", height: "60px"}}>
          {timeline.videoTracks.map(clip => (
            <div key={clip.id}
              onMouseDown={(e) => handleMouseDown(clip, e)}
              style={{
                background: "skyblue",
                position: "absolute",
                left: `${clip.start * pixelsPerSecond}px`,
                width: `${clip.duration * pixelsPerSecond}px`,
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                fontSize: "12px",
                color: "#000",
                cursor: "grab"
              }}
            >
              {clip.name}
            </div>
          ))}
        </div>

        {/* Playhead (red line) */}
        <div
          style={{
            position: "absolute",
            top: "0",
            bottom: "0",
            left: `${currentTime * pixelsPerSecond}px`,
            width: "2px",
            background: "red"
          }}
        />
      </div>
    </div>
  );
}
