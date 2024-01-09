import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListItem } from "@mui/material";
import { logoutHandler} from "../../Utils/tools";

const AdminNav = (props) => {

    const navigate = useNavigate()

    const links = [
        {
            title:'Partidas',
            linkTo:'/admin_matches'
        },
        {
            title:'Jogadores',
            linkTo:'/admin_players'
        }
    ]

    const renderItems = () => {
        return links.map(link => (
            <Link to={link.linkTo} key={link.title}>
                <ListItem button className="admin_nav_link">
                    {link.title}
                </ListItem>
            </Link>
        ));
    }

    return (
        <div>
            {renderItems()}
            <ListItem button className="admin_nav_link" onClick={() => logoutHandler(navigate)}>
                    Sair
            </ListItem>
        </div>
    );
};

export default AdminNav;
