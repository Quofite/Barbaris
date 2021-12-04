//import './App.css';
import {
  Button,
  Segment,
  Grid,
  Header,
  Dropdown,
} from 'semantic-ui-react'

var links = {
    "stable": [
        { key: "windows",  icon: "windows", value: "ссылка", text: "Windows" },
        { key: "linux",  icon: "linux", value: "ссылка", text: "Linux" },
    ],

    "beta": [
        { key: "windows", icon: "windows", value: "ссылка", text: "Windows" },
        { key: "linux", icon: "linux", value: "ссылка", text: "Linux" },
    ],
}

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

                    <Button.Group color="green" size="large">
                        <Button>Download</Button>
                        <Dropdown className="button icon" floating options={links["stable"]} trigger={<></>} />
                    </Button.Group>
                </Grid.Column>

                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                        Beta Version
                    </Header>

                    <p style={{ fontSize: '1.33em' }}>Current version: 1.1b</p>

                    <Button.Group size="large" basic>
                        <Button>Download</Button>
                        <Dropdown className="button icon" floating options={links["beta"]} trigger={<></>} />
                    </Button.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Segment>
);

export default DownloadPage;