import './App.css';
import { useState, useEffect, Fragment } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [activity, setActivity] = useState('');
  const [date, setDate] = useState(new Date());
  const [activityLog, setActivityLog] = useState({});

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleAddActivity = () => {
    if (activity) {
      const formattedDate = date.toDateString();
      const newActivity = { title: activity, date: formattedDate, id: Date.now() };
      setActivity('');



      setActivityLog((prev) => ({
        ...prev,
        [formattedDate]: [...(prev[formattedDate] || []), newActivity],
      }));
    }
  };










  return (
    <Fragment>

      <video autoPlay muted loop className="background-video">
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <div className="wrapper">
        <div className="addedactivities-container">
          <h2>Activities for {date.toDateString()}</h2>
          <div className="addedactivities">
            <ul>
              {activityLog[date.toDateString()]?.map((act, index) => (
                <li key={index}>{act.title}</li>
              )) || <li>No activities</li>}
            </ul>
          </div>
        </div>

        <div className="container">
          <h1>TODO LIST</h1>
          <div className="main-content">
            <div className="input-container">
              <input
                type="text"
                placeholder="List your activities"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              />
              <button onClick={handleAddActivity}>Add Activity</button>
            </div>
            <div className="calendar-container">
              <Calendar onChange={setDate} value={date} />
            </div>
          </div>
        </div>

        <div className="sidebar">
          <h2>All Activities</h2>
          <ul>
            {Object.entries(activityLog).map(([activityDate, activities]) => (
              <li key={activityDate}>
                <strong>{activityDate}</strong>
                <ul>
                  {activities.map((act) => (
                    <li key={act.id}>{act.title}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>


    </Fragment>

  );
}

export default App;



