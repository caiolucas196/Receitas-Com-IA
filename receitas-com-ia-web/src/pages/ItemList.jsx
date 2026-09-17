import { useState, useEffect } from 'react';
import api from '../services/api';

export default function ItemList() {
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState(null);

    // Busca os itens reais cadastrados no banco ao carregar a página
    useEffect(() => {
        carregarItens();
    }, []);

    const carregarItens = async () => {
        setLoading(true);
        try {
            const response = await api.get('/receitas/listar');
            setItens(response.data);
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
            setMensagem({ tipo: 'erro', texto: 'Erro ao carregar a despensa. Verifique se o back-end está rodando.' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este item?')) return;

        try {
            // Dispara a exclusão real no endpoint do seu FoodItemController (/receitas/deletar/{id})
            await api.delete(`/receitas/deletar/${id}`);
            // Atualiza a lista removendo o item deletado
            setItens(itens.filter(item => item.id !== id));
            setMensagem({ tipo: 'sucesso', texto: 'Item excluído com sucesso!' });
        } catch (error) {
            console.error('Erro ao excluir item:', error);
            setMensagem({ tipo: 'erro', texto: 'Erro ao excluir o item.' });
        }
    };

    return (
        <div style={{ maxWidth: '800px', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ marginBottom: '10px', color: '#1e1e2f' }}>Itens na Despensa</h2>
            <p style={{ color: '#666', marginBottom: '25px' }}>Gerencie os mantimentos disponíveis atualmente na sua base de dados.</p>

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

            {loading ? (
                <p style={{ color: '#666', fontStyle: 'italic' }}>Carregando itens da despensa...</p>
            ) : itens.length === 0 ? (
                <p style={{ color: '#888', fontStyle: 'italic' }}>Sua despensa está vazia no momento. Nenhum item cadastrado.</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                        <tr style={{ borderBottom: '2px solid #eee', color: '#555', fontSize: '14px' }}>
                            <th style={{ padding: '12px' }}>Nome</th>
                            <th style={{ padding: '12px' }}>Quantidade</th>
                            <th style={{ padding: '12px' }}>Unidade</th>
                            <th style={{ padding: '12px' }}>Categoria</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {itens.map((item) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #eee', fontSize: '14px', color: '#333' }}>
                                <td style={{ padding: '12px', fontWeight: '500' }}>{item.name}</td>
                                <td style={{ padding: '12px' }}>{item.quantity}</td>
                                <td style={{ padding: '12px' }}>{item.unit}</td>
                                <td style={{ padding: '12px' }}>
                    <span style={{
                        background: '#e0e7ff',
                        color: '#3730a3',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}>
                      {item.category}
                    </span>
                                </td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                    <button
                                        onClick={() => alert(`Editar item ID: ${item.id}`)}
                                        style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', marginRight: '6px', fontWeight: 'bold' }}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}