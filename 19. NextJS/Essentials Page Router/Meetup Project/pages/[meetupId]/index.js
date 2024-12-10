import MeetupDetails from "../../components/meetups/MeetupDetails"

const MeetupDetailPage = () => {
    return (
        <MeetupDetails
            image='https://img2.oastatic.com/img2/86691158/max/variant.jpg'
            title='Meet up'
            address='address'
            description='info'
        />
    )
}

// To extract the params in the getStaticProps you need to declare all supported parameter values, this action makes 
// this paths to be prerendered.
// Fallback: if you specify to false means that you declare all the posible params and any other returns 404, otherwhise,
// setting to true you can specify some paths and the others try to render on the fly
export async function getStaticPaths() {
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
    }
}

export async function getStaticProps(context) {
    // in context.params we have all the url params (you need to declare getStaticPaths() to access this params)
    const meetupId = context.params.meetupId;
console.log(meetupId)
    // fetch for a single meetup data
    return {
        props: {
            meetupData: {
                id: meetupId,
                image: 'https://img2.oastatic.com/img2/86691158/max/variant.jpg',
                title: 'Meet up',
                address: 'address',
                description: 'info'
            }
        }
    }
}

export default MeetupDetailPage
