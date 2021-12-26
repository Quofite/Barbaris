//import './App.css';
import {
  Segment,
  Grid,
  Header,
  Dropdown,
  Container,
  Image,
  List
} from "semantic-ui-react";

import launcherInstallerScreenshot from "../images/launcherInstaller.png";

var DownloadPage;

var links = {
    "stable": [
        "Not found",
        { platform: "windows",  icon: "windows", value: "", text: "Windows" },
        { platform: "linux",  icon: "linux", value: "", text: "Linux" },
    ],

    "alpha": [
        "0.0.2",
        { platform: "windows", icon: "windows", value: "https://github.com/Quofite/Barbaris/releases/download/alpha/BarbarisSetup.exe", text: "Windows" },
        { platform: "linux", icon: "linux", value: "", text: "Linux" },
    ],
}

// Ясное дело выглядит говно, но пока так
const ButtonsDownloadPage = () => (
    <Segment style={{ padding: "0" }} vertical>
        <Grid celled="internally" columns="equal" stackable>
            <Grid.Row textAlign="center">
                <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                    <Header as="h3" style={{ fontSize: "2em" }}>
                        Stable Version
                    </Header>
                    
                    <p style={{ fontSize: "1.33em" }}>Current version: {links["stable"][0]}</p>

                    <Dropdown
                        text="Download"
                        icon="download"
                        floating
                        labeled
                        button
                        className="large green icon" // Гениально, у кнопок есть свойство size, а у дропдаунов нет
                    >
                        <Dropdown.Menu>
                            {links["stable"].map((link) => { 
                                if (!link.value && !link.platform)
                                    return false;

                                if (link.value)
                                    return (
                                        <Dropdown.Item as="a" href={link.value} content={link.text} icon={link.icon} />
                                    )
                                else
                                    return (
                                        <Dropdown.Item as="a" disabled content={link.text} icon={link.icon} />
                                    )    
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </Grid.Column>

                <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                    <Header as="h3" style={{ fontSize: "2em" }}>
                        Alpha Version
                    </Header>

                    <p style={{ fontSize: "1.33em" }}>Current version: {links["alpha"][0]}</p>
                   
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
                            {links["alpha"].map((link) => { 
                                if (!link.value && !link.platform)
                                    return false;

                                if (link.value)
                                    return (
                                        <Dropdown.Item as="a" href={link.value} content={link.text} icon={link.icon} />
                                    )
                                else
                                    return (
                                        <Dropdown.Item as="a" disabled content={link.text} icon={link.icon} />
                                    )    
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Segment>
);

const ContentDownloadPage = () => (
    <Container style={{ marginTop: "2rem" }}>
        <Grid stackable>
            <Grid.Column width={8}>
                <h1>
                    How to install
                </h1>

                <List as="ol" style={{ fontSize: "1.3em" }}>
                    <List.Item as="li">Download installer for your system</List.Item>
                    <List.Item as="li">Open installer</List.Item>
                    <List.Item as="li">Select the installation folder or continue to the standard folder</List.Item>
                    <List.Item as="li">Wait for the installation to finish</List.Item>
                    <List.Item as="li">Enjoy the program</List.Item>
                </List>
            </Grid.Column>

            <Grid.Column width={8}>
                <Image src={launcherInstallerScreenshot} fluid />
            </Grid.Column>
        </Grid>
    </Container>
);

export default DownloadPage = () => (
    <main style={{ marginTop: "50px" }}>
        <ButtonsDownloadPage />
        <ContentDownloadPage />
    </main>
);