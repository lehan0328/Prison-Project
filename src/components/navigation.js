import React from 'react';
import { Nav, initializeIcons } from '@fluentui/react';

const links = [
    {
      links: [
        {
          name: 'Dashboard',
          key:'key1',
          url: '/',
          iconProps: {
            iconName: 'News',
            styles: {
              root: {
                fontSize: 20,
                color: '#106ebe',
              },
            }
          }
        },
        {
          name: 'Projects',
          key: 'key2',
          url: '/',
          iconProps: {
            iconName: 'EventToDoLogo',
            styles: {
              root: {
                fontSize: 20,
                color: '#106ebe',
              },
            }
          }
        },
        {
          name: 'Settings',
          key: 'key3',
          url: '/',
          iconProps: {
            iconName: 'PlayerSettings',
            styles: {
              root: {
                fontSize: 20,
                color: '#106ebe',
              },
            }
          }
        },
      ],
    },
  ];

// Styling for Navigation bar
const navigationStyles = {
  root: {
    height: '100vh',
    width: '180px',
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
    paddingTop: '8vh',
  },
};

const Navigation = () => {
    initializeIcons();
    return (
        <Nav 
        groups={links}
        selectedKey="key1"
        styles={navigationStyles}
        />
    )
}

export default Navigation;