import React, { useEffect, useState, CSSProperties } from 'react';
import Navigation from './navigation';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import CardsSection from './CardSection';
import OperationTable from './OperationTable';
import AddButton from './AddButton';
import axios from 'axios';
import DeleteButton from './DeleteButton';
import ClipLoader from "react-spinners/ClipLoader";
import UpdateButton from './UpdateButton';
import SearchBar from './SearchBar';


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

// Table View Component
const MainPage = () => {

    const [data, setData] = useState([]);
    const [operation, setOperation] = useState("add");
    const [selectedTable, setSelectedTable] = useState("Crime");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true)
          const response = await axios.get(`http://localhost:3005/main_page/${selectedTable}`);
          setData(response.data);
          setLoading(false)
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false)
        }
      };
      fetchData();
    }, [selectedTable]);

    const exportClick = () => {
      axios.put("http://localhost:3005/main_page/export")
      .then((res) => console.log(res.data));
    }

    const tableOptions = [
      { key: 'Crime', text: 'Crime' },
      { key: 'Criminal', text: 'Criminal' },
      { key: 'Criminal_ID_Table', text: 'Criminal Id' },
      { key: 'Appeal', text: 'Appeal' },
      { key: 'Arresting_Officers', text: 'Arresting Officers' },
      { key: 'Cause', text: 'Cause' },
      { key: 'Crime_Incident', text: 'Crime Incident' },
      { key: 'Police_Officer', text: 'Police Officer' },
      { key: 'Precinct', text: 'Precinct' },
      { key: 'Sentencing', text: 'Sentencing' },
      { key: 'Type_Of_Sentencing', text: 'Type Of Sentencing' },
      { key: 'Criminal', text: 'Criminal' },
    ];

    const determineOperation = (operation) => {
      switch (operation) {
        case "add":
          return(
            <div>
            <AddButton setData={setData} setLoading={setLoading}/>
            </div>
          )
          break;
        case "delete":
          return (
            <div>
            <DeleteButton setData={setData} setLoading={setLoading}/>
            </div>
          )
          break;
        case "update":
            return (
              <div>
              <UpdateButton setData={setData} setLoading={setLoading}/>
              </div>
            )
            break;
        case "search":
          return (
            <div>
            <SearchBar setData={setData} setLoading={setLoading}/>
            </div>
            <div className="ms-Grid-row">
              <OperationTable data={data}/>
            </div>
            <div className="ms-Grid-row">
                  <UpdateButton/>
            </div>
            </div>
        </div>
      </div>
    </div>)
  );
};

export default MainPage;