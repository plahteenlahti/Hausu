import React from "react";
import Svg, { Path } from "react-native-svg";
import d3 from "d3";

type EuriborData = {
  "1M": Record<string, string>
}

type Props = {
  data: 
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};

const LineChart = ({
  data,
  width,
  height,
  margin = { top: 20, right: 20, bottom: 20, left: 20 }
}: Props) => {
  const x = d3
    .scaleTime()
    .domain([new Date(data[0].date), new Date(data[data.length - 1].date)])
    .range([margin.left, width - margin.right]);
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([height - margin.bottom, margin.top]);

  const line = d3
    .line()
    .x((d) => x(new Date(d.date)))
    .y((d) => y(d.value))
    .curve(d3.curveBasis)(data);

  return (
    <Svg
      width={width}
      height={height}
    >
      <Path
        d={line}
        fill="none"
        stroke="blue"
        strokeWidth={3}
      />
    </Svg>
  );
};

export default LineChart;
