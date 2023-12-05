import React, { useEffect, useState } from 'react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import axios from 'axios';
import OperationTable from './OperationTable';


const SearchBar = () =>{
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const onSearchClick=() => {
        axios.post(`http://localhost:3005/main_page/searchCriminal/${search}`)
        .then(res  => res? setData(res.data.criminals):null);
    }
    // useEffect(() => {
    //     console.log(data)
    //   }, [data]);

    const displayTable = () => {
        if(data){
            const processedData = {query4:data}
            return(
                <div className="ms-Grid-row" style={{marginBottom: '50px'}}>
                <OperationTable data={processedData} />
                </div>
            )
        }
    }
    return(
        <div className="ms-Grid" dir="ltr">
        <div className='searchContainer'>
            <input
                    type='text'
                    placeholder='Search by criminal name'
                    className = 'searchBox'
                    value={search}
                    onChange={ev => setSearch(ev.target.value)}
            ></input>
            <input
                type='button'
                value={'Search'}
                onClick={onSearchClick}
            ></input>
        </div>
        {displayTable()}
      </div>
    );
};

export default SearchBar