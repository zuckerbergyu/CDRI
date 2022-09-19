import { useQuery } from "react-query";
import axios from "axios";
import { SearchOptions } from "../types";

export const kakao = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: { Authorization: "KakaoAK c5b65eb42d62119a052daaa1389c3483" },
});

export const getSearchResult = async (params: SearchOptions) => {
  return kakao.get("/v3/search/book", { params });
};
export const useGetSearchResult = (params: SearchOptions) =>
  useQuery(
    ["search", params.query, params.page],
    () => getSearchResult(params),
    {
      enabled: false,
    }
  );
