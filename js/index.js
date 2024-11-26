document.addEventListener("DOMContentLoaded", () => {
    init();
});

let rootPath = 'data/reviews.json';

function init() {
    document.getElementById("getAll").addEventListener("click", getAllReviews);
    // Automatically load reviews when the page is initialized
    getAllReviews();
}

function getAllReviews() {
    fetchReviews();
    setActiveLink("getAll");
}

function fetchReviews() {
    fetch(rootPath)
        .then(response => response.json())
        .then(data => {
            displayReviews(data.restaurants);
        })
        .catch(error => console.error("Error fetching reviews:", error));
}

function displayReviews(data) {
    let output = "";

    data.forEach((restaurant, index) => {
        output += `
            <div class="card mb-4 box-shadow">
                <div class="card-header">
                    <h4 class="my-0 font-weight-normal">${restaurant.name} - ${restaurant.location}</h4>
                    <br>
                    <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" onclick="toggleInfo(${index})">Show Reviews</button>
                </div>
                <div id="info-${index}" class="card-body" style="display: none;">
                    <h3>Starter: ${restaurant.dishes.starter.name} (Rating: ${restaurant.dishes.starter.rating})</h3>
                    <img src="${restaurant.dishes.starter.image}" class="card-img-top" style="width:100%; height:auto;"/>
                    <p class="card-text">${restaurant.dishes.starter.review}</p>

                    <hr>

                    <h3>Main Course: ${restaurant.dishes.main_course.name} (Rating: ${restaurant.dishes.main_course.rating})</h3>
                    <img src="${restaurant.dishes.main_course.image}" class="card-img-top" style="width:100%; height:auto;"/>
                    <p class="card-text">${restaurant.dishes.main_course.review}</p>

                    <hr>

                    <h3>Dessert: ${restaurant.dishes.dessert.name} (Rating: ${restaurant.dishes.dessert.rating})</h3>
                    <img src="${restaurant.dishes.dessert.image}" class="card-img-top" style="width:100%; height:auto;"/>
                    <p class="card-text">${restaurant.dishes.dessert.review}</p>
                </div>
            </div>
        `;
    });

    document.getElementById("posts").innerHTML = output;
}

function toggleInfo(index) {
    const info = document.getElementById(`info-${index}`);
    if (info.style.display === "none") {
        info.style.display = "block";
    } else {
        info.style.display = "none";
    }
}

function setActiveLink(id) {
    document.getElementById("getAll").classList.remove("active");
    document.getElementById("contactUs").classList.remove("active");
    document.getElementById(id).classList.add("active");
}
