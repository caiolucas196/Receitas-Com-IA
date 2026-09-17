import { useState } from 'react';
import api from '../services/api';

export default function ItemAdd() {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [unidadeMedida, setUnidadeMedida] = useState('UNIDADE'); // Ex: UNIDADE, KG, LITROS
    const [categoria, setCategoria] = useState('');
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMensagem(null);

        try {
            // Ajuste a rota '/api/itens' conforme o endpoint real do seu Controller Java
            await api.post('/api/itens', {
                nome,
                quantidade: Number(quantidade),
                unidadeMedida,
                categoria
            });

            setMensagem({ tipo: 'sucesso', texto: 'Item adicionado com sucesso à despensa!' });
            // Limpa o formulário
            setNome('');
            setQuantidade('');
            setUnidadeMedida('UNIDADE');
            setCategoria('');
        } catch (error) {
            console.error('Erro ao cadastrar item:', error);
            setMensagem({ tipo: 'erro', texto: 'Erro ao conectar com o backend. Verifique se a API está rodando.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ marginBottom: '10px', color: '#1e1e2f' }}>Adicionar Novo Item</h2>
            <p style={{ color: '#666', marginBottom: '25px' }}>Cadastre os mantimentos disponíveis na sua despensa.</p>

            {mensagem && (
                <div style={{
                    padding: '12px',
                    marginBottom: '20px',
                    borderRadius: '6px',
                    background: mensagem.tipo === 'sucesso' ? '#d1e7dd' : '#f8d7da',
                    color: mensagem.tipo === 'sucesso' ? '#0f5132' : '#842029'
                }}>
                    {mensagem.texto}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>Nome do Item:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Ex: Arroz, Frango, Tomate..."
                        required
                        style={inputStyle}
                    />
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>Quantidade:</label>
                        <input
                            type="number"
                            step="any"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            placeholder="Ex: 1, 500..."
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>Unidade de Medida:</label>
                        <select
                            value={unidadeMedida}
                            onChange={(e) => setUnidadeMedida(e.target.value)}
                            style={inputStyle}
                        >
                            <option value="UNIDADE">Unidade(s)</option>
                            <option value="KG">Quilo(s) - KG</option>
                            <option value="GRAMAS">Grama(s) - g</option>
                            <option value="LITROS">Litro(s) - L</option>
                            <option value="ML Mililitros">Mililitro(s) - mL</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>Categoria:</label>
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                        style={inputStyle}
                    >
                        <option value="">Selecione uma categoria...</option>
                        <option value="CONGELADOS">Congelados</option>
                        <option value="GRAOS">Grãos</option>
                        <option value="LIQUIDOS">Líquidos</option>
                        <option value="SECOS">Secos</option>
                        <option value="LATICINIOS">Laticínios</option>
                        <option value="HORTIFRUTI">Hortifruti</option>
                        <option value="FRIOS">Frios</option>
                        <option value="CONDIMENTOS">Condimentos</option>
                        <option value="PADARIA">Padaria</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        background: '#4f46e5',
                        color: '#fff',
                        border: 'none',
                        padding: '14px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        marginTop: '10px',
                        transition: 'background 0.2s'
                    }}
                >
                    {loading ? 'Salvando...' : 'Cadastrar Item na Despensa'}
                </button>

            </form>
        </div>
    );
}

const inputStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    outline: 'none'
};