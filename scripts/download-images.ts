// https://unsplash.com/documentation#list-photos
import "dotenv/config";
import axios from "axios";
import path from "path";
import fs from "fs";
import mime from "mime-types";

const { UNSPLASH_ACCESS_KEY, PWD = "" } = process.env;

const unsplashInstance = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
  },
});

const saveImageSizes: ImageSize[] = ["full", "regular", "thumb"];

type ImageSize = "raw" | "full" | "regular" | "small" | "thumb";
type UnsplashImage = {
  id: string;
  created_at: string;
  updated_at: string;
  profile_image: { small: string; medium: string; large: string };
  urls: Record<ImageSize, string>;
  width: number;
  height: number;
  links: {
    self: string;
    html: string;
    download: string;
  };
};

const searchImages = async (query: string, count = 10) => {
  type SearchImagesParams = {
    query: string;
    page: number;
    per_page: number;
    order_by: "relevant" | "latest";
    orientation: "landscape" | "portrait" | "squarish";
  };

  type Response = {
    total: number;
    total_pages: number;
    results: UnsplashImage[];
  };

  const images: UnsplashImage[] = [];
  let page = 1;

  while (count > images.length) {
    const params: SearchImagesParams = {
      query,
      page,
      per_page: 10,
      order_by: "relevant",
      orientation: "landscape",
    };
    const { data } = await unsplashInstance.get<Response>("/search/photos", {
      params,
    });
    images.push(...data.results);
    page++;
  }

  return images;
};

const makeFolders = (destination: string) => {
  const isExistDestination = fs.existsSync(destination);

  if (!isExistDestination) fs.mkdirSync(destination);

  saveImageSizes.forEach((size) => {
    const sizeFolder = path.join(destination, size);
    const isExist = fs.existsSync(sizeFolder);
    if (!isExist) fs.mkdirSync(sizeFolder);
  });
};

const download = async () => {
  const query = "paris";
  const count = 11;

  const destination = path.join(PWD, "public", "images", query);
  makeFolders(destination);

  const images = await searchImages(query, count);

  for (const image of images) {
    for (const size of saveImageSizes) {
      const { data, headers } = await axios.get(image.urls[size], {
        responseType: "stream",
      });

      const extension = mime.extension(headers["content-type"]) || "";
      const filename = [image.id, extension].join(".");

      const stream = fs.createWriteStream(
        path.join(destination, size, filename)
      );

      data.pipe(stream);

      await new Promise((resolve, reject) => {
        stream.on("finish", resolve);
        stream.on("error", reject);
      });
    }
  }
};

download();
