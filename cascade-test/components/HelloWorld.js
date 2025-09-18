import { AbsoluteFill, Audio } from "remotion";

export function HelloWorld({ title }) {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: "black",
      }}
    >
      <h1 style={{ color: "white" }}>{title}</h1>
      {/* Audio plays along with video */}
      <Audio src="/audio.mp3" />
    </AbsoluteFill>
  );
}