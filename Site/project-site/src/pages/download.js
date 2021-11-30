//import './App.css';
import {
  Button,
  Segment,
  Grid,
  Header,
} from 'semantic-ui-react'


// Ясное дело выглядит говно, но пока так
const DownloadPage = () => (
    <Segment style={{ padding: '0em' }} vertical>
        <Grid celled='internally' columns='equal' stackable>
            <Grid.Row textAlign='center'>
                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                        Stable Version
                    </Header>
                    
                    <p style={{ fontSize: '1.33em' }}>Current version: 1.0</p>

                    <Button color="green" size="large">Download</Button>
                </Grid.Column>

                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                        Beta Version
                    </Header>

                    <p style={{ fontSize: '1.33em' }}>Current version: 1.1b</p>

                    <Button basic size="large">Download</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Segment>
);

export default DownloadPage;