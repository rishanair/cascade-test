import {useState, useRef} from 'react';
import {Player} from '@remotion/player';
import {HelloWorld} from '../components/HelloWorld';

export default function Home() {
  const [timeline, setTimeline] = useState({
    videoTracks: [
      {id: 1, name: "Clip1", start: 0, duration: 5},
      {id: 2, name: "Clip2", start: 5, duration: 3},
    ],
    audioTrack: [
      {id: "a1", name: "Music", start: 0, duration: 10}
    ],
  });

  const totalDuration = 10; // seconds
  const pixelsPerSecond = 50;

  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef(null);

  // Handle click on timeline
  const handleTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = clickX / pixelsPerSecond;
    setCurrentTime(newTime);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime * 30); // fps = 30
    }
  };

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
        currentTime={currentTime}
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
        <div style={{display: "flex"}}>
          {timeline.videoTracks.map(clip => (
            <div key={clip.id}
              style={{
                background: "skyblue",
                margin: "2px",
                width: `${clip.duration * pixelsPerSecond}px`,
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                fontSize: "12px",
                color: "#000",
                position: "relative",
                left: `${clip.start * pixelsPerSecond}px`
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
