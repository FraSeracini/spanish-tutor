import { useState } from 'react';

const risposte = {
  'hola': '¡Hola! ¿Cómo estás? (Ciao! Come stai?)',
  'cómo estás': '¡Estoy bien, gracias! ¿Y tú? (Sto bene, grazie! E tu?)',
  'bien': '¡Qué bueno! Sigamos practicando. (Che bello! Continuiamo a praticare.)',
  'me llamo': '¡Mucho gusto! Yo soy tu tutor de español. (Piacere! Io sono il tuo tutor di spagnolo.)',
  'cuántos años': 'Tengo muchos años de experiencia. 😄 ¿Y tú?',
  'gracias': '¡De nada! Estás aprendiendo muy bien. (Prego! Stai imparando molto bene.)',
  'adiós': '¡Hasta luego! Vuelve pronto. (A presto! Torna presto.)',
};

function getRisposta(input) {
  const lower = input.toLowerCase();
  for (const chiave of Object.keys(risposte)) {
    if (lower.includes(chiave)) return risposte[chiave];
  }
  return '¡Interesante! Prova a scrivere: "hola", "cómo estás", "me llamo [nome]", "gracias" o "adiós".';
}

export default function Conversazione({ setPage }) {
  const [messaggi, setMessaggi] = useState([
    { da: 'tutor', testo: '¡Hola! Sono il tuo tutor di spagnolo. Scrivi qualcosa in spagnolo per iniziare. Prova con "Hola"!' },
  ]);
  const [input, setInput] = useState('');

  function invia() {
    if (!input.trim()) return;
    const nuovi = [...messaggi, { da: 'utente', testo: input }];
    const risposta = getRisposta(input);
    nuovi.push({ da: 'tutor', testo: risposta });
    setMessaggi(nuovi);
    setInput('');
  }

  return (
    <div style={{ padding: '40px', maxWidth: '700px', margin: '0 auto' }}>
      <button onClick={() => setPage('home')} style={backBtn}>← Torna alla home</button>
      <h1 style={{ color: '#5cc47e', marginBottom: '20px' }}>💬 Conversazione</h1>
      <div style={chatBox}>
        {messaggi.map((m, i) => (
          <div key={i} style={{ textAlign: m.da === 'utente' ? 'right' : 'left', marginBottom: '12px' }}>
            <span style={m.da === 'utente' ? bubbleUtente : bubbleTutor}>{m.testo}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && invia()}
          placeholder="Scrivi in spagnolo..."
          style={inputStyle}
        />
        <button onClick={invia} style={sendBtn}>Invia</button>
      </div>
    </div>
  );
}

const chatBox = {
  background: 'white',
  borderRadius: '14px',
  padding: '20px',
  minHeight: '300px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  overflowY: 'auto',
  maxHeight: '400px',
};

const bubbleTutor = {
  background: '#e8fdf0',
  color: '#2a7a4b',
  borderRadius: '14px',
  padding: '10px 16px',
  display: 'inline-block',
  maxWidth: '80%',
};

const bubbleUtente = {
  background: '#5cc47e',
  color: 'white',
  borderRadius: '14px',
  padding: '10px 16px',
  display: 'inline-block',
  maxWidth: '80%',
};

const inputStyle = {
  flex: 1,
  padding: '12px 16px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  fontSize: '1rem',
};

const sendBtn = {
  background: '#5cc47e',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  padding: '12px 20px',
  cursor: 'pointer',
  fontSize: '1rem',
};

const backBtn = {
  background: 'none',
  border: 'none',
  color: '#5cc47e',
  cursor: 'pointer',
  fontSize: '1rem',
  marginBottom: '20px',
  padding: 0,
};
