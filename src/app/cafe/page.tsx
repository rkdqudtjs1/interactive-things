import { getImages } from "@/utils/image.util";
import Image from "next/image";

const CafePage = async () => {
  const imageNamespace = "paris";
  const images = await getImages(imageNamespace);

  return (
    <div className="flex justify-center items-center">
      <div
        className="grid gap-1 w-full"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(200px, auto))`,
        }}
      >
        {images.map((image) => {
          return (
            <div
              key={image}
              className="relative aspect-[150/100] overflow-hidden"
            >
              <Image
                fill
                alt={image}
                src={`/images/${imageNamespace}/thumb/${image}`}
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
