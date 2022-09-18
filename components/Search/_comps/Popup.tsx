import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowDown from "../../Icons/ArrowDown";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import InputBase from "@mui/material/InputBase";
import { Stack } from "@mui/material";
import SearchIcon from "../../Icons/Search";
import CloseIcon from "../../Icons/CloseIcon";
import { Colors } from "../../../constants/theme";
import { IconButton } from "@mui/material";

const options = ["제목", "저자명", "출판사"];

type Props = {
  onClose: (e: KeyboardEvent | MouseEvent) => void;
  placeholder?: string | null;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  detailOption: (value: number) => void;
  selectedIndex?: number | 0;
};

export default function BasicPopover(props: Props) {
  // -----------옵션 선택---------------
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  React.useEffect(() => {
    if (props.selectedIndex) setSelectedIndex(props.selectedIndex);
  }, []);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    props.detailOption(index);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // -----------옵션 선택---------------

  return (
    <Box sx={{ margin: "12px 24px 32px", width: "360px", height: "160px" }}>
      <Box
        sx={{ display: "flex", justifyContent: "end", marginRight: "-12px" }}
      >
        <IconButton
          onClick={() => {
            props.onClose();
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <List
          component="nav"
          aria-label="Device settings"
          sx={{
            diplay: "flex",
            height: "46px",
            width: "100px",
            marginRight: "4px",
            borderBottom: `1px solid ${Colors.text.Subtitle}`,
            "&.MuiList-padding": {
              padding: "0",
            },
          }}
        >
          <ListItem
            button
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickListItem}
          >
            <ListItemText
              primaryTypographyProps={{
                fontWeight: 700,
                fontSize: "14px",
                color: Colors.text.Primary,
              }}
              primary={options[selectedIndex]}
            />
            <ArrowDown />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "lock-button",
            role: "listbox",
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              sx={{
                fontWeight: 500,
                fontSize: "14px",
                color: Colors.text.Subtitle,
              }}
              key={option}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit();
          }}
        >
          <Box
            sx={{
              background: Colors.palette.Gray,
              borderBottom: `1px solid ${Colors.palette.Primary}`,
              height: "46px",
              width: "250px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            }}
          >
            <InputBase
              sx={{ ml: "6px", mr: "4", flex: 1 }}
              placeholder={props.placeholder || ""}
              value={props.value}
              onChange={(e) => {
                props.onChange(e.target.value);
              }}
            />
          </Box>
        </form>
      </Box>
      <Box
        sx={{ justifyContent: "center", display: "flex", marginTop: "16px" }}
      >
        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            width: "100%",
            height: "48px",
            background: Colors.palette.Primary,
            color: Colors.palette.White,
            fontSize: "16px",
            fontWeight: 500,
          }}
          onClick={() => {
            props.onSubmit();
          }}
        >
          검색하기
        </Button>
      </Box>
    </Box>
  );
}
