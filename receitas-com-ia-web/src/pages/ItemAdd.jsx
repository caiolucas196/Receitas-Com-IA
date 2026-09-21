import { useState } from 'react';
import api from '../services/api';

export default function ItemAdd() {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState(''); // Ex: 5 (pacotes)
    const [valorMedida, setValorMedida] = useState(''); // Ex: 2 ou 1000 (peso/volume de cada unidade)
    const [unidadeMedida, setUnidadeMedida] = useState('QUILOGRAMA'); // KG, GRAMA, LITRO, MILILITRO
    const [categoria, setCategoria] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMensagem(null);

        try {
            await api.post('/receitas/adicionar', {
                name: nome,
                quantity: Number(quantidade),
                measurementValue: Number(valorMedida), // Valor do peso/volume unitário
                unit: unidadeMedida,
                category: categoria,
                expirationDate: expirationDate
            });

            setMensagem({ tipo: 'sucesso', texto: 'Item adicionado com sucesso à despensa!' });
            setNome('');
            setQuantidade('');
            setValorMedida('');
            setUnidadeMedida('QUILOGRAMA');
            setCategoria('');
            setExpirationDate('');
        } catch (error) {
            console.error('Erro detalhado ao cadastrar item:', error.response?.data || error.message);
            const mensagemErro = error.response?.data?.message || 'Erro ao conectar com o backend. Verifique se a API está rodando.';
            setMensagem({ tipo: 'erro', texto: mensagemErro });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ marginBottom: '10px', color: '#1e1e2f' }}>Adicionar Novo Item</h2>
            <p style={{ color: '#666', marginBottom: '25px' }}>Cadastre os mantimentos disponíveis na sua despensa separando quantidade e peso/volume.</p>

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
                        placeholder="Ex: Arroz, Leite, Feijão..."
                        required
                        style={inputStyle}
                    />
                </div>

                {/* Linha da Quantidade de itens e o Valor da Medida */}
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>Quantidade (Itens):</label>
                        <input
                            type="number"
                            step="1"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            placeholder="Ex: 5 (unidades)"
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>Peso/Volume Unitário:</label>
                        <input
                            type="number"
                            step="any"
                            value={valorMedida}
                            onChange={(e) => setValorMedida(e.target.value)}
                            placeholder="Ex: 2 (para 2kg)"
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
                            <option value="QUILOGRAMA">Quilograma(s) - kg</option>
                            <option value="GRAMA">Grama(s) - g</option>
                            <option value="LITRO">Litro(s) - L</option>
                            <option value="MILILITRO">Mililitro(s) - ml</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>Data de Validade:</label>
                    <input
                        type="date"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <small style={{ color: '#888', fontSize: '12px' }}>Dica: Clique no ícone de calendário para selecionar corretamente.</small>
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