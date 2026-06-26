// Jobs module
const jobs = {
  currentPage: 1,
  totalPages: 1,
  filters: {},

  // Render job card
  renderJobCard(job) {
    const salaryText = job.salary?.min && job.salary?.max
      ? `${job.salary.currency} ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}`
      : 'Not specified';

    return `
      <div class="card job-card" data-job-id="${job._id}">
        <div class="card-header">
          <div>
            <h3 class="job-title">${this.escapeHtml(job.title)}</h3>
            <p class="company">${this.escapeHtml(job.company)}</p>
          </div>
          <span class="badge badge-primary">${job.jobType}</span>
        </div>
        <div class="job-meta">
          <span>📍 ${this.escapeHtml(job.location)}</span>
          <span>💼 ${job.experience} level</span>
          <span>💰 ${salaryText}</span>
        </div>
        <div class="job-tags">
          ${job.skills?.slice(0, 4).map(skill => `<span class="tag">${this.escapeHtml(skill)}</span>`).join('')}
        </div>
        <div class="mt-2">
          <a href="job-details.html?id=${job._id}" class="btn btn-outline btn-sm">View Details</a>
        </div>
      </div>
    `;
  },

  // Load jobs
  async loadJobs(container, filters = {}) {
    try {
      container.innerHTML = '<div class="text-center"><div class="spinner"></div></div>';
      
      const params = {
        page: this.currentPage,
        limit: 10,
        ...filters
      };

      const response = await api.jobs.getAll(params);
      
      this.totalPages = response.totalPages;
      
      if (response.data.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <h3>No jobs found</h3>
            <p>Try adjusting your search filters</p>
          </div>
        `;
        return;
      }

      container.innerHTML = response.data.map(job => this.renderJobCard(job)).join('');
      
      this.renderPagination(document.getElementById('pagination'));
    } catch (error) {
      container.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    }
  },

  // Render pagination
  renderPagination(container) {
    if (!container || this.totalPages <= 1) {
      if (container) container.innerHTML = '';
      return;
    }

    let html = '';
    
    html += `<button ${this.currentPage === 1 ? 'disabled' : ''} onclick="jobs.goToPage(${this.currentPage - 1})">Previous</button>`;
    
    for (let i = 1; i <= this.totalPages; i++) {
      if (i === 1 || i === this.totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
        html += `<button class="${i === this.currentPage ? 'active' : ''}" onclick="jobs.goToPage(${i})">${i}</button>`;
      } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
        html += '<span>...</span>';
      }
    }
    
    html += `<button ${this.currentPage === this.totalPages ? 'disabled' : ''} onclick="jobs.goToPage(${this.currentPage + 1})">Next</button>`;
    
    container.innerHTML = html;
  },

  // Go to page
  goToPage(page) {
    this.currentPage = page;
    const container = document.getElementById('jobs-container');
    this.loadJobs(container, this.filters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Search jobs
  search(filters) {
    this.currentPage = 1;
    this.filters = filters;
    const container = document.getElementById('jobs-container');
    this.loadJobs(container, filters);
  },

  // Load job details
  async loadJobDetails(jobId) {
    try {
      const response = await api.jobs.getOne(jobId);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Escape HTML
  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};
