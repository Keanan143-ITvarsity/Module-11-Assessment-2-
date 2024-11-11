let rootPath = 'data/reviews.json';

function init() {
    document.getElementById("getAll").addEventListener('click', getAllReviews);
    document.getElementById("getPopular").addEventListener('click', getPopularReviews);
    document.getElementById("getLatest").addEventListener('click', getLatestReviews);

    getAllReviews();
}

function getAllReviews() {
    fetchReviews();
    setActiveLink("getAll");
}

function getPopularReviews() {
    fetchReviews("popular");
    setActiveLink("getPopular");
}

function getLatestReviews() {
    fetchReviews("latest");
    setActiveLink("getLatest");
}

function fetchReviews(category = "all") {
    fetch(rootPath)
        .then(response => response.json())
        .then(data => {
            let filteredData = data.restaurants;
            if (category === "popular") {
                filteredData = filteredData.filter(restaurant => restaurant.dishes.starter.rating >= 4.5);
            } else if (category === "latest") {
                filteredData = filteredData.slice(-3);
            }
            displayReviews(filteredData);
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
                    <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" onclick="toggleInfo(${index})">Show Details</button>
                </div>
                <div id="info-${index}" class="card-body" style="display: none;">
                    <h5>Starter: ${restaurant.dishes.starter.name} (Rating: ${restaurant.dishes.starter.rating})</h5>
                    <img src="${restaurant.dishes.starter.image}" class="card-img-top" style="width:100%; height:auto;"/>
                    <p class="card-text">${restaurant.dishes.starter.review}</p>

                    <h5>Main Course: ${restaurant.dishes.main_course.name} (Rating: ${restaurant.dishes.main_course.rating})</h5>
                    <img src="${restaurant.dishes.main_course.image}" class="card-img-top" style="width:100%; height:auto;"/>
                    <p class="card-text">${restaurant.dishes.main_course.review}</p>

                    <h5>Dessert: ${restaurant.dishes.dessert.name} (Rating: ${restaurant.dishes.dessert.rating})</h5>
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
    document.getElementById("getPopular").classList.remove("active");
    document.getElementById("getLatest").classList.remove("active");

    document.getElementById(id).classList.add("active");
}


