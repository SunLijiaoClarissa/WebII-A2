document.addEventListener('DOMContentLoaded', function() {
    // 获取活动数据
    fetch('http://localhost:3060/api/events')
        .then(response => response.json())
        .then(data => {
            // 过滤掉状态为0的活动
            const activeEvents = data.filter(event => event.status === 1);
            
            // 获取当前日期
            const today = new Date();
            
            // 分类活动
            const currentEvents = [];
            const upcomingEvents = [];
            
            activeEvents.forEach(event => {
                const eventDate = new Date(event.date);
                
                if (eventDate >= today) {
                    // 如果活动日期是今天或之后，分类为当前活动或即将到来
                    if (isToday(eventDate)) {
                        currentEvents.push(event);
                    } else {
                        upcomingEvents.push(event);
                    }
                }
            });
            
            // 渲染活动
            renderEvents(currentEvents, 'current');
            
            // 标签切换功能
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // 移除所有标签的active类
                    tabs.forEach(t => t.classList.remove('active'));
                    
                    // 为当前点击的标签添加active类
                    this.classList.add('active');
                    
                    // 根据标签显示对应活动
                    const tabType = this.getAttribute('data-tab');
                    if (tabType === 'current') {
                        renderEvents(currentEvents, 'current');
                    } else {
                        renderEvents(upcomingEvents, 'upcoming');
                    }
                });
            });
        })
        .catch(error => {
            console.error('获取活动数据失败:', error);
            document.getElementById('events-container').innerHTML = `
                <div class="error-message">
                    <p>无法加载活动数据，请稍后再试。</p>
                </div>
            `;
        });
    
    // 检查日期是否是今天
    function isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }
    
    // 渲染活动到页面
    function renderEvents(events, type) {
        const container = document.getElementById('events-container');
        
        if (events.length === 0) {
            container.innerHTML = `
                <div class="no-events">
                    <p>当前没有${type === 'current' ? '进行中' : '即将到来'}的活动。</p>
                </div>
            `;
            return;
        }
        
        let eventsHTML = '';
        
        events.forEach(event => {
            const eventDate = new Date(event.date);
            const formattedDate = formatDate(eventDate);
            
            eventsHTML += `
                <div class="event-card">
                    <div class="event-image">
                        <span>${event.title.charAt(0)}</span>
                    </div>
                    <div class="event-content">
                        <h3 class="event-title">${event.title}</h3>
                        <div class="event-meta">
                            <div class="event-date">
                                <i class="far fa-calendar"></i>
                                ${formattedDate}
                            </div>
                            <div class="event-location">
                                <i class="fas fa-map-marker-alt"></i>
                                ${event.location}
                            </div>
                        </div>
                        <p class="event-description">
                            ${event.description}
                        </p>
                        <div class="event-target">
                            <strong>目标人群:</strong> ${event.target}
                        </div>
                        <div class="event-status ${type === 'current' ? 'status-current' : 'status-upcoming'}">
                            ${type === 'current' ? '当前活动' : '即将到来'}
                        </div>
                        <a href="#" class="btn">参与活动</a>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = eventsHTML;
    }
    
    // 格式化日期
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
});