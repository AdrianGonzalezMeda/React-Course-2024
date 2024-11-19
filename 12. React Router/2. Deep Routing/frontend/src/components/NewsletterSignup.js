import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
    // you can use actions or loaders without the transition to the action parameter (page newsletter). Using this 
    // hook and not the <Form /> allow us to set an action parameter to indicate witch action we want to use,
    // in this case we want to use the newsletter page action, by doing this way its not necesary to configure
    // the action in all the paths in the router configuration, because this form its in the MainNavigation component
    const fetcher = useFetcher();
    const {data, state} = fetcher;

    useEffect(() => {
        if (state === 'idle' && data && data.message) { // idle means its not executing an acction or loader
            window.alert(data.message);
        }
    }, [data, state]);

    return (
        <fetcher.Form method="post" action='/newsletter' className={classes.newsletter}>
            <input
                type="email"
                placeholder="Sign up for newsletter..."
                aria-label="Sign up for newsletter"
            />
            <button>Sign up</button>
        </fetcher.Form>
    );
}

export default NewsletterSignup;