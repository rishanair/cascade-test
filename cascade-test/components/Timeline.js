const pixelsPerSecond = 50;

export function Timeline({
  timeline,
  currentTime,
  onTimelineClick,
  onClipMouseDown,
  hoveredClipId,
  setHoveredClipId,
}) {
  return (
    <div
      style={{
        flex: 1,
        background: "#222",
        position: "relative",
        padding: "10px",
        cursor: "pointer",
      }}
      onClick={onTimelineClick}
    >
      {/* Video Clips */}
      <div style={{ position: "relative", height: "60px" }}>
        {timeline.videoTracks.map((clip) => (
          <div
            key={clip.id}
            onMouseDown={(e) => onClipMouseDown(clip, e)}
            onMouseEnter={() => setHoveredClipId(clip.id)}
            onMouseLeave={() => setHoveredClipId(null)}
            style={{
              background: hoveredClipId === clip.id ? "orange" : "skyblue",
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
              cursor: "grab",
            }}
          >
            {clip.name}
          </div>
        ))}
      </div>

      {/* Audio Track */}
      <div
        style={{
          marginTop: "10px",
          height: "30px",
          background: "#555",
          borderRadius: "4px",
          position: "relative",
        }}
      >
        {timeline.audioTrack.map((track) => (
          <div
            key={track.id}
            style={{
              background: "lightgreen",
              position: "absolute",
              left: `${track.start * pixelsPerSecond}px`,
              width: `${track.duration * pixelsPerSecond}px`,
              height: "100%",
              borderRadius: "4px",
            }}
          />
        ))}
      </div>

      {/* Playhead */}
      <div
        style={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: `${currentTime * pixelsPerSecond}px`,
          width: "2px",
          background: "red",
        }}
      />
    </div>
  );
}
