import React, { useEffect, useState } from 'react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import axios from 'axios';

const UpdateButton = ({setData, setLoading}) =>{
    const [pname, setPName] = useState('');
    const [bnum, setBnum] = useState('');
    const [pid, setPID] = useState('');
    const [pnumber, setPNumber] = useState('');
    const [status, setStatus] = useState('');

    const [cname, setCName] = useState('');
    const [cid, setCID] = useState('');
    const [cnumber, setCNumber] = useState('');
    const [address, setAddress] = useState('');
    const [offenderstatus, setOffenderStatus] = useState('');
    const [probationstatus, setProbationStatus] = useState('');
    const [Aliases, setAliases] = useState('');
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
    const onOfficerUpdateClick = (ev) => {
        ev.preventDefault()
        const data = {updatedPoliceOfficerData:{PO_Name: pname, Badge_num: bnum, Precinct_ID: pid, Phone: pnumber, Status: status}}
        axios.put(`http://localhost:3005/main_page/update_police_officer/${bnum}`, data)
        fetchData("Police_Officer");
        //setPName('')
        //setBnum('')
        //setPID('')
        //setPNumber('')
        //setStatus('')
    }

    const onCriminalUpdateClick = (ev) => {
        ev.preventDefault()
        const data = {updatedCriminalIdData: {
            Name: cname,
            Criminal_ID: cid,
            Phone_num: cnumber,
            Address: address,
          },
          updatedCriminalData: {
            Criminal_ID: cid,
            Violent_Offender_Status: offenderstatus,
            Probation_Status: probationstatus,
            Aliases: Aliases,
          }}
        //console.log(data)
        axios.put(`http://localhost:3005/main_page/update_criminal/${cid}`, data)
        fetchData("Criminal_ID_Table");
        //setCName('')
        //setCID('')
        //setCNumber('')
        //setAddress('')
        //setOffenderStatus('')
        //setProbationStatus('')
        //setAliases('')
    }

    return(
        <div className='addContainer'>
            <div className = 'addText'>
                <div>Update Officer</div>
            </div>
            <br />
            <div>
                <input
                    type='text'
                    placeholder='Officer Name'
                    className = 'addBox'
                    value = {pname}
                    onChange={ev => setPName(ev.target.value)}
                ></input>
                <input
                    type='text'
                    placeholder='Badge Number'
                    className = 'addBoxMustFillOut'
                    value = {bnum}
                    onChange={ev => setBnum(ev.target.value)}
                ></input>
                <input
                    type='text'
                    placeholder='Precinct Id'
                    className = 'addBox'
                    value = {pid}
                    onChange={ev => setPID(ev.target.value)}
                ></input>
                <input type='text'
                    placeholder='Phone Number'
                    className = 'addBox'
                    value = {pnumber}
                    onChange={ev => setPNumber(ev.target.value)}
                ></input>
                <input
                    type='text'
                    placeholder='Status'
                    className = 'addBox'
                    value = {status}
                    onChange={ev => setStatus(ev.target.value)}
                ></input>
                <input
                    type='button'
                    value = {'Update'}
                    onClick={onOfficerUpdateClick}
                ></input>
            </div>

            <div className = 'addText'>
                <div>Update Criminal</div>
            </div>
            <br />
            <div>
                <input
                    type='text'
                    placeholder='Criminal_ID'
                    className = 'addBoxMustFillOut'
                    value = {cid}
                    onChange={ev => setCID(ev.target.value)}
                ></input>
                <input
                    type='text'
                    placeholder='Phone Number'
                    className = 'addBox'
                    value = {cnumber}
                    onChange={ev => setCNumber(ev.target.value)}
                ></input>
                <input
                    type='text'
                    placeholder='Name'
                    className = 'addBox'
                    value = {cname}
                    onChange={ev => setCName(ev.target.value)}
                ></input>
                                <input
                    type='text'
                    placeholder='Address'
                    className = 'addBox'
                    value = {address}
                    onChange={ev => setAddress(ev.target.value)}
                ></input>
                <input
                    type='text'
                    placeholder='V.O. Status'
                    className = 'addBox'
                    value = {offenderstatus}
                    onChange={ev => setOffenderStatus(ev.target.value)}
                ></input>
                <input
                    type='text'
                    placeholder='Probation Status'
                    className = 'addBox'
                    value = {probationstatus}
                    onChange={ev => setProbationStatus(ev.target.value)}
                ></input>
                <input
                    type='text'
                    placeholder='Aliases'
                    className = 'addBox'
                    value = {Aliases}
                    onChange={ev => setAliases(ev.target.value)}
                ></input>
                <input
                    type='button'
                    value = {'Update'}
                    onClick={onCriminalUpdateClick}
                ></input>
            </div>
        </div>

    );
};

export default UpdateButton