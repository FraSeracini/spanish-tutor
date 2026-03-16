import { useState } from 'react';
import { grammatica } from '../data/grammatica';
import Esercizi from '../components/Esercizi';

const livelli = ['A1', 'A2', 'B1'];
const colore = '#e05c5c';

export default function Grammatica({ setPage }) {
  const [livello, setLivello] = useState(null);
  const [lezioneAperta, setLezioneAperta] = useState(null);
  const [tab, setTab] = useState('lezione');

  if (lezioneAperta !== null && livello) {
    const lezione = grammatica[livello][lezioneAperta];
    return (
      <div style={container}>
        <button onClick={() => { setLezioneAperta(null); setTab('lezione'); }} style={{ ...backBtn, color: colore }}>
          ← Torna alle lezioni
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '2rem' }}>{lezione.icona}</span>
          <h1 style={{ color: colore, fontSize: '1.6rem' }}>{lezione.titolo}</h1>
        </div>
        <span style={{ ...badge, background: colore }}>{livello}</span>

        <div style={tabs}>
          <button onClick={() => setTab('lezione')} style={tabBtn(tab === 'lezione', colore)}>📖 Lezione</button>
          <button onClick={() => setTab('esercizi')} style={tabBtn(tab === 'esercizi', colore)}>✏️ Esercizi ({lezione.esercizi.length})</button>
        </div>

        {tab === 'lezione' && (
          <>
            <p style={{ color: '#555', margin: '20px 0', lineHeight: 1.7, fontSize: '1.05rem' }}>{lezione.spiegazione}</p>
            <h3 style={sectionTitle}>Coniugazione / Regole</h3>
            <div style={tableWrap}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#fef0f0' }}>
                    <th style={th}>Persona / Caso</th>
                    <th style={th}>Forma</th>
                    <th style={th}>Esempio</th>
                  </tr>
                </thead>
                <tbody>
                  {lezione.regole.map((r, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                      <td style={td}>{r.caso}</td>
                      <td style={{ ...td, fontWeight: 600, color: colore }}>{r.forma}</td>
                      <td style={{ ...td, fontStyle: 'italic', color: '#444' }}>{r.esempio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 style={sectionTitle}>Esempi in contesto</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {lezione.esempi.map((e, i) => (
                <div key={i} style={esempioCard}>
                  <span style={{ fontSize: '1.1rem' }}>💬</span>
                  <span style={{ fontStyle: 'italic', color: '#333' }}>{e}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setTab('esercizi')} style={{ ...btnPrimario, background: colore }}>
              ✏️ Vai agli esercizi →
            </button>
          </>
        )}

        {tab === 'esercizi' && (
          <div style={{ marginTop: '20px' }}>
            <Esercizi esercizi={lezione.esercizi} colore={colore} />
          </div>
        )}
      </div>
    );
  }

  if (livello) {
    const lezioni = grammatica[livello];
    return (
      <div style={container}>
        <button onClick={() => setLivello(null)} style={{ ...backBtn, color: colore }}>← Cambia livello</button>
        <h1 style={{ color: colore, marginBottom: '6px' }}>📚 Grammatica</h1>
        <p style={{ color: '#888', marginBottom: '30px' }}>Livello {livello} — {lezioni.length} lezioni</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {lezioni.map((l, i) => (
            <div key={i} onClick={() => { setLezioneAperta(i); setTab('lezione'); }} style={lezioneCard}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{l.icona}</div>
              <h3 style={{ color: '#222', marginBottom: '8px', fontSize: '1.05rem' }}>{l.titolo}</h3>
              <p style={{ color: '#777', fontSize: '0.88rem', lineHeight: 1.5 }}>
                {l.spiegazione.slice(0, 80)}...
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
                <span style={{ ...badge, background: colore }}>{livello}</span>
                <span style={{ ...badge, background: '#888' }}>✏️ {l.esercizi.length} esercizi</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={container}>
      <button onClick={() => setPage('home')} style={{ ...backBtn, color: colore }}>← Home</button>
      <h1 style={{ color: colore, marginBottom: '8px' }}>📚 Grammatica</h1>
      <p style={{ color: '#666', marginBottom: '40px', fontSize: '1.05rem' }}>Scegli il tuo livello per iniziare</p>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {livelli.map(l => (
          <div key={l} onClick={() => setLivello(l)} style={livelloCard(colore)}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
              {l === 'A1' ? '🌱' : l === 'A2' ? '🌿' : '🌳'}
            </div>
            <h2 style={{ fontSize: '1.8rem', color: 'white' }}>{l}</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', marginTop: '8px', fontSize: '0.95rem' }}>
              {l === 'A1' ? 'Principiante assoluto' : l === 'A2' ? 'Elementare' : 'Intermedio'}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginTop: '6px' }}>
              {grammatica[l].length} lezioni
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const container = { padding: '40px', maxWidth: '860px', margin: '0 auto' };
const backBtn = { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', marginBottom: '24px', padding: 0 };
const badge = { color: 'white', borderRadius: '20px', padding: '4px 12px', fontSize: '0.8rem', fontWeight: 600 };
const sectionTitle = { color: '#333', margin: '28px 0 14px', fontSize: '1.1rem', fontWeight: 700 };
const tableWrap = { borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', marginBottom: '10px' };
const th = { padding: '12px 16px', textAlign: 'left', color: '#555', fontSize: '0.9rem', fontWeight: 600 };
const td = { padding: '12px 16px', fontSize: '0.95rem', borderTop: '1px solid #f0f0f0' };
const esempioCard = { background: 'white', borderRadius: '10px', padding: '14px 18px', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' };
const lezioneCard = { background: 'white', borderRadius: '16px', padding: '24px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', transition: 'transform 0.15s' };
const livelloCard = (c) => ({ background: c, borderRadius: '20px', padding: '36px 30px', cursor: 'pointer', flex: 1, minWidth: '180px', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.12)', transition: 'transform 0.2s' });
const tabs = { display: 'flex', gap: '8px', margin: '20px 0' };
const tabBtn = (attivo, c) => ({ padding: '10px 20px', borderRadius: '10px', border: `2px solid ${attivo ? c : '#e0e0e0'}`, background: attivo ? c : 'white', color: attivo ? 'white' : '#555', cursor: 'pointer', fontWeight: attivo ? 700 : 400, fontSize: '0.95rem' });
const btnPrimario = { color: 'white', border: 'none', borderRadius: '10px', padding: '12px 24px', cursor: 'pointer', fontSize: '1rem', fontWeight: 600 };
