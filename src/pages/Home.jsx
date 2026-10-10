import { useState } from 'react';
import { MessageCircle, ThumbsUp, Plus } from 'lucide-react';
import './Home.css';

const MOCK_QUESTIONS = [
  {
    id: 1,
    author: 'Alex (Freshman)',
    time: '2 mins ago',
    title: 'Where is the Science Building Room 304?',
    content: 'I have my first physics lab in 15 minutes and I cannot find the room! I am currently near the library.',
    likes: 5,
    replies: 2,
    tags: ['Urgent', 'Campus Navigation'],
    answered: true,
  },
  {
    id: 2,
    author: 'Sam (Freshman)',
    time: '1 hour ago',
    title: 'How do I connect to the eduroam Wi-Fi?',
    content: 'My phone connects fine but my laptop says authentication failed. Any tips?',
    likes: 12,
    replies: 4,
    tags: ['Tech Support'],
    answered: false,
  }
];

const Home = () => {
  const [questions, setQuestions] = useState(MOCK_QUESTIONS);
  const [newQuestion, setNewQuestion] = useState('');

  const handlePost = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    
    const newQ = {
      id: Date.now(),
      author: 'Freshman User',
      time: 'Just now',
      title: 'New Question',
      content: newQuestion,
      likes: 0,
      replies: 0,
      tags: ['General'],
      answered: false,
    };
    
    setQuestions([newQ, ...questions]);
    setNewQuestion('');
  };

  return (
    <div className="home-container">
      <header className="page-header">
        <h1>Live Help Board</h1>
        <p>Ask questions and get help from senior mentors.</p>
      </header>

      <section className="ask-section card">
        <form onSubmit={handlePost}>
          <textarea 
            className="input-field" 
            placeholder="What do you need help with?"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              <Plus size={16} />
              Post Question
            </button>
          </div>
        </form>
      </section>

      <section className="feed-section">
        {questions.map((q) => (
          <div key={q.id} className="question-card card">
            <div className="card-header">
              <div className="author-info">
                <h4>{q.author}</h4>
                <span className="time">{q.time}</span>
              </div>
              <div className="tags">
                {q.tags.map(tag => (
                  <span key={tag} className={`badge ${tag === 'Urgent' ? 'badge-urgent' : 'badge-info'}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="card-body">
              <h3>{q.title}</h3>
              <p>{q.content}</p>
            </div>
            
            <div className="card-footer">
              <div className="action-group">
                <button className="btn-ghost">
                  <ThumbsUp size={16} />
                  <span>{q.likes}</span>
                </button>
                <button className="btn-ghost">
                  <MessageCircle size={16} />
                  <span>{q.replies} Replies</span>
                </button>
              </div>
              {q.answered && (
                <span className="badge badge-success answered-badge">Answered</span>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
