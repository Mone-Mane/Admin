import { ReactElement, useEffect, useRef, useState } from "react";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import EChartsReactCore from "echarts-for-react/lib/core";
import RevenueChart from "./RevenueChart";
import { LineSeriesOption } from "echarts";
import { getAdminInfo } from "apis/admin";

const Revenue = (): ReactElement => {
  const theme = useTheme();
  const chartRef = useRef<EChartsReactCore | null>(null);
  const [dataList, setDataList] = useState<[]>([]);
  const lineChartColors = [
    theme.palette.secondary.main,
    theme.palette.primary.main,
  ];

  const handleGetAdmininfo = async () => {
    try {
      const response = await getAdminInfo(10);
      console.log(response.data);
      setDataList(response.data.reverse());
    } catch (error: any) {}
  };

  useEffect(() => {
    handleGetAdmininfo();
  }, []);

  const seriesData: LineSeriesOption[] = [
    {
      id: 1,
      data: [65, 210, 175, 140, 105, 20, 120, 20],
      type: "line",
      smooth: true,
      legendHoverLink: true,
      showSymbol: true,
      symbolSize: 12,
      lineStyle: {
        width: 5,
      },
    },
  ];

  const onChartLegendSelectChanged = (name: string) => {
    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.dispatchAction({
        type: "legendToggleSelect",
        name: name,
      });
    }
  };

  const [revenueAdType, setRevenueAdType] = useState<any>({
    "Google ads": false,
    "Facebook ads": false,
  });

  const toggleClicked = (name: string) => {
    setRevenueAdType((prevState: any) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <Stack
      bgcolor="common.white"
      borderRadius={5}
      minHeight={460}
      height={1}
      mx="auto"
      boxShadow={theme.shadows[4]}
    >
      <Stack
        direction={{ sm: "row" }}
        justifyContent={{ sm: "space-between" }}
        alignItems={{ sm: "center" }}
        gap={2}
        padding={3.75}
      >
        <Typography variant="h5" color="text.primary">
          챌린지 누적 금액
        </Typography>
      </Stack>
      <Box flex={1}>
        <RevenueChart
          chartRef={chartRef}
          sx={{ minHeight: 1 }}
          dataList={dataList}
          // seriesData={seriesData}

          colors={lineChartColors}
        />
      </Box>
    </Stack>
  );
};

export default Revenue;
