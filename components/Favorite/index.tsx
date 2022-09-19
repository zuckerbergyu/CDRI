import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import favoritList from "../../libs/favoritList";
import BookItem from "../BookItem";
import { Colors } from "../../constants/theme";
import ArrowLeft from "../Icons/ArrowLeft";
import ArrowRight from "../Icons/ArrowRight";

const sliceFavoritList = (favoritList: any) => {
  let result = [];
  let i = 0;
  if (favoritList) {
    for (i = 0; i < favoritList.length; i += 10)
      result.push(favoritList.slice(i, i + 10));
  }
  return result;
};

const Favorite = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const searchResult = favoritList.get();
  const totalCount = searchResult.length;
  const paginationList = sliceFavoritList(searchResult);

  return (
    <Box>
      <Box>
        <Typography
          sx={{ fontWeight: 700, fontSize: "22px", marginBottom: "16px" }}
        >
          내가 찜한 책
        </Typography>
        <Typography
          sx={{ fontWeight: 500, fontSize: "16px", color: Colors.text.Primary }}
        >
          도서 검색 결과 총
          <span style={{ color: Colors.palette.Primary }}>
            {totalCount ? totalCount : 0}
          </span>
          건
        </Typography>
        <Box sx={{ margin: "10px" }}>
          {totalCount ? (
            paginationList[currentPage - 1].map((item: any) => {
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
                찜한 책이 없습니다.
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
                setCurrentPage(page);
              }}
              page={currentPage}
              siblingCount={1}
              boundaryCount={2}
              renderItem={(item) => (
                <PaginationItem
                  sx={{
                    borderRadius: "4px",
                    border: `1px solid ${Colors.palette.Gray}`,
                    background: Colors.palette.White,
                    color: Colors.palette.Gray,
                    "&.Mui-selected": {
                      background: Colors.palette.Primary,
                      color: Colors.palette.White,
                      border: 0,
                    },
                  }}
                  components={{ previous: ArrowLeft, next: ArrowRight }}
                  {...item}
                />
              )}
            />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Favorite;
