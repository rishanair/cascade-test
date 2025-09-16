import {useState} from 'react';
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

  return (
    <div style={{height: "100vh", display: "flex", flexDirection: "column"}}>
      {/* Video Player */}
      <Player
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        compositionWidth={640}
        compositionHeight={360}
        inputProps={{title: "My First Video"}}
      />

      {/* Timeline UI */}
      <div style={{flex: 1, background: "#222", display: "flex", padding: "10px"}}>
        {timeline.videoTracks.map(clip => (
          <div key={clip.id}
            style={{
              background: "skyblue",
              margin: "2px",
              width: `${clip.duration * 50}px`, // 1 sec = 50px
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              fontSize: "12px",
              color: "#000"
            }}
          >
            {clip.name}
          </div>
        ))}
      </div>
    </div>
  );
}