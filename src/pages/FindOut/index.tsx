/**
 * Find Out Page - Educational content about preventing harassment
 */
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Users, Heart, BookOpen } from 'lucide-react';
import './FindOut.css';

export function FindOut() {
  return (
    <div className="find-out-page">
      <div className="find-out-container">
        <Link to="/" className="back-button">
          <ArrowLeft className="back-icon" />
          <span>Back to Home</span>
        </Link>

        <div className="find-out-header">
          <h1 className="find-out-title">Find Out</h1>
          <p className="find-out-subtitle">
            Learn about preventing harassment and how to stay safe
          </p>
        </div>

        <div className="educational-content">
          <div className="content-section">
            <div className="section-icon">
              <Shield />
            </div>
            <h2 className="section-title">What is Harassment?</h2>
            <p className="section-text">
              Harassment is any unwanted behavior that makes someone feel uncomfortable, 
              scared, or hurt. It can be physical, verbal, social, or happen online.
            </p>
          </div>

          <div className="content-section">
            <div className="section-icon">
              <Users />
            </div>
            <h2 className="section-title">Types of Harassment</h2>
            <div className="types-list">
              <div className="type-item">
                <strong>Physical:</strong> Hitting, pushing, or touching someone without permission
              </div>
              <div className="type-item">
                <strong>Verbal:</strong> Insults, threats, or mean words
              </div>
              <div className="type-item">
                <strong>Social:</strong> Excluding someone, spreading rumors, or ignoring them
              </div>
              <div className="type-item">
                <strong>Cyber:</strong> Mean messages, sharing photos without permission, or online bullying
              </div>
            </div>
          </div>

          <div className="content-section">
            <div className="section-icon">
              <Heart />
            </div>
            <h2 className="section-title">How to Stay Safe</h2>
            <ul className="safety-list">
              <li>Stay with friends or trusted adults when possible</li>
              <li>Tell a teacher, parent, or trusted adult if something happens</li>
              <li>Remember: It's never your fault if someone harasses you</li>
              <li>Use this platform to report incidents safely and anonymously</li>
              <li>Be kind to others and stand up for those who need help</li>
            </ul>
          </div>

          <div className="content-section">
            <div className="section-icon">
              <BookOpen />
            </div>
            <h2 className="section-title">What to Do If You See Harassment</h2>
            <div className="action-steps">
              <div className="step-item">
                <span className="step-number">1</span>
                <div className="step-content">
                  <h3>Stay Safe</h3>
                  <p>Don't put yourself in danger. Get help from an adult if needed.</p>
                </div>
              </div>
              <div className="step-item">
                <span className="step-number">2</span>
                <div className="step-content">
                  <h3>Report It</h3>
                  <p>Use the "Help someone in need" option to report what you saw.</p>
                </div>
              </div>
              <div className="step-item">
                <span className="step-number">3</span>
                <div className="step-content">
                  <h3>Be Supportive</h3>
                  <p>Offer kind words and support to the person who was harassed.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <Link to="/student">
              <Button size="lg" className="action-btn">
                Get Help for Myself
              </Button>
            </Link>
            <Link to="/help-others">
              <Button size="lg" variant="outline" className="action-btn">
                Help Someone in Need
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

