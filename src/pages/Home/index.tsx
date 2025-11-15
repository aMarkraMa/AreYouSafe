/**
 * Home Page - Main navigation
 */
import { Link } from 'react-router-dom';
import { ThemeSelector } from '@/components/ThemeSelector';
import { LogIn } from 'lucide-react';
import './Home.css';

export function Home() {
  return (
    <div className="home-page">
      <ThemeSelector />
      
      {/* Teacher Login Button - Top Left */}
      <Link to="/teacher" className="teacher-login-btn">
        <LogIn className="login-icon" />
        <span>Teacher Login</span>
      </Link>

      <div className="home-container">
        <div className="home-header">
          <h1 className="home-title">Are You Safe</h1>
          <p className="home-subtitle">
            Visual School Harassment Reporting System
          </p>
        </div>

        <div className="main-options">
          <Link to="/student" className="main-option-card">
            <div className="option-icon">🆘</div>
            <h2 className="option-title">Get help for myself</h2>
            <div className="option-arrow">→</div>
          </Link>

          <Link to="/help-others" className="main-option-card">
            <div className="option-icon">🤝</div>
            <h2 className="option-title">Help someone in need</h2>
            <div className="option-arrow">→</div>
          </Link>

          <Link to="/find-out" className="main-option-card">
            <div className="option-icon">📚</div>
            <h2 className="option-title">Find out</h2>
            <div className="option-arrow">→</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

