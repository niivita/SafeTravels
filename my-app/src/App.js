import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import FillForm from './pages/FillForm';
import GroupPage from './pages/GroupPage';
import ChatPage from './pages/ChatPage';


function App() {
  return (

    <main className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/FillForm" element={<FillForm />} />
          <Route path="/GroupPage" element={<GroupPage /> }/> 
          <Route path="/Chat" element={<ChatPage /> }/> 
        </Routes>
      </Router>
    </main>
  );
}

export default App;