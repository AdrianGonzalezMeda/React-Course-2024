import { useContext } from "react";
import Tasks from "./Tasks";
import { ProjectContext } from "../store/project-context";

const SelectedProject = () => {
    const {projects, selectedProjectId, deleteProject} = useContext(ProjectContext);
    const project = projects.find(project => project.id === selectedProjectId);
    const formattedDate = new Date(project.dueDate).toLocaleDateString('en-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="w-[35rem] mt-16">
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">

                    <h1 className="text-4cl font-bold text-stone-600 hover:text-stone-950">{project.title}</h1>
                    <button onClick={deleteProject}>Delete</button>
                </div>
                <p className="mb-4 text-stone-400">{formattedDate}</p>
                <p className="text-stone-600 whitespace-pre-wrap">{project.description}</p>
            </header>
            <Tasks />
        </div>
    )
}

export default SelectedProject
