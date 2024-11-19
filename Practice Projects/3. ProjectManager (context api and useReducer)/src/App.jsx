import ProjectContextProvider, { ProjectContext } from "./store/project-context.jsx";
import AppContent from "./components/AppContent.jsx";


function App() {

    return (
        <ProjectContextProvider>
            <AppContent />
        </ProjectContextProvider>
    );
}

export default App;
