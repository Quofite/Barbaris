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
                        <Step.Title>JSON Конвертор</Step.Title>
                        <Step.Description>Конвертируйте JSON-записи в строки для любого ЯП</Step.Description>
                    </Step.Content>
                </Step>

                <Step 
                    as="a" 
                    onClick={() => this.props.changeTool(1)}
                    active={(page === 1)}
                >
                    <Icon name="database" />
                    <Step.Content>
                        <Step.Title>SQL Валидатор</Step.Title>
                        <Step.Description>Проверьте правильность SQL-запроса</Step.Description>
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
                            JSON Конвертор
                        </h2>

                        <Form>
                            <Form.Field>
                                <label>Введите JSON здесь</label>
                                <TextArea fluid />
                            </Form.Field>

                            <Form.Field>
                                <label>Вывод</label>
                                <TextArea fluid readOnly />
                            </Form.Field>

                            <Form.Field>
                                <Button className="icon labeled green" icon="sync" content="Конвертировать" />
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
                            SQL Валидатор
                        </h2>

                        <Form>
                            <Form.Field>
                                <label>Введите SQL код здесь</label>
                                <TextArea fluid />
                            </Form.Field>

                            <Form.Field>
                                <Button className="icon labeled green" icon="play" content="Проверить" />
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
