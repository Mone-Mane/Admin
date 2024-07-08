import { ReactElement, useEffect, useState } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { GridApi, useGridApiRef } from "@mui/x-data-grid";

import ReactApexChart from "react-apexcharts";
import { getGenderCategory } from "apis/admin";

const BarChart = ({ data }) => {
  const categories = data.map((item) => item.challengeCategory);
  const maleData = data.map((item) => item.Male);
  const femaleData = data.map((item) => item.Female);

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      title: {
        text: "Count",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " times";
        },
      },
    },
  };

  const series = [
    {
      name: "남성",
      data: maleData,
    },
    {
      name: "여성",
      data: femaleData,
    },
  ];

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

const TopSellingProduct = (): ReactElement => {
  const [data, setData] = useState([]);

  const handleGetGenderCategory = async () => {
    try {
      const response = await getGenderCategory();
      const processedData = response.data.reduce(
        (acc, { count, userGender, challengeCategory }) => {
          if (!acc[challengeCategory]) {
            acc[challengeCategory] = { Male: 0, Female: 0 };
          }
          acc[challengeCategory][userGender] += count;
          return acc;
        },
        {}
      );

      const result = Object.keys(processedData).map((category) => ({
        challengeCategory: category,
        Male: processedData[category].Male,
        Female: processedData[category].Female,
      }));
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetGenderCategory();
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
          챌린지별 성별 분포
        </Typography>
      </Stack>
      <Divider />
      <Stack height={1}>
        <BarChart data={data} />
      </Stack>
    </Stack>
  );
};

export default TopSellingProduct;
