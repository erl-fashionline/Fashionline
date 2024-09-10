console.log('Script loaded');

const libraryData = {
    internal: [
        { 
            name: "Curtains", 
            overview: "Curtains are versatile window treatments made from fabric and are designed to control light, provide privacy, and enhance the aesthetic appeal of a room.",
            types: [
                { name: "Sheer Curtains", description: "Made from lightweight, transparent fabrics such as voile or chiffon." },
                { name: "Blackout Curtains", description: "Constructed from thick, opaque material to completely block light." },
                { name: "Thermal Curtains", description: "Designed with insulating layers to improve energy efficiency." },
                { name: "Acoustic Curtains", description: "Made from heavy, dense fabrics that help absorb sound." }
            ],
            technicalAspects: [
                "Typically installed on rods or tracks mounted above the window frame.",
                "Available in various materials, styles, and operating systems.",
                "Can be customized for different window sizes and shapes."
            ],
            fabricChoices: ["Cotton", "Linen", "Velvet", "Polyester", "Silk"],
            image: "https://via.placeholder.com/400x300?text=Curtains"
        },
        { name: "Honeycomb", overview: "Honeycomb blinds description...", types: [], technicalAspects: [], fabricChoices: [], image: "" },
        { name: "Panel Glide", overview: "Panel glide description...", types: [], technicalAspects: [], fabricChoices: [], image: "" },
        { name: "Roller Blinds", overview: "Roller blinds description...", types: [], technicalAspects: [], fabricChoices: [], image: "" },
        { name: "Roman Blinds", overview: "Roman blinds description...", types: [], technicalAspects: [], fabricChoices: [], image: "" },
        { name: "Vertical Blinds", overview: "Vertical blinds description...", types: [], technicalAspects: [], fabricChoices: [], image: "" },
        { name: "Venetian Blinds", overview: "Venetian blinds description...", types: [], technicalAspects: [], fabricChoices: [], image: "" }
    ],
    external: [
        { name: "Auto Guide Awning", overview: "Auto guide awning description...", types: [], technicalAspects: [], fabricChoices: [], image: "" },
        { name: "Folding Arm Awning", overview: "Folding arm awning description...", types: [], technicalAspects: [], fabricChoices: [], image: "" },
        { name: "Straight Drop Awning", overview: "Straight drop awning description...", types: [], technicalAspects: [], fabricChoices: [], image: "" },
        { name: "Roller Shutters", overview: "Roller shutters description...", types: [], technicalAspects: [], fabricChoices: [], image: "" },
        { name: "Zipscreen", overview: "Zipscreen description...", types: [], technicalAspects: [], fabricChoices: [], image: "" },
        { name: "Ziptrak", overview: "Ziptrak description...", types: [], technicalAspects: [], fabricChoices: [], image: "" }
    ],
    shutters: [
        { name: "Aluminum Shutters", overview: "Aluminum shutters description...", types: [], technicalAspects: [], fabricChoices: [], image: "" },
        { name: "PVC Shutters", overview: "PVC shutters description...", types: [], technicalAspects: [], fabricChoices: [], image: "" },
        { name: "Basswood Shutters", overview: "Basswood shutters description...", types: [], technicalAspects: [], fabricChoices: [], image: "" }
    ],
    security: [
        { name: "Crimsafe", overview: "Crimsafe description...", types: [], technicalAspects: [], fabricChoices: [], image: "" },
        { name: "Security Doors", overview: "Security doors description...", types: [], technicalAspects: [], fabricChoices: [], image: "" },
        { name: "Window Screen", overview: "Window screen description...", types: [], technicalAspects: [], fabricChoices: [], image: "" },
        { name: "Window Film", overview: "Window film description...", types: [], technicalAspects: [], fabricChoices: [], image: "" }
    ],
    members: [
        { name: "John Doe", role: "Sales Representative" },
        { name: "Jane Smith", role: "Customer Service" },
        { name: "Bob Johnson", role: "Installer" }
    ]
};

const users = [
    { username: 'admin', password: 'admin123', isAdmin: true },
    { username: 'user', password: 'user123', isAdmin: false }
];

let vaData = [
    { id: 1, vaName: "John Doe", company: "Fashionline", email: "john@example.com", joinDate: "2023-01-15", birthday: "1990-05-20", status: "Full-Time", accountType: "Regular" },
    { id: 2, vaName: "Jane Smith", company: "Blinds Co", email: "jane@example.com", joinDate: "2023-02-01", birthday: "1988-11-10", status: "Trainee", accountType: "Regular" },
];

let currentUser = null;

function authenticateUser(username, password) {
    console.log('Authenticating:', username, password);
    const user = users.find(user => user.username === username && user.password === password);
    console.log('Found user:', user);
    return user;
}

function showPage(pageName) {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    sidebar.style.display = pageName === 'library' ? 'block' : 'none';

    switch(pageName) {
        case 'dashboard':
            mainContent.innerHTML = '<h1>Dashboard</h1><p>Welcome to the Dashboard!</p>';
            break;
        case 'library':
            loadLibraryContent();
            break;
        case 'training':
            mainContent.innerHTML = '<h1>Training</h1><p>Training content goes here.</p>';
            break;
        case 'vadata':
            showVADataPage();
            break;
        case 'adminPanel':
            showAdminPanel();
            break;
    }
}

function loadLibraryContent() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '<h1>Library</h1><p>Select a category and item from the sidebar to view details.</p>';
    
    populateList('internalList', libraryData.internal);
    populateList('externalList', libraryData.external);
    populateList('shuttersList', libraryData.shutters);
    populateList('securityList', libraryData.security);
    populateList('membersList', libraryData.members);

    setupCollapsibleSidebar();
}

function populateList(listId, items) {
    const list = document.getElementById(listId);
    list.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = typeof item === 'object' ? item.name : item;
        li.addEventListener('click', () => loadItemContent(item));
        list.appendChild(li);
    });
}

function setupCollapsibleSidebar() {
    const categories = document.querySelectorAll('#sidebar .category h3');
    categories.forEach(category => {
        category.addEventListener('click', () => {
            const list = category.nextElementSibling;
            list.classList.toggle('hidden');
        });
    });
}

function loadItemContent(item) {
    const mainContent = document.getElementById('mainContent');
    const isAdmin = users.find(user => user.username === currentUser)?.isAdmin;

    if (typeof item === 'object' && item.name) {
        mainContent.innerHTML = `
            <div class="product-layout">
                <div class="left-column">
                    <h1>${item.name.toUpperCase()}</h1>
                    ${isAdmin ? `<button id="editProductBtn">Edit Content</button>` : ''}
                    <h2>Overview</h2>
                    <p>${item.overview}</p>
                    ${item.types && item.types.length > 0 ? `
                        <h2>Types of ${item.name}</h2>
                        ${item.types.map(type => `
                            <h3>${type.name}</h3>
                            <p>${type.description}</p>
                        `).join('')}
                    ` : ''}
                    ${item.technicalAspects && item.technicalAspects.length > 0 ? `
                        <h2>Technical Aspects</h2>
                        <ul>
                            ${item.technicalAspects.map(aspect => `<li>${aspect}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
                <div class="right-column">
                    ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}
                    ${item.fabricChoices && item.fabricChoices.length > 0 ? `
                        <h3>Fabric Choices</h3>
                        <ul>
                            ${item.fabricChoices.map(fabric => `<li>${fabric}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            </div>
        `;

        if (isAdmin) {
            document.getElementById('editProductBtn').addEventListener('click', () => showEditForm(item));
        }
    } else if (typeof item === 'object' && item.role) {
        // This is a member
        mainContent.innerHTML = `
            <h1>${item.name}</h1>
            <p>Role: ${item.role}</p>
        `;
    } else {
        mainContent.innerHTML = `<h1>${item}</h1><p>Detailed content for ${item} is not available yet.</p>`;
    }
}

function showVADataPage() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <h1>VA Data</h1>
        <table>
            <thead>
                <tr>
                    <th>VA Name</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Join Date</th>
                    <th>Birthday</th>
                    <th>Status</th>
                    <th>Account Type</th>
                </tr>
            </thead>
            <tbody>
                ${vaData.map(va => `
                    <tr>
                        <td>${va.vaName}</td>
                        <td>${va.company}</td>
                        <td>${va.email}</td>
                        <td>${va.joinDate}</td>
                        <td>${va.birthday}</td>
                        <td>${va.status}</td>
                        <td>${va.accountType}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function showAdminPanel() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <h1>Admin Panel</h1>
        <h2>Add New User</h2>
        <form id="addUserForm">
            <input type="text" id="newUsername" placeholder="Username" required>
            <input type="password" id="newPassword" placeholder="Password" required>
            <input type="text" id="newVAName" placeholder="Full Name" required>
            <input type="text" id="newCompany" placeholder="Company" required>
            <input type="email" id="newEmail" placeholder="Email" required>
            <input type="date" id="newJoinDate" required>
            <input type="date" id="newBirthday" required>
            <select id="newStatus" required>
                <option value="Trainee">Trainee</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
            </select>
            <select id="newAccountType" required>
                <option value="Regular">Regular</option>
                <option value="Admin">Admin</option>
            </select>
            <button type="submit">Add User</button>
        </form>
    `;

    document.getElementById('addUserForm').addEventListener('submit', addUser);
}

function addUser(event) {
    event.preventDefault();
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const isAdmin = document.getElementById('newAccountType').value === 'Admin';

    if (users.some(user => user.username === username)) {
        alert('Username already exists');
        return;
    }

    users.push({ username, password, isAdmin });

    vaData.push({
        id: vaData.length + 1,
        vaName: document.getElementById('newVAName').value,
        company: document.getElementById('newCompany').value,
        email: document.getElementById('newEmail').value,
        joinDate: document.getElementById('newJoinDate').value,
        birthday: document.getElementById('newBirthday').value,
        status: document.getElementById('newStatus').value,
        accountType: document.getElementById('newAccountType').value
    });

    alert('User added successfully');
    event.target.reset();
}

function showEditForm(item) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <h1>Edit ${item.name}</h1>
        <form id="editProductForm">
            <label for="editName">Name:</label>
            <input type="text" id="editName" value="${item.name}" required>
            
            <label for="editOverview">Overview:</label>
            <textarea id="editOverview" required>${item.overview}</textarea>
            
            <h3>Types:</h3>
            <div id="typesContainer">
                ${item.types.map((type, index) => `
                    <div>
                        <input type="text" class="typeName" value="${type.name}" required>
                        <textarea class="typeDescription" required>${type.description}</textarea>
                        <button type="button" class="removeType">Remove</button>
                    </div>
                `).join('')}
            </div>
            <button type="button" id="addTypeBtn">Add Type</button>
            
            <h3>Technical Aspects:</h3>
            <div id="technicalAspectsContainer">
                ${item.technicalAspects.map((aspect, index) => `
                    <div>
                        <input type="text" class="technicalAspect" value="${aspect}" required>
                        <button type="button" class="removeAspect">Remove</button>
                    </div>
                `).join('')}
            </div>
            <button type="button" id="addAspectBtn">Add Aspect</button>
            
            <label for="editImage">Image URL:</label>
            <input type="text" id="editImage" value="${item.image}" required>
            
            <h3>Fabric Choices:</h3>
            <div id="fabricChoicesContainer">
                ${item.fabricChoices.map((fabric, index) => `
                    <div>
                        <input type="text" class="fabricChoice" value="${fabric}" required>
                        <button type="button" class="removeFabric">Remove</button>
                    </div>
                `).join('')}
            </div>
            <button type="button" id="addFabricBtn">Add Fabric</button>
            
            <button type="submit">Save Changes</button>
        </form>
    `;

    document.getElementById('addTypeBtn').addEventListener('click', addType);
    document.getElementById('addAspectBtn').addEventListener('click', addAspect);
    document.getElementById('addFabricBtn').addEventListener('click', addFabric);
    
    document.querySelectorAll('.removeType').forEach(btn => btn.addEventListener('click', removeElement));
    document.querySelectorAll('.removeAspect').forEach(btn => btn.addEventListener('click', removeElement));
    document.querySelectorAll('.removeFabric').forEach(btn => btn.addEventListener('click', removeElement));

    document.getElementById('editProductForm').addEventListener('submit', (e) => saveChanges(e, item));
}

function addType() {
    const container = document.getElementById('typesContainer');
    const newType = document.createElement('div');
    newType.innerHTML = `
        <input type="text" class="typeName" required>
        <textarea class="typeDescription" required></textarea>
        <button type="button" class="removeType">Remove</button>
    `;
    newType.querySelector('.removeType').addEventListener('click', removeElement);
    container.appendChild(newType);
}

function addAspect() {
    const container = document.getElementById('technicalAspectsContainer');
    const newAspect = document.createElement('div');
    newAspect.innerHTML = `
        <input type="text" class="technicalAspect" required>
        <button type="button" class="removeAspect">Remove</button>
    `;
    newAspect.querySelector('.removeAspect').addEventListener('click', removeElement);
    container.appendChild(newAspect);
}

function addFabric() {
    const container = document.getElementById('fabricChoicesContainer');
    const newFabric = document.createElement('div');
    newFabric.innerHTML = `
        <input type="text" class="fabricChoice" required>
        <button type="button" class="removeFabric">Remove</button>
    `;
    newFabric.querySelector('.removeFabric').addEventListener('click', removeElement);
    container.appendChild(newFabric);
}

function removeElement(e) {
    e.target.parentElement.remove();
}

function saveChanges(e, item) {
    e.preventDefault();
    
    item.name = document.getElementById('editName').value;
    item.overview = document.getElementById('editOverview').value;
    
    item.types = Array.from(document.querySelectorAll('#typesContainer > div')).map(div => ({
        name: div.querySelector('.typeName').value,
        description: div.querySelector('.typeDescription').value
    }));
    
    item.technicalAspects = Array.from(document.querySelectorAll('.technicalAspect')).map(input => input.value);
    
    item.image = document.getElementById('editImage').value;
    
    item.fabricChoices = Array.from(document.querySelectorAll('.fabricChoice')).map(input => input.value);

    // Find the item in libraryData and update it
    const category = Object.keys(libraryData).find(key => 
        libraryData[key].some(i => i.name === item.name)
    );
    
    if (category) {
        const index = libraryData[category].findIndex(i => i.name === item.name);
        if (index !== -1) {
            libraryData[category][index] = item;
        }
    }

    alert('Changes saved successfully!');
    loadItemContent(item);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    const loginPage = document.getElementById('loginPage');
    const app = document.getElementById('app');
    const loginButton = document.getElementById('loginButton');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminPanelLink = document.getElementById('adminPanelLink');

    loginButton.addEventListener('click', () => {
        console.log('Login button clicked');
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        console.log('Login attempt:', username, password);
        const user = authenticateUser(username, password);
        if (user) {
            console.log('Login successful');
            currentUser = username;
            loginPage.style.display = 'none';
            app.style.display = 'block';
            adminPanelLink.style.display = user.isAdmin ? 'block' : 'none';
            showPage('dashboard');
        } else {
            console.log('Login failed');
            alert('Invalid username or password');
        }
    });

    logoutBtn.addEventListener('click', () => {
        console.log('Logout button clicked');
        currentUser = null;
        app.style.display = 'none';
        loginPage.style.display = 'flex';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    });

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(e.target.dataset.page);
        });
    });

    // Initially show login page
    app.style.display = 'none';
    loginPage.style.display = 'flex';
});