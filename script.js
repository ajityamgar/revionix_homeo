<<<<<<< HEAD

// popup js for register page
$(document).ready(function () {
  $("#registrationForm").submit(function (event) {
      event.preventDefault(); // Stop form submission
      
      $.ajax({
          type: "POST",
          url: "register.php",
          data: $(this).serialize(),
          dataType: "json",
          success: function (response) {
              if (response.status === "success") {
                  $("#popup-message").html(`<span style="color: green;">${response.message}</span>`);
              } else {
                  $("#popup-message").html(`<span style="color: red;">${response.message}</span>`);
              }
              $("#popup").fadeIn();
              setTimeout(() => { $("#popup").fadeOut(); }, 3000);
          },
          error: function () {
              $("#popup-message").html(`<span style="color: red;">❌ Server Error! Please try again.</span>`);
              $("#popup").fadeIn();
              setTimeout(() => { $("#popup").fadeOut(); }, 3000);
          }
      });
  });

  $(".close-popup").click(function () {
      $("#popup").fadeOut();
  });
});


// user ko profile page per information show karne ke liye 
fetch("fetch_profile.php")
  .then(response => response.json())
  .then(data => {
      document.getElementById("firstName").innerText = data.first_name;
      document.getElementById("lastName").innerText = data.last_name;
      document.getElementById("email").innerText = data.email;
      document.getElementById("phone").innerText = data.phone;
  });

  fetch("fetch_reviews.php")
  .then(response => response.json())
  .then(data => {
      let reviewsHTML = "";
      data.forEach(review => {
          reviewsHTML += `<p><strong>${review.first_name} ${review.last_name}:</strong> ${review.rating} ⭐ - ${review.review_text}</p>`;
      });
      document.getElementById("reviewsSection").innerHTML = reviewsHTML;
  });

  fetch("fetch_faqs.php")
  .then(response => response.json())
  .then(data => {
      let faqsHTML = "";
      data.forEach(faq => {
          faqsHTML += `<div class="faq-item">
                        <div class="faq-question">${faq.question}</div>
                        <div class="faq-answer">${faq.answer}</div>
                      </div>`;
      });
      document.getElementById("faqSection").innerHTML = faqsHTML;
  });


// Profile icon dropdown
document.addEventListener("DOMContentLoaded", function () {
    const profileBtn = document.getElementById("profileBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");
  
    if (profileBtn && dropdownMenu) {
      profileBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // Stop click event from propagating to window
        dropdownMenu.classList.toggle("show");
      });
  
      // Close dropdown if clicked outside
      window.addEventListener("click", function (event) {
        if (!profileBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
          dropdownMenu.classList.remove("show");
        }
      });
    }
  });
  
  // Login page
  const loginLink = document.querySelector('.links a[href="#"]');
  if (loginLink) {
    loginLink.addEventListener('click', function (event) {
      event.preventDefault();
      const email = prompt("Please enter your registered email address:");
      if (email) {
        // Show a progress indicator
        const progressIndicator = document.createElement('div');
        progressIndicator.textContent = 'Processing...';
        document.body.appendChild(progressIndicator);
  
        // Simulate an API call to send the password reset link
        setTimeout(() => {
          document.body.removeChild(progressIndicator);
          // Simulate checking the email in the database
          const emailExists = true; // Replace with actual email validation logic
  
          if (emailExists) {
            alert("A password reset link has been sent to your email address.");
          } else {
            alert("The email address you entered is not registered.");
          }
        }, 2000);
      }
    });
  }
  
  // Appointment page
  function nextStep(step) {
    document.querySelectorAll('.step').forEach(s => s.style.display = 'none');
    document.getElementById('step' + step).style.display = 'block';
  }
  
  function prevStep(step) {
    document.querySelectorAll('.step').forEach(s => s.style.display = 'none');
    document.getElementById('step' + step).style.display = 'block';
  }
  
  // FAQ page
  document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
      const answer = item.nextElementSibling;
      answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
  });
  
  // Register page
  function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const toggle = field.nextElementSibling;
    if (field.type === "password") {
      field.type = "text";
      toggle.textContent = "Hide";
    } else {
      field.type = "password";
      toggle.textContent = "Show";
    }
  }
  
  const registrationForm = document.getElementById('registrationForm');
  if (registrationForm) {
    registrationForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
  
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
  
      // Additional validation logic
      const username = document.querySelector('input[placeholder="Username"]').value;
      const email = document.querySelector('input[placeholder="Email"]').value;
      const phoneNumber = document.querySelector('input[placeholder="Phone Number"]').value;
  
      if (!username || !email || !phoneNumber) {
        alert('Please fill in all required fields.');
        return;
      }
  
      // Example: Check if email is valid
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
  
      // Example: Check if phone number is valid
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(phoneNumber)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
      }
  
    });
  }
  
  // Profile page
  const userData = {
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "+1234567890",
    email: "john.doe@example.com",
    password: "password123",
    reviews: [],
    appointments: [],
    questions: []
  };
  
  // Password Toggle
  const passwordInput = document.getElementById("password");
  const togglePasswordButton = document.getElementById("togglePassword");
  
  if (passwordInput && togglePasswordButton) {
    togglePasswordButton.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordButton.textContent = "Hide";
      } else {
        passwordInput.type = "password";
        togglePasswordButton.textContent = "Show";
      }
    });
  } else {
    console.error("Password input or toggle button not found!");
  }
  
  // Dynamic Content Rendering
  const reviewsSection = document.getElementById("reviews");
  const appointmentsSection = document.getElementById("appointments");
  const questionsSection = document.getElementById("questions");
  
  // Render Reviews
  if (reviewsSection) {
    if (userData.reviews.length > 0) {
      reviewsSection.innerHTML = userData.reviews
        .map(review => `<p>${review}</p>`)
        .join("");
    } else {
      reviewsSection.innerHTML = "<p>You haven't given any reviews yet!</p>";
    }
  }
  
  // Render Appointments
  if (appointmentsSection) {
    if (userData.appointments.length > 0) {
      appointmentsSection.innerHTML = userData.appointments
        .map(appointment => `<p>${appointment}</p>`)
        .join("");
    } else {
      appointmentsSection.innerHTML = "<p>No appointments booked yet!</p>";
    }
  }
  
  // Render Questions
  if (questionsSection) {
    if (userData.questions.length > 0) {
      questionsSection.innerHTML = userData.questions
        .map(question => `<p>${question}</p>`)
        .join("");
    } else {
      questionsSection.innerHTML = "<p>You haven't asked any questions yet!</p>";
    }
=======

document.addEventListener("DOMContentLoaded", function () {
  const profileIcon = document.getElementById("profileIcon");
  const profileDropdown = document.getElementById("profileDropdown");

  profileIcon.addEventListener("click", function () {
      profileDropdown.style.display = profileDropdown.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", function (event) {
      if (!profileIcon.contains(event.target) && !profileDropdown.contains(event.target)) {
          profileDropdown.style.display = "none";
      }
  });
});


// Popup JS for Login Page
$(document).ready(function () {
  $("#loginForm").submit(function (event) {
      event.preventDefault(); // Stop form submission
      
      $.ajax({
          type: "POST",
          url: "login.php",
          data: $(this).serialize(),
          dataType: "json",
          success: function (response) {
              if (response.status === "success") {
                  $("#popup-message").html(`<span style="color: green;">${response.message}</span>`);
                  setTimeout(() => { window.location.href = "profile.html"; }, 2000); // Redirect after success
              } else {
                  $("#popup-message").html(`<span style="color: red;">${response.message}</span>`);
              }
              $("#popup").fadeIn();
              setTimeout(() => { $("#popup").fadeOut(); }, 3000);
          },
          error: function () {
              $("#popup-message").html(`<span style="color: red;">❌ Server Error! Please try again.</span>`);
              $("#popup").fadeIn();
              setTimeout(() => { $("#popup").fadeOut(); }, 3000);
          }
      });
  });

  $(".close-popup").click(function () {
      $("#popup").fadeOut();
  });
});

// popup js for register page
$(document).ready(function () {
  $("#registrationForm").submit(function (event) {
      event.preventDefault(); // Stop form submission
      
      $.ajax({
          type: "POST",
          url: "register.php",
          data: $(this).serialize(),
          dataType: "json",
          success: function (response) {
              if (response.status === "success") {
                  $("#popup-message").html(`<span style="color: green;">${response.message}</span>`);
              } else {
                  $("#popup-message").html(`<span style="color: red;">${response.message}</span>`);
              }
              $("#popup").fadeIn();
              setTimeout(() => { $("#popup").fadeOut(); }, 3000);
          },
          error: function () {
              $("#popup-message").html(`<span style="color: red;">❌ Server Error! Please try again.</span>`);
              $("#popup").fadeIn();
              setTimeout(() => { $("#popup").fadeOut(); }, 3000);
          }
      });
  });

  $(".close-popup").click(function () {
      $("#popup").fadeOut();
  });
});


// user ko profile page per information show karne ke liye 
fetch("fetch_profile.php")
  .then(response => response.json())
  .then(data => {
      document.getElementById("firstName").innerText = data.first_name;
      document.getElementById("lastName").innerText = data.last_name;
      document.getElementById("email").innerText = data.email;
      document.getElementById("phone").innerText = data.phone;
  });

  fetch("fetch_reviews.php")
  .then(response => response.json())
  .then(data => {
      let reviewsHTML = "";
      data.forEach(review => {
          reviewsHTML += `<p><strong>${review.first_name} ${review.last_name}:</strong> ${review.rating} ⭐ - ${review.review_text}</p>`;
      });
      document.getElementById("reviewsSection").innerHTML = reviewsHTML;
  });

  fetch("fetch_faqs.php")
  .then(response => response.json())
  .then(data => {
      let faqsHTML = "";
      data.forEach(faq => {
          faqsHTML += `<div class="faq-item">
                        <div class="faq-question">${faq.question}</div>
                        <div class="faq-answer">${faq.answer}</div>
                      </div>`;
      });
      document.getElementById("faqSection").innerHTML = faqsHTML;
  });


// Profile icon dropdown
document.addEventListener("DOMContentLoaded", function () {
    const profileBtn = document.getElementById("profileBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");
  
    if (profileBtn && dropdownMenu) {
      profileBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // Stop click event from propagating to window
        dropdownMenu.classList.toggle("show");
      });
  
      // Close dropdown if clicked outside
      window.addEventListener("click", function (event) {
        if (!profileBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
          dropdownMenu.classList.remove("show");
        }
      });
    }
  });
  
  
  // Appointment page
  function nextStep(step) {
    document.querySelectorAll('.step').forEach(s => s.style.display = 'none');
    document.getElementById('step' + step).style.display = 'block';
  }
  
  function prevStep(step) {
    document.querySelectorAll('.step').forEach(s => s.style.display = 'none');
    document.getElementById('step' + step).style.display = 'block';
  }
  
  // FAQ page
  document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
      const answer = item.nextElementSibling;
      answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
  });
  
  // Register page
  function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const toggle = field.nextElementSibling;
    if (field.type === "password") {
      field.type = "text";
      toggle.textContent = "Hide";
    } else {
      field.type = "password";
      toggle.textContent = "Show";
    }
  }
  
  const registrationForm = document.getElementById('registrationForm');
  if (registrationForm) {
    registrationForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
  
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
  
      // Additional validation logic
      const username = document.querySelector('input[placeholder="Username"]').value;
      const email = document.querySelector('input[placeholder="Email"]').value;
      const phoneNumber = document.querySelector('input[placeholder="Phone Number"]').value;
  
      if (!username || !email || !phoneNumber) {
        alert('Please fill in all required fields.');
        return;
      }
  
      // Example: Check if email is valid
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
  
      // Example: Check if phone number is valid
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(phoneNumber)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
      }
  
    });
  }
  
  // Profile page
  const userData = {
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "+1234567890",
    email: "john.doe@example.com",
    password: "password123",
    reviews: [],
    appointments: [],
    questions: []
  };
  
  // Password Toggle
  const passwordInput = document.getElementById("password");
  const togglePasswordButton = document.getElementById("togglePassword");
  
  if (passwordInput && togglePasswordButton) {
    togglePasswordButton.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordButton.textContent = "Hide";
      } else {
        passwordInput.type = "password";
        togglePasswordButton.textContent = "Show";
      }
    });
  } else {
    console.error("Password input or toggle button not found!");
  }
  
  // Dynamic Content Rendering
  const reviewsSection = document.getElementById("reviews");
  const appointmentsSection = document.getElementById("appointments");
  const questionsSection = document.getElementById("questions");
  
  // Render Reviews
  if (reviewsSection) {
    if (userData.reviews.length > 0) {
      reviewsSection.innerHTML = userData.reviews
        .map(review => `<p>${review}</p>`)
        .join("");
    } else {
      reviewsSection.innerHTML = "<p>You haven't given any reviews yet!</p>";
    }
  }
  
  // Render Appointments
  if (appointmentsSection) {
    if (userData.appointments.length > 0) {
      appointmentsSection.innerHTML = userData.appointments
        .map(appointment => `<p>${appointment}</p>`)
        .join("");
    } else {
      appointmentsSection.innerHTML = "<p>No appointments booked yet!</p>";
    }
  }
  
  // Render Questions
  if (questionsSection) {
    if (userData.questions.length > 0) {
      questionsSection.innerHTML = userData.questions
        .map(question => `<p>${question}</p>`)
        .join("");
    } else {
      questionsSection.innerHTML = "<p>You haven't asked any questions yet!</p>";
    }
>>>>>>> 5acc803 (Updated files)
  }