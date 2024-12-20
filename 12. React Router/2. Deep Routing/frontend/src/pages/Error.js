
import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation'
import PageContent from '../components/PageContent'

const ErrorPage = () => {
    const error = useRouteError(); // Here you have access to the Response object thrown when an error ocurred (Example in Events.js)
    let title = 'An error ocurred!';
    let message = 'Something went wrong!';

    if (error.status === 500) {
        message = JSON.parse(error.data).message;
    }

    if (error.status === 404) {
        title = 'Not Found!';
        message = 'Could not find resource or page';
    }

    return (
        <>
            <MainNavigation />
            <PageContent title={title} >
                <p>{message}</p>
            </PageContent>
        </>
    )
}

export default ErrorPage
