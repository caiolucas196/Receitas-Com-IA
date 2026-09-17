import { useState, useEffect } from 'react';
import api from '../services/api';

export default function RecipeGen() {
    const [itensDespensa, setItensDespensa] = useState([]);
    const [selecionados, setSelecionados] = useState([]); // { id, name, quantity, unit }
    const [instrucaoUsuario, setInstrucaoUsuario] = useState('');
    const [loading, setLoading] = useState(false);
    const [resultadoReceita, setResultadoReceita] = useState(null);
    const [erro, setErro] = useState(null);

    // 1. Carrega os itens reais da despensa ao abrir a tela
    useEffect(() => {
        carregarDespensa();
    }, []);

    const carregarDespensa = async () => {
        try {
            const response = await api.get('/receitas/listar');
            setItensDespensa(response.data);
        } catch (err) {
            console.error('Erro ao buscar despensa:', err);
            setErro('Não foi possível carregar os itens da despensa do servidor.');
        }
    };

    // 2. Gerencia a seleção de ingredientes e suas quantidades
    const handleToggleItem = (item) => {
        const existe = selecionados.find(s => s.id === item.id);
        if (existe) {
            setSelecionados(selecionados.filter(s => s.id !== item.id));
        } else {
            setSelecionados([...selecionados, {
                id: item.id,
                nome: item.name,
                quantidade: item.quantity,
                unit: item.unit
            }]);
        }
    };

    const handleQuantidadeChange = (id, novaQtd) => {
        setSelecionados(selecionados.map(s => {
            if (s.id === id) {
                return { ...s, quantidade: parseFloat(novaQtd) || 0 };
            }
            return s;
        }));
    };

    // 3. Envia para o Back-end acionar o Spring AI e salva no histórico local
    const handleGerarReceita = async (e) => {
        e.preventDefault();
        if (selecionados.length === 0) {
            alert('Selecione pelo menos um ingrediente da despensa.');
            return;
        }

        setLoading(true);
        setResultadoReceita(null);
        setErro(null);

        // Monta o objeto de acordo com o GerarReceitaRequest do Java
        const payload = {
            ingredientes: selecionados.map(s => ({
                nome: s.nome,
                quantidade: s.quantidade,
                unidade: s.unit
            })),
            instrucaoUsuario: instrucaoUsuario
        };

        try {
            const response = await api.post('/receitas/gerar-receita', payload);
            const receitaGerada = response.data;
            setResultadoReceita(receitaGerada);

            // Salva automaticamente no Histórico (Tela 5)
            const novaReceita = {
                id: Date.now(),
                data: new Date().toLocaleDateString('pt-BR'),
                conteudo: receitaGerada
            };
            const historicoAtual = JSON.parse(localStorage.getItem('historicoReceitas')) || [];
            localStorage.setItem('historicoReceitas', JSON.stringify([novaReceita, ...historicoAtual]));

        } catch (err) {
            console.error('Erro ao gerar receita:', err);
            setErro('Erro ao processar a receita com a Inteligência Artificial.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ marginBottom: '10px', color: '#1e1e2f' }}>Gerador de Receitas com I.A.</h2>
            <p style={{ color: '#666', marginBottom: '25px' }}>Selecione os ingredientes disponíveis na sua despensa para criar uma receita restrita e inteligente.</p>

            {erro && (
                <div style={{ padding: '12px', marginBottom: '20px', background: '#f8d7da', color: '#842029', borderRadius: '6px' }}>
                    {erro}
                </div>
            )}

            <form onSubmit={handleGerarReceita} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* Lista de seleção de ingredientes */}
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                        Selecione os Ingredientes da Despensa:
                    </label>

                    {itensDespensa.length === 0 ? (
                        <p style={{ color: '#888', fontStyle: 'italic', fontSize: '14px' }}>Nenhum item cadastrado na despensa. Cadastre itens na aba "Adicionar Item" primeiro.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto', padding: '10px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                            {itensDespensa.map(item => {
                                const selecionado = selecionados.find(s => s.id === item.id);
                                return (
                                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', background: '#fff', border: '1px solid #eee', borderRadius: '6px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flex: 1 }}>
                                            <input
                                                type="checkbox"
                                                checked={!!selecionado}
                                                onChange={() => handleToggleItem(item)}
                                                style={{ width: '16px', height: '16px' }}
                                            />
                                            <span style={{ fontWeight: '500', color: '#333' }}>{item.name}</span>
                                        </label>

                                        {selecionado && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    value={selecionado.quantidade}
                                                    onChange={(e) => handleQuantidadeChange(item.id, e.target.value)}
                                                    style={{ width: '70px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
                                                />
                                                <span style={{ fontSize: '12px', color: '#666' }}>{item.unit}</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Instrução opcional */}
                <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#333' }}>
                        Instrução Extra para a I.A. (Opcional):
                    </label>
                    <input
                        type="text"
                        value={instrucaoUsuario}
                        onChange={(e) => setInstrucaoUsuario(e.target.value)}
                        placeholder="Ex: A partir destes ingredientes, faça algo proximo da culinária italiana..."
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '14px' }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || itensDespensa.length === 0}
                    style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', opacity: (loading || itensDespensa.length === 0) ? 0.7 : 1 }}
                >
                    {loading ? 'Processando com Spring AI...' : 'Gerar Receita Restrita'}
                </button>

            </form>

            {/* Exibição do Resultado Frio e Direto da I.A. */}
            {resultadoReceita && (
                <div style={{ marginTop: '30px', padding: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '16px', color: '#1e1e2f', marginBottom: '10px' }}>Resultado da Inteligência Artificial (Salvo no Histórico):</h3>
                    <div style={{ padding: '15px', background: '#f3f4f6', borderLeft: '4px solid #4f46e5', borderRadius: '4px' }}>
                        <p style={{ fontFamily: 'monospace', fontSize: '14px', color: '#1f2937', whiteSpace: 'pre-wrap', margin: 0 }}>
                            {resultadoReceita}
                        </p>
                    </div>
                </div>
            )}

        </div>
    );
}