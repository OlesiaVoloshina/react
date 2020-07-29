import React, {useState} from "react";
import MenuIcon from '../ui/MenuIcon/MenuIcon';
import MenuItem from '../ui/MenuItem/MenuItem';
import classes from './Layout.module.scss'
import {withRouter} from "react-router";


const Layout = (props) => {
    const [sideBarOpen, setSideBarOpen] = useState(false);

    const toggleSidebar = () => {
        setSideBarOpen(prevState => !prevState);
    };

    const hideSidebar = () => {
        setSideBarOpen(false);
    };

    const menuItemClicked = (itemId) => {
        hideSidebar();
        let menuItem = props.menuItems.find(i => i.id === itemId);
        if (menuItem && menuItem.clickHandler) {
            menuItem.clickHandler();
        }
    };

    const menuItemBlocks = props.menuItems.map(item =>
        <MenuItem key={item.id} path={item.path} onClick={() => menuItemClicked(item.id)}>
            {item.name}
        </MenuItem>);

    const sideBar = sideBarOpen ?
        <div className={classes.SideBar}>
            <div className={classes.SideBarItems}>
                {menuItemBlocks}
            </div>
        </div> : null;

    return (
        <div className={classes.Layout}>
            <div className={classes.MenuBar}>
                <MenuIcon open={sideBarOpen} onClick={toggleSidebar}/>
                <div className={classes.MenuBarTitle}>{props.title}</div>
                <div className={classes.MenuBarItems}>
                    {menuItemBlocks}
                </div>
            </div>
            {sideBar}
            <div className={classes.Content} onClick={hideSidebar}>
                {props.children}
            </div>
        </div>
    );
};

export default withRouter(Layout);