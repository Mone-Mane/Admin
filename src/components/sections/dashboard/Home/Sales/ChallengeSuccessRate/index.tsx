import { ReactElement, useEffect, useState } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { getRatioCategory } from "apis/admin";
import ReactApexChart from "react-apexcharts";

const ProgressCharts = ({ data }) => {
  useEffect(() => {
    if (data?.length > 0) {
      renderCharts();
    }
  }, [data]);

  const renderCharts = () => {
    return data.map((item, index) => {
      const chartId = `progress${index + 1}`;
      const chartOptions = {
        chart: {
          height: 70,
          type: "bar",
          stacked: true,
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "20%",
            colors: {
              backgroundBarColors: ["#f0f0f0"],
            },
          },
        },
        stroke: {
          width: 0,
        },
        series: [
          {
            name: `Process ${index + 1}`,
            data: [item.ratio], // Use ratio data for the current process
          },
        ],
        title: {
          floating: true,
          offsetX: -10,
          offsetY: 5,
          text: item.challengeCategory, // Use challenge category as the title for the current process
        },
        subtitle: {
          floating: true,
          align: "right",
          offsetY: 0,
          text: `${item.ratio.toFixed(1)}%`, // Display ratio percentage for the current process
          style: {
            fontSize: "20px",
          },
        },
        tooltip: {
          enabled: false,
        },
        fill: {
          type: "gradient",
          gradient: {
            inverseColors: false,
            gradientToColors: ["#6078ea"],
          },
        },
        xaxis: {
          categories: [item.challengeCategory], // Use challenge category for x-axis labels
        },
        yaxis: {
          max: 100,
        },
      };

      return (
        <div key={index} id={chartId}>
          <ReactApexChart
            options={chartOptions}
            series={chartOptions.series}
            type="bar"
            height={70}
          />
        </div>
      );
    });
  };

  return <div>{renderCharts()}</div>;
};

const ChallengeSuccessRate = () => {
  const [data, setData] = useState([]);

  const handleGetRatioCategory = async () => {
    try {
      const response = await getRatioCategory();
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetRatioCategory();
  }, []);

  return (
    <Stack
      bgcolor="background.paper"
      borderRadius={5}
      width={1}
      boxShadow={(theme) => theme.shadows[4]}
      height={1}
    >
      <Stack
        direction={{ sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        padding={3.75}
        gap={3.75}
      >
        <Typography variant="h5" color="text.primary">
          챌린지별 성공률
        </Typography>
      </Stack>
      <Divider />
      <Stack height={1} style={{ padding: 20 }}>
        <ProgressCharts data={data} />
      </Stack>
    </Stack>
  );
};

export default ChallengeSuccessRate;
