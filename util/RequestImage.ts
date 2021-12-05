import axios from "axios";
import { RequestImageBody } from "../types";

export const customRequestImage = async ({
  category,
  color,
}: RequestImageBody) => {
  axios
    .get(
      `https://pixabay.com/api/?key=22826797-0e3c3eea9b85a7ce6aee2bbb7&category=${category}&min_width=1280&min_height=720&editors_choice=true&per_page=10&color=${color}`
    )
    .then((res) => {
      return res.data;
    });
};

export const RequestImage = async () => {
  axios
    .get(
      `https://pixabay.com/api/?key=22826797-0e3c3eea9b85a7ce6aee2bbb7&category=nature&min_width=1280&min_height=720&editors_choice=true&per_page=10`
    )
    .then((res) => {
      return res.data;
    });
};
