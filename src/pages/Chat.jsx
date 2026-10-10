import { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical, Search } from 'lucide-react';
import './Chat.css';

const MOCK_CONTACTS = [
  { id: 1, name: 'Sarah (Senior Mentor)', lastMsg: 'I can help you with your course registration!', time: '10:42 AM', unread: 2, online: true },
  { id: 2, name: 'Mike (CS Tutor)', lastMsg: 'Did you get the assignment working?', time: 'Yesterday', unread: 0, online: false },
  { id: 3, name: 'Campus IT Desk', lastMsg: 'Your ticket has been resolved.', time: 'Monday', unread: 0, online: true },
];

const MOCK_MESSAGES = [
  { id: 1, sender: 'Sarah (Senior Mentor)', text: 'Hey there! How is your first week going?', time: '10:30 AM', isMine: false },
  { id: 2, sender: 'Me', text: 'It is a bit overwhelming, but okay. I am confused about registering for electives.', time: '10:35 AM', isMine: true },
  { id: 3, sender: 'Sarah (Senior Mentor)', text: 'I can help you with your course registration! Want to hop on a quick call later?', time: '10:42 AM', isMine: false },
];

const Chat = () => {
  const [activeContact, setActiveContact] = useState(MOCK_CONTACTS[0]);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'Me',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true
    };
    
    setMessages([...messages, newMsg]);
    setInput('');

    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: activeContact.name,
        text: 'That sounds good! Let me check my schedule and get back to you.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMine: false
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  return (
    <div className="chat-container card">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Mentors</h2>
          <div className="search-bar">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search chats..." className="input-field search-input" />
          </div>
        </div>
        
        <div className="contact-list">
          {MOCK_CONTACTS.map(contact => (
            <div 
              key={contact.id} 
              className={`contact-item ${activeContact.id === contact.id ? 'active' : ''}`}
              onClick={() => setActiveContact(contact)}
            >
              <div className="contact-info">
                <div className="contact-top">
                  <h4>{contact.name} {contact.online && <span className="online-dot"></span>}</h4>
                  <span className="contact-time">{contact.time}</span>
                </div>
                <div className="contact-bottom">
                  <p className="last-msg">{contact.lastMsg}</p>
                  {contact.unread > 0 && <span className="unread-badge">{contact.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <div className="chat-header-info">
            <h3>{activeContact.name}</h3>
            <span className="status">{activeContact.online ? 'Online' : 'Offline'}</span>
          </div>
          <div className="chat-header-actions">
            <button className="btn-ghost"><Phone size={18} /></button>
            <button className="btn-ghost"><Video size={18} /></button>
            <button className="btn-ghost"><MoreVertical size={18} /></button>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message-wrapper ${msg.isMine ? 'mine' : 'theirs'}`}>
              <div className="message-bubble">
                <p>{msg.text}</p>
                <span className="msg-time">{msg.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Type a message..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn-primary">
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
