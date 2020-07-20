import React from 'react';
import './sass/App.scss';

// Components:
import TodoList from './components/TodoList';

function App() {
  return (
    <div className='App'>
      <TodoList />
    </div>
  );
}

export default App;
