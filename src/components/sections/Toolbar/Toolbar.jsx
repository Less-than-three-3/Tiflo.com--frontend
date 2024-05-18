import {useLocation, useNavigate} from "react-router-dom";
import {useProjectList} from "../../../hooks/useProjectList.js";
import {determineFileType} from "../../../utils/format.js";
import {api} from "../../../api/api.js";
import {useEffect, useRef} from "react";
import {onboarding} from "../../../models/onboarding.js";

export const Toolbar = ({states, handlers}) => {
  const {pathname} = useLocation();
  const {projectList} = useProjectList();
  const projectsRef = useRef(null);
  const photoRef = useRef(null);
  const videoRef = useRef(null);

  const pushProjectOnboarding = () => {
    onboarding.pushPhoto({
      component: projectsRef.current,
      data: onboarding.data.toolbarProjects,
    });
  }

  const pushPhotoOnboarding = () => {
    onboarding.pushPhoto({
      component: photoRef.current,
      data: onboarding.data.toolbarPhoto,
    });
  }

  const pushVideoOnboarding = () => {
    onboarding.pushPhoto({
      component: videoRef.current,
      data: onboarding.data.toolbarVideo,
    });
  }

  const openProjectList = () => {
    handlers.setIsProjectListOpened((v) => !v)
  }

  const navigate = useNavigate();
  const openPhotoProject = async () => {
    let projectId;
    const photoProjects = projectList.filter((project) => determineFileType(project.path) === "image" || determineFileType(project.path) === "none");
    if (photoProjects.length !== 0) {
      projectId = photoProjects[0].projectId;
    } else {
      const createProjectRes = await api.createProject();
      if (createProjectRes.status === 200) {
        projectId = createProjectRes.data.projectId;
      }
    }
    navigate(`/project/photo/${projectId}`);
  }

  const openVideoProject = async () => {
    let projectId;
    const videoProjects = projectList.filter((project) => determineFileType(project.path) === "video" || determineFileType(project.path) === "none");
    if (videoProjects.length !== 0) {
      projectId = videoProjects[0].projectId;
    } else {
      const createProjectRes = await api.createProject();
      if (createProjectRes.status === 200) {
        projectId = createProjectRes.data.projectId;
      }
    }
    navigate(`/project/video/${projectId}`);
  }

  return (
    <>
      <div className="section pt-12 w-24 flex flex-col gap-12">
        <img src={states.isProjectListOpened ?
          "/src/assets/icons/list_active.svg" :
          "/src/assets/icons/list_inactive.svg"}
             alt="list"
             className="toolbar-icon"
             onClick={openProjectList}
             ref={projectsRef}
             onLoad={pushProjectOnboarding}
        />

        <img src={pathname.includes("/project/photo") ?
          "/src/assets/icons/image_active.svg" :
          "/src/assets/icons/image_inactive.svg"}
             alt="image"
             className="toolbar-icon"
             onClick={openPhotoProject}
             ref={photoRef}
             onLoad={pushPhotoOnboarding}
        />

        <img src={pathname.includes("/project/video") ?
          "/src/assets/icons/video_active.svg" :
          "/src/assets/icons/video_inactive.svg"}
             alt="video"
             className="toolbar-icon"
             onClick={openVideoProject}
             ref={videoRef}
             onLoad={pushVideoOnboarding}
        />
      </div>
    </>
  );
}
