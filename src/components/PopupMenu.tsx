import React from 'react'
import { Menu, MenuItem } from '@mui/material';
import Fade from '@mui/material/Fade';

interface PopupMenuProps {
    anchorEl: null | HTMLElement,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    menuItems: string[],
    onClickMore: (item: string) => void,
}

const PopupMenu = (props: PopupMenuProps) => {

    const open = Boolean(props.anchorEl);

    const handleCloseMenu = (item: string) => {
        props.setAnchorEl(null);
        props.onClickMore && props.onClickMore(item)
    };

    return (
        <Menu
            id="fade-menu"
            MenuListProps={{
                'aria-labelledby': 'fade-button',
            }}
            anchorEl={props.anchorEl}
            open={open}
            onClose={handleCloseMenu}
            TransitionComponent={Fade}
            sx={{
                '.MuiMenuItem-root': {
                    fontFamily: 'vazir-normal'
                }
            }}
        >
            {
                props.menuItems?.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => handleCloseMenu(item)}
                    >
                        {item}
                    </MenuItem>
                ))
            }
        </Menu>
    )
}

export default PopupMenu