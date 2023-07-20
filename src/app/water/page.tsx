import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Water",
  description: "Water flow effect with SVG",
};

const WaterPage = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div
        className="absolute bg-cover bg-center bg-no-repeat"
        style={{
          top: "-16px",
          left: "-16px",
          width: "calc(100% + 16px)",
          height: "calc(100% + 16px)",
          filter: "url(#turbulence)",
          backgroundImage: `url(/images/water/sea.jpg)`,
        }}
      />
      <svg>
        <filter id="turbulence" x="0" y="0" width="100%" height="100%">
          <feTurbulence id="water-filter" numOctaves={4} />
          <feDisplacementMap scale="20" in="SourceGraphic" />
          <animate
            xlinkHref="#water-filter"
            attributeName="baseFrequency"
            dur="30s"
            keyTimes="0; 1"
            values="0.03; 0.06;"
            repeatCount="indefinite"
          />
        </filter>
      </svg>
    </div>
  );
};

export default WaterPage;

// feTurbulence;
