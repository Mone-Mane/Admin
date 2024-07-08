import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import EChartsReactCore from "echarts-for-react/lib/core";
import { PieDataItemOption } from "echarts/types/src/chart/pie/PieSeries.js";
import WebsiteVisitorsChart from "./WebsiteVisitorsChart";
import { getAdminInfo } from "apis/admin";

type VisitorType = {
  addAmount: number;
  refundedAmount: number;
};

const WebsiteVisitors = (): ReactElement => {
  const theme = useTheme();
  const [visitorType, setVisitorType] = useState<VisitorType>({
    addAmount: 0,
    refundedAmount: 0,
  });
  const [accumulatedAmount, setAccumulatedAmount] = useState(0);
  const [nowDate, setNowDate] = useState();
  const handleGetAdmininfo = async () => {
    try {
      const response = await getAdminInfo(1);
      updateVisitorType(response.data[0]);
      setNowDate(response.data[0].date);
    } catch (error: any) {
      console.error("Error fetching admin info:", error);
    }
  };

  const updateVisitorType = (data: any) => {
    const { addAmount, refundedAmount, accumulatedAmount } = data;
    setAccumulatedAmount(accumulatedAmount);
    setVisitorType({
      addAmount: parseInt(addAmount),
      refundedAmount: parseInt(refundedAmount),
    });
  };

  const totalVisitors = visitorType.addAmount + visitorType.refundedAmount;
  const adjustedAmount = visitorType.addAmount - visitorType.refundedAmount;
  const seriesData: PieDataItemOption[] = useMemo(
    () => [
      { value: visitorType.addAmount, name: "추가된 금액" },
      { value: visitorType.refundedAmount, name: "반환된 금액" },
    ],
    [visitorType]
  );

  const legendData = [
    { name: "추가된 금액", icon: "circle" },
    { name: "반환된 금액", icon: "circle" },
  ];

  const pieChartColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
  ];

  const chartRef = useRef<EChartsReactCore | null>(null);

  const onChartLegendSelectChanged = (name: string) => {
    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.dispatchAction({
        type: "legendToggleSelect",
        name: name,
      });
    }
  };

  const toggleClicked = (name: string) => {
    // Optional: Implement toggle logic if needed
  };
  const date = new Date(nowDate);
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1을 해줘야 합니다.
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${month}-${day}`;

  useEffect(() => {
    handleGetAdmininfo();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "common.white",
        borderRadius: 5,
        height: "min-content",
        boxShadow: theme.shadows[4],
      }}
    >
      <Typography variant="subtitle1" color="text.primary" p={2.5}>
        {formattedDate} 챌린지 변동 금액
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.primary"
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: 25,
          paddingLeft: 25,
          paddingBottom: 5,
        }}
      >
        <span>총 금액:</span>
        <span style={{ color: "#008E71", fontWeight: "bold" }}>
          {Number(accumulatedAmount).toLocaleString()} 원
        </span>
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.primary"
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: 25,
          paddingLeft: 25,
        }}
      >
        <span>변동된 금액:</span>
        <span style={{ color: "#008E71", fontWeight: "bold" }}>
          {totalVisitors.toLocaleString()} 원
        </span>
      </Typography>

      <Stack direction={{ xs: "column", sm: "row", md: "column" }}>
        <Stack direction="row" justifyContent="center" flex={"1 1 0%"}>
          <WebsiteVisitorsChart
            chartRef={chartRef}
            seriesData={seriesData}
            colors={pieChartColors}
            legendData={legendData}
            sx={{
              width: 222,
              maxHeight: 222,
              mx: "auto",
            }}
          />
        </Stack>
        <Stack
          spacing={1}
          divider={<Divider />}
          sx={{ px: 2.5, py: 2.5 }}
          justifyContent="center"
          alignItems="stretch"
          flex={"1 1 0%"}
        >
          {seriesData.map((dataItem, index) => (
            <Button
              key={dataItem.name}
              variant="text"
              fullWidth
              onClick={() => {
                toggleClicked(dataItem.name);
                onChartLegendSelectChanged(dataItem.name);
              }}
              sx={{
                justifyContent: "flex-start",
                p: 0,
                borderRadius: 1,
              }}
              disableRipple
            >
              <Stack direction="row" alignItems="center" gap={1} width={1}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    bgcolor: pieChartColors[index],
                    borderRadius: 400,
                  }}
                ></Box>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  flex={1}
                  textAlign={"left"}
                >
                  {dataItem.name}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {((dataItem.value / totalVisitors) * 100).toFixed(0)}%
                </Typography>
              </Stack>
            </Button>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default WebsiteVisitors;
