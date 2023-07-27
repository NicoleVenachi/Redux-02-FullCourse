import { parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ timestamp }) => {
    //UI, para mostar cuando se creo
    let timeAgo = ''
    if (timestamp) {
        const date = parseISO(timestamp) //parseISO, para pasarlo a ISO la date
        const timePeriod = formatDistanceToNow(date) //pongo un formato aspero, desde que se creo, hasta ahorita
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}
export default TimeAgo