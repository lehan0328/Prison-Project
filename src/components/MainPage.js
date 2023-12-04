import React, { useEffect, useState } from 'react';
import Navigation from './navigation';
import CardsSection from './CardSection';
import OperationTable from './OperationTable';
import AddButton from './AddButton';
import axios from 'axios';
import DeleteButton from './DeleteButton';
import UpdateButton from './UpdateButton';
import SearchBar from './SearchBar';


// Table View Component
const MainPage = () => {
    const[data, setData] = useState([]);
    const[query, setQuery] = useState("");
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3005/main_page');
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
    return (
    <div className="ms-Grid" dir="ltr">
        <div className="md-Grid-row">
            {/* <div className="ms-Grid-col ms-sm1 ms-xl1">
            <Navigation />
            </div> */}
            <div className="main-element ms-Grid-col ms-sm11 ms-xl11">
            <div className="ms-Grid-row">
                <CardsSection data={data}/>
            </div>
            <div className="ms-Grd-row">
                <SearchBar/>
            </div>
            <div className="ms-Grid-row">
              //  <OperationTable data={data}/>
            </div>
            <div className="ms-Grid-row">
                  <UpdateButton/>
            </div>
            </div>
        </div>
        </div>
    );
  };

export default MainPage;