import React from "react";

import { Chart } from "react-google-charts";

const PieChart = ({ data }) => {
  const dataSource = [["Records", "number"]];

  dataSource.push(["Confirmed", data.confirmed]);
  dataSource.push(["Recovered", data.recovered]);
  dataSource.push(["Critical", data.critical]);
  dataSource.push(["Deaths", data.deaths]);

  return (
    <div style={{padding:"80px"}}>
      <Chart
        width={"100%"}
        height={"100%"}
        chartType="PieChart"
        data={dataSource}
        options={{
          title: "COVID-19 Data India",
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

export default PieChart;
