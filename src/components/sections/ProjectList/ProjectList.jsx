import {useProject} from "../../../hooks/useProject.js";
import {useState} from "react";
import {getProjects} from "../../../mocks/projects.js";
import axios from "axios";
import {host} from "../../../models/consts.js";

export const ProjectList = () => {
  const {project, newProject, setProject} = useProject();
  const projects = getProjects();

  const clockNewProject = async () => {
    newProject();
    const response = await axios.post(`${host}/api/projects`)
    console.log(response.data);
    setProject(response.data);

    setTimeout(async () => {
      console.log("store project", project)
      const getProject = await axios.get(`${host}/api/projects/${project.id}`)
      console.log("request project", getProject.data)
    }, 100)

  }

  return (
    <>
      <div className="section w-96">
        <div className="grid grid-cols-2 font-bold mb-8">
          <div>Все проекты</div>
          <div className="text-inactive">Недавние</div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div style={{backgroundImage: "url(/src/assets/icons/new_project.svg)"}}
               className="background-image w-full h-24"
               onClick={clockNewProject}/>

          {projects.map((project) => (
            <div key={project.id}
                 style={{backgroundImage: `url(${project.media})`}}
                 className="background-image w-full h-24"
                  onClick={() => setProject(project)}/>
          ))}
        </div>
      </div>
    </>
  );
}
