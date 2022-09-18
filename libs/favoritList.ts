export const KEY = "FAVORITE_BOOKS";

const get = () => {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const items = localStorage.getItem(KEY);
    if (!items) {
      return [];
    }
    return JSON.parse(items);
  } catch (e) {
    return [];
  }
};
const push = (params: any) => {
  let input: any;
  if (typeof params === "object") input = params;
  else if (params) input = params;
  let items = get();
  if (input) {
    const foundIndex = items.findIndex((item: any) => item === input);
    if (foundIndex > -1) {
      items.splice(foundIndex, 1);
    }
    items.unshift(input);
    localStorage.setItem(KEY, JSON.stringify(items));
    return items;
  }
  return items;
};

const clearItem = (value: any) => {
  let items = get();
  items = items.filter((item: any) => item.isbn !== value.isbn);
  localStorage.setItem(KEY, JSON.stringify(items));
};

const isFavorite = (params: any) => {
  let input: any;
  if (typeof params === "object") input = params;
  let items = get();
  if (input) {
    // 기존에 같은 value이 있을 경우 지운다. (새로운 아이템이 앞으로 간다.)
    const foundIndex = items.findIndex((item: any) => item.isbn === input.isbn);
    if (foundIndex > -1) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

export default {
  get,
  push,
  clearItem,
  isFavorite,
};
