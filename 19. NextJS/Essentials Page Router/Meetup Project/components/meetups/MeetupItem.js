//import { useRouter } from 'next/router';
import Link from 'next/link';

import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

function MeetupItem(props) {
    //const router = useRouter();

    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <img src={props.image} alt={props.title} />
                </div>
                <div className={classes.content}>
                    <h3>{props.title}</h3>
                    <address>{props.address}</address>
                </div>
                <div className={classes.actions}>
                    {/* Example how to navigate programatically
                    <button onClick={() => {
                        router.push(`/${props.id}`);
                    }}>Show Details</button>*/}
                    <Link href={`/${props.id}`}>Show details</Link>
                </div>
            </Card>
        </li>
    );
}

export default MeetupItem;
