import { SxProps, useTheme } from "@mui/material";
import ReactEchart from "components/base/ReactEchart";
import * as echarts from "echarts";
import EChartsReactCore from "echarts-for-react/lib/core";
import { LineSeriesOption } from "echarts";
import { useMemo } from "react";
import { EChartsOption } from "echarts-for-react";

type RevenueChartProps = {
  chartRef: React.MutableRefObject<EChartsReactCore | null>;
  dataList?: any[]; // dataList 추가
  colors?: string[];
  sx?: SxProps;
};

const RevenueChart = ({
  chartRef,
  dataList,
  colors,
  ...rest
}: RevenueChartProps) => {
  const theme = useTheme();

  // dataList에서 accumulatedAmount 값만 추출하여 seriesData로 변환
  const seriesData: LineSeriesOption[] = useMemo(() => {
    if (!dataList) return [];

    return [
      {
        data: dataList.map((item) => parseInt(item.accumulatedAmount)), // accumulatedAmount를 정수로 변환하여 사용
        type: "line",
        smooth: true,
        lineStyle: {
          width: 5,
        },
      },
    ];
  }, [dataList]);

  const option: EChartsOption = useMemo(
    () => ({
      xAxis: {
        type: "category",
        data: dataList ? dataList.map((item) => item.date.slice(5, 10)) : [],
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: theme.palette.divider,
            width: 1,
            type: "dashed",
          },
        },
        axisLabel: {
          show: true,
          padding: 30,
          color: theme.palette.text.secondary,
          formatter: (value: any) => value,
          // formatter: (value: any) => value.slice(0, 3),
          fontFamily: theme.typography.body2.fontFamily,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        max: 18200000,
        min: 17700000,
        // splitNumber: 3,
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: theme.palette.text.secondary,
          align: "center",
          padding: [0, 20, 0, 0],

          formatter: (value: any) => formatNumber(value),
          fontFamily: theme.typography.body2.fontFamily,
        },
        splitLine: {
          interval: 5,
          lineStyle: {
            color: theme.palette.divider,
            width: 1,
            type: "dashed",
          },
        },
      },
      grid: {
        left: 60,
        right: 30,
        top: 30,
        bottom: 90,
      },
      tooltip: {
        show: true,
        trigger: "axis",
        formatter: (params: any) => {
          const value = params[0].value;
          return `${value.toLocaleString()}원`; // 숫자를 통화 형식으로 표시
        },
      },
      series: seriesData,
    }),
    [theme, seriesData, dataList]
  );

  return (
    <ReactEchart ref={chartRef} echarts={echarts} option={option} {...rest} />
  );
};
function formatNumber(num) {
  // 숫자를 문자열로 변환하여 길이를 구합니다.
  let numStr = num.toString();
  let len = numStr.length;

  // 길이에 따라 만 단위로 표시하는 방법을 선택합니다.
  if (len <= 4) {
    // 4자리 이하인 경우 그대로 반환합니다.
    return numStr;
  } else {
    // 5자리 이상인 경우 만 단위로 표시합니다.
    let unit = "만"; // 단위 설정 (만, 억 등)
    let result = numStr.substring(0, len - 4); // 처음부터 만 단위 직전까지 자릅니다.
    let remainder = numStr.substring(len - 4, len); // 만 단위 이후의 부분을 가져옵니다.

    // 만 단위 이후의 부분이 0000이 아니면 함께 표시합니다.
    if (remainder !== "0000") {
      result += "," + remainder;
    }
    result += unit;
    return result;
  }
}

export default RevenueChart;
