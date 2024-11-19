import { createContext, useReducer } from "react";

export const ProjectContext = createContext({
    selectedProjectId: undefined, // undefined: not selected, null: add new project 
    projects: [],
    tasks: [],
    addTask: () => { },
    deleteTask: () => { },
    addProject: () => { },
    deleteProject: () => { },
    selectProject: () => { },
    startAddProject: () => { },
    cancelAddProject: () => { }
});

function projectReducer(state, action) {
    switch (action.type) {
        case 'ADD_PROJECT':
            return {
                ...state,
                selectedProjectId: action.payload.selectedProjectId, 
                projects: [...state.projects, action.payload.newProject]
            }
        case 'DELETE_PROJECT':
            return {
                ...state,
                selectedProjectId: undefined,
                projects: state.projects.filter(project => project.id !== state.selectedProjectId),
                tasks: state.tasks.filter(task => task.projectId !== state.selectedProjectId)
            }
        case 'SELECT_PROJECT':
            return {
                ...state,
                selectedProjectId: action.payload.projectId,
            };
        case 'ADD_TASK':
            const newTask = { id: Math.random(), text: action.payload.taskInput, projectId: state.selectedProjectId }

            return {
                ...state,
                tasks: [...state.tasks, newTask]
            }
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload.taskId)
            }
        case 'SELECT_PROJECT_ID':
            return {
                ...state,
                selectedProjectId: action.payload.selectedProjectId,
            };
    }

    return state;
}

const ProjectContextProvider = ({ children }) => {
    const [projectState, projectDispatch] = useReducer(projectReducer, {
        selectedProjectId: undefined,
        projects: [],
        tasks: []
    });


    function handleAddTask(taskInput) {
        projectDispatch({
            type: 'ADD_TASK',
            payload: { taskInput }
        });
    }

    function handleDeleteTask(taskId) {
        projectDispatch({
            type: 'DELETE_TASK',
            payload: { taskId }
        });
    }

    function handleAddProject(projectData) {
        const newProject = { ...projectData, id: Math.random() }

        projectDispatch({
            type: 'ADD_PROJECT',
            payload: { newProject: newProject, selectedProjectId: undefined } // De esta manera volvemos a la home
        });
    }

    function handleDeleteProject() {
        projectDispatch({
            type: 'DELETE_PROJECT',
            payload: {}
        });
    }

    function handleSelectProject(projectId) {
        projectDispatch({
            type: 'SELECT_PROJECT',
            payload: { projectId }
        });
    }

    function handleStartAddProject() {
        projectDispatch({
            type: 'SELECT_PROJECT_ID',
            payload: { selectedProjectId: null }
        });
    }

    function handleCancelAddProject() {
        projectDispatch({
            type: 'SELECT_PROJECT_ID',
            payload: { selectedProjectId: undefined }
        });
    }

    const ctxValue = {
        selectedProjectId: projectState.selectedProjectId,
        projects: projectState.projects,
        tasks: projectState.tasks,
        addTask: handleAddTask,
        deleteTask: handleDeleteTask,
        addProject: handleAddProject,
        deleteProject: handleDeleteProject,
        selectProject: handleSelectProject,
        startAddProject: handleStartAddProject,
        cancelAddProject: handleCancelAddProject
    }

    return (
        <ProjectContext.Provider value={ctxValue}>
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectContextProvider
