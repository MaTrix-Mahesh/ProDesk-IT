import './Authors.css';

export default function Authors({ authors }) {
  if (!authors || authors.length === 0) return null;
  return (
    <section className="authors" id="authors" aria-label="Authors Section">
      <div className="authors-header">
        <span className="section-badge">Meet the Authors</span>
        <h2>Featured Literary Minds</h2>
        <p className="section-desc">Celebrated voices from around the world</p>
      </div>
      <div className="author-grid">
        {authors.map((author) => (
          <div key={author.id} className="author-card">
            <div className="author-card-glow" />
            <div className="author-photo-wrap">
              <img src={author.photo || 'https://via.placeholder.com/150'} alt={author.name} className="author-photo" />
            </div>
            <h3 className="author-name">{author.name}</h3>
            <p className="author-bio">{author.bio || 'Author bio not available.'}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
