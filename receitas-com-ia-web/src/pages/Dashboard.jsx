import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Dashboard() {
    const [totalItens, setTotalItens] = useState(0);
    const [statusSistema, setStatusSistema] = useState({ carregando: true, online: false });

    useEffect(() => {
        // Busca os dados reais direto do backend Spring Boot
        api.get('/receitas/listar')
            .then(response => {
                setTotalItens(response.data.length);
                setStatusSistema({ carregando: false, online: true });
            })
            .catch(() => {
                setTotalItens(0);
                setStatusSistema({ carregando: false, online: false });
            });
    }, []);

    return (
        <div style={{ maxWidth: '900px', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', minHeight: '500px', justifyContent: 'space-between' }}>

            <div>
                <div style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', color: '#1e1e2f', marginBottom: '8px' }}>Painel da Despensa & I.A.</h2>
                    <p style={{ color: '#666', fontSize: '15px' }}>Visão geral do seu estoque de mantimentos e inteligência culinária integrada.</p>
                </div>

                {/* Cards de Métricas Reais do Banco */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '35px' }}>

                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Total de Itens na Despensa</span>
                        <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a' }}>{totalItens}</span>
                        <span style={{ fontSize: '12px', color: '#10b981' }}>Registros reais no banco</span>
                    </div>

                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Status da API</span>
                        <span style={{ fontSize: '16px', fontWeight: 'bold', color: statusSistema.online ? '#10b981' : '#ef4444', marginTop: '4px' }}>
              {statusSistema.carregando ? '⏳ Verificando...' : (statusSistema.online ? '🟢 Operacional' : '🔴 Desconectado')}
            </span>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>
              {statusSistema.online ? 'Spring Boot respondendo' : 'Verifique se o back-end está rodando'}
            </span>
                    </div>

                </div>

                {/* Área informativa limpa (sem dados fictícios) */}
                <div style={{ padding: '25px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '16px', color: '#374151', marginBottom: '8px' }}>Ultimas receitas geradas</h3>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                        Utilize as abas superiores para cadastrar seus mantimentos reais na despensa e gerar receitas diretamente com a Inteligência Artificial.
                    </p>
                </div>

            </div>

            {/* ASSINATURA DE FRONT-END / RODAPÉ PROFISSIONAL COM SEUS DADOS */}
            <footer style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', fontSize: '13px', color: '#64748b' }}>
                <div>
                    <span style={{ fontWeight: 'bold', color: '#1e1e2f' }}>Receitas com I.A.</span> — Desenvolvido por <span style={{ color: '#4f46e5', fontWeight: '600' }}>Caio Lucas</span>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <a href="https://www.linkedin.com/in/caio-lfe/" target="_blank" rel="noopener noreferrer" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: '500' }}>LinkedIn</a>
                    <a href="https://github.com/caiolucas196" target="_blank" rel="noopener noreferrer" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: '500' }}>GitHub</a>
                    <a href="mailto:caiolucas196@hotmail.com" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: '500' }}>E-mail</a>
                </div>
            </footer>

        </div>
    );
}