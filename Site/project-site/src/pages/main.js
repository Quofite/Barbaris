import { Link } from "react-router-dom";
import {
	Button,
	Container,
	Icon,
	Header,
	Segment,
	Grid,
	Image,
} from "semantic-ui-react"

import launcherScreenshot from "../images/launcher.jpg"

var MainPage;

const HeadMainPage = () => (
	<Segment
		inverted
		textAlign="center"
		style={{ minHeight: 700, padding: "1em 0" }}
		vertical
	>
		<Container text>
			<Header
				as="h1"
				content="Barbaris"
				inverted
				style={{
					fontSize: '4em',
					fontWeight: 'normal',
					marginBottom: 0,
					marginTop: '3em',
				}}
			/>
			<Header
				as="h2"
				content="Современное решение для програмирования"
				inverted
				style={{
					fontSize: "1.7em",
					fontWeight: "normal",
					marginTop: "1.5em",
				}}
			/>
			<Button primary size="huge" href="#HowToStart">
				Начните сейчас
				<Icon name="right arrow" />
			</Button>
		</Container>
	</Segment>
)

const ContentMainPage = () => (
	<Container id="HowToStart" style={{ marginTop: "2rem" }}>
		<Grid stackable>
			<Grid.Column width={8}>
				<Image src={launcherScreenshot} fluid />
			</Grid.Column>

			<Grid.Column width={8}>
				<h1>
					Решение для современных разработчиков
				</h1>

				<p style={{ fontSize: "1.7em" }}>
					Решение создано для упрощения работы с кодом и имеет потрясающий функционал
				</p>

				<Button color="green" size="big" as={Link} to="/download">
					Скачать
					<Icon name="right arrow" />
				</Button>
			</Grid.Column>
		</Grid>
	</Container>
);

export default MainPage = () => (
	<main style={{ marginTop: "50px" }}>
		<HeadMainPage />
		<ContentMainPage />
	</main>
);