import React, { useEffect, useState } from 'react';
import { DetailsList } from '@fluentui/react';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import 'office-ui-fabric-react/dist/css/fabric.css';

// Margin of Table Styling
const classNames = mergeStyleSets({
    table: {
      margin: 'auto',
    }
  });

// Table View Component
const OperationsTable = ({data}) => {
  const[tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  console.log(data)
  useEffect(() => {
    if(data && data.query4){
      const columns = Object.keys(data.query4[0] || {}).map((key) => ({
        key,
        name: key,
        fieldName: key,
        minWidth: 100,
        maxWidth: 300,
        isResizable: true,
      }));

      setColumns(columns);
      setTableData(data.query4);
    }
  }, [data]);
  // const columns = tableData;
    return (
      <div data-is-scrollable={true}>
        <div className={`s-Grid-col ms-sm9 ms-xl9 ${classNames.table}`}>
          <DetailsList
            items={tableData}
            columns={columns}
            selectionMode={0}
          />
        </div>
      </div>
    );
  };

  export default OperationsTable;