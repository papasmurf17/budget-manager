import React from 'react';
import Heading from '@welld/react-components/lib/Heading';
import Text from '@welld/react-components/lib/Text';

import './App.scss';

import Views from '../../views';
import LoggedUser from '../LoggedUser';

const App = () => (
  <div className='app h-screen flex flex-col'>
    <div className='flex border-b border-grey-light px-10 py-4 items-center'>
      <Heading size='h3' className='flex-1'>
        <Text weight='bold' component='span'>Budget</Text>
        Manager
      </Heading>
      <LoggedUser />
    </div>
    <div className='flex-1 p-10 page-container'>
      <Views />
    </div>
  </div>
);

export default App;
