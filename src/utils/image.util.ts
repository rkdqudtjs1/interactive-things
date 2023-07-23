import fs from "fs";
import path from "path";

const { PWD = "" } = process.env;

export const getImages = (folder: string) => {
  const regularRoot = path.join(PWD, "public", "images", folder, "regular");

  if (!fs.existsSync(regularRoot)) return [];
  return fs.readdirSync(regularRoot);
};
