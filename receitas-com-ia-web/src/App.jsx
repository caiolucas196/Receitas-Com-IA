import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ItemList from './pages/ItemList';
import ItemAdd from './pages/ItemAdd';
import RecipeGen from './pages/RecipeGen';
import RecipeList from './pages/RecipeList';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState(1);

  return (
      <div className="app-container" style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main style={{ flex: 1, padding: '40px', background: '#f4f7f6', overflowY: 'auto' }}>
          {activeTab === 1 && <Dashboard />}
          {activeTab === 2 && <ItemList />}
          {activeTab === 3 && <ItemAdd />}
          {activeTab === 4 && <RecipeGen />}
          {activeTab === 5 && <RecipeList />}
        </main>
      </div>
  );
}