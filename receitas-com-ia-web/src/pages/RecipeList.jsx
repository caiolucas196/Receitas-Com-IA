import { useState, useEffect } from 'react';

export default function RecipeHistory() {
    const [historico, setHistorico] = useState([]);

    // Carrega as receitas salvas no localStorage ao abrir a tela
    useEffect(() => {
        const receitasSalvas = JSON.parse(localStorage.getItem('historicoReceitas')) || [];
        setHistorico(receitasSalvas);
    }, []);

    const handleExcluir = (id) => {
        const novoHistorico = historico.filter(rec => rec.id !== id);
        setHistorico(novoHistorico);
        localStorage.setItem('historicoReceitas', JSON.stringify(novoHistorico));
    };

    const handleLimparTudo = () => {
        if (!window.confirm('Deseja limpar todo o histórico de receitas?')) return;
        setHistorico([]);
        localStorage.removeItem('historicoReceitas');
    };

    return (
        <div style={{ maxWidth: '800px', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h2 style={{ color: '#1e1e2f', margin: 0 }}>Livro de Receitas (Histórico)</h2>
                {historico.length > 0 && (
                    <button
                        onClick={handleLimparTudo}
                        style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        Limpar Histórico
                    </button>
                )}
            </div>
            <p style={{ color: '#666', marginBottom: '25px' }}>Consulte as receitas geradas anteriormente pela inteligência artificial.</p>

            {historico.length === 0 ? (
                <p style={{ color: '#888', fontStyle: 'italic' }}>Nenhuma receita salva no histórico ainda. Gere uma receita na aba "Gerar Receita" para salvá-la aqui.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {historico.map((rec) => (
                        <div
                            key={rec.id}
                            style={{
                                padding: '20px',
                                background: '#f9fafb',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold' }}>Gerada em: {rec.data}</span>
                                <button
                                    type="button"
                                    onClick={() => handleExcluir(rec.id)}
                                    style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    Excluir
                                </button>
                            </div>

                            {/* Exibição da resposta fria e direta da IA */}
                            <div style={{ padding: '12px', background: '#f3f4f6', borderLeft: '4px solid #4f46e5', borderRadius: '4px' }}>
                                <p style={{ fontFamily: 'monospace', fontSize: '14px', color: '#1f2937', whiteSpace: 'pre-wrap', margin: 0 }}>
                                    {rec.conteudo}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}