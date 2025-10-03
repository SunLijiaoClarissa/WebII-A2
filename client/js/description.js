document.addEventListener('DOMContentLoaded', function () {
    //get event id
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    console.log(eventId)

    if (eventId) {
        loadEventDetails(eventId);
    } else {
        document.getElementById('events-description').innerHTML = `
            No event id...
        `;
    }
});

function loadEventDetails(eventId) {

    fetch(`http://localhost:3060/api/events/${eventId}`)
        .then(response => response.json())
        .then(data => {
            renderEventDetails(data);
        })
        .catch(error => {
            console.error('Failed to get event details:', error);
            document.getElementById('events-description').innerHTML = `
                <p>Unable to get events detail.</p>
            `;
        });

}

function renderEventDetails(event) {
    const container = document.getElementById('events-description');
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);



    container.innerHTML = `
        <div class="event-poster">
            <span>活动海报</span>
        </div>
        
        <div class="event-details">
            <h1 class="event-title">${event.title}</h1>
            
            <div class="detail-item">
                <div class="detail-label">Organization</div>
                <div class="detail-content">${event.organizer_name}</div>
                <div class="detail-content"><h3>Email:${event.organizer_email}</h3></div>

            </div>
            
            <div class="detail-item">
                <div class="detail-label">Description</div>
                <div class="detail-content">${event.description}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">Event Date</div>
                <div class="detail-content">${formattedStartDate} to ${formattedEndDate}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">Location</div>
                <div class="detail-content">${event.location}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">Target Population</div>
                <div class="detail-content">${event.target}</div>
            </div>

             <div class="detail-item">
                <div class="detail-label">Category</div>
                <div class="detail-content">${event.category_name}</div>
            </div>
         
        </div>
    `;

    // status css class


    // 格式化日期
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}

