import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Colors } from "../../constants/theme";
import { Documents } from "../../types";
import ArrowDown from "../Icons/ArrowDown";
import ArrowUp from "../Icons/ArrowUp";
import favoritList from "../../libs/favoritList";
import comma from "../../libs/comma";
import HeartIcon from "../Icons/HeartIcon";
import { IconButton } from "@mui/material";

type Props = {
  item: Documents;
};

const BookItem = (props: Props) => {
  const [isDetailShow, setIsDetailShow] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    favoritList.isFavorite(props.item)
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${Colors.palette.LightGray}`,
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
              fill={isFavorite ? "red" : ""}
              color={isFavorite ? "red" : "white"}
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
            ? comma(props.item.price as number)
            : comma(props.item.sale_price as number)}
          원
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              width: "115px",
              height: "48px",
              display: "flex",
              fontSize: "16px",
              fontWeight: 500,
              marginRight: "8px",
              borderRadius: "8px",
              alignItems: "center",
              justifyContent: "center",
              color: Colors.palette.White,
              background: Colors.palette.Primary,
            }}
            onClick={() => {
              props.item.url && window.open(props.item.url, "_blank");
            }}
          >
            구매하기
          </Box>
          <Box
            sx={{
              width: "115px",
              height: "48px",
              display: "flex",
              fontWeight: 500,
              fontSize: "16px",
              borderRadius: "8px",
              alignItems: "center",
              justifyContent: "center",
              color: Colors.text.Secondary,
              background: Colors.palette.LightGray,
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
      {isDetailShow ? (
        <Box
          sx={{
            display: "flex",
            padding: "25px 0 39px 0px",
            borderBottom: `1px solid ${Colors.palette.LightGray}`,
          }}
        >
          <Box sx={{ margin: "0px 48px", position: "relative" }}>
            <img width={"209px"} height={"298px"} src={props.item.thumbnail} />
            <IconButton
              sx={{
                left: "164px",
                position: "absolute",
              }}
              onClick={() => {
                if (favoritList.isFavorite(props.item)) {
                  favoritList.clearItem(props.item);
                } else {
                  favoritList.push(props.item);
                }
                setIsFavorite(favoritList.isFavorite(props.item));
              }}
            >
              <HeartIcon
                size={30}
                fill={isFavorite ? "red" : ""}
                color={isFavorite ? "red" : "white"}
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
            <Typography sx={{ height: "200px", overflow: "scroll" }}>
              {props.item.contents}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "115px",
                height: "48px",
                display: "flex",
                fontWeight: 500,
                fontSize: "16px",
                borderRadius: "8px",
                alignItems: "center",
                justifyContent: "center",
                color: Colors.text.Secondary,
                background: Colors.palette.LightGray,
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
                alignItems: "end",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "10px",
                    marginRight: "8px",
                    color: Colors.text.Subtitle,
                  }}
                >
                  원가
                </Typography>
                <Typography
                  sx={{
                    textDecorationLine: `${
                      props.item.sale_price !== -1 ? "line-through" : "none"
                    }`,
                    fontWeight: 300,
                    fontSize: "18px",
                    color: Colors.text.Primary,
                  }}
                >
                  {comma(props.item.price as number)}
                </Typography>
              </Box>
              {props.item.sale_price !== -1 ? (
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
                      marginRight: "8px",
                      color: Colors.text.Subtitle,
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
                  width: "240px",
                  height: "48px",
                  display: "flex",
                  fontWeight: 500,
                  fontSize: "16px",
                  borderRadius: "8px",
                  alignItems: "center",
                  justifyContent: "center",
                  color: Colors.palette.White,
                  background: Colors.palette.Primary,
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
