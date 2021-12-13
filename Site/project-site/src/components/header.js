import { Link } from 'react-router-dom';


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
            <Menu.Item as={Link} to="/" content="Home" />
            <Menu.Item as={Link} to="/download" content="Download" />
            <Menu.Item as={Link} to="/tools" content="Web-Tools" />
            <Menu.Item as={Link} to="/about" content="About" />
            <Menu.Item position="right">
                <Button href="https://github.com/Quofite/SimpleWebDev/" content="Github" color="black" icon="github" target="_blank" />
            </Menu.Item>
        </Container>
    </Menu>
);

export default HeaderMenu;