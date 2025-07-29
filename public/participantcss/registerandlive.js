// Function to get registered events from localStorage
function getRegisteredEvents() {
    const events = localStorage.getItem("registeredEvents");
    return events ? JSON.parse(events) : [];
  }
  
  // Function to save registered events to localStorage
  function saveRegisteredEvents(events) {
    localStorage.setItem("registeredEvents", JSON.stringify(events));
  }
  
  // Function to register for an event
  function registerEvent(eventId, eventTitle, eventDescription, eventImage) {
    const events = getRegisteredEvents();
    const event = {
      id: eventId,
      title: eventTitle,
      description: eventDescription,
      image: eventImage, // Add image property
    };
  
    // Check if the event is already registered
    if (!events.some((e) => e.id === eventId)) {
      events.push(event);
      saveRegisteredEvents(events);
      alert(`You have successfully registered for "${eventTitle}"!`);
      updateRegisteredEventsPage();
    } else {
      alert(`You are already registered for "${eventTitle}"!`);
    }
  }
  
  // Function to delete a registered event
  function deleteEvent(eventId) {
    const events = getRegisteredEvents().filter((event) => event.id !== eventId);
    saveRegisteredEvents(events);
    updateRegisteredEventsPage();
  }
  
  // Function to update the Registered Events Page
  function updateRegisteredEventsPage() {
    const registeredEventsContainer = document.getElementById("registered-events-container");
    if (registeredEventsContainer) {
      registeredEventsContainer.innerHTML = ""; // Clear the container
  
      const events = getRegisteredEvents();
      events.forEach((event) => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");
        eventCard.setAttribute("data-event-id", event.id);
  
        eventCard.innerHTML = `
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          <button class="delete-btn">Delete</button>
        `;
  
        // Add event listener for the delete button
        eventCard.querySelector(".delete-btn").addEventListener("click", () => {
          deleteEvent(event.id);
        });
  
        registeredEventsContainer.appendChild(eventCard);
      });
    }
  }
  
  // Add event listeners for registration buttons on the Live Events Page
  document.addEventListener("DOMContentLoaded", () => {
    const registerButtons = document.querySelectorAll(".register-btn");
    registerButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const eventCard = button.closest(".event-card");
        const eventId = eventCard.getAttribute("data-event-id");
        const eventTitle = eventCard.querySelector("h3").innerText;
        const eventDescription = eventCard.querySelector("p").innerText;
        const eventImage = eventCard.querySelector("img").src; // Get image source
  
        registerEvent(eventId, eventTitle, eventDescription, eventImage);
      });
    });
  
    // Update the Registered Events Page on load
    updateRegisteredEventsPage();
  });