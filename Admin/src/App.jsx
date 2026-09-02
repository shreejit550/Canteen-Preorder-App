import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {
  return (
    <div>
      <Navbar />
      <hr className='h-1' />
      <div className='app-component flex'>
        <Sidebar />
        <div className='p-8'>
          <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default App;
