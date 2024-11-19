import { Outlet, useNavigation } from "react-router-dom"
import MainNavigation from "../components/MainNavigation"

const RootLayout = () => {
    // Example how to use the status of the navigation to set loaders/spinners
    //const navigation = useNavigation();

    return (
        <>
            <MainNavigation />
            <main>
                {/*navigation.state === 'loading' && <p>Loading...</p>*/}
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout
