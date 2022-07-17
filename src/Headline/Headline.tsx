import { defaultMaxListeners } from 'events';
import '../App.css';
import Title from './Title';
import Explain from './Explain';

type Headline = {
	title: string;
}

const Headline = (props: Headline) => {
	return (
		<>
			<Title title={props.title} />
			<Explain />
		</>
	);
}

export default Headline;
