import { useState, useMemo } from 'react';
import { Search, Book, PenTool as Tool, MessageSquare, AlertCircle, Clock, CheckCircle2, PhoneCall, ChevronRight } from 'lucide-react';
import { ARTICLES, CATEGORIES, type Article } from './data';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'home' | 'article' | 'form'>('home');
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(art => {
      const matchesCategory = !selectedCategory || art.category === selectedCategory;
      const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleArticleClick = (article: Article) => {
    setCurrentArticle(article);
    setView('article');
    window.scrollTo(0, 0);
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setView('home');
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar glass">
        <div style={{ marginBottom: '2rem' }} onClick={resetFilters} className="cursor-pointer">
          <h2 className="gradient-text" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>NEXTGEN-TI</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Base de Conocimiento Técnica</p>
        </div>

        <nav>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Categorías</p>
          <ul style={{ listStyle: 'none' }}>
            <li
              style={{ marginBottom: '0.5rem', cursor: 'pointer', color: !selectedCategory ? 'var(--accent-primary)' : 'var(--text-primary)' }}
              onClick={() => setSelectedCategory(null)}
            >
              Todas
            </li>
            {CATEGORIES.map(cat => (
              <li
                key={cat}
                style={{
                  marginBottom: '0.5rem',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  transition: 'background 0.2s',
                  background: selectedCategory === cat ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                  color: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--text-secondary)'
                }}
                className="hover-sidebar-item"
                onClick={() => {
                  setSelectedCategory(cat);
                  setView('home');
                }}
              >
                {cat}
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '2rem' }}>
            <button
              className="btn-primary"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onClick={() => setView('form')}
            >
              <MessageSquare size={18} />
              Reportar Incidencia
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header style={{ marginBottom: '3rem', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={18} />
            <input
              type="text"
              className="form-control"
              placeholder="Buscar soluciones, problemas..."
              style={{ paddingLeft: '40px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {view === 'home' && (
          <section className="fade-in">
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Book className="gradient-text" />
              {selectedCategory ? `Artículos de ${selectedCategory}` : 'Todos los Artículos'}
            </h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              {filteredArticles.length > 0 ? filteredArticles.map(art => (
                <div
                  key={art.id}
                  className="glass"
                  style={{ padding: '1.5rem', borderRadius: '12px', cursor: 'pointer', transition: 'transform 0.2s' }}
                  onClick={() => handleArticleClick(art)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', textTransform: 'uppercase', fontWeight: 600 }}>{art.category}</span>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      background: `var(--urgency-${art.urgency.toLowerCase()})`,
                      color: 'white',
                      fontWeight: 700
                    }}>
                      {art.urgency}
                    </span>
                  </div>
                  <h3 style={{ marginBottom: '0.5rem' }}>{art.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{art.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 600 }}>
                    Ver solución <ChevronRight size={16} />
                  </div>
                </div>
              )) : (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                  No se encontraron artículos que coincidan con la búsqueda.
                </div>
              )}
            </div>
          </section>
        )}

        {view === 'article' && currentArticle && (
          <article className="fade-in">
            <button
              onClick={() => setView('home')}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              ← Volver al listado
            </button>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
                <span style={{ background: 'rgba(235, 243, 247, 0.1)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>{currentArticle.category}</span>
                <span style={{ background: `var(--urgency-${currentArticle.urgency.toLowerCase()})`, color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>{currentArticle.urgency}</span>
              </div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{currentArticle.title}</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>{currentArticle.description}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '3rem' }}>
              <div className="glass" style={{ padding: '1.5rem', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
                  <Clock size={20} />
                  <h4 style={{ margin: 0 }}>Tiempo Estimado</h4>
                </div>
                <p>{currentArticle.timeEstimated}</p>
              </div>
              <div className="glass" style={{ padding: '1.5rem', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
                  <AlertCircle size={20} />
                  <h4 style={{ margin: 0 }}>Prerrequisitos</h4>
                </div>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
                  {currentArticle.prerequisites.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
            </div>

            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 color="var(--accent-primary)" /> Solución Paso a Paso
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {currentArticle.solutionSteps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '15px' }}>
                    <div style={{
                      minWidth: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: 'var(--accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}>
                      {i + 1}
                    </div>
                    <p style={{ paddingTop: '5px' }}>{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Tool color="var(--accent-primary)" /> Solución de Problemas
              </h3>
              <div className="glass" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-primary)', borderRadius: '0 12px 12px 0' }}>
                <ul style={{ listStyle: 'none' }}>
                  {currentArticle.troubleshooting.map((t, i) => (
                    <li key={i} style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                      <span style={{ color: 'var(--accent-primary)' }}>•</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <footer className="glass" style={{ padding: '1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <PhoneCall size={18} color="var(--accent-primary)" /> Contacto de Escalamiento
                </h4>
                <p style={{ color: 'var(--text-secondary)' }}>{currentArticle.contactEscalation}</p>
              </div>
              <button className="btn-primary" onClick={() => setView('form')}>Reportar si persiste</button>
            </footer>
          </article>
        )}

        {view === 'form' && (
          <section className="fade-in">
            <button
              onClick={() => setView('home')}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              ← Cancelar
            </button>
            <h2 style={{ marginBottom: '2rem' }}>Formulario de Contacto y Reportes</h2>
            <form className="glass" style={{ padding: '2rem', borderRadius: '12px' }} onSubmit={(e) => {
              e.preventDefault();
              alert('Reporte enviado con éxito. Nuestro equipo se pondrá en contacto pronto.');
              setView('home');
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input type="text" className="form-control" required placeholder="Ej. Juan Pérez" />
                </div>
                <div className="form-group">
                  <label>Correo Electrónico</label>
                  <input type="email" className="form-control" required placeholder="juan@empresa.com" />
                </div>
              </div>
              <div className="form-group">
                <label>Tipo de Incidencia</label>
                <select className="form-control">
                  <option>Hardware / Equipos</option>
                  <option>Software / Aplicaciones</option>
                  <option>Conectividad / Red</option>
                  <option>Accesos / Contraseñas</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="form-group">
                <label>Asunto</label>
                <input type="text" className="form-control" required placeholder="Breve descripción del problema" />
              </div>
              <div className="form-group">
                <label>Descripción Detallada</label>
                <textarea className="form-control" required placeholder="Describe los síntomas y lo que has intentado hasta ahora..."></textarea>
              </div>
              <div className="form-group">
                <label>Nivel de Urgencia</label>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                    <input type="radio" name="urgency" value="Bajo" defaultChecked /> Bajo
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                    <input type="radio" name="urgency" value="Medio" /> Medio
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                    <input type="radio" name="urgency" value="Alto" /> Alto
                  </label>
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Enviar Reporte</button>
            </form>
          </section>
        )}
      </main>

      <style>{`
        .cursor-pointer { cursor: pointer; }
        .hover-sidebar-item:hover {
          background: rgba(240, 246, 252, 0.05) !important;
          color: var(--text-primary) !important;
        }
      `}</style>
    </div>
  );
}

export default App;
