import { useState, useRef, useEffect } from "react";
import { Player } from "@remotion/player";
import { HelloWorld } from "../components/HelloWorld";
import { Timeline } from "../components/Timeline";

export default function Home() {
  const [timeline, setTimeline] = useState({
    videoTracks: [{ id: 1, name: "Clip1", start: 0, duration: 5 }],
    audioTrack: [{ id: "a1", name: "Music", start: 0, duration: 15 }],
  });

  const totalDuration = 15; // seconds
  const pixelsPerSecond = 50;

  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef(null);

  const [dragging, setDragging] = useState(null);
  const [hoveredClipId, setHoveredClipId] = useState(null);

  // --- Timeline click ---
  const handleTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = clickX / pixelsPerSecond;
    setCurrentTime(newTime);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime * 30); // fps = 30
    }
  };

  // --- Clip dragging ---
  const handleClipMouseDown = (clip, e) => {
    e.stopPropagation();
    setDragging({ id: clip.id, startX: e.clientX, originalStart: clip.start });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;
      const deltaX = e.clientX - dragging.startX;
      const deltaSeconds = deltaX / pixelsPerSecond;

      setTimeline((prev) => ({
        ...prev,
        videoTracks: prev.videoTracks.map((c) => {
          if (c.id === dragging.id) {
            let newStart = dragging.originalStart + deltaSeconds;
            if (newStart < 0) newStart = 0;
            if (newStart + c.duration > totalDuration) {
              newStart = totalDuration - c.duration;
            }
            const others = prev.videoTracks.filter((o) => o.id !== c.id);
            const overlap = others.some(
              (o) =>
                !(
                  newStart + c.duration <= o.start ||
                  newStart >= o.start + o.duration
                )
            );
            if (overlap) return c;
            return { ...c, start: newStart };
          }
          return c;
        }),
      }));
    };

    const handleMouseUp = () => setDragging(null);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  // --- Clip slicing ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "s" && hoveredClipId !== null) {
        setTimeline((prev) => {
          const clip = prev.videoTracks.find((c) => c.id === hoveredClipId);
          if (!clip) return prev;

          const playhead = currentTime;
          if (
            playhead > clip.start && 
            playhead < clip.start + clip.duration && 
            playhead !== clip.start &&
            playhead !== clip.start + clip.duration
          ) {
            const firstClip = {
              id: Date.now(),
              name: clip.name + "-part1",
              start: clip.start,
              duration: playhead - clip.start,
            };
            const secondClip = {
              id: Date.now() + 1,
              name: clip.name + "-part2",
              start: playhead,
              duration: clip.start + clip.duration - playhead,
            };
            return {
              ...prev,
              videoTracks: prev.videoTracks
                .filter((c) => c.id !== clip.id)
                .concat([firstClip, secondClip])
                .sort((a, b) => a.start - b.start),
            };
          }
          return prev;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hoveredClipId, currentTime]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Video Player */}
      <Player
        ref={playerRef}
        component={HelloWorld}
        durationInFrames={totalDuration * 30}
        fps={30}
        compositionWidth={640}
        compositionHeight={360}
        inputProps={{ title: "My First Video" }}
        currentTime={currentTime}
        onFrameUpdate={(frame) => setCurrentTime(frame / 30)}
        controls // ✅ play/pause/seek/volume
      />

      {/* Timeline */}
      <Timeline
        timeline={timeline}
        currentTime={currentTime}
        onTimelineClick={handleTimelineClick}
        onClipMouseDown={handleClipMouseDown}
        hoveredClipId={hoveredClipId}
        setHoveredClipId={setHoveredClipId}
      />
    </div>
  );
}