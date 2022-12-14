import { atom } from "recoil";

export const postData = atom({
  key: "postData",
  default: {
    content: "",
    path: [],
    distance: "",
    image: [],
    hashtag: [],
    time: "",
    prevImage: "",
    pace: "",
    isLoading: false
  }
});
