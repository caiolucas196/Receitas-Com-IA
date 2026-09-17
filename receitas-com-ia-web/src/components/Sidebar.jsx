export default function Sidebar({ activeTab, setActiveTab }) {
    return (
        <aside style={{ width: '260px', background: '#1e1e2f', color: '#fff', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h2>🍳 ReceitasComIA</h2>
            <hr style={{ borderColor: '#333' }} />

            <button onClick={() => setActiveTab(1)} style={buttonStyle(activeTab === 1)}>1. Dashboard</button>
            <button onClick={() => setActiveTab(2)} style={buttonStyle(activeTab === 2)}>2. Ver Itens</button>
            <button onClick={() => setActiveTab(3)} style={buttonStyle(activeTab === 3)}>3. Adicionar Item</button>
            <button onClick={() => setActiveTab(4)} style={buttonStyle(activeTab === 4)}>4. Gerar com I.A.</button>
            <button onClick={() => setActiveTab(5)} style={buttonStyle(activeTab === 5)}>5. Livro de Receitas</button>
        </aside>
    );
}

const buttonStyle = (isActive) => ({
    background: isActive ? '#4f46e5' : 'transparent',
    color: '#fff',
    border: 'none',
    padding: '12px 15px',
    textAlign: 'left',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'background 0.2s'
});