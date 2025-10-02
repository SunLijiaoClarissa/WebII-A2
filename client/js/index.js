document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3060/api/events')
        .then(response => response.json())
        .then(data => {
            // filter ban status===0
            const activeEvents = data.filter(event => event.status === 1);
            
            // today
            const today = new Date();
         
            // event status
            const currentEvents = [];
            const comingEvents = [];
            const finishEvents = [];
            
            activeEvents.forEach(event => {
                const startDate = new Date(event.start_date);
                const endDate = new Date(event.end_date);
                
                // match event status
                if (endDate < today) {
                    // finish
                    finishEvents.push(event);
                } else if (startDate <= today && endDate >= today) {
                    // now
                    currentEvents.push(event);
                } else if (startDate > today) {
                    // coming
                    comingEvents.push(event);
                }
            });
            
            // default status
            renderEvents(currentEvents, 'current');
            
            // tab switch
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // remove event active class
                    tabs.forEach(t => t.classList.remove('active'));
                    
                    // click tab
                    this.classList.add('active');
                    
                    // show click tab
                    const tabType = this.getAttribute('data-tab');
                    if (tabType === 'current') {
                        renderEvents(currentEvents, 'current');
                    } else if (tabType === 'coming') {
                        renderEvents(comingEvents, 'coming');
                    } else if (tabType === 'finish') {
                        renderEvents(finishEvents, 'finish');
                    }
                });
            });
        })
        .catch(error => {
            console.error('Failed to get events data', error);
            document.getElementById('events-container').innerHTML = `
                    <p>Unable to get events data. </p>
            `;
        });
    
    // render events
    function renderEvents(events, type) {
        const container = document.getElementById('events-container');
        
        if (events.length === 0) {
            container.innerHTML = `
                    <p>There is no event for ${getStatusLabel(type)}.</p>
            `;
            return;
        }
        
        let eventsHTML = '';
        
        events.forEach(event => {
            const startDate = new Date(event.start_date);
            const endDate = new Date(event.end_date);
            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(endDate);
            
            // btn status for event status
            const isfinish = type === 'finish';
            const buttonHTML = isfinish ? 
                `<button disabled>More...</button>` : 
                `<a href="description.html?id=${event.id}" class="btn">${type === 'current' ? 'Participate Now' : 'Learn More'}</a>`;
            
            eventsHTML += `
                <div class="event-card">
                    <div class="event-content">
                        <h3 class="event-title">${event.title}</h3>
                        <div class="event-meta">
                            <div class="event-date">
                                ${formattedStartDate} to ${formattedEndDate}
                            </div>
                            <div class="event-location">
                                ${event.location}
                            </div>
                        </div>
                        <p class="event-description">
                            ${event.description}
                        </p>
                        <div class="event-target">
                            <strong>Target population:</strong> ${event.target}
                        </div>
                        <div class="event-status ${getStatusClass(type)}">
                            ${getStatusLabel(type)}
                        </div>
                        ${buttonHTML}
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = eventsHTML;
    }
    
    // status css class
    function getStatusClass(type) {
        switch(type) {
            case 'current': return 'status-current';
            case 'coming': return 'status-coming';
            case 'finish': return 'status-finish';
            default: return '';
        }
    }
    
    // label css 
    function getStatusLabel(type) {
        switch(type) {
            case 'current': return 'Ongoing';
            case 'coming': return 'Upcoming';
            case 'finish': return 'Finish...';
            default: return '';
        }
    }
    
    // 格式化日期
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
});