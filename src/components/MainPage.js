import React, { useEffect, useState, CSSProperties } from 'react';
import Navigation from './navigation';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import CardsSection from './CardSection';
import OperationTable from './OperationTable';
import AddButton from './AddButton';
import axios from 'axios';
import DeleteButton from './DeleteButton';
import ClipLoader from "react-spinners/ClipLoader";

const determineOperation = (operation) => {
  switch (operation) {
    case "add":
      return(
        <div>
        <AddButton/>
        </div>
      )
      break;
    case "delete":
      return (
        <div>
        <DeleteButton/>
        </div>
      )
      break;
  }
}

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

    const onTableChange = (event, item) => {
      setSelectedTable(item.key);
    };
    return (
      loading?
      (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ClipLoader
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
      />
      </div>
      )
      :
     (<div className="ms-Grid" dir="ltr">
      <div className="md-Grid-row">
        <div className="ms-Grid-col ms-sm1 ms-xl1">
          <Navigation setOperation={setOperation} />
        </div>
        <div className="main-element ms-Grid-col ms-sm11 ms-xl11">
          <div className="ms-Grid-row">
            <CardsSection data={data} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Dropdown
              placeholder="Select a table"
              options={tableOptions}
              selectedKey={selectedTable}
              onChange={onTableChange}
              styles={{ root: { width: `800px` } }}
            />
          </div>
          <div className="ms-Grid-row" style={{marginBottom: '50px'}}>
            <OperationTable data={data} />
          </div>
          <div className="ms-Grid-row">
            {determineOperation(operation)}
          </div>
        </div>
      </div>
    </div>)
  );
};

export default MainPage;