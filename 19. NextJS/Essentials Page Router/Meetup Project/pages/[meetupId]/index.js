import { MongoClient, ObjectId } from "mongodb";
import MeetupDetails from "../../components/meetups/MeetupDetails"
import Head from "next/head";

const MeetupDetailPage = (props) => {
    console.log('props', props)
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description' content={props.meetupData.description} />
            </Head>
            <MeetupDetails
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>
    )
}

// To extract the params in the getStaticProps you need to declare all supported parameter values, this action makes 
// this paths to be prerendered.
// Fallback: if you specify to false means that you declare all the posible params and any other returns 404, otherwhise,
// setting to true you can specify some paths and the others try to render on the fly
// Blocking and true are similar, but setting to true shows an empty page inmediatly and then load the dynamic content,
// otherwise Blocking waits to generate the content to show the page. Setting to true need to handle fallback content
export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://adriangonzalezmeda:WRWvjMSiNy4oe9PQ@cluster0.gl87o.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); // Fetch only ids
    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({
            params: { meetupId: meetup._id.toString() }
        })),
    }

    /* Example hardcoded for the dummy data before mongodb conection
    return {
        fallback: false, 
        paths: [
            {
                params:  {
                    meetupId: 'm1'
                }
            },
            {
                params:  {
                    meetupId: 'm2'
                }
            }
        ]
    }*/
}

export async function getStaticProps(context) {
    // in context.params we have all the url params (you need to declare getStaticPaths() to access this params)
    const meetupId = context.params.meetupId;
    // fetch for a single meetup data
    const client = await MongoClient.connect('mongodb+srv://adriangonzalezmeda:WRWvjMSiNy4oe9PQ@cluster0.gl87o.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });
    console.log(selectedMeetup)
    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            }
        }
    }
}

export default MeetupDetailPage
