import { useState, useCallback } from 'react';
import { lessico } from '../data/lessico';

const livelli = ['A1', 'A2', 'B1'];
const colore = '#5c9ee0';

// Genera quiz da una lista di parole
function generaQuiz(parole) {
  return parole.map((p, i) => {
    const distrattori = parole
      .filter((_, j) => j !== i)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(d => d.it);
    const opzioni = [...distrattori, p.it].sort(() => Math.random() - 0.5);
    return {
      tipo: 'quiz',
      domanda: `Come si traduce "${p.es}"?`,
      opzioni,
      risposta: p.it,
      spiegazione: `"${p.es}" in italiano = "${p.it}"`,
    };
  });
}

function QuizLessico({ parole, onTorna }) {
  const [quiz] = useState(() => generaQuiz(parole).slice(0, 10));
  const [indice, setIndice] = useState(0);
  const [selezionato, setSelezionato] = useState(null);
  const [punteggio, setPunteggio] = useState(0);
  const [finito, setFinito] = useState(false);

  function scegli(op) {
    if (selezionato) return;
    setSelezionato(op);
    if (op === quiz[indice].risposta) setPunteggio(p => p + 1);
  }

  function avanti() {
    if (indice + 1 >= quiz.length) { setFinito(true); return; }
    setIndice(i => i + 1);
    setSelezionato(null);
  }

  if (finito) {
    const perc = Math.round((punteggio / quiz.length) * 100);
    return (
      <div style={risultatoBox}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{perc >= 80 ? '🏆' : perc >= 50 ? '👍' : '📚'}</div>
        <h2 style={{ color: colore, marginBottom: '8px' }}>Quiz completato!</h2>
        <p style={{ fontSize: '1.3rem', color: '#333', marginBottom: '6px' }}>{punteggio} / {quiz.length} corretti</p>
        <p style={{ color: '#888', marginBottom: '24px' }}>
          {perc >= 80 ? '¡Excelente! Ottimo vocabolario.' : perc >= 50 ? 'Bene, continua a praticare.' : 'Ripasssa le flashcard e riprova.'}
        </p>
        <button onClick={onTorna} style={btnPrimario}>← Torna alla categoria</button>
      </div>
    );
  }

  const q = quiz[indice];
  return (
    <div style={quizBox}>
      <div style={progressBar}>
        <div style={{ ...progressFill, width: `${(indice / quiz.length) * 100}%` }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: '#888', fontSize: '0.9rem' }}>Domanda {indice + 1} di {quiz.length}</span>
        <span style={{ color: colore, fontWeight: 700, fontSize: '0.9rem' }}>✓ {punteggio} corretti</span>
      </div>
      <p style={{ fontSize: '1.2rem', color: '#222', marginBottom: '24px', fontWeight: 600 }}>{q.domanda}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {q.opzioni.map((op, i) => {
          let bg = 'white', border = '#e0e0e0', color = '#333', fw = 400;
          if (selezionato) {
            if (op === q.risposta) { bg = '#edfaf3'; border = '#5cc47e'; color = '#2a7a4b'; fw = 700; }
            else if (op === selezionato) { bg = '#fef0f0'; border = '#e05c5c'; }
          }
          return (
            <button key={i} onClick={() => scegli(op)}
              style={{ padding: '14px 18px', borderRadius: '10px', border: `2px solid ${border}`, background: bg, color, fontWeight: fw, cursor: selezionato ? 'default' : 'pointer', fontSize: '1rem', textAlign: 'left', transition: 'all 0.15s' }}>
              {op}
            </button>
          );
        })}
      </div>
      {selezionato && (
        <>
          <div style={{ ...feedbackBox, background: selezionato === q.risposta ? '#edfaf3' : '#fef0f0', border: `1px solid ${selezionato === q.risposta ? '#a8e6c3' : '#f5c0c0'}` }}>
            <span>{selezionato === q.risposta ? '✅' : '❌'}</span>
            <span style={{ color: '#555', fontSize: '0.9rem' }}>{q.spiegazione}</span>
          </div>
          <button onClick={avanti} style={{ ...btnPrimario, marginTop: '14px' }}>
            {indice + 1 >= quiz.length ? 'Vedi risultato →' : 'Prossima →'}
          </button>
        </>
      )}
    </div>
  );
}

export default function Lessico({ setPage }) {
  const [livello, setLivello] = useState(null);
  const [categoriaAperta, setCategoriaAperta] = useState(null);
  const [tab, setTab] = useState('flashcard');
  const [flipped, setFlipped] = useState({});

  const toggleFlip = (key) => setFlipped(f => ({ ...f, [key]: !f[key] }));

  if (categoriaAperta !== null && livello) {
    const cat = lessico[livello][categoriaAperta];
    return (
      <div style={container}>
        <button onClick={() => { setCategoriaAperta(null); setFlipped({}); setTab('flashcard'); }} style={{ ...backBtn, color: colore }}>
          ← Torna alle categorie
        </button>
        <h1 style={{ color: colore, marginBottom: '6px' }}>{cat.categoria}</h1>
        <p style={{ color: '#888', marginBottom: '16px' }}>{cat.parole.length} parole · Livello {livello}</p>

        <div style={tabs}>
          <button onClick={() => setTab('flashcard')} style={tabBtn(tab === 'flashcard')}>🃏 Flashcard</button>
          <button onClick={() => setTab('quiz')} style={tabBtn(tab === 'quiz')}>✏️ Quiz</button>
        </div>

        {tab === 'flashcard' && (
          <>
            <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '20px' }}>Clicca su una card per vedere la traduzione</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '14px' }}>
              {cat.parole.map((p, i) => {
                const isFlipped = flipped[i];
                return (
                  <div key={i} onClick={() => toggleFlip(i)} style={flashcard(isFlipped)}>
                    <div style={{ fontSize: '1.1rem', fontWeight: isFlipped ? 400 : 700, color: isFlipped ? '#555' : 'white' }}>
                      {isFlipped ? p.it : p.es}
                    </div>
                    <div style={{ fontSize: '0.75rem', marginTop: '6px', opacity: 0.7, color: isFlipped ? '#888' : 'rgba(255,255,255,0.8)' }}>
                      {isFlipped ? '🇮🇹 italiano' : '🇪🇸 spagnolo'}
                    </div>
                  </div>
                );
              })}
            </div>
            <button onClick={() => setTab('quiz')} style={{ ...btnPrimario, marginTop: '28px' }}>
              ✏️ Metti alla prova →
            </button>
          </>
        )}

        {tab === 'quiz' && (
          <QuizLessico parole={cat.parole} onTorna={() => setTab('flashcard')} />
        )}
      </div>
    );
  }

  if (livello) {
    const categorie = lessico[livello];
    return (
      <div style={container}>
        <button onClick={() => setLivello(null)} style={{ ...backBtn, color: colore }}>← Cambia livello</button>
        <h1 style={{ color: colore, marginBottom: '6px' }}>🔤 Lessico</h1>
        <p style={{ color: '#888', marginBottom: '30px' }}>Livello {livello} — {categorie.length} categorie</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
          {categorie.map((cat, i) => (
            <div key={i} onClick={() => { setCategoriaAperta(i); setTab('flashcard'); setFlipped({}); }} style={catCard}>
              <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>{cat.categoria.split(' ')[0]}</div>
              <h3 style={{ color: '#222', fontSize: '1rem', marginBottom: '6px' }}>
                {cat.categoria.split(' ').slice(1).join(' ')}
              </h3>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '8px' }}>
                <span style={{ ...badgeStyle, background: colore }}>{cat.parole.length} parole</span>
                <span style={{ ...badgeStyle, background: '#888' }}>✏️ quiz</span>
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
      <h1 style={{ color: colore, marginBottom: '8px' }}>🔤 Lessico</h1>
      <p style={{ color: '#666', marginBottom: '40px', fontSize: '1.05rem' }}>Scegli il tuo livello per iniziare</p>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {livelli.map(l => (
          <div key={l} onClick={() => setLivello(l)} style={livelloCard}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
              {l === 'A1' ? '🌱' : l === 'A2' ? '🌿' : '🌳'}
            </div>
            <h2 style={{ fontSize: '1.8rem', color: 'white' }}>{l}</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', marginTop: '8px', fontSize: '0.95rem' }}>
              {l === 'A1' ? 'Principiante assoluto' : l === 'A2' ? 'Elementare' : 'Intermedio'}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginTop: '6px' }}>
              {lessico[l].length} categorie
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const container = { padding: '40px', maxWidth: '860px', margin: '0 auto' };
const backBtn = { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', marginBottom: '24px', padding: 0 };
const tabs = { display: 'flex', gap: '8px', margin: '16px 0' };
const tabBtn = (attivo) => ({ padding: '10px 20px', borderRadius: '10px', border: `2px solid ${attivo ? colore : '#e0e0e0'}`, background: attivo ? colore : 'white', color: attivo ? 'white' : '#555', cursor: 'pointer', fontWeight: attivo ? 700 : 400, fontSize: '0.95rem' });
const flashcard = (isFlipped) => ({ background: isFlipped ? 'white' : colore, borderRadius: '14px', padding: '20px 14px', cursor: 'pointer', textAlign: 'center', boxShadow: isFlipped ? '0 2px 8px rgba(0,0,0,0.08)' : '0 4px 12px rgba(92,158,224,0.35)', border: isFlipped ? `2px solid ${colore}` : '2px solid transparent', transition: 'all 0.2s', minHeight: '90px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' });
const catCard = { background: 'white', borderRadius: '16px', padding: '24px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', transition: 'transform 0.15s', textAlign: 'center' };
const livelloCard = { background: colore, borderRadius: '20px', padding: '36px 30px', cursor: 'pointer', flex: 1, minWidth: '180px', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.12)', transition: 'transform 0.2s' };
const badgeStyle = { color: 'white', borderRadius: '20px', padding: '4px 12px', fontSize: '0.8rem', fontWeight: 600 };
const quizBox = { background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' };
const risultatoBox = { background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' };
const progressBar = { height: '6px', background: '#f0f0f0', borderRadius: '10px', marginBottom: '16px', overflow: 'hidden' };
const progressFill = { height: '100%', borderRadius: '10px', background: colore, transition: 'width 0.4s' };
const feedbackBox = { display: 'flex', gap: '12px', alignItems: 'center', borderRadius: '10px', padding: '14px 16px', marginTop: '16px' };
const btnPrimario = { background: colore, color: 'white', border: 'none', borderRadius: '10px', padding: '12px 24px', cursor: 'pointer', fontSize: '1rem', fontWeight: 600 };
