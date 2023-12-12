import React, { useEffect, useState } from "react";
import "office-ui-fabric-react/dist/css/fabric.css";
import axios from "axios";
const fieldMap = {
  Police_Officer: {
    PO_Name: "Officer Name",
    Badge_num: "Badge Number",
    Precinct_ID: "Precinct Id",
    Phone: "Phone Number",
    Status: "Status",
  },

  Criminal: {
    Criminal_ID: "Criminal ID",
    Violent_Offender_Status: "Violent Offender Status",
    Probation_Status: "Probation Status",
    Aliases: "Aliases",
    Phone_num: "Phone num",
    Name: "Name",
    Address: "Address",
  },
  Crime: {
    Classification: "Classification",
    Crime_ID: "Crime ID",
    Appeal_Cutoff_date: "Appeal Cutoff date",
    Appeal_Status: "Appeal Status",
    Hearing_Date: "Hearing Date",
    Crime_Codes: "Crime Codes",
    Amount_Of_Fine: "Amount Of Fine",
    Amount_Paid: "Amount Paid",
    Payment_Due_Date: "Payment Due Date",
    Charge_Status: "Charge Status",
    Date_Charged: "Date Charged",
    Amount_Left: "Amount Left",
  },
  Appeal: {
    Crime_ID: "Crime ID",
    Appeal_Hearing_Date: "Appeal Hearing Date",
    Appeal_Filing_Date: "Appeal Filing Date",
    Status: "Status",
  },
  Arresting_Officers: {
    Crime_ID: "Crime ID",
    Badge_Num: "Badge Num",
  },
  Cause: {
    Criminal_ID: "Criminal ID",
    Crime_ID: "Crime ID",
  },
  Crime_Incident: {
    Crime_ID: "Crime ID",
    Classification: "Classification",
    Crime_Code: "Crime Code",
    Arresting_Officers: "Arresting Officers",
  },
  Criminal_ID_Table: {
    Criminal_ID: "Criminal ID",
    Violent_Offender_Status: "Violent Offender Status",
    Probation_Status: "Probation Status",
    Aliases: "Aliases",
    Phone_num: "Phone num",
    Name: "Name",
    Address: "Address",
  },
  Precinct: {
    Precinct_ID: "Precinct ID",
    Precinct_Name: "Precinct Name",
    PoliceCount: "PoliceCount",
  },
  Sentencing: {
    Sentencing_ID: "Sentencing ID",
    Start_Date: "Start Date",
    End_Date: "End Date",
    Type_of_Sentencing: "Type of Sentencing",
    Num_Of_Violations: "Num Of Violations",
    Criminal_ID: "Criminal ID",
    S_Type_ID: "S Type ID",
  },
  Type_Of_Sentencing: {
    S_Type_ID: "S Type ID",
    S_Type_Description: "S Type Description",
  },
};

const AddButton = ({ setData, setLoading, selectedTable }) => {
  const fetchData = async (selectedTable) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3005/main_page/${selectedTable}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const fields = fieldMap[selectedTable];

  const [formData, setFormData] = useState(() => {
    const initialData = {};
    Object.keys(fields).forEach((key) => {
      initialData[key] = "";
    });
    return initialData;
  });

  const handleChange = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const onAddClick = (ev) => {
    ev.preventDefault();
    const data = {
      data: formData,
      tableName: selectedTable,
    };
    if (selectedTable == "Criminal" || selectedTable == "Criminal_ID_Table") {
      axios
        .post("http://localhost:3005/main_page/add_criminal", data)
        .then((res) => console.log(res.data));
    } else if (selectedTable == "Police_Officer") {
      axios
        .post("http://localhost:3005/main_page/add_officer", data)
        .then((res) => console.log(res.data));
    } else {
      axios
        .post(`http://localhost:3005/main_page/add_data`, data)
        .then((res) => console.log(res.data));
    }
    fetchData(selectedTable);
    // // Reset form data
    // setFormData(() => {
    //   const resetData = {};
    //   Object.keys(fields).forEach((key) => {
    //     resetData[key] = '';
    //   });
    //   return resetData;
    // });
  };

  return (
    <div className="addContainer">
      <div className="addText">
        <div>{`Add New ${selectedTable.replace("_", " ")}`}</div>
      </div>
      <br />
      <div>
        {Object.entries(fields).map(([key, placeholder]) => (
          <input
            key={key}
            type="text"
            placeholder={placeholder}
            className="addBox"
            value={formData[key]}
            onChange={(ev) => handleChange(key, ev.target.value)}
          />
        ))}
        <input type="button" value="Add" onClick={onAddClick} />
      </div>
    </div>
  );
};

export default AddButton;
