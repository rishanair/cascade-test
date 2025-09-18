Cascade Studios Frontend Test
--- Overview ---

This project is a simplified interactive video timeline editor built with Next.js and Remotion.
It demonstrates handling of complex state, drag-and-drop, clip slicing, and audio-video synchronization.

--- Features ---

1. Remotion Video Player with playback controls
2. Timeline UI for video clips
3. Red Playhead that moves during playback & syncs with video
4. Click Timeline to Seek (jump playhead + video)
5. Drag & Drop Clips (with collision detection & boundary limits)
6. Slice Clips by pressing S while hovering over a clip
7. Audio Track (visualized as a green bar + Remotion <Audio /> playback in sync)

--- Tech Stack ---

Next.js – Project setup & page routing

React Hooks – State management (useState, useEffect, useRef)

Remotion – Video & audio rendering (<Player>, <Audio>)

Drag Events – Implemented with mousedown → mousemove → mouseup

--- Project Structure ---
cascade-test/
├── components/
│   ├── HelloWorld.js    # Video composition + audio playback
│   └── Timeline.js      # Timeline UI (clips, audio track, playhead)
├── pages/
│   └── index.js         # Main page with state management
├── public/
│   └── audio.mp3        # Royalty-free test audio file

▶️ How to Run Locally

Clone the repo:

git clone https://github.com/<your-username>/cascade-test.git
cd cascade-test


Install dependencies:

npm install


Start dev server:

npm run dev


App runs at: http://localhost:3000

--- Audio File ---

Place a royalty-free audio.mp3 inside the public/ folder.

--- Evaluation Notes ---

Code is cleanly structured into components (Timeline, HelloWorld).

State updates are immutable.

Dragging logic avoids overlaps and enforces timeline bounds.

Clear demonstration of problem-solving & React best practices.


*** How the code works: ***

MILESTONE 1 : Basic UI & Remotion Player Setup

STEP 1: 
1. Create a next.js app
2. Install remotion + player
3. Start dev server

STEP 2: 
1. Create BASIC REMOTION - This will show a video preview with "MY First Video."
2. using useState we will handle timeline data
3. Result -> top half: shows video preview and bottom half: Two blue blocks labeled clip 1 and clip 2.

STEP 3: 
1. Add Playhead ( Two things done)
2. Keeping track of current time of the video and render a red vertical line on the timeline that moves as video plays. 
3. Allow clicking on the timeline to move the playhead. 
4. Key Components & Logic
State Management: The component holds two key pieces of state:

timeline: An object that defines the video and audio clips. It's a simple, hard-coded representation of a video project, with each clip having a start time and duration.

currentTime: A number that represents the video's current playback time in seconds. This state is crucial for keeping the playhead (the red line) synchronized with the video player.

Video Player: The Player component from the Remotion library handles the actual video playback.

It's given the HelloWorld component to render, which is likely a placeholder for the actual video content.

The durationInFrames and fps props define the total length of the composition.

The currentTime prop is passed to the player, allowing you to control its position from the outside.

The onFrameUpdate callback is a key part of the synchronization. It's triggered every time the player's frame changes, and it updates the currentTime state. This ensures that when the user clicks play, the timeline's playhead moves along with the video.

Timeline UI: This is the custom-built visual representation of the timeline.

It's a div with a flex container for the video clips.

The timeline.videoTracks.map() function iterates over the videoTracks array and renders a div for each clip.

Each clip div has its width and left position calculated based on its duration and start time, using the pixelsPerSecond constant as a scale factor. This visually positions the clips correctly on the timeline.

Synchronization: The handleTimelineClick function is what makes the timeline interactive.

When a user clicks on the timeline, it calculates the click's horizontal position (clickX).

It then converts this pixel position into a time value (newTime) by dividing it by the pixelsPerSecond constant.

The currentTime state is updated to newTime, and the playerRef.current.seekTo() method is called to jump the video player to the corresponding frame.

Playhead: A separate div is used to create the red playhead. Its left style property is dynamically set to ${currentTime * pixelsPerSecond}px, which makes the red line move along as the currentTime state updates, whether by user click or by the video playing.



MILESTONE 2: Clip Drag & Drop

--- Logic for Dragging Clips ---

1. When you press mouse down on a clip:

Store which clip is being dragged.

Store the initial mouse X position.

Store the clip’s original start position.

2. When you move the mouse:

Calculate how far the mouse moved (deltaX).

Convert deltaX → seconds (deltaX / pixelsPerSecond).

Update that clip’s start time in state.

3. When you release mouse (mouseup):

Stop dragging.

Clip position is saved in state.

4. Constraints:

Clip cannot go before 0.

Clip cannot overlap another clip on the same track.

Clip cannot go beyond total timeline length.

5. Event Listeners
   
The handlers are attached globally while dragging.

Ensures dragging works even if the mouse leaves the timeline area.


MILESTONE 3: SLICING CLIPS

1. Detecting the "S" Key:
   
A keydown event listener is set up in a useEffect.

When you press "S" (case-insensitive) and your mouse is hovering over a clip, the slicing logic runs.


2. Finding the Clip to Slice:
   
It looks up the clip you’re hovering over using its id:
const clip = prev.videoTracks.find(c => c.id === hoveredClipId);
if (!clip) return prev;

3. Checking Playhead Position:
   
It checks if the playhead is inside the clip (not at the very start or end):
if (playhead > clip.start && playhead < clip.start + clip.duration) {
  // ...do the slice...
}

4. Creating Two New Clips:
   
If the playhead is inside, it creates two new clips:

The first goes from the original start to the playhead.
The second goes from the playhead to the original end.

5. Updating the Timeline:
   
It removes the old clip and adds the two new ones, keeping the timeline sorted.

In short:
Slicing lets you break a clip into two parts at the playhead, making it easy to edit your timeline!

MILESTONE 4: AUDIO TRACK SYNC 

1. Put an MP3 File

2. Add Remotion Audio inside the composition

3. create Timeline.js -> This separates timeline logic → clips + audio track.

4. code is modular (HelloWorld, Timeline, Home), easy to read.

   

