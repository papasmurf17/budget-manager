import React from 'react';
import Heading from '@welld/react-components/lib/Heading';
import Text from '@welld/react-components/lib/Text';

import './App.css';

import Views from '../../views';
import Footer from '../Footer';
import LoggedUser from '../LoggedUser';

const App = () => (
  <div className='app h-screen flex flex-col'>
    <div className='px-10 py-4 border-b border-grey-light fixed top-0 w-full z-50 shadow'>
      <div className='flex items-center h-12'>
        <Heading size='h3' className='flex-1 text-3xl'>
          <Text weight='bold' component='span'>Budget </Text>
          Manager
        </Heading>
        <LoggedUser />
      </div>
    </div>
    <div className='flex-1 p-10 page-container mt-12'>
      <Views />
    </div>
    <Footer />
  </div>
);

export default App;
