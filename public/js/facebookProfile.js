


const Id = localStorage.getItem('id');
console.log(Id);

axios.get(`user-info-git-main-hafizmominhussain222-gmailcoms-projects.vercel.app/profileget/${Id}`)
.then((resp) => {
    console.log(resp.data);
    const images = document.querySelectorAll(".ProfileImage");
    const names = document.querySelectorAll(".name");
    images.forEach((img)=>{
        img.src = resp.data.profileImage;
    })
    names.forEach((name)=>{
        name.textContent = resp.data.fullName;
    })

}).catch((error)=>{
    console.log(error);
})

const like = document.querySelector(".like");
const likediv = document.querySelector(".likediv");
like.addEventListener("click", function(){
    likediv.classList.toggle("openlikediv")
})

const videoElement = document.querySelector('video');
videoElement.volume = 1;
