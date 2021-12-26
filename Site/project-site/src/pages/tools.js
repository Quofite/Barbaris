import React from "react";

import {
    Container,
    Icon,
    Step,
    Segment,
    Grid,
    Form,
    TextArea,
    Button,
} from "semantic-ui-react";

var ToolsPage;

class LeftSideToolsPage extends React.Component {
    render () {
        const { page } = this.props.page;
        
        return (
            <Step.Group vertical style={{ width: "100%" }}>
                <Step 
                    as="a"
                    onClick={() => this.props.changeTool(0)}
                    active={(page === 0)}
                >
                    <Icon name="js" />
                    <Step.Content>
                        <Step.Title>Json converter</Step.Title>
                        <Step.Description>Convert json to arrays in different lang's</Step.Description>
                    </Step.Content>
                </Step>

                <Step 
                    as="a" 
                    onClick={() => this.props.changeTool(1)}
                    active={(page === 1)}
                >
                    <Icon name="database" />
                    <Step.Content>
                        <Step.Title>SQL Validator</Step.Title>
                        <Step.Description>Validate your SQL request's</Step.Description>
                    </Step.Content>
                </Step>
            </Step.Group>
        )
    }
}

class ContentToolsPage extends React.Component {
    state = {
        page: 0
    }

    changeTool = (tool) => {
        this.setState({page: tool})
    }

    render() {
        var renderedPage = [];

        renderedPage[0] = (
            <Grid.Column width={6}>
                <LeftSideToolsPage changeTool={this.changeTool} page={this.state} />
            </Grid.Column>
        )

        if (this.state.page === 0) {
            renderedPage[1] = (
                <Grid.Column width={10}>
                    <Segment style={{ width: "100%" }}>
                        <h2>
                            JSON Converter
                        </h2>

                        <Form>
                            <Form.Field>
                                <label>Enter JSON here</label>
                                <TextArea fluid />
                            </Form.Field>

                            <Form.Field>
                                <label>Output</label>
                                <TextArea fluid readOnly />
                            </Form.Field>

                            <Form.Field>
                                <Button className="icon labeled green" icon="sync" content="Convert" />
                            </Form.Field>
                        </Form>
                    </Segment>
                </Grid.Column>
            )
        } else if (this.state.page === 1) {
            renderedPage[1] = (
                <Grid.Column width={10}>
                    <Segment style={{ width: "100%" }}>
                        <h2>
                            SQL Validator
                        </h2>

                        <Form>
                            <Form.Field>
                                <label>Enter SQL code here</label>
                                <TextArea fluid />
                            </Form.Field>

                            <Form.Field>
                                <Button className="icon labeled green" icon="check" content="Validate" />
                            </Form.Field>
                        </Form>
                    </Segment>
                </Grid.Column>
            )
        }

        return [
            renderedPage[0],
            renderedPage[1]
        ]
    }
}

export default ToolsPage = () => (
    <main>
        <Container>
            <Grid stackable>
                <ContentToolsPage />
            </Grid>
        </Container>
    </main>
);
