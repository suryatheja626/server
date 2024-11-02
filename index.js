document.addEventListener('DOMContentLoaded', () => {
    const timetableContainer = document.getElementById('timetable');
    const studentContainer = document.getElementById('students');

    // Fetch timetable data from the backend
    fetch('http://localhost:5000/api/timetable')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display timetable data
            data.forEach(item => {
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day');
                
                const dayTitle = document.createElement('h2');
                dayTitle.textContent = item.day;
                dayDiv.appendChild(dayTitle);
                
                const classList = document.createElement('p');
                classList.textContent = Classes: ${item.classes.join(', ')};
                dayDiv.appendChild(classList);
                
                timetableContainer.appendChild(dayDiv);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            timetableContainer.textContent = 'Failed to load timetable data.';
        });

    // Fetch student data from the backend
    fetch('http://localhost:5000/api/students')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(students => {
            // Display student data
            students.forEach(student => {
                const studentDiv = document.createElement('div');
                studentDiv.classList.add('student');
                
                const studentInfo = document.createElement('p');
                studentInfo.textContent = Name: ${student.name}, Age: ${student.age}, Grade: ${student.grade};
                studentDiv.appendChild(studentInfo);
                
                studentContainer.appendChild(studentDiv);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            studentContainer.textContent = 'Failed to load student data.';
        });
});