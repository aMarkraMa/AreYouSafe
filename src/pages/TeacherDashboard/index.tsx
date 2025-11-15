/**
 * Teacher Dashboard - View and manage reports
 */
import { useState, useEffect } from 'react';
import { getReports, updateReport, type Report } from '@/lib/api';
import { Button } from '@/components/ui/button';
import './TeacherDashboard.css';

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  reviewed: { label: 'Reviewed', color: 'bg-blue-100 text-blue-800' },
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-800' },
};

const emotionColors: Record<string, string> = {
  green: '#22c55e',
  yellow: '#eab308',
  orange: '#f97316',
  red: '#ef4444',
  'dark-red': '#dc2626',
};

export function TeacherDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [teacherNotes, setTeacherNotes] = useState('');

  useEffect(() => {
    loadReports();
    // Refresh every 30 seconds
    const interval = setInterval(loadReports, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadReports = async () => {
    try {
      setIsLoading(true);
      const data = await getReports();
      setReports(data);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (reportId: string, newStatus: string) => {
    try {
      await updateReport(reportId, newStatus);
      await loadReports();
      if (selectedReport?.id === reportId) {
        const updated = reports.find((r) => r.id === reportId);
        if (updated) setSelectedReport(updated);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedReport) return;
    try {
      await updateReport(selectedReport.id, undefined, teacherNotes);
      await loadReports();
      const updated = reports.find((r) => r.id === selectedReport.id);
      if (updated) {
        setSelectedReport(updated);
        setTeacherNotes(updated.teacherNotes || '');
      }
      alert('Notes saved successfully');
    } catch (error) {
      console.error('Error saving notes:', error);
      alert('Error saving notes');
    }
  };

  const filteredReports = filter === 'all' 
    ? reports 
    : reports.filter((r) => r.status === filter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="teacher-dashboard">
        <div className="loading">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Are You Safe - Teacher Dashboard</h1>
        <p className="dashboard-subtitle">
          {reports.length} total report(s) • {reports.filter((r) => r.status === 'pending').length} pending
        </p>
      </div>

      <div className="dashboard-content">
        <div className="reports-list">
          <div className="filters">
            <button
              onClick={() => setFilter('all')}
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            >
              All ({reports.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            >
              Pending ({reports.filter((r) => r.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('reviewed')}
              className={`filter-btn ${filter === 'reviewed' ? 'active' : ''}`}
            >
              Reviewed ({reports.filter((r) => r.status === 'reviewed').length})
            </button>
            <button
              onClick={() => setFilter('resolved')}
              className={`filter-btn ${filter === 'resolved' ? 'active' : ''}`}
            >
              Resolved ({reports.filter((r) => r.status === 'resolved').length})
            </button>
          </div>

          <div className="reports-grid">
            {filteredReports.length === 0 ? (
              <div className="empty-state">
                <p>No reports to display</p>
              </div>
            ) : (
              filteredReports.map((report) => (
                <div
                  key={report.id}
                  className={`report-card ${selectedReport?.id === report.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedReport(report);
                    setTeacherNotes(report.teacherNotes || '');
                  }}
                >
                  <div className="report-card-header">
                    <div className="student-info">
                      <span className="student-name">{report.studentName}</span>
                      <span className="report-date">{formatDate(report.timestamp)}</span>
                    </div>
                    <span className={`status-badge ${statusLabels[report.status].color}`}>
                      {statusLabels[report.status].label}
                    </span>
                  </div>
                  
                  <div className="report-preview">
                    <div className="preview-item">
                      <span className="preview-label">Symbols:</span>
                      <div className="symbols-preview">
                        {report.symbols.slice(0, 3).map((s) => (
                          <span key={s.id} className="symbol-tag">
                            {s.label}
                          </span>
                        ))}
                        {report.symbols.length > 3 && (
                          <span className="symbol-tag">+{report.symbols.length - 3}</span>
                        )}
                      </div>
                    </div>
                    <div className="preview-item">
                      <span className="preview-label">Location:</span>
                      <span>{report.location.icon} {report.location.name}</span>
                    </div>
                    <div className="preview-item">
                      <span className="preview-label">Emotion:</span>
                      <div
                        className="emotion-indicator"
                        style={{ backgroundColor: emotionColors[report.emotion.color] }}
                      >
                        Level {report.emotion.level}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {selectedReport && (
          <div className="report-detail">
            <div className="detail-header">
              <h2>Report Details</h2>
              <button
                onClick={() => setSelectedReport(null)}
                className="close-btn"
              >
                ×
              </button>
            </div>

            <div className="detail-content">
              <div className="detail-section">
                <h3>Student</h3>
                <p>{selectedReport.studentName} (ID: {selectedReport.studentId})</p>
                <p className="text-sm text-muted-foreground">
                  Reported on {formatDate(selectedReport.timestamp)}
                </p>
              </div>

              <div className="detail-section">
                <h3>Incident Type</h3>
                <div className="symbols-list">
                  {selectedReport.symbols.map((symbol) => (
                    <div key={symbol.id} className="symbol-item">
                      <span className="symbol-category">{symbol.category}</span>
                      <span className="symbol-name">{symbol.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedReport.bodyMap && selectedReport.bodyMap.length > 0 && (
                <div className="detail-section">
                  <h3>Physical Harassment</h3>
                  <div className="body-parts-list">
                    {selectedReport.bodyMap.map((point, index) => (
                      <span key={index} className="body-part-tag">
                        {point.bodyPart}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="detail-section">
                <h3>Location</h3>
                <p>
                  {selectedReport.location.icon} {selectedReport.location.name}
                </p>
              </div>

              <div className="detail-section">
                <h3>Frequency</h3>
                <p>
                  {selectedReport.frequency.value === 'once' && 'Once'}
                  {selectedReport.frequency.value === 'sometimes' && 'Sometimes'}
                  {selectedReport.frequency.value === 'often' && 'Often'}
                  {selectedReport.frequency.value === 'always' && 'Always'}
                </p>
              </div>

              <div className="detail-section">
                <h3>Emotional State</h3>
                <div className="emotion-display">
                  <div
                    className="emotion-bar"
                    style={{
                      width: `${(selectedReport.emotion.level / 5) * 100}%`,
                      backgroundColor: emotionColors[selectedReport.emotion.color],
                    }}
                  />
                  <span>Level {selectedReport.emotion.level}/5</span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Safety Level</h3>
                <div className="safety-display">
                  <div
                    className="safety-bar"
                    style={{
                      width: `${(selectedReport.safety.level / 5) * 100}%`,
                      backgroundColor:
                        selectedReport.safety.level <= 2
                          ? '#22c55e'
                          : selectedReport.safety.level <= 3
                          ? '#eab308'
                          : '#ef4444',
                    }}
                  />
                  <span>Level {selectedReport.safety.level}/5</span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Status</h3>
                <div className="status-actions">
                  <Button
                    variant={selectedReport.status === 'pending' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusChange(selectedReport.id, 'pending')}
                  >
                    Pending
                  </Button>
                  <Button
                    variant={selectedReport.status === 'reviewed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusChange(selectedReport.id, 'reviewed')}
                  >
                    Reviewed
                  </Button>
                  <Button
                    variant={selectedReport.status === 'resolved' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusChange(selectedReport.id, 'resolved')}
                  >
                    Resolved
                  </Button>
                </div>
              </div>

              <div className="detail-section">
                <h3>Teacher Notes</h3>
                <textarea
                  value={teacherNotes}
                  onChange={(e) => setTeacherNotes(e.target.value)}
                  placeholder="Add your notes here..."
                  className="notes-textarea"
                  rows={4}
                />
                <Button onClick={handleSaveNotes} className="mt-2" size="sm">
                  Save Notes
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

