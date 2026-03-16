import Card from '../components/Card';

export default function Home({ setPage }) {
  return (
    <div style={wrapper}>
      <div style={hero}>
        <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🇪🇸</div>
        <h1 style={{ fontSize: '2.8rem', color: '#1a1a2e', marginBottom: '12px', fontWeight: 800 }}>
          Impara lo Spagnolo
        </h1>
        <p style={{ color: '#666', fontSize: '1.15rem', maxWidth: '480px', lineHeight: 1.6 }}>
          Un percorso strutturato per principianti. Grammatica, vocabolario e conversazione, tutto in un posto.
        </p>
      </div>
      <div style={grid}>
        <Card
          title="📚 Grammatica"
          description="Articoli, verbi, tempi verbali e strutture. Lezioni chiare con esempi pratici."
          color="#e05c5c"
          onClick={() => setPage('grammatica')}
        />
        <Card
          title="🔤 Lessico"
          description="Flashcard interattive per numeri, colori, famiglia, cibo e molto altro."
          color="#5c9ee0"
          onClick={() => setPage('lessico')}
        />
        <Card
          title="💬 Conversazione"
          description="Pratica con un tutor AI che si adatta al tuo livello e corregge i tuoi errori."
          color="#5cc47e"
          onClick={() => setPage('conversazione')}
        />
      </div>
      <p style={{ color: '#bbb', marginTop: '50px', fontSize: '0.9rem' }}>
        Livelli disponibili: A1 · A2 · B1
      </p>
    </div>
  );
}

const wrapper = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '60px 30px',
  background: 'linear-gradient(135deg, #f0f4ff 0%, #fef9f0 100%)',
};

const hero = {
  textAlign: 'center',
  marginBottom: '50px',
};

const grid = {
  display: 'flex',
  gap: '24px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: '100%',
  maxWidth: '960px',
};
