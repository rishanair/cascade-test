This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.


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


