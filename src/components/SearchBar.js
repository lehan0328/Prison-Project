import React, { useEffect, useState } from 'react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import axios from 'axios';

const SearchBar = () =>{

    const [search, setSearch] = useState('');

    const onSearchClick=() => {
        setSearch('')
    }

    return(
        <div className='searchContainer'>
            <input
                    type='text'
                    placeholder=''
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
    );
};

export default SearchBar