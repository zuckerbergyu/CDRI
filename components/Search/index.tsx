import * as React from "react";
import { useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import { Box, Typography, Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import SearchField from "./_comps/SearchField";
import Popup from "./_comps/Popup";
import BookItem from "../BookItem";
import { useGetSearchResult } from "../../apis";
import CircularProgress from "@mui/material/CircularProgress";
import { SearchOptions, Documents } from "../../types";
import { Colors } from "../../constants/theme";

/**
 * requestParams
 * query: 검색어,
 * sort: accuracy(정확도) | recency(최신)
 * page: 페이지 번호
 * pageSize: 페이지 데이터 개수
 * target: 검색 옵션 - title(제목) | publisher(출판사) | person(저자)
 */
const defaultParams: SearchOptions = {
  query: "",
  sort: "accuracy",
  page: 1,
  size: 10,
  target: "title",
};
let params: SearchOptions = {
  query: "",
  sort: "accuracy",
  page: 1,
  size: 10,
  target: "title",
};

const options = ["title", "person", "publisher"];

const Search = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState("");

  const [searchInputDetail, setSearchInputDetail] = useState("");

  // -----------검색-------------------------------------------------

  const { data: searchResult, refetch } = useGetSearchResult(params);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    console.log(searchResult?.data.documents);
    if (totalCount != searchResult?.data.meta.total_count)
      setTotalCount(searchResult?.data.meta.total_count);
  }, [searchResult]);

  // -----------검색-------------------------------------------------

  // 상세검색 팝업 ------------------------------------
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // 상세검색 팝업 ------------------------------------

  // 상세검색 옵션 처리 ------------------------------------

  const [detailOption, setDetailOption] = useState(0);
  useEffect(() => {
    console.log("여기서 변하는지", detailOption);
  }, [detailOption]);

  // 상세검색 옵션 처리 ------------------------------------

  return (
    <Box>
      <Box>
        <Typography
          sx={{ fontWeight: 700, fontSize: "22px", marginBottom: "16px" }}
        >
          도서검색
        </Typography>
        <Box sx={{ display: "flex" }}>
          <SearchField
            value={searchInput}
            onChange={setSearchInput}
            placeholder="검색어를 입력하세요"
            onSubmit={() => {
              params.query = searchInput;
              refetch();
            }}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              sx={{
                background: Colors.palette.White,
                color: Colors.text.Subtitle,
                borderWidth: 1,
                borderStyle: "solid",
                fontWeight: 500,
                fontSize: "14px",
                padding: "3px 5px",
                marginLeft: "16px",
                borderRadius: "8px",
                ":hover": {
                  backgroundColor: Colors.palette.White,
                  color: Colors.text.Subtitle,
                },
              }}
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            >
              상세검색
            </Button>
          </Box>
        </Box>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          sx={{
            ".MuiPopover-paper": {
              marginTop: "26px",
            },
          }}
        >
          <Popup
            onClose={handleClose}
            value={searchInputDetail}
            onChange={setSearchInputDetail}
            placeholder="검색어 입력"
            onSubmit={() => {
              console.log("detail : ", detailOption);
              params.target = options[detailOption];
              params.query = searchInputDetail;
              refetch();
              handleClose();
              params = defaultParams;
            }}
            detailOption={setDetailOption}
          />
        </Popover>

        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            marginTop: "25px",
          }}
        >
          도서 검색 결과 총
          <span style={{ color: Colors.palette.Primary }}>
            {totalCount ? totalCount : 0}
          </span>
          건
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "36px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {totalCount ? (
          searchResult?.data.documents.map((item: any) => {
            return <BookItem item={item} />;
          })
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "120px",
            }}
          >
            <img src={"icon_book.png"} />
            <Typography
              sx={{ fontWeight: 500, fontSize: "16px", marginTop: "26px" }}
            >
              검색된 결과가 없습니다.
            </Typography>
          </Box>
        )}
        {totalCount ? (
          <Pagination
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "61px",
            }}
            count={Math.floor((totalCount + 9) / 10)}
            onChange={(event: React.ChangeEvent<unknown>, page: number) => {
              params.page = page;
              refetch();
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default Search;
