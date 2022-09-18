import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Stack } from "@mui/material";
import SearchIcon from "../../Icons/Search";
import { Colors } from "../../../constants/theme";

type Props = {
  placeholder?: string | null;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};
const SearchField = (props: Props) => {
  return (
    <Stack
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Stack direction="row" sx={{ width: "100%" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit();
          }}
        >
          <Box
            sx={{
              background: Colors.palette.LightGray,
              borderRadius: "100px",
              height: "46px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              width: "480px",
            }}
          >
            <IconButton
              sx={{ width: "42px", height: "42px", marginLeft: "8px" }}
            >
              <SearchIcon />
            </IconButton>
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
      </Stack>
    </Stack>
  );
};

export default SearchField;
