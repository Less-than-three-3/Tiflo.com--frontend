import {useEffect, useRef} from "react";
import {getWfElements, moveWfElements, splitWfElements} from "../../../models/waveform.js";
import {useProject} from "../../../hooks/useProject.js";

export const AudioEditor = ({updateProject, play, setPlay}) => {
  const waveform = useRef(null);
  const {project} = useProject();

  let multitrack;
  useEffect(() => {
    console.log(waveform.current.querySelector("div"))
    if (waveform.current && waveform.current.querySelector("div")) {
      const domNode = waveform.current.querySelector("div");
      domNode.remove();
    }

    if (project && project.comments && project.comments.length > 0) {
      // const audioParts = [
      //   {
      //     id: 0,
      //     draggable: true,
      //     startPosition: 0,
      //     url: project.comments[0].path,
      //     volume: 0.3,
      //     options: {
      //       waveColor: '#7A79FF',
      //     },
      //     isVideo: true,
      //   },
      // ]
      let audioParts = [];
      for (const id in project.comments) {
        audioParts.push({
          id: id,
          draggable: true,
          startPosition: project.comments[id].start || 0,
          url: project.comments[id].path,
          volume: 1,
          options: {
            waveColor: project.comments[id].text ? '#79ff8f' : '#7A79FF',
          },
          isVideo: project.comments[id].text.length === 0,
        })
      }

      multitrack = Multitrack.create(
        audioParts,
        {
          container: waveform.current, // required!
          rightButtonDrag: false, // set to true to drag with right mouse button
          cursorWidth: 2,
          cursorColor: '#9421d7',
          trackBorderColor: '#466193',
          dragBounds: true,
        },
      )

      const wfElements = getWfElements(waveform, audioParts);
      console.log("audioParts", audioParts);
      console.log("wfElements", wfElements)
      const {wfVideos, wfVoices} = splitWfElements(wfElements, audioParts);

      console.log("wfVideos", wfVideos)
      console.log("wfVoices", wfVoices)
      moveWfElements(wfVideos, true, 0, audioParts);
      moveWfElements(wfVoices, false, 1, audioParts);
    }
  }, [updateProject]);

  const playPause = () => {
    multitrack.isPlaying() ? multitrack.pause() : multitrack.play()
    setPlay((v) => !v)
  }

  return (
    <>
      <div className="section grow w-full flex">
        <div className="w-16">
          <button onClick={
            playPause
          }
          >play
          </button>
          <img src="/src/assets/icons/video_inactive.svg" alt="" className="w-10 mt-10"/>
          <img src="/src/assets/icons/text.svg" alt="" className="w-10 mt-24"/>
        </div>
        <div className="w-full h-full" id="waveform" ref={waveform}></div>
      </div>
    </>
  );
}
