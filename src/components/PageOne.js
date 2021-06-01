import React, { useEffect, useState } from "react";
import "./PageOne.css";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const PageOne = () => {
  const history = useHistory()
  const [usersData, setUsersData] = useState([]);
  
  useEffect(() => {
    let source = axios.CancelToken.source();
    const getUsersData = async () => {
      try {
        const response = await axios.get("https://gorest.co.in/public-api/users", {
          cancelToken: source.token
        });
        console.log("AxiosCancel: got response");
        setUsersData(response.data.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("AxiosCancel: caught cancel");
        } else {
          throw error;
        }
      }
    };
    getUsersData();
     return () => {
      console.log("AxiosCancel: unmounting");
      source.cancel();
    };
  }, []);

  return (
    <>
      <div className="right floated content">
        <button className="ui button primary f-r" onClick= {()=> history.push('/pageTwo')}>Go to Page 2</button>
      </div>
      <div>
        {usersData.length ? (
          <table className="ui celled table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((each) => (
                <tr key={each.id}>
                  <td data-label="Name">{each.name}</td>
                  <td data-label="Email">{each.email}</td>
                  <td data-label="Gender">{each.gender}</td>
                  <td data-label="Status">{each.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
         <div className='loader'></div>
        )}
      </div>
    </>
  );
};

export default PageOne;
