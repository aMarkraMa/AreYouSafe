/**
 * Help Others Page - Report for someone else
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SymbolSelector } from '@/components/reporting/SymbolSelector';
import { BodyMap } from '@/components/reporting/BodyMap';
import { EmotionScaleComponent } from '@/components/reporting/EmotionScale';
import { SafetyThermometerComponent } from '@/components/reporting/SafetyThermometer';
import { Button } from '@/components/ui/button';
import {
  createReport,
  getLocations,
  type Location,
  type SymbolSelection,
  type BodyMapSelection,
  type EmotionScale,
  type Frequency,
  type SafetyThermometer,
} from '@/lib/api';
import './HelpOthers.css';

const frequencyOptions = [
  { value: 'once', label: 'Once' },
  { value: 'sometimes', label: 'Sometimes' },
  { value: 'often', label: 'Often' },
  { value: 'always', label: 'Always' },
];

export function HelpOthers() {
  const [step, setStep] = useState(1);
  const [reporterId] = useState('reporter-001'); // To be replaced with authentication
  const [reporterName] = useState('Reporter'); // To be replaced with authentication
  const [studentName, setStudentName] = useState('');
  
  const [symbols, setSymbols] = useState<SymbolSelection[]>([]);
  const [bodyMap, setBodyMap] = useState<BodyMapSelection[]>([]);
  const [emotion, setEmotion] = useState<EmotionScale | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [frequency, setFrequency] = useState<Frequency | null>(null);
  const [safety, setSafety] = useState<SafetyThermometer | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const data = await getLocations();
      setLocations(data);
    } catch (error) {
      console.error('Error loading locations:', error);
    }
  };

  const handleSubmit = async () => {
    if (!symbols.length || !emotion || !location || !frequency || !safety || !studentName.trim()) {
      alert('Please fill in all required fields including the student name');
      return;
    }

    setIsSubmitting(true);
    try {
      await createReport({
        studentId: `student-${Date.now()}`,
        studentName: studentName.trim(),
        symbols,
        bodyMap: bodyMap.length > 0 ? bodyMap : undefined,
        emotion,
        location,
        frequency,
        safety,
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        resetForm();
      }, 3000);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Error sending report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setStudentName('');
    setSymbols([]);
    setBodyMap([]);
    setEmotion(null);
    setLocation(null);
    setFrequency(null);
    setSafety(null);
    setSubmitSuccess(false);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return studentName.trim().length > 0;
      case 2:
        return symbols.length > 0;
      case 3:
        return emotion !== null;
      case 4:
        return location !== null;
      case 5:
        return frequency !== null;
      case 6:
        return safety !== null;
      default:
        return false;
    }
  };

  if (submitSuccess) {
    return (
      <div className="help-others-page">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>Report Sent Successfully</h2>
          <p>Your report for {studentName || 'the student'} has been received. A teacher will review it shortly.</p>
          <div className="success-actions">
            <Link to="/">
              <Button variant="outline" className="mt-4">
                Back to Home
              </Button>
            </Link>
            <Button onClick={resetForm} className="mt-4">
              Create New Report
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="help-others-page">
      <Link to="/" className="dashboard-title-link">
        <h1 className="dashboard-title">Are You Safe</h1>
      </Link>

      <div className="progress-bar">
        <div className="progress-steps">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div
              key={s}
              className={`progress-step ${s <= step ? 'active' : ''} ${s === step ? 'current' : ''}`}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      <div className="report-form">
        {step === 1 && (
          <div className="form-step">
            <h3 className="text-lg font-semibold mb-4">Who needs help?</h3>
            <div className="student-name-input">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter the student's name (or leave anonymous)"
                className="name-input"
              />
              <p className="text-sm text-muted-foreground mt-2">
                You can enter their name or leave it blank to report anonymously
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <SymbolSelector onSelect={setSymbols} selectedSymbols={symbols} />
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <EmotionScaleComponent onSelect={setEmotion} selectedEmotion={emotion || undefined} />
          </div>
        )}

        {step === 4 && (
          <div className="form-step">
            <h3 className="text-lg font-semibold mb-4">Where did this happen?</h3>
            <div className="locations-grid">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setLocation(loc)}
                  className={`location-card ${location?.id === loc.id ? 'selected' : ''}`}
                >
                  <span className="location-icon">{loc.icon}</span>
                  <span className="location-name">{loc.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="form-step">
            <h3 className="text-lg font-semibold mb-4">How often does this happen?</h3>
            <div className="frequency-options">
              {frequencyOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFrequency({ value: opt.value })}
                  className={`frequency-btn ${frequency?.value === opt.value ? 'selected' : ''}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="form-step">
            <SafetyThermometerComponent
              onSelect={setSafety}
              selectedSafety={safety || undefined}
            />
            {symbols.some((s) => s.category === 'physical') && (
              <div className="mt-8">
                <BodyMap onSelect={setBodyMap} selectedPoints={bodyMap} />
              </div>
            )}
          </div>
        )}

        <div className="form-actions">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="previous-btn">
              Previous
            </Button>
          )}
          {step < 6 ? (
            <Button onClick={() => setStep(step + 1)} disabled={!canProceed()} className="next-btn">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canProceed() || isSubmitting} className="next-btn">
              {isSubmitting ? 'Sending...' : 'Submit Report'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

