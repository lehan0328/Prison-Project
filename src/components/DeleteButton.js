import React, { useEffect, useState } from 'react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import axios from 'axios';

const DeleteButton = () =>{
    const [bnum, setBnum] = useState('');
    const [cid, setCID] = useState('');

    const onOfficerDeleteButton = (ev) => {
        ev.preventDefault()
        axios.delete(`http://localhost:3005/main_page/deletePoliceOfficer/${bnum}`)
    }

    const onCriminalDeleteButton = (ev) => {
        ev.preventDefault()
        axios.delete(`http://localhost:3005/main_page/deleteCriminal/${cid}`)
    }

    return(
        <div>
            <div className='addContainer'>
                <div className = 'addText'>
                    <div>Delete Police Officer</div>
                </div>
                <br />
                <div>
                    <input
                        type='text'
                        placeholder='Enter Badge Number'
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
            <div className='addContainer'>
                <div className = 'addText'>
                    <div>Delete Criminal</div>
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Enter Criminal_ID'
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