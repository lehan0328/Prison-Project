import React, { useEffect, useState } from "react";
import "office-ui-fabric-react/dist/css/fabric.css";
import axios from "axios";

const AddButton = ({setData, setLoading}) => {
  const [pname, setPName] = useState("");
  const [bnum, setBnum] = useState("");
  const [pid, setPID] = useState("");
  const [pnumber, setPNumber] = useState("");
  const [status, setStatus] = useState("");

  const [cname, setCName] = useState("");
  const [cid, setCID] = useState("");
  const [cnumber, setCNumber] = useState("");
  const [address, setAddress] = useState("");
  const [offenderstatus, setOffenderStatus] = useState("");
  const [probationstatus, setProbationStatus] = useState("");
  const [Aliases, setAliases] = useState("");

  const onOfficerAddClick = (ev) => {
    ev.preventDefault();
    const data = {
      policeOfficerData: {
        PO_Name: pname,
        Badge_num: bnum,
        Precinct_ID: pid,
        Phone: pnumber,
        Status: status,
      },
    };
    axios
      .post("http://localhost:3005/main_page/add_officer", data)
      .then((res) => console.log(res.data));
      fetchData("Police_Officer");

    setPName('')
    setBnum('')
    setPID('')
    setPNumber('')
    setStatus('')
  };

  const fetchData = async (selectedTable) => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3005/main_page/${selectedTable}}`);
      setData(response.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false)
    }
  };

  const onCriminalAddClick = (ev) => {
    ev.preventDefault();
    const data = {
      criminalIdData: {
        Name: cname,
        Criminal_ID: cid,
        Phone_num: cnumber,
        Address: address,
      },
      criminalData: {
        Criminal_ID: cid,
        Violent_Offender_Status: offenderstatus,
        Probation_Status: probationstatus,
        Aliases: Aliases,
      },
    };
    axios
      .post("http://localhost:3005/main_page/add_criminal", data)
      .then((res) => console.log(res.data));
    fetchData("Criminal_ID_Table");

    // setCName('')
    // setCID('')
    // setCNumber('')
    // setAddress('')
    // setOffenderStatus('')
    // setProbationStatus('')
    // setAliases('')
  };

  return (
    <div className="addContainer">
      <div className="addText">
        <div>Add New Officer</div>
      </div>
      <br />
      <div>
        <input
          type="text"
          placeholder="Officer Name"
          className="addBox"
          value={pname}
          onChange={(ev) => setPName(ev.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Badge Number"
          className="addBox"
          value={bnum}
          onChange={(ev) => setBnum(ev.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Precinct Id"
          className="addBox"
          value={pid}
          onChange={(ev) => setPID(ev.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Phone Number"
          className="addBox"
          value={pnumber}
          onChange={(ev) => setPNumber(ev.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Status"
          className="addBox"
          value={status}
          onChange={(ev) => setStatus(ev.target.value)}
        ></input>
        <input type="button" value={"Add"} onClick={onOfficerAddClick}></input>
      </div>

      <div className="addText">
        <div>Add New Criminal</div>
      </div>
      <br />
      <div>
        <input
          type="text"
          placeholder="Criminal_ID"
          className="addBox"
          value={cid}
          onChange={(ev) => setCID(ev.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Phone Number"
          className="addBox"
          value={cnumber}
          onChange={(ev) => setCNumber(ev.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Name"
          className="addBox"
          value={cname}
          onChange={(ev) => setCName(ev.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Address"
          className="addBox"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Violent Offender Status"
          className="addBox"
          value={offenderstatus}
          onChange={(ev) => setOffenderStatus(ev.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Probation Status"
          className="addBox"
          value={probationstatus}
          onChange={(ev) => setProbationStatus(ev.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Aliases"
          className="addBox"
          value={Aliases}
          onChange={(ev) => setAliases(ev.target.value)}
        ></input>
        <input type="button" value={"Add"} onClick={onCriminalAddClick}></input>
      </div>
    </div>
  );
};

export default AddButton;
