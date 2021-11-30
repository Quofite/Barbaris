//import './App.css';
import {Link} from 'react-router-dom';


import {
  Button,
  Container,
  Menu,
} from 'semantic-ui-react'

const HeaderMenu = () => (
    <Menu
        fixed = "top"
        size = "large"
    >
        <Container>
            <Menu.Item as={Link} to="/">
                Home
            </Menu.Item>
            <Menu.Item as={Link} to="/download">Download</Menu.Item>
            <Menu.Item as='a'>Web-tools</Menu.Item>
            <Menu.Item as='a'>About</Menu.Item>
            <Menu.Item position='right'>
                <Button href="https://github.com/Quofite/SimpleWebDev/" content="Github" color="black" icon="github" target="_blank" />
            </Menu.Item>
        </Container>
    </Menu>
);

export default HeaderMenu;