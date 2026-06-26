// Auth state management
console.log("AUTH FILE LOADED - TEST");
const auth = {
  user: null,
  token: null,

  init() {
    this.token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
    this.updateUI();
  },

  login(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.updateUI();
  },

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  },

  isLoggedIn() {
    return !!this.token;
  },

  isEmployer() {
    return this.user?.role === 'employer';
  },

  isJobseeker() {
    return this.user?.role === 'jobseeker';
  },

  updateUI() {
    const guestNav = document.getElementById('guest-nav');
    const userNav = document.getElementById('user-nav');
    const employerNav = document.getElementById('employer-nav');
    const jobseekerNav = document.getElementById('jobseeker-nav');
    const userName = document.getElementById('user-name');

    if (this.isLoggedIn()) {
      if (guestNav) guestNav.classList.add('hidden');
      if (userNav) userNav.classList.remove('hidden');
      if (userName) userName.textContent = this.user.name;

      if (this.isEmployer()) {
        if (employerNav) employerNav.classList.remove('hidden');
        if (jobseekerNav) jobseekerNav.classList.add('hidden');
      } else {
        if (employerNav) employerNav.classList.add('hidden');
        if (jobseekerNav) jobseekerNav.classList.remove('hidden');
      }
    } else {
      if (guestNav) guestNav.classList.remove('hidden');
      if (userNav) userNav.classList.add('hidden');
      if (employerNav) employerNav.classList.add('hidden');
      if (jobseekerNav) jobseekerNav.classList.add('hidden');
    }
  },

  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  requireEmployer() {
    if (!this.isLoggedIn() || !this.isEmployer()) {
      indow.location.href = 'login.html';
      return false;
    }
    return true;
  },

  requireJobseeker() {
    if (!this.isLoggedIn() || !this.isJobseeker()) {
      indow.location.href = 'login.html';;
      return false;
    }
    return true;
  }
};

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', () => {
  auth.init();
});
