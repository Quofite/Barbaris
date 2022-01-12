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
            <Menu.Item as={NavLink} to="/" content="Главная" activeClassName="active" />
            <Menu.Item as={NavLink} to="/download" content="Скачать" activeClassName="active" />
            <Menu.Item as={NavLink} to="/tools" content="Веб-инструменты" activeClassName="active" />
            <Menu.Item position="right">
                <Button href="https://github.com/Quofite/SimpleWebDev/" content="GitHub" color="black" icon="github" target="_blank" />
            </Menu.Item>
        </Container>
    </Menu>
);

export default HeaderMenu;