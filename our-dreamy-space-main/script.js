// Our Space - JavaScript Application
console.log('Our Space loaded! 🌌');

// Application state
let appState = {
  activeSection: 'home',
  activeUser: 'sriya', // 'sriya', 'madhava', 'shared'
  activeTab: 'mine', // 'mine', 'theirs', 'shared'
  
  // User-specific data
  users: {
    sriya: {
      name: 'Sriya',
      avatar: '💜',
      mood: '😊',
      journalEntries: [
        {
          id: 1,
          content: "Today we started building Our Space! It feels so exciting to have our own digital home where we can share memories and learn together. 💜",
          date: new Date().toLocaleDateString(),
          mood: "😊",
          reactions: { '❤️': 2, '😊': 1 },
          comments: [
            { user: 'madhava', text: 'This is going to be amazing! 💙', date: new Date().toLocaleDateString() }
          ]
        }
      ],
      tasks: [
        { id: 1, title: "Learn HTML basics", completed: true, dateCompleted: "2024-01-15" },
        { id: 2, title: "Build first webpage", completed: true, dateCompleted: "2024-01-16" },
        { id: 3, title: "Style with CSS", completed: false },
        { id: 4, title: "Add JavaScript interactions", completed: false },
        { id: 5, title: "Create Our Space journal page", completed: false }
      ],
      bucketItems: [
        {
          id: 1,
          title: "Build a complete website together",
          category: "coding",
          completed: false,
          targetDate: "2024-06-01",
          support: 1
        },
        {
          id: 2,
          title: "Try cooking a new recipe and share photos",
          category: "food",
          completed: false,
          support: 0
        }
      ]
    },
    madhava: {
      name: 'Madhava',
      avatar: '💙',
      mood: '😎',
      journalEntries: [
        {
          id: 2,
          content: "Can't wait to see what we'll build together! The possibilities are endless. 💙",
          date: new Date().toLocaleDateString(),
          mood: "😎",
          reactions: { '🚀': 1, '💙': 1 },
          comments: []
        }
      ],
      tasks: [
        { id: 6, title: "Master CSS Grid", completed: true, dateCompleted: "2024-01-14" },
        { id: 7, title: "Learn JavaScript ES6", completed: true, dateCompleted: "2024-01-15" },
        { id: 8, title: "Build responsive layouts", completed: true, dateCompleted: "2024-01-16" },
        { id: 9, title: "Create interactive components", completed: false },
        { id: 10, title: "Deploy our first project", completed: false }
      ],
      bucketItems: [
        {
          id: 3,
          title: "Plan a coding bootcamp weekend",
          category: "growth",
          completed: false,
          support: 1
        },
        {
          id: 4,
          title: "Create a friendship photo album",
          category: "fun",
          completed: true,
          dateCompleted: "2024-01-10",
          support: 1
        }
      ]
    }
  },
  
  // Shared data
  shared: {
    journalEntries: [
      {
        id: 3,
        content: "Our first collaborative journal entry! Building this together makes it so much more special. ✨",
        date: new Date().toLocaleDateString(),
        mood: "🌟",
        reactions: { '✨': 3, '💫': 2 },
        comments: [
          { user: 'sriya', text: 'Absolutely! 💜', date: new Date().toLocaleDateString() },
          { user: 'madhava', text: 'Couldn\'t agree more! 💙', date: new Date().toLocaleDateString() }
        ]
      }
    ],
    tasks: [
      { id: 11, title: "Build Our Space website", completed: false, isShared: true },
      { id: 12, title: "Learn React together", completed: false, isShared: true },
      { id: 13, title: "Create shared photo gallery", completed: false, isShared: true }
    ],
    bucketItems: [
      {
        id: 5,
        title: "Travel to a new country together",
        category: "travel",
        completed: false,
        support: 2
      },
      {
        id: 6,
        title: "Start a coding YouTube channel",
        category: "coding",
        completed: false,
        support: 2
      }
    ],
    photos: [
      {
        id: 1,
        caption: "Our first coding session together! 💻",
        category: "Coding",
        date: "2024-01-15",
        user: "shared"
      }
    ]
  },
  
  // Friendship timeline
  friendshipTimeline: [
    {
      id: 1,
      title: "Website Created",
      description: "Our digital space was born!",
      date: "Today",
      icon: "✨"
    },
    {
      id: 2,
      title: "First Shared Journal Entry",
      description: "We wrote our first memory together",
      date: "Today",
      icon: "📖"
    }
  ],
  
  selectedMood: '😊',
  editingJournalId: null,
  selectedCategory: 'coding'
};

// Utility functions
function showToast(title, description) {
  const toast = document.getElementById('toast');
  const titleEl = toast.querySelector('.toast-title');
  const descEl = toast.querySelector('.toast-description');
  
  titleEl.textContent = title;
  descEl.textContent = description;
  
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

// User switching functionality
function initUserSwitcher() {
  const userButtons = document.querySelectorAll('.user-btn');
  
  userButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetUser = btn.dataset.user;
      
      // Update user buttons
      userButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update active user
      appState.activeUser = targetUser;
      
      // Update dashboard content
      updateDashboard();
      
      // Re-render current section
      if (appState.activeSection === 'journal') {
        renderJournalEntries();
      } else if (appState.activeSection === 'tracker') {
        renderTasks();
        updateProgress();
      } else if (appState.activeSection === 'bucket') {
        renderBucketItems();
        updateBucketStats();
      } else if (appState.activeSection === 'gallery') {
        renderGallery();
      }
      
      showToast(`Switched to ${btn.querySelector('.user-name').textContent}`, "Viewing their content now!");
    });
  });
}

// Tab functionality
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabContainer = btn.closest('.journal-tabs, .learning-tabs, .dreams-tabs, .gallery-tabs');
      const tabButtons = tabContainer.querySelectorAll('.tab-btn');
      const targetTab = btn.dataset.tab;
      
      // Update tab buttons
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update active tab
      appState.activeTab = targetTab;
      
      // Re-render current section
      if (appState.activeSection === 'journal') {
        renderJournalEntries();
      } else if (appState.activeSection === 'tracker') {
        renderTasks();
        updateProgress();
      } else if (appState.activeSection === 'bucket') {
        renderBucketItems();
        updateBucketStats();
      } else if (appState.activeSection === 'gallery') {
        renderGallery();
      }
    });
  });
}

// Update dashboard with current user data
function updateDashboard() {
  const currentUser = appState.activeUser;
  
  if (currentUser === 'shared') {
    // Show combined stats for shared view
    updateSharedDashboard();
  } else {
    // Show individual user stats
    updateUserDashboard(currentUser);
  }
}

function updateUserDashboard(userId) {
  const user = appState.users[userId];
  if (!user) return;
  
  // Update mood
  document.getElementById(`${userId}-mood`).textContent = user.mood;
  
  // Update journal preview
  const journalPreview = document.getElementById(`${userId}-journal-preview`);
  if (user.journalEntries.length > 0) {
    const latestEntry = user.journalEntries[0];
    journalPreview.querySelector('.journal-text').textContent = latestEntry.content.substring(0, 100) + '...';
    journalPreview.querySelector('.journal-date').textContent = latestEntry.date;
  }
  
  // Update progress
  const progressBar = document.getElementById(`${userId}-progress`);
  const completedTasks = user.tasks.filter(t => t.completed).length;
  const totalTasks = user.tasks.length;
  const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  progressBar.style.width = `${percentage}%`;
  progressBar.nextElementSibling.textContent = `${Math.round(percentage)}%`;
  
  // Update dream preview
  const dreamPreview = document.getElementById(`${userId}-dream-preview`);
  const pendingDreams = user.bucketItems.filter(d => !d.completed);
  if (pendingDreams.length > 0) {
    dreamPreview.querySelector('.dream-text').textContent = pendingDreams[0].title;
  }
}

function updateSharedDashboard() {
  // Update both dashboards with shared stats
  updateUserDashboard('sriya');
  updateUserDashboard('madhava');
}

// Enhanced journal functionality with reactions and comments
function addReaction(entryId, reaction) {
  const entry = findJournalEntry(entryId);
  if (!entry) return;
  
  if (!entry.reactions) entry.reactions = {};
  entry.reactions[reaction] = (entry.reactions[reaction] || 0) + 1;
  
  saveToLocalStorage();
  renderJournalEntries();
  showToast("Reaction added!", `You reacted with ${reaction}`);
}

function addComment(entryId, commentText) {
  const entry = findJournalEntry(entryId);
  if (!entry) return;
  
  if (!entry.comments) entry.comments = [];
  
  const comment = {
    user: appState.activeUser,
    text: commentText,
    date: new Date().toLocaleDateString()
  };
  
  entry.comments.push(comment);
  
  saveToLocalStorage();
  renderJournalEntries();
  showToast("Comment added!", "Your comment has been saved!");
}

function findJournalEntry(entryId) {
  // Search in all user entries and shared entries
  for (const userId in appState.users) {
    const entry = appState.users[userId].journalEntries.find(e => e.id === entryId);
    if (entry) return entry;
  }
  
  const sharedEntry = appState.shared.journalEntries.find(e => e.id === entryId);
  if (sharedEntry) return sharedEntry;
  
  return null;
}

// Enhanced bucket list with support
function toggleSupport(bucketId) {
  const item = findBucketItem(bucketId);
  if (!item) return;
  
  if (!item.support) item.support = 0;
  item.support += 1;
  
  saveToLocalStorage();
  renderBucketItems();
  updateBucketStats();
  showToast("Support added!", "You're supporting this dream! 🌟");
}

function findBucketItem(bucketId) {
  // Search in all user bucket items and shared items
  for (const userId in appState.users) {
    const item = appState.users[userId].bucketItems.find(i => i.id === bucketId);
    if (item) return item;
  }
  
  const sharedItem = appState.shared.bucketItems.find(i => i.id === bucketId);
  if (sharedItem) return sharedItem;
  
  return null;
}

// Enhanced task functionality with comments
function addTaskComment(taskId, commentText) {
  const task = findTask(taskId);
  if (!task) return;
  
  if (!task.comments) task.comments = [];
  
  const comment = {
    user: appState.activeUser,
    text: commentText,
    date: new Date().toLocaleDateString()
  };
  
  task.comments.push(comment);
  
  saveToLocalStorage();
  renderTasks();
  showToast("Comment added!", "Your comment has been saved!");
}

function findTask(taskId) {
  // Search in all user tasks and shared tasks
  for (const userId in appState.users) {
    const task = appState.users[userId].tasks.find(t => t.id === taskId);
    if (task) return task;
  }
  
  const sharedTask = appState.shared.tasks.find(t => t.id === taskId);
  if (sharedTask) return sharedTask;
  
  return null;
}

// Update friendship timeline
function updateFriendshipTimeline() {
  const timelineContainer = document.getElementById('friendship-timeline');
  
  timelineContainer.innerHTML = appState.friendshipTimeline.map(item => `
    <div class="timeline-item">
      <div class="timeline-marker">${item.icon}</div>
      <div class="timeline-content">
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        <span class="timeline-date">${item.date}</span>
      </div>
    </div>
  `).join('');
}

// Enhanced save/load functions
function saveToLocalStorage() {
  localStorage.setItem('ourSpaceState', JSON.stringify({
    users: appState.users,
    shared: appState.shared,
    friendshipTimeline: appState.friendshipTimeline
  }));
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem('ourSpaceState');
  if (saved) {
    const data = JSON.parse(saved);
    appState.users = data.users || appState.users;
    appState.shared = data.shared || appState.shared;
    appState.friendshipTimeline = data.friendshipTimeline || appState.friendshipTimeline;
  }
}

// Navigation functionality
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSection = btn.dataset.section;
      
      // Update nav buttons
      navButtons.forEach(b => {
        b.classList.remove('active');
        const sparkle = b.querySelector('.sparkle');
        if (sparkle) sparkle.style.display = 'none';
      });
      
      btn.classList.add('active');
      const sparkle = btn.querySelector('.sparkle');
      if (sparkle) sparkle.style.display = 'inline';
      
      // Update sections
      sections.forEach(section => {
        section.classList.remove('active');
      });
      
      document.getElementById(targetSection).classList.add('active');
      appState.activeSection = targetSection;
      
      // Initialize section-specific functionality
      if (targetSection === 'journal') {
        renderJournalEntries();
      } else if (targetSection === 'tracker') {
        renderTasks();
        updateProgress();
      } else if (targetSection === 'bucket') {
        renderBucketItems();
        updateBucketStats();
      }
    });
  });
}

// Journal functionality
function initJournal() {
  const journalInput = document.getElementById('journal-input');
  const saveBtn = document.getElementById('journal-save-btn');
  const cancelBtn = document.getElementById('journal-cancel-btn');
  const moodButtons = document.querySelectorAll('.mood-btn');
  
  // Mood selection
  moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      moodButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.selectedMood = btn.dataset.mood;
    });
  });
  
  // Save entry
  saveBtn.addEventListener('click', () => {
    const content = journalInput.value.trim();
    if (!content) return;
    
    if (appState.editingJournalId) {
      // Edit existing entry
      const entry = findJournalEntry(appState.editingJournalId);
      if (entry) {
        entry.content = content;
        entry.mood = appState.selectedMood;
        showToast("Memory updated! 💫", "Your journal entry has been saved.");
      }
      appState.editingJournalId = null;
      document.getElementById('journal-form-title').textContent = 'Add New Memory';
      cancelBtn.style.display = 'none';
    } else {
      // Add new entry
      const entry = {
        id: Date.now(),
        content: content,
        date: new Date().toLocaleDateString(),
        mood: appState.selectedMood,
        reactions: {},
        comments: []
      };
      
      // Always add to shared collection for simplified approach
      appState.shared.journalEntries.unshift(entry);
      
      showToast("Memory saved! ✨", "Your journal entry has been added to Our Space.");
    }
    
    journalInput.value = '';
    appState.selectedMood = '😊';
    moodButtons.forEach(b => b.classList.remove('active'));
    moodButtons[0].classList.add('active');
    
    saveToLocalStorage();
    renderJournalEntries();
    updateDashboard();
  });
  
  // Cancel edit
  cancelBtn.addEventListener('click', () => {
    journalInput.value = '';
    appState.selectedMood = '😊';
    appState.editingJournalId = null;
    moodButtons.forEach(b => b.classList.remove('active'));
    moodButtons[0].classList.add('active');
    document.getElementById('journal-form-title').textContent = 'Add New Memory';
    cancelBtn.style.display = 'none';
  });
  
  // Enter key support
  journalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      saveBtn.click();
    }
  });
}

function renderJournalEntries() {
  const container = document.getElementById('journal-entries');
  
  // Always show shared entries for simplified approach
  const entries = appState.shared.journalEntries;
  
  if (entries.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 0;">
        <span style="font-size: 4rem; margin-bottom: 1rem; display: block;">📖</span>
        <p style="color: var(--muted-foreground); font-size: 1.125rem;">
          No shared journal entries yet. Start writing your first memory together!
        </p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = entries.map((entry, index) => `
    <div class="card journal-entry" style="animation-delay: ${index * 0.1}s">
      <div class="card-content">
        <div class="entry-header">
          <div class="entry-meta">
            <span class="entry-mood">${entry.mood}</span>
            <span class="entry-date">${entry.date}</span>
            <span class="entry-user">by ${entry.user || 'Both'}</span>
          </div>
          <div class="entry-actions">
            <button class="btn-ghost" onclick="editJournalEntry(${entry.id})">
              <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m18 2 4 4-12 12H6v-4L18 2z"></path>
              </svg>
            </button>
            <button class="btn-ghost bucket-delete-btn" onclick="deleteJournalEntry(${entry.id})">
              <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3,6 5,6 21,6"></polyline>
                <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
              </svg>
            </button>
          </div>
        </div>
        <p class="entry-content">${entry.content}</p>
        
        <!-- Reactions -->
        ${entry.reactions && Object.keys(entry.reactions).length > 0 ? `
          <div class="entry-reactions">
            ${Object.entries(entry.reactions).map(([reaction, count]) => `
              <button class="reaction-btn" onclick="addReaction(${entry.id}, '${reaction}')">
                <span>${reaction}</span>
                <span class="reaction-count">${count}</span>
              </button>
            `).join('')}
          </div>
        ` : ''}
        
        <!-- Comments -->
        ${entry.comments && entry.comments.length > 0 ? `
          <div class="entry-comments">
            ${entry.comments.map(comment => `
              <div class="comment">
                <strong>${comment.user}:</strong> ${comment.text}
                <span class="comment-date">${comment.date}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        <!-- Add Comment Form -->
        <div class="comment-form">
          <input type="text" placeholder="Add a comment..." class="comment-input" id="comment-${entry.id}">
          <button onclick="addComment(${entry.id}, document.getElementById('comment-${entry.id}').value)" class="btn btn-secondary">
            Comment
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function editJournalEntry(id) {
  const entry = appState.journalEntries.find(e => e.id === id);
  if (!entry) return;
  
  document.getElementById('journal-input').value = entry.content;
  appState.selectedMood = entry.mood;
  appState.editingJournalId = id;
  
  // Update mood buttons
  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.mood === entry.mood) {
      btn.classList.add('active');
    }
  });
  
  document.getElementById('journal-form-title').textContent = 'Edit Memory';
  document.getElementById('journal-cancel-btn').style.display = 'inline-flex';
  
  // Scroll to form
  document.querySelector('.journal-form').scrollIntoView({ behavior: 'smooth' });
}

function deleteJournalEntry(id) {
  appState.journalEntries = appState.journalEntries.filter(e => e.id !== id);
  saveToLocalStorage();
  renderJournalEntries();
  showToast("Entry removed", "The memory has been deleted from your journal.");
}

// Learning Tracker functionality
function initLearningTracker() {
  const taskInput = document.getElementById('task-input');
  const addBtn = document.getElementById('add-task-btn');
  
  addBtn.addEventListener('click', () => {
    const title = taskInput.value.trim();
    if (!title) return;
    
    const task = {
      id: Date.now(),
      title: title,
      completed: false,
      comments: []
    };
    
    // Add to appropriate collection based on active user and tab
    if (appState.activeUser === 'shared' || appState.activeTab === 'shared') {
      appState.shared.tasks.push(task);
    } else {
      appState.users[appState.activeUser].tasks.push(task);
    }
    
    taskInput.value = '';
    
    saveToLocalStorage();
    renderTasks();
    updateProgress();
    updateDashboard();
    showToast("New quest added! 🚀", "Time to level up your coding skills!");
  });
  
  taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addBtn.click();
    }
  });
}

function renderTasks() {
  const pendingContainer = document.getElementById('pending-tasks');
  const completedContainer = document.getElementById('completed-tasks');
  
  // Get tasks based on active user and tab
  let allTasks = [];
  
  if (appState.activeTab === 'mine') {
    if (appState.activeUser === 'shared') {
      // Show all tasks from both users
      allTasks = [
        ...appState.users.sriya.tasks,
        ...appState.users.madhava.tasks
      ];
    } else {
      allTasks = appState.users[appState.activeUser].tasks;
    }
  } else if (appState.activeTab === 'theirs') {
    if (appState.activeUser === 'sriya') {
      allTasks = appState.users.madhava.tasks;
    } else if (appState.activeUser === 'madhava') {
      allTasks = appState.users.sriya.tasks;
    } else {
      allTasks = [];
    }
  } else if (appState.activeTab === 'shared') {
    allTasks = appState.shared.tasks;
  }
  
  const pendingTasks = allTasks.filter(t => !t.completed);
  const completedTasks = allTasks.filter(t => t.completed);
  
  // Update counts
  document.getElementById('pending-count').textContent = pendingTasks.length;
  document.getElementById('completed-count').textContent = completedTasks.length;
  
  // Render pending tasks
  pendingContainer.innerHTML = pendingTasks.map(task => `
    <div class="card task-item">
      <div class="task-check" onclick="toggleTask(${task.id})">
        <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
      </div>
      <span class="task-title">${task.title}</span>
      
      <!-- Task Comments -->
      ${task.comments && task.comments.length > 0 ? `
        <div class="task-comments">
          ${task.comments.map(comment => `
            <div class="comment">
              <strong>${comment.user}:</strong> ${comment.text}
              <span class="comment-date">${comment.date}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      <!-- Add Comment Form -->
      <div class="comment-form">
        <input type="text" placeholder="Add a comment..." class="comment-input" id="task-comment-${task.id}">
        <button onclick="addTaskComment(${task.id}, document.getElementById('task-comment-${task.id}').value)" class="btn btn-secondary">
          Comment
        </button>
      </div>
    </div>
  `).join('');
  
  // Render completed tasks
  completedContainer.innerHTML = completedTasks.map(task => `
    <div class="card task-item task-completed">
      <span style="color: var(--accent); font-size: 1.25rem;">✨</span>
      <span class="task-title">${task.title}</span>
      ${task.dateCompleted ? `<span class="task-date">${task.dateCompleted}</span>` : ''}
    </div>
  `).join('');
}

function toggleTask(id) {
  const task = appState.tasks.find(t => t.id === id);
  if (!task) return;
  
  const wasCompleted = task.completed;
  task.completed = !task.completed;
  
  if (task.completed) {
    task.dateCompleted = new Date().toLocaleDateString();
  } else {
    delete task.dateCompleted;
  }
  
  if (!wasCompleted) {
    // Task was just completed
    const completedCount = appState.tasks.filter(t => t.completed).length;
    const newBadge = getBadgeLevel(completedCount);
    const currentBadge = getBadgeLevel(completedCount - 1);
    
    if (newBadge.name !== currentBadge.name) {
      showToast(`🎉 Badge Unlocked: ${newBadge.name} ${newBadge.icon}`, "You've reached a new level! Keep up the amazing work!");
    } else {
      showToast("Quest Complete! ✨", "Amazing progress! You're becoming a coding wizard!");
    }
  }
  
  saveToLocalStorage();
  renderTasks();
  updateProgress();
  updateBadge();
}

function getBadgeLevel(completedCount) {
  if (completedCount >= 50) return { name: "Legendary", icon: "🎖", class: "badge-legendary" };
  if (completedCount >= 20) return { name: "Gold", icon: "🏆", class: "badge-gold" };
  if (completedCount >= 10) return { name: "Silver", icon: "🌟", class: "badge-silver" };
  if (completedCount >= 5) return { name: "Bronze", icon: "⭐", class: "badge-bronze" };
  return { name: "Beginner", icon: "✨", class: "badge-beginner" };
}

function updateProgress() {
  // Get tasks based on active user and tab
  let allTasks = [];
  
  if (appState.activeTab === 'mine') {
    if (appState.activeUser === 'shared') {
      allTasks = [
        ...appState.users.sriya.tasks,
        ...appState.users.madhava.tasks
      ];
    } else {
      allTasks = appState.users[appState.activeUser].tasks;
    }
  } else if (appState.activeTab === 'theirs') {
    if (appState.activeUser === 'sriya') {
      allTasks = appState.users.madhava.tasks;
    } else if (appState.activeUser === 'madhava') {
      allTasks = appState.users.sriya.tasks;
    }
  } else if (appState.activeTab === 'shared') {
    allTasks = appState.shared.tasks;
  }
  
  const completedTasks = allTasks.filter(t => t.completed);
  const totalTasks = allTasks.length;
  const percentage = totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0;
  
  document.getElementById('progress-text').textContent = `${completedTasks.length}/${totalTasks} completed`;
  document.getElementById('progress-fill').style.width = `${percentage}%`;
  document.getElementById('progress-percent').textContent = `${Math.round(percentage)}%`;
}

function updateBadge() {
  const completedCount = appState.tasks.filter(t => t.completed).length;
  const currentBadge = getBadgeLevel(completedCount);
  const nextBadge = getBadgeLevel(completedCount + 1);
  
  const badgeEl = document.getElementById('current-badge');
  badgeEl.className = `badge ${currentBadge.class}`;
  badgeEl.innerHTML = `<span class="badge-icon">${currentBadge.icon}</span>${currentBadge.name}`;
  
  const nextText = document.getElementById('next-badge-text');
  if (nextBadge.name !== currentBadge.name) {
    nextText.textContent = `Next: ${nextBadge.name} ${nextBadge.icon}`;
  } else {
    nextText.textContent = "You've reached the highest level! 🌟";
  }
}

// Bucket List functionality
function initBucketList() {
  const bucketInput = document.getElementById('bucket-input');
  const addBtn = document.getElementById('add-bucket-btn');
  const dateInput = document.getElementById('bucket-date');
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  // Category selection
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.selectedCategory = btn.dataset.category;
    });
  });
  
  // Add bucket item
  addBtn.addEventListener('click', () => {
    const title = bucketInput.value.trim();
    if (!title) return;
    
    const item = {
      id: Date.now(),
      title: title,
      category: appState.selectedCategory,
      completed: false,
      targetDate: dateInput.value || undefined,
      support: 0
    };
    
    // Add to appropriate collection based on active user and tab
    if (appState.activeUser === 'shared' || appState.activeTab === 'shared') {
      appState.shared.bucketItems.push(item);
    } else {
      appState.users[appState.activeUser].bucketItems.push(item);
    }
    
    bucketInput.value = '';
    dateInput.value = '';
    
    saveToLocalStorage();
    renderBucketItems();
    updateBucketStats();
    updateDashboard();
    showToast("Dream added! ✨", "Another beautiful goal to work towards together!");
  });
  
  bucketInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addBtn.click();
    }
  });
}

function renderBucketItems() {
  const pendingContainer = document.getElementById('pending-bucket');
  const completedContainer = document.getElementById('completed-bucket');
  
  // Get bucket items based on active user and tab
  let allItems = [];
  
  if (appState.activeTab === 'mine') {
    if (appState.activeUser === 'shared') {
      allItems = [
        ...appState.users.sriya.bucketItems,
        ...appState.users.madhava.bucketItems
      ];
    } else {
      allItems = appState.users[appState.activeUser].bucketItems;
    }
  } else if (appState.activeTab === 'theirs') {
    if (appState.activeUser === 'sriya') {
      allItems = appState.users.madhava.bucketItems;
    } else if (appState.activeUser === 'madhava') {
      allItems = appState.users.sriya.bucketItems;
    } else {
      allItems = [];
    }
  } else if (appState.activeTab === 'shared') {
    allItems = appState.shared.bucketItems;
  }
  
  const pendingItems = allItems.filter(i => !i.completed);
  const completedItems = allItems.filter(i => i.completed);
  
  // Update counts
  document.getElementById('bucket-pending-count').textContent = pendingItems.length;
  document.getElementById('bucket-completed-count').textContent = completedItems.length;
  
  // Render pending items
  pendingContainer.innerHTML = pendingItems.map(item => {
    const categoryInfo = getCategoryInfo(item.category);
    return `
      <div class="card bucket-item">
        <div class="card-content">
          <div class="bucket-item-header">
            <div class="bucket-badges">
              <span class="bucket-badge ${item.category}">
                <svg class="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  ${getCategoryIcon(item.category)}
                </svg>
                ${categoryInfo.name}
              </span>
              ${item.targetDate ? `<span class="bucket-date">📅 ${formatDate(item.targetDate)}</span>` : ''}
            </div>
            <button class="bucket-delete-btn" onclick="deleteBucketItem(${item.id})">
              <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3,6 5,6 21,6"></polyline>
                <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
              </svg>
            </button>
          </div>
          <p class="bucket-item-title">${item.title}</p>
          
          <!-- Support Section -->
          <div class="bucket-support">
            <button class="support-btn" onclick="toggleSupport(${item.id})">
              <span>🌟</span>
              Support Dream
            </button>
            <span class="support-count">${item.support || 0} supporters</span>
          </div>
          
          <div class="bucket-item-actions">
            <button class="btn bucket-achieve-btn" onclick="toggleBucketItem(${item.id})">
              <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
              Mark as Achieved
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  // Render completed items
  completedContainer.innerHTML = completedItems.map(item => {
    const categoryInfo = getCategoryInfo(item.category);
    return `
      <div class="card bucket-item bucket-completed">
        <div class="card-content">
          <div class="bucket-item-header">
            <div class="bucket-badges">
              <span class="bucket-badge ${item.category}">
                <svg class="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  ${getCategoryIcon(item.category)}
                </svg>
                ${categoryInfo.name}
              </span>
              ${item.dateCompleted ? `<span class="bucket-badge" style="background: var(--gradient-accent); color: white;">✅ ${item.dateCompleted}</span>` : ''}
            </div>
            <span class="bucket-celebration">🎉</span>
          </div>
          <p class="bucket-item-title">${item.title}</p>
        </div>
      </div>
    `;
  }).join('');
}

function getCategoryInfo(categoryId) {
  const categories = {
    travel: { name: "Travel" },
    food: { name: "Food" },
    coding: { name: "Coding" },
    fun: { name: "Fun" },
    growth: { name: "Growth" }
  };
  return categories[categoryId] || categories.fun;
}

function getCategoryIcon(categoryId) {
  const icons = {
    travel: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4s-2 2-3.5 3.5L11 16l-8.2 1.8c-.5.1-.8.6-.8 1.1s.5 1 1.1.8L11 16l8.2-3.2z"></path>',
    food: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z"></path>',
    coding: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>',
    fun: '<path d="M4 3h16l-1 6h-4l-.5 3h-5L9 9H5l-1-6z"></path><path d="M6 8h12"></path>',
    growth: '<path d="M7 20h10"></path><path d="M5 12V6a4 4 0 0 1 8 0v12"></path><circle cx="12" cy="8" r="2"></circle>'
  };
  return icons[categoryId] || icons.fun;
}

function toggleBucketItem(id) {
  const item = appState.bucketItems.find(i => i.id === id);
  if (!item) return;
  
  const wasCompleted = item.completed;
  item.completed = !item.completed;
  
  if (item.completed) {
    item.dateCompleted = new Date().toLocaleDateString();
  } else {
    delete item.dateCompleted;
  }
  
  if (!wasCompleted) {
    showToast("🎊 Dream Achieved! 🎊", "Congratulations! Another goal completed together!");
  }
  
  saveToLocalStorage();
  renderBucketItems();
  updateBucketStats();
}

function deleteBucketItem(id) {
  appState.bucketItems = appState.bucketItems.filter(i => i.id !== id);
  saveToLocalStorage();
  renderBucketItems();
  updateBucketStats();
  showToast("Goal removed", "The item has been deleted from your bucket list.");
}

function updateBucketStats() {
  // Get bucket items based on active user and tab
  let allItems = [];
  
  if (appState.activeTab === 'mine') {
    if (appState.activeUser === 'shared') {
      allItems = [
        ...appState.users.sriya.bucketItems,
        ...appState.users.madhava.bucketItems
      ];
    } else {
      allItems = appState.users[appState.activeUser].bucketItems;
    }
  } else if (appState.activeTab === 'theirs') {
    if (appState.activeUser === 'sriya') {
      allItems = appState.users.madhava.bucketItems;
    } else if (appState.activeUser === 'madhava') {
      allItems = appState.users.sriya.bucketItems;
    }
  } else if (appState.activeTab === 'shared') {
    allItems = appState.shared.bucketItems;
  }
  
  const total = allItems.length;
  const completed = allItems.filter(i => i.completed).length;
  const pending = total - completed;
  
  document.getElementById('total-dreams').textContent = total;
  document.getElementById('achieved-dreams').textContent = completed;
  document.getElementById('progress-dreams').textContent = pending;
}

// Enhanced file upload functionality
function triggerFileUpload() {
  const fileInput = document.getElementById('photo-upload');
  if (fileInput) {
    fileInput.click();
  } else {
    showToast("Upload Error", "File upload element not found. Please refresh the page.");
  }
}

function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) {
    showToast("No File Selected", "Please select an image file to upload.");
    return;
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    showToast("Invalid File Type", "Please select an image file (JPEG, PNG, GIF, etc.).");
    return;
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    showToast("File Too Large", "Please select an image smaller than 10MB.");
    return;
  }

  // Show upload progress
  showUploadProgress();

  // Simulate upload progress
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      completePhotoUpload(file);
    }
    updateUploadProgress(progress);
  }, 200);
}

function showUploadProgress() {
  const progressElement = document.getElementById('upload-progress');
  if (progressElement) {
    progressElement.style.display = 'block';
  }
}

function updateUploadProgress(percentage) {
  const progressFill = document.getElementById('upload-progress-fill');
  if (progressFill) {
    progressFill.style.width = `${percentage}%`;
  }
}

function completePhotoUpload(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const photo = {
      id: Date.now(),
      caption: `Photo uploaded by ${appState.activeUser} 📸`,
      category: "Memory",
      date: new Date().toLocaleDateString(),
      user: appState.activeUser,
      dataUrl: e.target.result,
      fileName: file.name,
      fileSize: formatFileSize(file.size)
    };
    
    // Add to shared photos collection
    appState.shared.photos.unshift(photo);
    
    // Save to localStorage
    saveToLocalStorage();
    
    // Update gallery display
    renderGallery();
    
    // Hide progress and show success
    hideUploadProgress();
    showToast("Photo Uploaded Successfully! 📸", `"${file.name}" has been added to your shared gallery!`);
    
    // Add to friendship timeline
    addFriendshipMilestone("Photo Uploaded", `A new photo was added to the gallery by ${appState.activeUser}`, "📸");
  };
  
  reader.onerror = function() {
    hideUploadProgress();
    showToast("Upload Failed", "There was an error reading the file. Please try again.");
  };
  
  reader.readAsDataURL(file);
}

function hideUploadProgress() {
  const progressElement = document.getElementById('upload-progress');
  if (progressElement) {
    progressElement.style.display = 'none';
  }
  // Reset progress bar
  updateUploadProgress(0);
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Add friendship milestone
function addFriendshipMilestone(title, description, icon) {
  const milestone = {
    id: Date.now(),
    title: title,
    description: description,
    date: new Date().toLocaleDateString(),
    icon: icon
  };
  
  appState.friendshipTimeline.unshift(milestone);
  saveToLocalStorage();
  updateFriendshipTimeline();
}

// Gallery rendering - Simplified shared-only approach
function renderGallery() {
  const galleryGrid = document.querySelector('.gallery-grid');
  
  // Always show shared photos
  const photos = appState.shared.photos;
  
  if (photos.length === 0) {
    galleryGrid.innerHTML = `
      <div class="gallery-item" style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
        <span style="font-size: 4rem; margin-bottom: 1rem; display: block;">📸</span>
        <p style="color: var(--muted-foreground); font-size: 1.125rem;">
          No photos uploaded yet. Be the first to share a memory!
        </p>
        <button class="btn btn-primary" onclick="triggerFileUpload()" style="margin-top: 1rem;">
          📷 Upload First Photo
        </button>
      </div>
    `;
    return;
  }
  
  galleryGrid.innerHTML = photos.map(photo => `
    <div class="gallery-item">
      <div class="gallery-image">
        <img src="${photo.dataUrl}" alt="${photo.caption}" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius);">
      </div>
      <div class="gallery-overlay">
        <svg class="heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z"></path>
          <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
          <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"></path>
          <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"></path>
        </svg>
      </div>
      <div class="gallery-info">
        <p class="gallery-caption">${photo.caption}</p>
        <div class="gallery-meta">
          <span class="gallery-category">${photo.category}</span>
          <span class="gallery-date">${photo.date}</span>
          <span class="gallery-user">by ${photo.user}</span>
        </div>
        ${photo.fileName ? `<div class="gallery-file-info">${photo.fileName} (${photo.fileSize})</div>` : ''}
      </div>
    </div>
  `).join('');
}

// Initialize application
function init() {
  console.log('Initializing Our Space... 🚀');
  
  // Load saved data
  loadFromLocalStorage();
  
  // Initialize all components
  initNavigation();
  initJournal();
  initLearningTracker();
  initBucketList();
  initUserSwitcher(); // Initialize user switcher
  initTabs(); // Initialize tabs
  
  // Initial renders
  renderJournalEntries();
  renderTasks();
  updateProgress();
  updateBadge();
  renderBucketItems();
  updateBucketStats();
  updateDashboard(); // Initial dashboard update
  updateFriendshipTimeline(); // Initial timeline update
  renderGallery(); // Initial gallery render
  
  console.log('Our Space initialized successfully! ✨');
}

// Start the application when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Expose functions to global scope for onclick handlers
window.editJournalEntry = editJournalEntry;
window.deleteJournalEntry = deleteJournalEntry;
window.toggleTask = toggleTask;
window.toggleBucketItem = toggleBucketItem;
window.deleteBucketItem = deleteBucketItem;
window.addReaction = addReaction;
window.addComment = addComment;
window.toggleSupport = toggleSupport;
window.addTaskComment = addTaskComment;
window.handlePhotoUpload = handlePhotoUpload;
window.triggerFileUpload = triggerFileUpload;

// System Test Function - Comprehensive functionality verification
function runSystemTest() {
  console.log('🧪 Running comprehensive system test...');
  
  const testResults = {
    navigation: testNavigation(),
    fileUpload: testFileUpload(),
    journal: testJournal(),
    gallery: testGallery(),
    userSwitcher: testUserSwitcher(),
    localStorage: testLocalStorage()
  };
  
  const allPassed = Object.values(testResults).every(result => result === true);
  
  if (allPassed) {
    console.log('✅ All system tests passed! System is fully operational.');
    showToast("System Test Complete", "All functionality verified and working correctly! 🎉");
  } else {
    console.log('❌ Some system tests failed. Check console for details.');
    showToast("System Test Complete", "Some issues detected. Check console for details.");
  }
  
  return testResults;
}

function testNavigation() {
  try {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    
    if (navButtons.length === 0 || sections.length === 0) {
      console.error('❌ Navigation test failed: Missing navigation elements');
      return false;
    }
    
    console.log('✅ Navigation test passed');
    return true;
  } catch (error) {
    console.error('❌ Navigation test failed:', error);
    return false;
  }
}

function testFileUpload() {
  try {
    const fileInput = document.getElementById('photo-upload');
    const uploadArea = document.querySelector('.upload-area');
    
    if (!fileInput || !uploadArea) {
      console.error('❌ File upload test failed: Missing upload elements');
      return false;
    }
    
    console.log('✅ File upload test passed');
    return true;
  } catch (error) {
    console.error('❌ File upload test failed:', error);
    return false;
  }
}

function testJournal() {
  try {
    const journalInput = document.getElementById('journal-input');
    const saveBtn = document.getElementById('journal-save-btn');
    
    if (!journalInput || !saveBtn) {
      console.error('❌ Journal test failed: Missing journal elements');
      return false;
    }
    
    console.log('✅ Journal test passed');
    return true;
  } catch (error) {
    console.error('❌ Journal test failed:', error);
    return false;
  }
}

function testGallery() {
  try {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    if (!galleryGrid) {
      console.error('❌ Gallery test failed: Missing gallery elements');
      return false;
    }
    
    console.log('✅ Gallery test passed');
    return true;
  } catch (error) {
    console.error('❌ Gallery test failed:', error);
    return false;
  }
}

function testUserSwitcher() {
  try {
    const userButtons = document.querySelectorAll('.user-btn');
    
    if (userButtons.length === 0) {
      console.error('❌ User switcher test failed: Missing user buttons');
      return false;
    }
    
    console.log('✅ User switcher test passed');
    return true;
  } catch (error) {
    console.error('❌ User switcher test failed:', error);
    return false;
  }
}

function testLocalStorage() {
  try {
    const testKey = 'systemTest';
    const testValue = 'test';
    
    localStorage.setItem(testKey, testValue);
    const retrieved = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    
    if (retrieved !== testValue) {
      console.error('❌ LocalStorage test failed: Data persistence issue');
      return false;
    }
    
    console.log('✅ LocalStorage test passed');
    return true;
  } catch (error) {
    console.error('❌ LocalStorage test failed:', error);
    return false;
  }
}

// Expose system test to global scope
window.runSystemTest = runSystemTest;