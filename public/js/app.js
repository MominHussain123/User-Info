let bars = document.getElementById("bars");
let navbar = document.querySelector(".navbar");
bars.addEventListener("click", () => {
    bars.classList.toggle('fa-xmark');
    navbar.classList.toggle("open-navbar")
});
let header = document.querySelector(".header");
window.addEventListener("scroll", function () {
    header.classList.toggle("blur", window.scrollY > 60);
    navbar.classList.remove("open-navbar");
    bars.classList.remove('fa-xmark');
});

let search = document.querySelector(".search");
let xmark = document.getElementById("xmark");
let SearchIcon = document.getElementById("searchicon");
SearchIcon.addEventListener("click", () => {
    search.classList.add("search-open");
})

xmark.addEventListener("click", () => {
    search.classList.remove("search-open");
})

const userId = localStorage.getItem('id')
if (userId) {

    const img = document.getElementById("img");
    axios.get(`http://localhost:9000/profileget/${userId}`)
        .then((res) => {
            const userData = res.data;
            console.log(userData);
            img.src = res.data.profileImage;
            img.onclick = () => {
                window.location.href = "profile.html"
            }
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
} else {
    console.error('User ID not found in URL');
}



function deleteall() {
    localStorage.removeItem('token')
    window.location.href = './signup.html'
}