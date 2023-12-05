import React, { useEffect, useState } from 'react';
import { Card } from '@uifabric/react-cards';
import { Text, initializeIcons } from '@fluentui/react';
import 'office-ui-fabric-react/dist/css/fabric.css';

// Container Styling
const container = {
    display: 'flex',
    justifyContent: 'center',
    margin: '10vh 0',
};

// Generic Icon Styling
const icon = {
    fontSize: 24,
    padding: 15,
    verticalAlign: 'middle',
    paddingLeft: 0,
    color: '#0078d4'
};

// Cards Styling for every element each
const styles = {
    cardStyles: {
      root: {
        background: 'white',
        padding: 20,
        borderTop: '5px solid #0078d4',
        width: '90%',
        maxWidth: '90%',
        margin: 'auto',
      }
    },
    header: {
      root: {
        fontSize: 20,
        fontWeight: 'bold',
      }
    },
    amount: {
      root: {
        fontSize: 26,
        paddingBottom: 20,
        paddingTop: 30,
      }
    },
    percentage: {
      root: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0078d4',
      }
    }
};



const CardsSection = ({data}) => {
    initializeIcons();
    // Mock data for cards with this data model
    const[policeCount, setPoliceCount] = useState(0);
    const[criminalCount, setCriminalCount] = useState(0);
    const[precinctCount, setPrecinctCount] = useState(0);
    useEffect(() => {
      setPoliceCount(data?.query1?.[0]?.totalPoliceOfficers || 0)
      setCriminalCount(data?.query2?.[0]?.totalCriminals || 0)
      setPrecinctCount(data?.query3?.[0]?.totalPrecincts || 0)
    }, [data]);
    const cards = [
      {
        title: 'Total Police',
        amount: policeCount,
        icon: 'Shield',
        // percentage: '2.3',
      },
      {
        title: 'Total Criminal',
        amount: criminalCount,
        icon: 'Sad',
        // percentage: '0.3'
      },
      {
        title: 'Total Precinct',
        amount: precinctCount,
        icon: 'EMI',
        // percentage: '1.3'
      }
    ];
    return (
        <div style={container}>
            {cards.map((card) => (
                <div className="s-Grid-col ms-sm3 ms-xl3">
                <Card styles={styles.cardStyles}>
                    <Card.Section>
                    <Card.Item>
                        <i style={icon} className={`ms-Icon ms-Icon--${card.icon}`} aria-hidden="true"></i>
                        <Text styles={styles.header}>{card.title}</Text>
                    </Card.Item>
                    <Card.Item>
                        <Text styles={styles.amount}>{card.amount}</Text>
                    </Card.Item>
                    {/* <Card.Item>
                        <Text styles={styles.percentage}>
                        {card.percentage} %
                        </Text>
                    </Card.Item> */}
                    </Card.Section>
                </Card>
                </div>
            ))}
    </div>
    );
}

export default CardsSection;