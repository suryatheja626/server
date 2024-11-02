const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); // Allow cross-origin requests

// Sample timetable data
const timetableData = [
  { day: 'Monday', classes: ['Math', 'History', 'Biology'] },
  { day: 'Tuesday', classes: ['Physics', 'Chemistry', 'PE'] },
  { day: 'Wednesday', classes: ['English', 'Math', 'Art'] },
  { day: 'Thursday', classes: ['History', 'Biology', 'Computer Science'] },
  { day: 'Friday', classes: ['Math', 'Physics', 'Chemistry'] },
];

// Endpoint to get timetable data
app.get('/api/timetable', (req, res) => {
  res.json(timetableData);
});

app.listen(PORT, () => {
  console.log(Server is running on http://localhost:${PORT});
});