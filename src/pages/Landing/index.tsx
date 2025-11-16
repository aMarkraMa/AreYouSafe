/**
 * Landing Page - Présentation de l'application Are You Safe
 */
import { Link } from 'react-router-dom';
import './Landing.css';

export function Landing() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Are You Safe
            </h1>
            <p className="hero-subtitle">
              Un espace sûr pour signaler le harcèlement scolaire sans barrières
            </p>
            <p className="hero-description">
              Conçu spécialement pour les étudiants autistes, dyslexiques et primo-arrivants. 
              Exprimez-vous visuellement, sans mots, en toute sécurité.
            </p>
            <div className="hero-cta">
              <Link to="/register" className="btn-primary">
                Commencer maintenant
              </Link>
              <Link to="/find-out" className="btn-secondary">
                En savoir plus
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-icon">🛡️</div>
              <p className="hero-card-text">Signalement visuel</p>
            </div>
            <div className="hero-card">
              <div className="hero-card-icon">🤝</div>
              <p className="hero-card-text">Support immédiat</p>
            </div>
            <div className="hero-card">
              <div className="hero-card-icon">🔒</div>
              <p className="hero-card-text">Confidentialité totale</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-container">
          <h2 className="section-title">Comment ça marche ?</h2>
          <p className="section-subtitle">
            Un processus simple en 3 étapes pour signaler un incident
          </p>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Sélectionne des symboles</h3>
              <p className="step-description">
                Choisis parmi une bibliothèque de symboles visuels pour décrire ce qui s'est passé. 
                Pas besoin de mots compliqués.
              </p>
              <div className="step-visual">
                <div className="symbol-demo">😢</div>
                <div className="symbol-demo">👊</div>
                <div className="symbol-demo">💬</div>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Indique où et quand</h3>
              <p className="step-description">
                Utilise la carte corporelle pour montrer où tu as été touché, 
                et sélectionne le lieu et la fréquence des incidents.
              </p>
              <div className="step-visual">
                <div className="location-demo">📍 Cour de récréation</div>
                <div className="location-demo">📅 Plusieurs fois</div>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Envoie ton signalement</h3>
              <p className="step-description">
                Ton signalement est envoyé de manière confidentielle aux enseignants 
                qui peuvent t'aider rapidement.
              </p>
              <div className="step-visual">
                <div className="send-demo">✓ Signalement envoyé</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <h2 className="section-title">Fonctionnalités clés</h2>
          <p className="section-subtitle">
            Des outils pensés pour l'accessibilité et la sécurité
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3 className="feature-title">Signalement visuel</h3>
              <p className="feature-description">
                Utilise des symboles et des images pour t'exprimer sans avoir besoin d'écrire.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🧍</div>
              <h3 className="feature-title">Carte corporelle</h3>
              <p className="feature-description">
                Indique précisément les zones touchées lors d'un harcèlement physique.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">😊</div>
              <h3 className="feature-title">Échelle émotionnelle</h3>
              <p className="feature-description">
                Exprime tes sentiments avec des émojis et une échelle visuelle simple.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌡️</div>
              <h3 className="feature-title">Thermomètre de sécurité</h3>
              <p className="feature-description">
                Indique ton niveau de sécurité ressenti avec un thermomètre intuitif.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3 className="feature-title">Sélection de lieu</h3>
              <p className="feature-description">
                Choisis facilement où l'incident s'est produit parmi les lieux de l'école.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Suivi des incidents</h3>
              <p className="feature-description">
                Les enseignants peuvent suivre et gérer tous les signalements efficacement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="social-proof-section">
        <div className="section-container">
          <h2 className="section-title">Un impact réel</h2>
          <p className="section-subtitle">
            Ensemble, créons des écoles plus sûres pour tous
          </p>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <p className="stat-label">Accessible</p>
              <p className="stat-description">
                Conçu pour tous les étudiants, quelles que soient leurs capacités
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-number">0</div>
              <p className="stat-label">Barrière linguistique</p>
              <p className="stat-description">
                Communication visuelle universelle sans besoin de mots
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <p className="stat-label">Disponibilité</p>
              <p className="stat-description">
                Signale un incident à tout moment, où que tu sois
              </p>
            </div>
          </div>

          <div className="testimonials">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Enfin un outil qui permet à tous les élèves de s'exprimer, 
                peu importe leurs difficultés de communication."
              </p>
              <p className="testimonial-author">— Enseignante, Collège Victor Hugo</p>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-text">
                "Les symboles visuels ont permis à mes élèves autistes de signaler 
                des incidents qu'ils n'auraient jamais pu exprimer avec des mots."
              </p>
              <p className="testimonial-author">— Éducateur spécialisé, Lycée Jean Moulin</p>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-text">
                "Un système simple et efficace qui donne une voix à ceux qui 
                en ont le plus besoin."
              </p>
              <p className="testimonial-author">— Directrice, École Primaire Les Lilas</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Prêt à créer un environnement plus sûr ?</h2>
          <p className="cta-description">
            Rejoins des milliers d'étudiants et d'enseignants qui utilisent Are You Safe 
            pour lutter contre le harcèlement scolaire.
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="btn-primary-large">
              Créer un compte gratuitement
            </Link>
            <Link to="/login" className="btn-secondary-large">
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">Are You Safe</h3>
              <p className="footer-description">
                Un espace sûr pour signaler le harcèlement scolaire sans barrières.
              </p>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">Navigation</h4>
              <ul className="footer-links">
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/find-out">En savoir plus</Link></li>
                <li><Link to="/register">S'inscrire</Link></li>
                <li><Link to="/login">Se connecter</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">Ressources</h4>
              <ul className="footer-links">
                <li><a href="#how-it-works">Comment ça marche</a></li>
                <li><a href="#features">Fonctionnalités</a></li>
                <li><Link to="/student">Dashboard Étudiant</Link></li>
                <li><Link to="/teacher">Dashboard Enseignant</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">Support</h4>
              <ul className="footer-links">
                <li><a href="#contact">Contact</a></li>
                <li><a href="#help">Aide</a></li>
                <li><a href="#privacy">Confidentialité</a></li>
                <li><a href="#terms">Conditions d'utilisation</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2025 Are You Safe. Tous droits réservés. Projet Hackathon.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
