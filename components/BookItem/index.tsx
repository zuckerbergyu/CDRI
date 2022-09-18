import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Colors } from "../../constants/theme";
import { Documents } from "../../types";
import ArrowDown from "../Icons/ArrowDown";
import ArrowUp from "../Icons/ArrowUp";
import favoritList from "../../libs/favoritList";
import comma from "../../libs/comma";
import HeartIcon from "../Icons/HeartIcon";
import { IconButton } from "@mui/material";

/**
 * 찜하기 되어있으면 썸네일 상단에 하트 이미지 생김
 * 다시 눌렀을때 해당 그거 제거하는거 만들기
 */

type Props = {
  item: Documents;
};

const BookItem = (props: Props) => {
  const [isDetailShow, setIsDetailShow] = useState(false);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: `1px solid ${Colors.palette.LightGray}`,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ margin: "16px 48px", position: "relative" }}>
          <img width={"48px"} height={"68px"} src={props.item.thumbnail} />
          <Box
            sx={{
              top: "-4px",
              left: "34px",
              position: "absolute",
            }}
          >
            <HeartIcon
              size={12}
              color={favoritList.isFavorite(props.item) ? "red" : "white"}
              fill={favoritList.isFavorite(props.item) ? "red" : ""}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: 400,
            display: "flex",
            alignItems: "center",
            color: Colors.text.Secondary,
          }}
        >
          <Typography
            sx={{ fontSize: "18px", fontWeight: 700, marginRight: "16px" }}
          >
            {props.item.title}
          </Typography>
          <Typography
            sx={{ fontSize: "14px", fontWeight: 500, marginRight: "16px" }}
          >
            {props.item.authors}
          </Typography>
        </Box>
        <Typography
          sx={{ fontSize: "18px", fontWeight: 700, marginRight: "16px" }}
        >
          {props.item.sale_price === -1
            ? props.item.price
            : comma(props.item.sale_price as number)}
          원
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              width: "115px",
              height: "48px",
              background: Colors.palette.Primary,
              color: Colors.palette.White,
              fontSize: "16px",
              fontWeight: 500,
              marginRight: "8px",
            }}
            onClick={() => {
              props.item.url && window.open(props.item.url, "_blank");
            }}
          >
            구매하기
            {/* Todo 네이버 채긍로 이동하는거 만들기 */}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              width: "115px",
              height: "48px",
              background: Colors.palette.LightGray,
              color: Colors.text.Secondary,
              fontSize: "16px",
              fontWeight: 500,
            }}
            onClick={() => {
              setIsDetailShow(!isDetailShow);
            }}
          >
            상세보기
            <ArrowDown />
          </Box>
        </Box>
      </Box>
      {/*----------- 여기서부터 상세보기 ----------- */}
      {isDetailShow ? (
        <Box
          sx={{
            padding: "25px 0 39px 0px",
            display: "flex",
            borderBottom: `1px solid ${Colors.palette.LightGray}`,
          }}
        >
          <Box sx={{ margin: "0px 48px", position: "relative" }}>
            <img width={"209px"} height={"278px"} src={props.item.thumbnail} />
            <IconButton
              sx={{
                left: "164px",
                position: "absolute",
              }}
              onClick={() => {
                // ToDO :여기서 바꾸는것을 밖으로 끄집어내기
                if (favoritList.isFavorite(props.item)) {
                  favoritList.clearItem(props.item);
                } else {
                  favoritList.push(props.item);
                }
              }}
            >
              <HeartIcon
                size={30}
                color={favoritList.isFavorite(props.item) ? "red" : "white"}
                fill={favoritList.isFavorite(props.item) ? "red" : ""}
              />
            </IconButton>
          </Box>

          <Box sx={{ width: "360px", marginTop: "18px", marginRight: "48px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <Typography
                sx={{ fontSize: "18px", fontWeight: 700, marginRight: "16px" }}
              >
                {props.item.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: Colors.text.Subtitle,
                }}
              >
                {props.item.authors}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "14px",
                marginBottom: "12px",
                color: Colors.text.Primary,
              }}
            >
              책소개
            </Typography>
            <Typography>{props.item.contents}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                width: "115px",
                height: "48px",
                background: Colors.palette.LightGray,
                color: Colors.text.Secondary,
                fontSize: "16px",
                fontWeight: 500,
              }}
              onClick={() => {
                setIsDetailShow(!isDetailShow);
              }}
            >
              상세보기
              <ArrowUp />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "10px",
                    color: Colors.text.Subtitle,
                    marginRight: "8px",
                  }}
                >
                  원가
                </Typography>
                <Typography
                  sx={{
                    textDecorationLine: "line-through",
                    fontWeight: 300,
                    fontSize: "18px",
                    color: Colors.text.Primary,
                  }}
                >
                  {comma(props.item.price as number)}
                </Typography>
              </Box>
              {props.item.sale_price ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "28px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "10px",
                      color: Colors.text.Subtitle,
                      marginRight: "8px",
                    }}
                  >
                    할인가
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "18px",
                      color: Colors.text.Primary,
                    }}
                  >
                    {comma(props.item.sale_price as number)}
                  </Typography>
                </Box>
              ) : null}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  width: "240px",
                  height: "48px",
                  background: Colors.palette.Primary,
                  color: Colors.palette.White,
                  fontSize: "16px",
                  fontWeight: 500,
                }}
                onClick={() => {
                  props.item.url && window.open(props.item.url, "_blank");
                }}
              >
                구매하기
              </Box>
            </Box>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default BookItem;
