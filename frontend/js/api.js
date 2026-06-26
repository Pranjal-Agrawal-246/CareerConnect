console.log("THIS IS MY API.JS");
const API_BASE_URL = 'http://localhost:5000/api';

// API helper functions
const api = {
  // Get auth header
  getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  // Generic request handler
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Auth endpoints
  auth: {
    register(userData) {
      return api.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
    },

    login(credentials) {
      return api.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
    },

    getMe() {
      return api.request('/auth/me');
    },

    updateProfile(data) {
      return api.request('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    }
  },

  // Jobs endpoints
  jobs: {
    getAll(params = {}) {
      const queryString = new URLSearchParams(params).toString();
      return api.request(`/jobs?${queryString}`);
    },

    getOne(id) {
      return api.request(`/jobs/${id}`);
    },

    create(jobData) {
      return api.request('/jobs', {
        method: 'POST',
        body: JSON.stringify(jobData)
      });
    },

    update(id, jobData) {
      return api.request(`/jobs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(jobData)
      });
    },

    delete(id) {
      return api.request(`/jobs/${id}`, {
        method: 'DELETE'
      });
    },

    getEmployerJobs() {
      return api.request('/jobs/employer/me');
    }
  },

  // Applications endpoints
  applications: {
    apply(jobId, data) {
      return api.request(`/applications/${jobId}`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    getMyApplications() {
      return api.request('/applications/me');
    },

    getJobApplications(jobId) {
      return api.request(`/applications/job/${jobId}`);
    },

    updateStatus(applicationId, status) {
      return api.request(`/applications/${applicationId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
    },

    withdraw(applicationId) {
      return api.request(`/applications/${applicationId}`, {
        method: 'DELETE'
      });
    }
  }
};
