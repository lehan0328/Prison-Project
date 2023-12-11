import React, { useEffect, useState } from 'react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import axios from 'axios';

const DeleteButton = ({setData, setLoading}) =>{
    const [bnum, setBnum] = useState('');
    const [cid, setCID] = useState('');

    const fetchData = async (selectedTable) => {
        try {
          setLoading(true)
          setLoading(true)
          const response = await axios.get(`http://localhost:3005/main_page/${selectedTable}}`);
          setData(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
    const onOfficerDeleteButton = (ev) => {
        ev.preventDefault();
        axios.delete(`http://localhost:3005/main_page/deletePoliceOfficer/${bnum}`);
        fetchData("Police_Officer");
    }

    const onCriminalDeleteButton = (ev) => {
        ev.preventDefault();
        axios.delete(`http://localhost:3005/main_page/deleteCriminal/${cid}`);
        fetchData("Criminal_ID_Table");
    }


    return(
        <div>
            <div className='deleteContainer'>
                <div className = 'addText'>
                    <div>Delete Police Officer</div>
                </div>
                <br />
                <div>
                    <input
                        type='text'
                        placeholder='Badge Number'
                        className = 'addBox'
                        value = {bnum}
                        onChange={ev => setBnum(ev.target.value)}
                    ></input>
                    <input
                        type='button'
                        value = {'Delete'}
                        onClick={onOfficerDeleteButton}
                    ></input>
                </div>
            </div>
            <div className='deleteContainer'>
                <div className = 'addText'>
                    <div>Delete Criminal</div>
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Criminal_ID'
                        className = 'addBox'
                        value = {cid}
                        onChange={ev => setCID(ev.target.value)}
                    ></input>
                    <input
                        type='button'
                        value = {'Delete'}
                        onClick={onCriminalDeleteButton}
                    ></input>
                </div>
            </div>
        </div>
    );
}

export default DeleteButton