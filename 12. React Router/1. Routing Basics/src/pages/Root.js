import { Outlet } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'

const RootLayout = () => {
    return (
        <>
            <MainNavigation />
            <main className="content">
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout
