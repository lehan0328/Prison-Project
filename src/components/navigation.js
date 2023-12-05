import React from 'react';
import { Nav, initializeIcons } from '@fluentui/react';


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

const Navigation = ({setOperation}) => {
    initializeIcons();
    const links = [
      {
        links: [
          {
            name: 'Add',
            key: 'key2',
            // url: '/',
            onClick: () => setOperation("add"),
            iconProps: {
              iconName: 'AddFriend',
              styles: {
                root: {
                  fontSize: 20,
                  color: '#106ebe',
                },
              }
            }
          },
          {
            name: 'Delete',
            key: 'key3',
            // url: '/',
            onClick: () => setOperation("delete"),
            iconProps: {
              iconName: 'UserRemove',
              styles: {
                root: {
                  fontSize: 20,
                  color: '#106ebe',
                },
              }
            }
          },
          {
            name: 'Update',
            key: 'key3',
            // url: '/',
            onClick: () => setOperation("update"),
            iconProps: {
              iconName: 'UserSync',
              styles: {
                root: {
                  fontSize: 20,
                  color: '#106ebe',
                },
              }
            }
          },
          {
            name: 'Search',
            key: 'key3',
            // url: '/',
            onClick: () => setOperation("search"),
            iconProps: {
              iconName: 'ProfileSearch',
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
    return (
        <Nav
        groups={links}
        selectedKey="key1"
        styles={navigationStyles}
        />
    )
}

export default Navigation;