

// Profile.js

// // Function to get URL parameters
// function getQueryParam(param) {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get(param);
// }

// Get user ID from URL
const Id = localStorage.getItem('id');
console.log(Id);

    axios.get(`user-info-git-main-hafizmominhussain222-gmailcoms-projects.vercel.app/profileget/${Id}`)
        .then((res)=>{
            const userData = res.data;
            console.log(userData);    
            const setemail = document.querySelector(".setemail");
            const setfullName = document.querySelector(".setfullName");
            const PhoneNo = document.querySelector(".PhoneNo");
            const Gender = document.querySelector(".Gender");
            const Dateofbirth = document.querySelector(".Dateofbirth");
            const country = document.querySelector(".country");
            const city = document.querySelector(".city");
            let profileImage = document.querySelector(".profileImage");
            setfullName.textContent = res.data.fullName;
            setemail.textContent = res.data.email;
            profileImage.src = res.data.profileImage;
            Gender.textContent = res.data.Gender;   
            country.textContent = res.data.Country;   
            city.textContent = res.data.city;   
            Dateofbirth.textContent = res.data.Dateofbirth;   
            PhoneNo.textContent = res.data.phoneNo;   
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });



        
