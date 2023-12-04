import React, { useEffect, useState } from 'react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import axios from 'axios';

const SearchBar = () =>{

    const [cname, setCName] = useState('');


    return(
        <div className='addContainer'>
            <input
                    type='text'
                    placeholder=''
                    className = 'searchBox'
                    //onChange={ev => setBnum(ev.target.value)}
            ></input>
        </div>
        
    );
};

export default SearchBar