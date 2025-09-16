import { AbsoluteFill } from "remotion";

export function HelloWorld({title}) {
   return (
     <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', fontSize: 50, backgroundColor: 'white'}}>
        <h1 style={{color: 'black'}}>{title}</h1>
      </AbsoluteFill>
    );
}