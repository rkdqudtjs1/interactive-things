// https://unsplash.com/documentation#list-photos

import axios from "axios";

const { UNSPLASH_ACCESS_KEY } = process.env;

const unsplashInstance = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
  },
});

type GetImagesArgs = { page?: number; perPage?: number };
const getImagesDefaultArgs: GetImagesArgs = { page: 1, perPage: 30 };
export const getImages = async ({ page, perPage } = getImagesDefaultArgs) => {
  type UnsplashImage = {
    id: string;
    created_at: string;
    updated_at: string;
    profile_image: { small: string; medium: string; large: string };
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
    };
    width: number;
    height: number;
  };
  const { data } = await unsplashInstance.get<UnsplashImage[]>("/photos", {
    params: { page, per_page: perPage },
  });

  return data;
};
