import React from 'react';
import UserList from './src/components/UserLists'; 
import AddUser from './src/components/AddUser';

function App() {
  return (
    <div className="App">
      <h1>MERN Stack App</h1>
      <AddUser />
      <UserList />
    </div>
  );
}

export default App;
