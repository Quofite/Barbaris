import { NavLink } from "react-router-dom";

import {
  Button,
  Container,
  Menu,
} from "semantic-ui-react"

//import logo from "../images/logo.png";

const HeaderMenu = () => (
    <Menu
        fixed = "top"
        size = "large"
    >
        <Container>
            <Menu.Item as={NavLink} to="/" content="Home" activeClassName="active" />
            <Menu.Item as={NavLink} to="/download" content="Download" activeClassName="active" />
            <Menu.Item as={NavLink} to="/tools" content="Web-Tools" activeClassName="active" />
            <Menu.Item position="right">
                <Button href="https://github.com/Quofite/SimpleWebDev/" content="Github" color="black" icon="github" target="_blank" />
            </Menu.Item>
        </Container>
    </Menu>
);

export default HeaderMenu;