document.addEventListener("DOMContentLoaded", function() {
  const questionContainers = document.querySelectorAll(".question-container");

  questionContainers.forEach(function(container) {
    const question = container.querySelector(".question");
    const answer = container.querySelector(".answer");

    answer.style.display = "none";

    container.addEventListener("click", function() {
      if (answer.style.display === "none") {
        answer.style.display = "block";
      } else {
        answer.style.display = "none";
      }
    });

    document.addEventListener("click", function(event) {
      if (!container.contains(event.target)) {
        answer.style.display = "none";
      }
    });
  });
});
