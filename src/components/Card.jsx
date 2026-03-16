export default function Card({ title, description, color, onClick }) {
  return (
    <div
      onClick={onClick}
      style={cardStyle(color)}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.18)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
      }}
    >
      <h2 style={{ fontSize: '1.5rem', marginBottom: '14px', fontWeight: 700 }}>{title}</h2>
      <p style={{ fontSize: '0.98rem', opacity: 0.88, lineHeight: 1.6 }}>{description}</p>
      <div style={arrow}>→</div>
    </div>
  );
}

const cardStyle = (color) => ({
  background: color,
  borderRadius: '22px',
  padding: '36px 28px',
  cursor: 'pointer',
  color: 'white',
  flex: 1,
  minWidth: '240px',
  maxWidth: '300px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  position: 'relative',
});

const arrow = {
  position: 'absolute',
  bottom: '20px',
  right: '24px',
  fontSize: '1.3rem',
  opacity: 0.6,
};
