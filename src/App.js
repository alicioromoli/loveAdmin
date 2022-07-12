import { useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TableComponent from './components/Table/TableComponent';
import User from './components/User/UserComponent';
import { DataProvider } from './DataContext';
import axios from 'axios';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<TableComponent />} />
          <Route path="/person/:userId" element={<User />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
