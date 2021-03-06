import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const NavBar = (props) => {
  let { location: { pathname } } = props
  let logged_in = props.logged_in;
  let logout = props.logout
  return (
    <Menu pointing secondary> 
      {logged_in ? (
        <Fragment>
        <Menu.Item
          as={NavLink}
          to="/"
          name="LanguageLearner"
          active={pathname ==="/"}
          />
          <Menu.Item
            as={NavLink}
            to="/profile"
            name="My Profile"
            active={pathname === "/profile"}
          />
          <Menu.Item
            as={NavLink}
            to="/users"
            name="Browse Users"
            active={pathname === "/users"}
          />
          <Menu.Item
            as={NavLink}
            to="/languages"
            name="Browse Languages"
            active={pathname === "/languages"}
          />
          <Menu.Item
            as={NavLink}
            to="/friendrequests"
            name="Friend Requests"
            active={pathname === "/friendrequests"}
          />
          <Menu.Menu position="right">
            <Menu.Item to="/logout" name="Logout" onClick={logout} />
          </Menu.Menu>
        </Fragment>
      ) : (
        <Fragment>
        <Menu.Item
          as={NavLink}
          to="/"
          name="LanguageLearner"
          active={pathname ==="/"}
          />
        <Menu.Item
          as={NavLink}
          to="/login"
          name="Login"
          active={pathname === "/login"}
        />
        </Fragment>
      )}
    </Menu>
  );
};

export default withRouter(NavBar);
