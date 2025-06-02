// Khởi tạo biểu đồ doanh thu tháng
const monthlyCtx = document.getElementById('monthlyChart').getContext('2d');
const monthlyChart = new Chart(monthlyCtx, {
    type: 'line',
    data: {
        labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
        datasets: [{
            label: 'Doanh thu (triệu đồng)',
            data: [15, 18, 22, 20.42],
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 2,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Khởi tạo biểu đồ tỷ lệ hài lòng
const satisfactionCtx = document.getElementById('satisfactionChart').getContext('2d');
const satisfactionChart = new Chart(satisfactionCtx, {
    type: 'doughnut',
    data: {
        labels: ['Hài lòng', 'Không hài lòng'],
        datasets: [{
            data: [92, 8],
            backgroundColor: [
                'rgba(46, 204, 113, 0.8)',
                'rgba(231, 76, 60, 0.8)'
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

// Khởi tạo biểu đồ doanh thu theo quý
const quarterlyCtx = document.getElementById('quarterlyChart').getContext('2d');
const quarterlyChart = new Chart(quarterlyCtx, {
    type: 'bar',
    data: {
        labels: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'],
        datasets: [{
            label: 'Doanh thu (triệu đồng)',
            data: [185, 210, 195, 230],
            backgroundColor: [
                'rgba(52, 152, 219, 0.7)',
                'rgba(155, 89, 182, 0.7)',
                'rgba(52, 152, 219, 0.7)',
                'rgba(155, 89, 182, 0.7)'
            ],
            borderColor: [
                'rgba(52, 152, 219, 1)',
                'rgba(155, 89, 182, 1)',
                'rgba(52, 152, 219, 1)',
                'rgba(155, 89, 182, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Cập nhật số thứ tự dòng trong bảng
function updateRowNumbers(tableSelector) {
    const rows = document.querySelectorAll(`${tableSelector} tbody tr`);
    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1;
    });
}

// Xử lý xóa sách và khách hàng
document.addEventListener('click', function (e) {
    const btn = e.target.closest('.btn-danger');
    if (!btn || !confirm('Bạn có chắc chắn muốn xóa mục này?')) return;

    const row = btn.closest('tr');
    if (row) {
        const table = row.closest('table');
        const bookTitle = row.cells[2]?.textContent.trim();
        row.remove();
        if (table?.id === 'booksTable') updateRowNumbers('#booksTable');
        if (table?.id === 'customersTable') updateRowNumbers('#customersTable');

        // Xóa card tương ứng trong danh mục
        if (bookTitle) {
            const allCards = document.querySelectorAll('.card .card-title');
            allCards.forEach(cardTitle => {
                if (cardTitle.textContent.trim() === bookTitle) {
                    const card = cardTitle.closest('.col-md-3, .col-md-4');
                    card?.remove();
                }
            });
        }

        return;
    }

    // Nếu xóa từ card danh mục
    const card = btn.closest('.card');
    if (card) {
        const title = card.querySelector('.card-title')?.textContent.trim();
        card.closest('.col-md-3, .col-md-4')?.remove();

        // Xóa trong bảng nếu tiêu đề trùng
        if (title) {
            const rows = document.querySelectorAll('#booksTable tbody tr');
            for (const r of rows) {
                if (r.cells[2]?.textContent.trim() === title) {
                    r.remove();
                    break;
                }
            }
            updateRowNumbers('#booksTable');
        }
    }
});

// Thêm sách mới
document.getElementById('saveBookBtn')?.addEventListener('click', function () {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const category = document.getElementById('bookCategory').value.trim();
    const price = parseInt(document.getElementById('bookPrice').value);
    const quantity = parseInt(document.getElementById('bookQuantity').value);

    if (!title || !author || !category || isNaN(price) || isNaN(quantity)) {
        alert('Vui lòng nhập đầy đủ và đúng định dạng thông tin sách');
        return;
    }

    // Thêm vào bảng tất cả sách
    const booksTable = document.querySelector('#booksTable tbody');
    const newRow = booksTable.insertRow();
    newRow.innerHTML = `
        <td></td>
        <td><img src="https://via.placeholder.com/60x80" class="book-cover"></td>
        <td>${title}</td>
        <td>${author}</td>
        <td>${category}</td>
        <td>${price.toLocaleString()} ₫</td>
        <td>${quantity}</td>
        <td><button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button></td>
    `;
    updateRowNumbers('#booksTable');

    // Ánh xạ thể loại sang ID hàng danh mục
    const categoryMap = {
        "Khoa học": "scienceBooksRow",
        "Kinh doanh": "businessBooksRow",
        "Tâm lý": "psychologyBooksRow",
        "Văn học": "literatureBooksRow",
        "Thiếu nhi": "childrenBooksRow",
        "Kĩ năng": "skillBooksRow"
    };

    const categoryRowId = categoryMap[category];
    const categoryRow = document.getElementById(categoryRowId);

    if (categoryRow) {
        const newCard = document.createElement('div');
        newCard.className = 'col-md-3 mb-4';
        newCard.innerHTML = `
            <div class="card h-100">
                <img src="https://via.placeholder.com/300x400" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${author}</p>
                    <p class="text-success">${price.toLocaleString()} ₫</p>
                </div>
                <div class="card-footer bg-white">
                    <button class="btn btn-sm btn-danger w-100"><i class="fas fa-trash"></i> Xóa</button>
                </div>
            </div>
        `;
        categoryRow.appendChild(newCard);
    }

    bootstrap.Modal.getInstance(document.getElementById('addBookModal'))?.hide();
    document.getElementById('addBookForm').reset();
});

// Thêm khách hàng mới
document.getElementById('saveCustomerBtn')?.addEventListener('click', function () {
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();

    if (!name || !phone) {
        alert('Vui lòng nhập tên và số điện thoại');
        return;
    }

    const customersTable = document.querySelector('#customersTable tbody');
    const avatarUrl = `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`;

    const newRow = customersTable.insertRow();
    newRow.innerHTML = `
        <td></td>
        <td><img src="${avatarUrl}" class="customer-avatar"></td>
        <td>${name}</td>
        <td>${phone}</td>
        <td><span class="badge badge-transaction">1</span></td>
        <td>0 ₫</td>
        <td><button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button></td>
    `;
    updateRowNumbers('#customersTable');

    bootstrap.Modal.getInstance(document.getElementById('addCustomerModal'))?.hide();
    document.getElementById('addCustomerForm').reset();
});

