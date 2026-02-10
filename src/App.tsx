import { useState, useMemo } from 'react';
import { Search, Book, PenTool as Tool, MessageSquare, AlertCircle, Clock, CheckCircle2, PhoneCall, ChevronRight, Shield, Database, ClipboardCheck, Target, Cpu, Send } from 'lucide-react';
import { ARTICLES, CATEGORIES, type Article } from './data';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'home' | 'article' | 'form' | 'about' | 'chat' | 'legal' | 'survey' | 'data-management'>('home');
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
          <h2 className="gradient-text" style={{ fontSize: '1.2rem', marginBottom: '0.5rem', lineHeight: '1.2' }}>NextGen TI - Soluciones de IA para la Gestión Operativa</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Base de Conocimiento Centralizada con IA</p>
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

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '2rem 0 1rem 0' }}>Institucional</p>
          <ul style={{ listStyle: 'none' }}>
            <li
              className={`sidebar-link ${view === 'about' ? 'active' : ''}`}
              onClick={() => setView('about')}
            >
              <Target size={18} /> Identidad
            </li>
            <li
              className={`sidebar-link ${view === 'data-management' ? 'active' : ''}`}
              onClick={() => setView('data-management')}
            >
              <Database size={18} /> Diagnóstico
            </li>
            <li
              className={`sidebar-link ${view === 'legal' ? 'active' : ''}`}
              onClick={() => setView('legal')}
            >
              <Shield size={18} /> Sustento Legal
            </li>
            <li
              className={`sidebar-link ${view === 'chat' ? 'active' : ''}`}
              onClick={() => setView('chat')}
            >
              <Cpu size={18} /> Asistente IA
            </li>
            <li
              className={`sidebar-link ${view === 'survey' ? 'active' : ''}`}
              onClick={() => setView('survey')}
            >
              <ClipboardCheck size={18} /> Encuesta
            </li>
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

        {view === 'about' && (
          <section className="fade-in">
            <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Target className="gradient-text" /> Identidad Corporativa
            </h2>
            <div style={{ display: 'grid', gap: '30px' }}>
              <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                <h3 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Misión</h3>
                <p style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                  Nuestra misión es transformar la gestión tecnológica institucional mediante soluciones de vanguardia basadas en Inteligencia Artificial y automatización, garantizando un soporte técnico eficiente, transparente y centrado en la continuidad operativa.
                </p>
              </div>
              <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                <h3 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Visión</h3>
                <p style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                  Ser el referente nacional e internacional en innovación tecnológica basada en Inteligencia Artificial para el año 2030, liderando la transición de las instituciones venezolanas hacia un entorno digital inteligente que optimice la gestión pública y operativa.
                </p>
              </div>
              <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                <h3 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Valores Nucleares</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '1rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Innovación</div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Evolución constante a través de la IA.</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Ética</div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Integridad y responsabilidad en el manejo de datos.</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Inclusión</div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Tecnología accesible para todos los ciudadanos.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'data-management' && (
          <section className="fade-in">
            <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Database className="gradient-text" /> Diagnóstico Tecnológico
            </h2>
            <div className="glass" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Sustentación del Problema en Venezuela</h3>
              <p style={{ lineHeight: '1.7', marginBottom: '1.5rem' }}>
                Nuestra investigación en el contexto venezolano ha identificado que la <strong>gestión manual y la fragmentación de datos</strong> son los principales obstáculos para la eficiencia operativa. El uso extensivo de procesos basados en papel y sistemas desconectados genera retrasos críticos en la atención y resolución de incidencias.
              </p>
              <h4 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Impacto de la Inteligencia Artificial</h4>
              <p style={{ lineHeight: '1.7', marginBottom: '1.5rem' }}>
                La IA de NextGen TI aborda este problema mediante el procesamiento de lenguaje natural (NLP) y el aprendizaje automático, permitiendo que sistemas manuales ineficientes se transformen en flujos de trabajo inteligentes que automatizan la clasificación, prioridad y solución de requerimientos técnicos sin intervención humana constante.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ border: '1px solid rgba(255, 77, 77, 0.3)', padding: '1.5rem', borderRadius: '12px', background: 'rgba(255, 77, 77, 0.05)' }}>
                  <h4 style={{ color: '#ff4d4d', marginBottom: '0.5rem' }}>Antes (Manual)</h4>
                  <ul style={{ fontSize: '0.9rem', paddingLeft: '1.2rem', color: 'var(--text-secondary)' }}>
                    <li>Respuesta tardía {'>'}48h</li>
                    <li>Pérdida de trazabilidad</li>
                    <li>Errores de transcripción humana</li>
                    <li>Dependencia de personal físico</li>
                  </ul>
                </div>
                <div style={{ border: '1px solid rgba(56, 189, 248, 0.3)', padding: '1.5rem', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.05)' }}>
                  <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Ahora (Automatizado)</h4>
                  <ul style={{ fontSize: '0.9rem', paddingLeft: '1.2rem', color: 'var(--text-secondary)' }}>
                    <li>Respuesta instantánea vía IA</li>
                    <li>Centralización en tiempo real</li>
                    <li>Validación automática de datos</li>
                    <li>Escalabilidad ilimitada</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'legal' && (
          <section className="fade-in">
            <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield className="gradient-text" /> Ética, Seguridad y Sustento Legal
            </h2>
            <div style={{ display: 'grid', gap: '30px' }}>
              <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '15px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '12px' }}>
                    <Shield color="var(--accent-primary)" size={32} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0 }}>Compromiso con la Ética de Datos</h3>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Garantía de seguridad y transparencia institucional</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Ley de Infogobierno</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                      Nuestra plataforma cumple rigurosamente con los estándares de interoperabilidad y uso de tecnologías libres establecidos en la Ley de Infogobierno, facilitando la transparencia administrativa y la eficiencia del Estado.
                    </p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Artículo 28 - Constitución Nacional</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                      Garantizamos el derecho constitucional de toda persona a acceder a la información que de sí misma o de sus bienes conste en registros oficiales, implementando protocolos de cifrado y protección de datos personales de nivel bancario.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'survey' && (
          <section className="fade-in" style={{ textAlign: 'center', paddingTop: '3rem' }}>
            <ClipboardCheck size={64} className="gradient-text" style={{ marginBottom: '2rem' }} />
            <h2 style={{ marginBottom: '1rem' }}>Encuesta de Diagnóstico Tecnológico</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem auto', fontSize: '1.1rem' }}>
              Estamos recolectando datos reales de la población para mejorar continuamente nuestra infraestructura. Tu opinión es fundamental para la evolución de los servicios digitales.
            </p>
            <div className="glass" style={{ padding: '3rem', borderRadius: '24px', maxWidth: '500px', margin: '0 auto' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Contribuir con Datos Reales</h3>
              <a
                href="https://forms.gle/ejemplo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ textDecoration: 'none', display: 'inline-block', fontSize: '1.1rem', padding: '15px 40px' }}
              >
                Iniciar Encuesta
              </a>
              <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                * Los datos son tratados de forma anónima para fines estadísticos.
              </p>
            </div>
          </section>
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

        {view === 'chat' && (
          <div className="fade-in">
            <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cpu className="gradient-text" /> Chatbot de Soporte Técnico (Prototipo Virtual)
            </h2>
            <ChatSimulator />
          </div>
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

function ChatSimulator() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: '¡Hola! Bienvenid@ al Chatbot de Soporte Técnico de NextGen TI. Estoy aquí para asistirte con incidencias tecnológicas y consultas sobre nuestra gestión operativa mediante IA. ¿En qué puedo ayudarte?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulated Bot Responses
    setTimeout(() => {
      let botResponse = '';
      const text = input.toLowerCase();

      if (text.includes('hola') || text.includes('buenos')) {
        botResponse = '¡Hola! Como prototipo de soporte técnico, estoy diseñado para optimizar los procesos en Venezuela. ¿Tienes algún problema con tu equipo o deseas conocer nuestro diagnóstico tecnológico?';
      } else if (text.includes('manual') || text.includes('datos') || text.includes('diagnóstico')) {
        botResponse = 'Nuestro diagnóstico revela que la gestión manual en Venezuela es ineficiente. NextGen TI utiliza IA para automatizar estos procesos, reduciendo tiempos de espera en un 90%.';
      } else if (text.includes('legal') || text.includes('ley') || text.includes('ética')) {
        botResponse = 'Operamos bajo estrictos estándares éticos, cumpliendo con la Ley de Infogobierno y el Art. 28 de la Constitución sobre protección de datos.';
      } else if (text.includes('2030') || text.includes('visión')) {
        botResponse = 'Nuestra visión es ser el referente líder en IA para el año 2030, transformando la infraestructura digital del país.';
      } else {
        botResponse = 'Entiendo. Puedo ayudarte a categorizar una falla técnica o explicarte cómo nuestra IA soluciona los problemas de gestión manual identificados en el país.';
      }

      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="glass chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {isTyping && <div className="message bot" style={{ fontStyle: 'italic', opacity: 0.7 }}>La IA está procesando...</div>}
      </div>
      <form className="chat-input-area" onSubmit={handleSend}>
        <input
          type="text"
          className="chat-input"
          placeholder="Escribe tu consulta aquí..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn-primary" style={{ padding: '8px 15px' }}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}

export default App;
