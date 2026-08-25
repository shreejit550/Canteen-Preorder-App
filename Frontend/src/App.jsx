import React from 'react';
import Navbar from './Components/Navbar/Navbar';

const App = () => {
  return (
    <div className='w-4/5 m-auto'>
      <Navbar />
      <div className='py-8'>
        <h1 className='text-3xl font-bold'>Welcome to EasyServe</h1>
      </div>
    </div>
  );
};

export default App;
