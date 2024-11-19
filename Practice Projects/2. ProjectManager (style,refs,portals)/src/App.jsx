import Sidebar from "./components/Sidebar.jsx";
import NoProjectSelected from './components/NoProjectSelected.jsx';
import NewProject from './components/NewProject.jsx';
import { useState } from "react";
import SelectedProject from "./components/SelectedProject.jsx";


function App() {
    const [projectState, setProjectState] = useState({
        selectedProjectId: undefined, // undefined: not selected, null: add new project 
        projects: [],
        tasks: []
    });

    const handleAddTask = (text) => {

        setProjectState(prevProjectState => {
            const newTask = { id: Math.random(), text: text, projectId: prevProjectState.selectedProjectId }

            return {
                ...prevProjectState,
                tasks: [...prevProjectState.tasks, newTask]
            }
        });
    }

    const handleDeleteTask = (id) => {
        setProjectState(prevProjectState => {
            return {
                ...prevProjectState,
                tasks: prevProjectState.tasks.filter(task => task.id !== id)
            }
        });
    }

    const handleSelectProject = (id) => {
        setProjectState(prevProjectState => {
            return {
                ...prevProjectState,
                selectedProjectId: id,
            };
        });
    }

    const handleStartAddProject = () => {
        setProjectState(prevProjectState => {
            return {
                ...prevProjectState,
                selectedProjectId: null,
            };
        });
    }

    const handleCancelAddProject = () => {
        setProjectState(prevProjectState => {
            return {
                ...prevProjectState,
                selectedProjectId: undefined,
            };
        });
    }

    const handleAddProject = (projectData) => {
        const newProject = { ...projectData, id: Math.random() }

        setProjectState(prevProjectState => {
            return {
                ...prevProjectState,
                selectedProjectId: undefined, // De esta manera volvemos a la home
                projects: [...prevProjectState.projects, newProject]
            }
        });
    }

    const handleDeleteProject = () => {
        setProjectState(prevProjectState => {
            return {
                ...prevProjectState,
                selectedProjectId: undefined,
                projects: prevProjectState.projects.filter(project => project.id !== prevProjectState.selectedProjectId)
            }
        });
    }

    const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);
    let content = <SelectedProject
        onDelete={handleDeleteProject}
        project={selectedProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={projectState.tasks}
    />;

    if (projectState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
    } else if (projectState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
    }

    return (
        <main className='h-screen my-8 flex gap-8'>
            <Sidebar
                projects={projectState.projects}
                onStartAddProject={handleStartAddProject}
                onSelectProject={handleSelectProject}
                selectedProjectId={projectState.selectedProjectId}
            />
            {content}
        </main>
    );
}

export default App;
