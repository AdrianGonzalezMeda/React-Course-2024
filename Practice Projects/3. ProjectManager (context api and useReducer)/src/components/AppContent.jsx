import React, { useContext } from 'react';
import { ProjectContext } from '../store/project-context';
import SelectedProject from './SelectedProject.jsx';
import NewProject from './NewProject.jsx';
import NoProjectSelected from './NoProjectSelected.jsx';
import Sidebar from './Sidebar.jsx';

const AppContent = () => {
    const { selectedProjectId } = useContext(ProjectContext);
    let content = <SelectedProject />;

    if (selectedProjectId === null) {
        content = <NewProject />;
    } else if (selectedProjectId === undefined) {
        content = <NoProjectSelected />
    }

    return (
        <main className='h-screen my-8 flex gap-8'>
            <Sidebar />
            {content}
        </main>
    );
}

export default AppContent
