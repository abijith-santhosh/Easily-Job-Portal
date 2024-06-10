function deleteJob(id) {
    const result = confirm("Are you sure you want to delete this job?");
    if (result) {
      fetch(`/jobs/${id}/delete`, { method: "GET" })
        .then((res) => {
          if (res.ok) {
            window.location.href = `/jobs`; // If confirmed and job deleted successfully, redirect to jobs page
          } else {
            window.location.href = "/unauthorized"; // If not authorized, redirect to unauthorized page
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  
  
  function updateJob(id) {
    fetch(`/jobs/${id}/update`, { method: "GET" }) 
      .then((res) => {
        if (res.ok) {
          const result = confirm("Are you sure you want to update this job?");
          if (result) {
            window.location.href = `/jobs/${id}/update`; // If confirmed, proceed to update job
          }
        } else {
          window.location.href = "/unauthorized"; // If not authorized, redirect to unauthorized page
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }
  
  
  
  // Define a global variable to store the fetched jobs data
  let allJobs = [];
  
  // Fetch jobs data from the server
  async function fetchJobs() {
      try {
          const response = await fetch("/jobs-json");
          if (!response.ok) {
              throw new Error("Failed to fetch jobs");
          }
          const data = await response.json();
          // Store the fetched jobs data in the global variable
          allJobs = data;
          return allJobs;
      } catch (error) {
          console.error("Error fetching jobs:", error);
          return null;
      }
  }
  
  // Render jobs on the page
  function renderFilteredJobs(jobs) {
    const jobListContainer = document.getElementById("jobList");
    if (!jobListContainer) return;
  
    // Clear previous content
    jobListContainer.innerHTML = "";
  
    // Create a new ul element
    const ul = document.createElement("ul");
  
    // Iterate over the filtered jobs and create list items with images and anchor links
    jobs.forEach(job => {
        const li = document.createElement("li");
  
        // Create an image element for the company logo
        const img = document.createElement("img");
        img.src = "./images/jobs.ico"; 
        img.alt = "company-logo";
        li.appendChild(img);
  
        // Create an anchor element for the job details
        const anchor = document.createElement("a");
        anchor.textContent = `${job.designation} at ${job.cName}`;
        anchor.href = `/jobs/${job.id}`; 
        anchor.classList.add("job-link"); 
        li.appendChild(anchor);
  
       
        ul.appendChild(li);
    });
  
    // Append the ul to the container
    jobListContainer.appendChild(ul);
  
    
  }
  
  // displays job when searching in the search bar
  async function displayJobs(searchTerm = '') {
    try {
        const jobsData = await fetchJobs();
        const jobs = jobsData ? jobsData.jobs : [];
  
        if (Array.isArray(jobs)) {
            const filteredJobs = searchTerm ? jobs.filter(job => job.designation.toLowerCase().includes(searchTerm.toLowerCase())) : [];
  
            // Render the filtered jobs
            renderFilteredJobs(filteredJobs);
  
            // Get the job list container
            const jobListContainer = document.getElementById("jobList");
            if (jobListContainer) {
                // Display the job list when the search term is not empty
                jobListContainer.style.display = searchTerm !== '' ? "block" : "none";
            }
        } else {
            console.log("No jobs data available");
        }
    } catch (error) {
        console.error("Error:", error);
    }
  }
  
  // Perform search when user input changes
  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", handleSearchInput);
    } else {
        console.error("Search input not found.");
    }
  });
  
  function handleSearchInput(event) {
    const searchTerm = event.target.value.trim();
    displayJobs(searchTerm);
  }
  
  // Fetch jobs data and display on page load
  async function init() {
    await fetchJobs();
    displayJobs("");
  }
  
  init(); 
  
  
  