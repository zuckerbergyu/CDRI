import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import favoritList from "../../libs/favoritList";
import BookItem from "../BookItem";
import Pagination from "@mui/material/Pagination";
import { Colors } from "../../constants/theme";

const Favorite = (): JSX.Element => {
  const searchResult = favoritList.get();
  const totalCount = searchResult.length;

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
            searchResult?.map((item: any) => {
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
                //TODO:  여기에 페이지 넘기는것 추가하기
              }}
            />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Favorite;
