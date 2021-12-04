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
        { platform: "windows",  icon: "windows", value: "https://pornhub.com", text: "Windows" },
        { platform: "linux",  icon: "linux", value: "ссылка", text: "Linux" },
    ],

    "beta": [
        { platform: "windows", icon: "windows", value: "https://airbus.com", text: "Windows" },
        { platform: "linux", icon: "linux", value: "ссылка", text: "Linux" },
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

                    <Dropdown
                        text="Download"
                        icon="download"
                        floating
                        labeled
                        button
                        className="large green icon" // Гениально у кнопок есть свойство size="large", а у дропдаунов нет
                    >
                        <Dropdown.Menu>
                            {links["stable"].map((link) => (
                                <Dropdown.Item as="a" href={link.value} content={link.text} icon={link.icon} />
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Grid.Column>

                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                        Beta Version
                    </Header>

                    <p style={{ fontSize: '1.33em' }}>Current version: 1.1b</p>
                   
                    <Dropdown
                        text="Download"
                        icon="download"
                        floating
                        labeled
                        button
                        basic
                        className="large icon"
                    >
                        <Dropdown.Menu>
                            {links["beta"].map((link) => (
                                <Dropdown.Item as="a" href={link.value} content={link.text} icon={link.icon} />
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Segment>
);

export default DownloadPage;