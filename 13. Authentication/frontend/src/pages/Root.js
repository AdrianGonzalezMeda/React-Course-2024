import { Outlet, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
    // const navigation = useNavigation();
    const token = useLoaderData();
    const submit = useSubmit();

    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === 'EXPIRED') {
            submit(null, { method: 'post', action: '/logout' });
        }

        const tokenDuration = getTokenDuration();
        const timeout = setTimeout(() => {
            submit(null, { method: 'post', action: '/logout' });
        }, tokenDuration); // Clear the token after 1 hour


        return () => {
            clearTimeout(timeout);
        }
    }, [token, submit]);

    return (
        <>
            <MainNavigation />
            <main>
                {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;
