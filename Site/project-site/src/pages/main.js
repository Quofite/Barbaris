import {
  Button,
  Container,
  Icon,
  Header,
  Segment,
} from 'semantic-ui-react'

const MainPage = () => (
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
                content="New modern software for easy web-developing"
                inverted
                style={{
                    fontSize: "1.7em",
                    fontWeight: "normal",
                    marginTop: "1.5em",
                }}
            />
            <Button primary size="huge">
                Get started
                <Icon name="right arrow" />
            </Button>
        </Container>
    </Segment>
);

export default MainPage;