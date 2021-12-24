import { useState } from "react";

import {
    Container,
    Icon,
    Step,
    Segment,
    Grid,
} from "semantic-ui-react";


//onClick={() => changeTool(0)}
const LeftSideToolsPage = () => (
    <Step.Group vertical style={{ width: "100%" }}>
        <Step as="a" active>
            <Icon name="js" />
            <Step.Content>
                <Step.Title>Json converter</Step.Title>
                <Step.Description>Convert json to arrays in different lang's</Step.Description>
            </Step.Content>
        </Step>

        <Step as="a">
            <Icon name="database" />
            <Step.Content>
                <Step.Title>SQL Validator</Step.Title>
                <Step.Description>Validate your SQL request's</Step.Description>
            </Step.Content>
        </Step>
    </Step.Group>
)

const ContentToolsPage = () => {
    const [page, setPage] = useState(0); // initialize state

    const changeTool = (tool) => {
        setPage(tool)
    }

    if (page === 0)
        return (
            <Segment style={{ width: "100%" }}>
                <h2>
                    JSON Converter
                </h2>
            </Segment>
        )
    else if (page === 1)
        return (
            <Segment style={{ width: "100%" }}>
                <h2>
                    SQL Validator
                </h2>
            </Segment>
        )
}

// <ContentToolsPage />
export default () => (
    <main>
        <Container>
            <Grid>
                <Grid.Column width={6}>
                    <LeftSideToolsPage />
                </Grid.Column>

                <Grid.Column width={10}>
                    <ContentToolsPage page={0} />
                </Grid.Column>
            </Grid>
        </Container>
    </main>
);

