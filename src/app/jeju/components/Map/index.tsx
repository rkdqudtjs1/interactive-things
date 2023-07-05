"use client";

import { geoMercator, geoPath, select } from "d3";
import axios from "axios";
import { feature, WorldAtlas } from "topojson";
import { useEffect } from "react";

const getCountires = async () => {
  const { data } = await axios.get<WorldAtlas>(
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
  );
  return feature(data, data.objects.countries);
};

const JejuMap = () => {
  useEffect(() => {
    const svg = select("#svg");
    svg.attr("width");
    svg.attr("height");

    const projection = geoMercator();
    const pathGenerator = geoPath().projection(projection);

    getCountires().then((countires) => {
      // const filteredFEatures = countires.features.filter(
      //   ({ properties }) => properties.name === "South Korea"
      // );

      svg
        .selectAll("path")
        .data(countires.features)
        .enter()
        .append("path")
        .attr("d", pathGenerator);
    });
  }, []);

  return <svg id="svg" width="1000" height="500" />;
};

export default JejuMap;
