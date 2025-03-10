import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm.js';

const NewMeetupPage = () => {
    const router = useRouter();
    const addMeetupHandler = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);
        router.push('/');
    }

    return <>
        <Head>
            <title>Add a new Meetup</title>
            <meta name='description' content='Add your own meetups and create amazing networking opportunities' />
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
}

export default NewMeetupPage
