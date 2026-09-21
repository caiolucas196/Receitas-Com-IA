import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import ItemList from './pages/ItemList';
import ItemAdd from './pages/ItemAdd';
import RecipeGen from './pages/RecipeGen';
import RecipeHistory from './pages/RecipeList';

export default function App() {
    // Controla qual aba está ativa ('dashboard', 'list', 'add', 'recipeGen', 'history')
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div style={{ minHeight: '100vh', background: '#f3f4f6', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>

            {/* Barra de Navegação Superior */}
            <header style={{ background: '#1e1e2f', color: '#fff', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h1 style={{ fontSize: '18px', margin: 0, cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>
                    🍳 Receitas com I.A.
                </h1>
                <nav style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        style={navBtnStyle(activeTab === 'dashboard')}
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('list')}
                        style={navBtnStyle(activeTab === 'list')}
                    >
                        Ver Itens
                    </button>
                    <button
                        onClick={() => setActiveTab('add')}
                        style={navBtnStyle(activeTab === 'add')}
                    >
                        Adicionar Item
                    </button>
                    <button
                        onClick={() => setActiveTab('recipeGen')}
                        style={navBtnStyle(activeTab === 'recipeGen')}
                    >
                        Gerar Receita (I.A.)
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        style={navBtnStyle(activeTab === 'history')}
                    >
                        Livro de Receitas
                    </button>
                </nav>
            </header>

            {/* Conteúdo Central Dinâmico */}
            <main style={{ flex: 1, padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '900px' }}>
                    {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
                    {activeTab === 'list' && <ItemList />}
                    {activeTab === 'add' && <ItemAdd />}
                    {activeTab === 'recipeGen' && <RecipeGen />}
                    {activeTab === 'history' && <RecipeHistory />}
                </div>
            </main>

        </div>
    );
}

// Estilo dos botões do menu superior
const navBtnStyle = (ativo) => ({
    background: ativo ? '#4f46e5' : 'transparent',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'background 0.2s'
});