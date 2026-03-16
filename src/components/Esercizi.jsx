import { useState } from 'react';

export default function Esercizi({ esercizi, colore }) {
  const [indice, setIndice] = useState(0);
  const [risposta, setRisposta] = useState('');
  const [stato, setStato] = useState(null); // null | 'corretto' | 'sbagliato'
  const [punteggio, setPunteggio] = useState(0);
  const [finito, setFinito] = useState(false);

  const esercizio = esercizi[indice];

  function controlla(scelta) {
    const r = scelta !== undefined ? scelta : risposta.trim();
    const corretta = esercizio.risposta.toLowerCase().trim();
    const ok = r.toLowerCase().trim() === corretta;
    setStato(ok ? 'corretto' : 'sbagliato');
    if (ok) setPunteggio(p => p + 1);
  }

  function avanti() {
    if (indice + 1 >= esercizi.length) {
      setFinito(true);
    } else {
      setIndice(i => i + 1);
      setRisposta('');
      setStato(null);
    }
  }

  function ricomincia() {
    setIndice(0);
    setRisposta('');
    setStato(null);
    setPunteggio(0);
    setFinito(false);
  }

  if (finito) {
    const perc = Math.round((punteggio / esercizi.length) * 100);
    return (
      <div style={risultatoBox(colore)}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>
          {perc >= 80 ? '🏆' : perc >= 50 ? '👍' : '📚'}
        </div>
        <h2 style={{ color: colore, marginBottom: '8px' }}>Esercizi completati!</h2>
        <p style={{ fontSize: '1.3rem', color: '#333', marginBottom: '6px' }}>
          {punteggio} / {esercizi.length} corretti
        </p>
        <p style={{ color: '#888', marginBottom: '24px' }}>
          {perc >= 80 ? '¡Excelente! Ottimo lavoro.' : perc >= 50 ? 'Bene, continua a praticare.' : 'Rileggi la lezione e riprova.'}
        </p>
        <button onClick={ricomincia} style={btnPrimario(colore)}>🔄 Riprova</button>
      </div>
    );
  }

  return (
    <div style={box}>
      <div style={progressBar}>
        <div style={{ ...progressFill, width: `${((indice) / esercizi.length) * 100}%`, background: colore }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: '#888', fontSize: '0.9rem' }}>Domanda {indice + 1} di {esercizi.length}</span>
        <span style={{ color: colore, fontWeight: 700, fontSize: '0.9rem' }}>✓ {punteggio} corretti</span>
      </div>

      <p style={{ fontSize: '1.1rem', color: '#222', marginBottom: '24px', lineHeight: 1.6 }}>
        {esercizio.domanda}
      </p>

      {esercizio.tipo === 'quiz' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {esercizio.opzioni.map((op, i) => (
            <button
              key={i}
              onClick={() => stato === null && controlla(op)}
              style={opzioneBtn(stato, op, esercizio.risposta, colore)}
            >
              {op}
            </button>
          ))}
        </div>
      )}

      {esercizio.tipo === 'completa' && (
        <div>
          <input
            value={risposta}
            onChange={e => setRisposta(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && stato === null && controlla()}
            placeholder="Scrivi la risposta..."
            disabled={stato !== null}
            style={inputStyle(stato, colore)}
          />
          {stato === null && (
            <button onClick={() => controlla()} style={{ ...btnPrimario(colore), marginTop: '12px' }}>
              Controlla
            </button>
          )}
        </div>
      )}

      {stato && (
        <div style={feedbackBox(stato)}>
          <span style={{ fontSize: '1.2rem' }}>{stato === 'corretto' ? '✅' : '❌'}</span>
          <div>
            <p style={{ fontWeight: 700, marginBottom: '4px' }}>
              {stato === 'corretto' ? '¡Correcto!' : `Risposta corretta: ${esercizio.risposta}`}
            </p>
            <p style={{ color: '#555', fontSize: '0.9rem' }}>{esercizio.spiegazione}</p>
          </div>
        </div>
      )}

      {stato && (
        <button onClick={avanti} style={{ ...btnPrimario(colore), marginTop: '16px' }}>
          {indice + 1 >= esercizi.length ? 'Vedi risultato →' : 'Prossima →'}
        </button>
      )}
    </div>
  );
}

const box = { background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' };

const progressBar = { height: '6px', background: '#f0f0f0', borderRadius: '10px', marginBottom: '16px', overflow: 'hidden' };
const progressFill = { height: '100%', borderRadius: '10px', transition: 'width 0.4s' };

const opzioneBtn = (stato, op, risposta, colore) => ({
  padding: '14px 18px',
  borderRadius: '10px',
  border: '2px solid',
  cursor: stato === null ? 'pointer' : 'default',
  fontSize: '1rem',
  textAlign: 'left',
  transition: 'all 0.15s',
  borderColor: stato === null ? '#e0e0e0' : op === risposta ? '#5cc47e' : op === (stato === 'sbagliato' ? op : '') ? '#e05c5c' : '#e0e0e0',
  background: stato === null ? 'white' : op === risposta ? '#edfaf3' : '#fff',
  color: stato !== null && op === risposta ? '#2a7a4b' : '#333',
  fontWeight: stato !== null && op === risposta ? 700 : 400,
});

const inputStyle = (stato, colore) => ({
  width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '1rem',
  border: `2px solid ${stato === 'corretto' ? '#5cc47e' : stato === 'sbagliato' ? '#e05c5c' : '#e0e0e0'}`,
  outline: 'none', boxSizing: 'border-box',
  background: stato === 'corretto' ? '#edfaf3' : stato === 'sbagliato' ? '#fef0f0' : 'white',
});

const feedbackBox = (stato) => ({
  display: 'flex', gap: '12px', alignItems: 'flex-start',
  background: stato === 'corretto' ? '#edfaf3' : '#fef0f0',
  borderRadius: '10px', padding: '14px 16px', marginTop: '16px',
  border: `1px solid ${stato === 'corretto' ? '#a8e6c3' : '#f5c0c0'}`,
});

const btnPrimario = (colore) => ({
  background: colore, color: 'white', border: 'none', borderRadius: '10px',
  padding: '12px 24px', cursor: 'pointer', fontSize: '1rem', fontWeight: 600,
});

const risultatoBox = (colore) => ({
  background: 'white', borderRadius: '16px', padding: '40px',
  textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
});
