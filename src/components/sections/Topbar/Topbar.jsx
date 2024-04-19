import {Button} from "../../UI/Button/Button.jsx";
import {useEffect, useState} from "react";
import {useProject} from "../../../hooks/useProject.js";
import {Link} from "react-router-dom";
import {useUser} from "../../../hooks/useUser.js";
import axios from "axios";
import {host} from "../../../models/consts.js";
import {logoutMock} from "../../../mocks/user.js";
import {api} from "../../../api/api.js";

export const Topbar = () => {
  const {project, setProjectName} = useProject();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(project.name);

  const {user, dropUser} = useUser();

  useEffect(() => {
    setName(project.name)
  }, [project.name]);

  const saveProjectName = (event) => {
    if (event.key === "Enter") {
      setProjectName(name)
      setIsEditing(false);
    } else if (event.key === "Escape") {
      setName(project.name)
      setIsEditing(false);
    }
  }

  const logout = async () => {
    const logoutRes = await api.logout();

    if (logoutRes.status === 200) {
      dropUser();
    }
  }

  return (
    <>
      <div id="topbar" className="section flex items-center justify-between px-10 py-6 font-bold">
        <Link to="/">
          <div className="text-2xl">Tiflo.com</div>
        </Link>

        {user.isLoggedIn ?
          <>
            <div className="text-xl flex items-center">
              <div>
                Проект:
              </div>
              {isEditing ?
                <input className="bg-inherit border-2 border-rat rounded-md p-2 outline-none ml-2" type="text"
                       value={name}
                       onChange={(event) => setName(event.target.value)}
                       onKeyDown={saveProjectName}/>
                :
                <div className="ml-2" onDoubleClick={() => setIsEditing(true)}>
                  {project.name}
                </div>
              }
            </div>

            <div className="flex gap-6">
              <img src="/src/assets/icons/user.svg" alt="user"
                   className="w-10"/>
              <Button value="Logout" mode="secondary" onClick={logout}/>
            </div>
          </>

          :

          <>
            <div className="flex gap-10">
              <Link to="/auth/signIn">
                <Button value="SignIn" mode="primary"/>
              </Link>
              <Link to="/auth/signUp">
                <Button value="SignUp" mode="secondary"/>
              </Link>
            </div>
          </>
        }
      </div>
    </>
  );
}
