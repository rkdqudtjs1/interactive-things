import { getImages } from "@/utils/unsplash.util";
import Image from "next/image";

const CafePage = async () => {
  const images = await getImages();

  return (
    <div className="flex justify-center items-center">
      <div
        className="grid gap-1 w-full"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(200px, auto))`,
        }}
      >
        {images.map(({ id, urls }) => {
          return (
            <div key={id} className="relative aspect-[150/100] overflow-hidden">
              <Image
                fill
                alt={id}
                src={urls.thumb}
                className="object-cover hover:scale-125 transition-all"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CafePage;
