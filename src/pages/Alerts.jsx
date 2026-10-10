import { AlertTriangle, Info, ExternalLink } from 'lucide-react';
import './Alerts.css';

const MOCK_ALERTS = [
  {
    id: 1,
    type: 'urgent',
    title: 'Fire Drill in North Hall',
    content: 'A scheduled fire drill will take place in North Hall in 10 minutes. Please evacuate calmly to the main quad.',
    time: '2 mins ago',
    channel: '#announcements',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Library Elevator Maintenance',
    content: 'The main elevators in the library will be out of service from 2 PM to 5 PM today.',
    time: '1 hour ago',
    channel: '#general-updates',
  },
  {
    id: 3,
    type: 'info',
    title: 'Free Pizza at Student Union',
    content: 'The CS club is giving away free pizza at the Student Union room 204. First come, first served!',
    time: '2 hours ago',
    channel: '#random',
  }
];

const Alerts = () => {
  return (
    <div className="alerts-container">
      <header className="page-header">
        <h1>Urgent Alerts</h1>
        <p>Synced live from the Campus Discord server.</p>
      </header>

      <div className="alerts-list">
        {MOCK_ALERTS.map(alert => (
          <div key={alert.id} className={`alert-card card type-${alert.type}`}>
            <div className="alert-content">
              <div className="alert-header">
                <h3>
                  {alert.type === 'urgent' && <AlertTriangle size={18} className="icon-urgent" />}
                  {alert.type === 'warning' && <AlertTriangle size={18} className="icon-warning" />}
                  {alert.type === 'info' && <Info size={18} className="icon-info" />}
                  {alert.title}
                </h3>
                <span className="alert-time">{alert.time}</span>
              </div>
              <p>{alert.content}</p>
              
              <div className="alert-footer">
                <div className="alert-meta">
                  <span className={`badge badge-${alert.type}`}>
                    {alert.type.toUpperCase()}
                  </span>
                  <span className="channel-name">{alert.channel}</span>
                </div>
                <a href="#" className="discord-link">
                  Open in Discord <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
