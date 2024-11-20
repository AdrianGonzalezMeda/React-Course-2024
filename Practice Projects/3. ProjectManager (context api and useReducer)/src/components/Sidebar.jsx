import { useContext } from "react";
import Button from "./Button.jsx"
import { ProjectContext } from "../store/project-context.jsx";

const Sidebar = () => {
    const { projects, selectedProjectId, startAddProject, selectProject } = useContext(ProjectContext);
    //const selectedProject = context.projects.find(project => project.id === context.selectedProjectId);

    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">YOUR PROJECTS</h2>
            <div>
                <Button onClick={startAddProject}>+ Add Project</Button>
            </div>
            <ul className="mt-8">
                {projects.map(project => {
                    let cssClasses = 'w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800';

                    if (project.id === selectedProjectId) {
                        cssClasses += ' bg-stone-800 text-stone-200'
                    } else {
                        cssClasses += ' text-stone-400';
                    }

                    return (
                        <li key={project.id}>
                            <button onClick={() => selectProject(project.id)} className={cssClasses}>
                                {project.title}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </aside>
    )
}

export default Sidebar