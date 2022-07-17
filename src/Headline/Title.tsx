type Title = {
	title: string;
}

const Title = (props: Title) => {
	return (
		<header className="Title">
			<p className="Titletext">{props.title}</p>
		</header>
	)
}

export default Title;
