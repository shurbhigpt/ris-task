import React, { useEffect, useState } from "react";
import PieChart from "../widgets/PieChart";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./PageOne";

const PageTwo = () => {
  const history = useHistory();

  const [data, setData] = useState([]);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://covid19-api.com/country",
          {
            params: {
              name: "india",
              format: "json",
            },
            cancelToken: source.token,
          },

        );
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("AxiosCancel: caught cancel");
        } else {
          throw error;
        }
      }
    };
    getData();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div>
      <div className="right floated content">
        <button
          className="ui button primary f-r"
          onClick={() => history.push("/")}
        >
          Go to Page 1
        </button>
      </div>
      <div>
        {data.length ? (
          <PieChart data={data[0]} />
        ) : (
          <div className="loader"></div>
        )}
      </div>
    </div>
  );
};

export default PageTwo;
