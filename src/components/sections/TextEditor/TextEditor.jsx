import {useEffect, useState} from "react";
import {Button} from "../../UI/Button/Button.jsx";
import axios from "axios";
import {useProject} from "../../../hooks/useProject.js";

export const TextEditor = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {project, updateProjectAudio} = useProject();

  console.log(project)
  const changeText = (event) => {
    const part = project.audioParts.find((part) => part.partId === event.currentTarget.id);
    updateProjectAudio({
      ...part,
      text: event.currentTarget.value,
    });
  }

  const toVoice = async () => {
    setTimeout(() => {
      axios({
        url: 'http://89.208.231.158:80/src/assets/cat.wav', //your url
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'description.wav'); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    }, 0)
  }

  return (
    <>
      <div className="section" style={{width: "30em"}}>
        <div className="grid grid-cols-2 pb-6 w-9/12">
          <div className={`${!project.projectId ? "text-inactive" : isEditing && "text-inactive"} font-bold`}
               onClick={() => setIsEditing(false)}>
            Текст
          </div>
          <div className={`${!project.projectId ? "text-inactive" : !isEditing && "text-inactive"} font-bold`}
               onClick={() => setIsEditing(true)}>
            Редактирование
          </div>
        </div>
        <div className="h-5/6 w-full">
          {project.projectId &&
            <>
              {project.audioParts?.map((part) => (
                <div key={part.partId}>
                  {part.text &&
                    <>
                    {isEditing ?
                      <textarea className="bg-inherit border-2 border-rat rounded-md p-2 outline-none w-full h-full"
                                value={part.text}
                                onChange={changeText}
                                id={part.partId}
                      />
                      :
                      <div className="overflow-x-hidden min-h-10 max-h-full text-pretty break-words"
                           id={part.partId}>
                        {part.text}
                      </div>
                    }
                    </>
                  }
                </div>
              ))}
            </>
          }

          {project.audioParts?.some((part) => part !== "") &&
            <div className="mt-4 w-28">
              <Button mode="primary" value={"В голос"} onClick={toVoice}/>
            </div>
          }
        </div>
      </div>
    </>
  );
}
