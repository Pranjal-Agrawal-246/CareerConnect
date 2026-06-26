// Main application module
const app = {
  // Show alert
  showAlert(message, type = 'success', container = null) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const target = container || document.querySelector('.container');
    target.insertBefore(alertDiv, target.firstChild);
    
    setTimeout(() => alertDiv.remove(), 5000);
  },

  // Show loading
  showLoading(button) {
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.innerHTML = '<span class="spinner"></span> Loading...';
  },

  // Hide loading
  hideLoading(button) {
    button.disabled = false;
    button.textContent = button.dataset.originalText;
  },

  // Format date
  formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  },

  // Get URL params
  getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },

  // Handle form submission
  handleForm(formId, callback) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      const submitBtn = form.querySelector('button[type="submit"]');
      this.showLoading(submitBtn);
      
      try {
        await callback(data);
      } catch (error) {
        this.showAlert(error.message, 'danger');
      } finally {
        this.hideLoading(submitBtn);
      }
    });
  },

  // Open modal
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  },

  // Close modal
  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  },

  // Status badge
  getStatusBadge(status) {
    const badges = {
      pending: 'badge-warning',
      reviewed: 'badge-primary',
      shortlisted: 'badge-success',
      rejected: 'badge-danger',
      hired: 'badge-success'
    };
    return `<span class="badge ${badges[status] || 'badge-primary'}">${status}</span>`;
  }
};

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(modal => {
      modal.classList.remove('active');
    });
  }
});
