// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    populateCategories();
    // 不再自动加载所有事件
    clearEventsContainer();
});

// 清空事件容器
function clearEventsContainer() {
    const container = document.getElementById('events-container');
    container.innerHTML = '';
}

//categories
function populateCategories() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    // 从API获取类别数据
    fetch('http://localhost:3060/api/categories')
        .then(response => response.json())
        .then(categories => {
            // 创建下拉框
            const selectElement = document.createElement('select');
            selectElement.id = 'category-select';
            selectElement.name = 'category';

            // 添加默认选项
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Select a category';
            selectElement.appendChild(defaultOption);

            // 添加类别选项
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                selectElement.appendChild(option);
            });

            // 添加下拉框到容器
            container.appendChild(selectElement);
        })
        .catch(error => {
            console.error('Failed to load categories:', error);
            // 可以在这里添加错误处理
            container.innerHTML = `<p class="error">Failed to load categories. Please try again later.</p>`;
        });
}

// Clear all filters
function clearFilters() {
    document.getElementById('date-from').value = '';
    document.getElementById('date-to').value = '';
    document.getElementById('location').value = '';

    // 重置下拉框到默认选项
    const categorySelect = document.getElementById('category-select');
    if (categorySelect) {
        categorySelect.selectedIndex = 0; // 选择第一个选项（默认选项）
    }


    // 清空事件容器而不是重新加载
    clearEventsContainer();

    // 隐藏错误信息
    hideError();

    // 隐藏加载状态（如果有的话）
    hideLoading();
}

// Show error message
function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Hide error message
function hideError() {
    const errorElement = document.getElementById('error-message');
    errorElement.style.display = 'none';
}

// Show loading state
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

// Hide loading state
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Search events based on filters
async function searchEvents() {
    hideError();
    showLoading();
    clearEventsContainer(); // 先清空容器

    // Get filter values
    const dateFrom = document.getElementById('date-from').value;
    const dateTo = document.getElementById('date-to').value;
    const location = document.getElementById('location').value;

    // Get selected category from dropdown (单选框)
    const categorySelect = document.getElementById('category-select');
    const selectedCategory = categorySelect ? categorySelect.value : '';

    // 检查是否有任何搜索条件
    const hasSearchCriteria = dateFrom || dateTo || location || selectedCategory;

    if (!hasSearchCriteria) {
        hideLoading();
        showError('Please select at least one search criteria.');
        return;
    }

    try {
        // 构建查询参数
        const params = new URLSearchParams();

        if (dateFrom) params.append('dateFrom', dateFrom);
        if (dateTo) params.append('dateTo', dateTo);
        if (location) params.append('location', location);
        if (selectedCategory) params.append('categoryId', selectedCategory);
        
        //search api
        const response = await fetch(`http://localhost:3060/api/search?${params.toString()}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const events = await response.json();

        // Display results
        displayEvents(events);

    } catch (error) {
        console.error('Search error:', error);
        showError('Failed to search events. Please try again later.');
    } finally {
        hideLoading();
    }
}

// Load all events (no filters) - 可选功能，如果需要的话
async function loadAllEvents() {
    hideError();
    showLoading();
    clearEventsContainer();

    try {
        // 调用API获取所有事件
        const response = await fetch('http://localhost:3060/events/search');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const events = await response.json();
        displayEvents(events);
    } catch (error) {
        console.error('Load events error:', error);
        showError('Failed to load events. Please try again later.');
    } finally {
        hideLoading();
    }
}

// Display events in the container
function displayEvents(events) {
    const container = document.getElementById('events-container');

    if (events.length === 0) {
         showError('No events found. Please try different search criteria.');
        return;
    }

    let eventsHTML = '';

    events.forEach(event => {
        eventsHTML += `
            <div class="event-card">
                <div class="event-content">
                    <h3 class="event-title">${event.title}</h3>
                    <div class="event-meta">
                        <div class="event-date">${formatDate(event.start_date)}</div>
                        <div class="event-location"> ${event.location}</div>
                        <div class="event-category">${event.category_name}</div>
                    </div>
                    <p class="event-description">${event.description}</p>
                    <div class="event-target">
                        <strong>Target audience:</strong> ${event.target}
                    </div>
                    <a href="description.html?id=${event.id}" class="view-details">View Details</a>
                </div>
            </div>
        `;
    });

    container.innerHTML = eventsHTML;
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}