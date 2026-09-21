import { useState, useEffect } from 'react';
import api from '../services/api';

export default function ItemList() {
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState(null);

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
            await api.delete(`/receitas/deletar/${id}`);
            setItens(itens.filter(item => item.id !== id));
            setMensagem({ tipo: 'sucesso', texto: 'Item excluído com sucesso!' });
        } catch (error) {
            console.error('Erro ao excluir item:', error);
            setMensagem({ tipo: 'erro', texto: 'Erro ao excluir o item.' });
        }
    };

    // Função para calcular o status de validade de cada lote de forma independente
    const verificarValidade = (expirationDateStr) => {
        if (!expirationDateStr) return 'normal';

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const dataValidade = new Date(expirationDateStr + 'T00:00:00');

        // Diferença em dias
        const diffTime = dataValidade - hoje;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return 'vencido'; // Vermelho
        } else if (diffDays <= 3) {
            return 'proximo'; // Amarelo (próximo de vencer em até 3 dias)
        }
        return 'normal';
    };

    // Verifica se existe pelo menos um item vencido na lista para exibir o alerta obrigatório
    const possuiItemVencido = itens.some(item => verificarValidade(item.expirationDate) === 'vencido');

    return (
        <div style={{ maxWidth: '900px', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ marginBottom: '10px', color: '#1e1e2f' }}>Itens na Despensa</h2>
            <p style={{ color: '#666', marginBottom: '25px' }}>Gerencie os lotes individuais disponíveis atualmente na sua base de dados.</p>

            {/* Mensagem de Alerta Obrigatória se houver itens vencidos */}
            {possuiItemVencido && (
                <div style={{
                    padding: '14px',
                    marginBottom: '20px',
                    borderRadius: '8px',
                    background: '#f8d7da',
                    color: '#842029',
                    border: '1px solid #f5c2c7',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '15px'
                }}>
                    produto improprio para consumo, descarte-o e o exclua da lista
                </div>
            )}

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
                            <th style={{ padding: '12px' }}>ID (Lote)</th>
                            <th style={{ padding: '12px' }}>Nome</th>
                            <th style={{ padding: '12px' }}>Quantidade</th>
                            <th style={{ padding: '12px' }}>Unidade</th>
                            <th style={{ padding: '12px' }}>Validade</th>
                            <th style={{ padding: '12px' }}>Categoria</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {itens.map((item) => {
                            const statusValidade = verificarValidade(item.expirationDate);

                            // Define a cor de fundo da linha baseado na validade individual de cada ID
                            let backgroundColor = 'transparent';
                            if (statusValidade === 'vencido') {
                                backgroundColor = '#f8d7da'; // Vermelho suave para vencido
                            } else if (statusValidade === 'proximo') {
                                backgroundColor = '#fff3cd'; // Amarelo suave para perto do vencimento
                            }

                            return (
                                <tr key={item.id} style={{ borderBottom: '1px solid #eee', fontSize: '14px', color: '#333', backgroundColor, transition: 'background 0.2s' }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#555' }}>#{item.id}</td>
                                    <td style={{ padding: '12px', fontWeight: '500' }}>{item.name}</td>
                                    <td style={{ padding: '12px' }}>{item.quantity}</td>
                                    <td style={{ padding: '12px' }}>{item.unit || item.unidadeMedida}</td>
                                    <td style={{ padding: '12px', fontWeight: statusValidade !== 'normal' ? 'bold' : 'normal' }}>
                                        {item.expirationDate ? new Date(item.expirationDate + 'T00:00:00').toLocaleDateString('pt-BR') : 'Não informada'}
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            background: '#e0e7ff',
                                            color: '#3730a3',
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            fontSize: '12px',
                                            fontWeight: 'bold'
                                        }}>
                                          {item.category || item.categoria}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}