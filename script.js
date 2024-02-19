document.addEventListener('DOMContentLoaded', function () {
    // Sample data
    const data = [
      { course: 'Math 101', assignments: 2, dueDate: '2024-02-28' },
      { course: 'English 201', assignments: 1, dueDate: '2024-03-15' },
      // Add more data as needed
    ];
  
    // Populate the table dynamically
    const tableBody = document.querySelector('#courseTable tbody');
    
    // Use template literals for creating HTML
    const rowsHTML = data.map(item => `
      <tr>
        <td>${item.course}</td>
        <td>${item.assignments}</td>
        <td>${item.dueDate}</td>
      </tr>
    `).join('');
  
    // Set the innerHTML of the table body
    tableBody.innerHTML = rowsHTML;
  });
  