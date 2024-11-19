import { useContext } from "react";
import logo from "../assets/no-projects.png";
import Button from "./Button.jsx";
import { ProjectContext } from "../store/project-context.jsx";

const NoProjectSelected = () => {
    const {startAddProject} = useContext(ProjectContext);

    return (
        <div className="mt-24 text-center w-2/3">
            <img src={logo} className="w-16 h-16 object-contain mx-auto" />
            <h2 className="text-xl font-bold text-stone-500 my-4">No Project selected</h2>
            <p className="text-stone-400 mb-4">Select a project or get started with a new one</p>
            <p>
                <Button onClick={startAddProject}>Create new project</Button>
            </p>
        </div>
    )
}

export default NoProjectSelected
