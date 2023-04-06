// This function displays the current day at the top of the calendar
function displayCurrentDay() {
    const currentDay = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDay').innerText = currentDay.toLocaleDateString('en-US', options);
}

// This function creates time blocks for the daily planner based on a given start and end hours
function createTimeBlocks() {
    const calendar = document.getElementById('calendar');
    const startHour = 7;
    const endHour = 20;
    const now = new Date();
    const currentHour = now.getHours();

    // Loop through the hours from startHour to endHour to create the time blocks
    for (let hour = startHour; hour <= endHour; hour++) {
        const timeBlock = document.createElement('div');
        timeBlock.classList.add('time-block');

        const timeLabel = document.createElement('div');
        timeLabel.innerText = hour > 12 ? `${hour - 12} PM` : hour === 12 ? `${hour} PM` : `${hour} AM`;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `event-${hour}`;
        input.value = localStorage.getItem(`event-${hour}`) || '';

        // add the imput for differnt colors based on where you are in the day 
        if (hour < currentHour) {
            input.classList.add('past');
        } else if (hour === currentHour) {
            input.classList.add('present');
        } else {
            input.classList.add('future');
        }

        // Create the save button for the time block and set up the onclick event to save the input value to localStorage
        const saveButton = document.createElement('button');
        saveButton.innerText = 'Save';
        saveButton.onclick = function() {
            localStorage.setItem(`event-${hour}`, input.value);
        };

        // Append the timeLabel, input, and saveButton to the timeBlock, and then append the timeBlock to the calendar
        timeBlock.appendChild(timeLabel);
        timeBlock.appendChild(input);
        timeBlock.appendChild(saveButton);
        calendar.appendChild(timeBlock);
    }
}

// Call the displayCurrentDay and createTimeBlocks functions to set up the daily planner
displayCurrentDay();
createTimeBlocks();
