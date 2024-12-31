const login = ()=>{

let submit = document.querySelector(".submit");

submit.addEventListener("click", () => {
    let email = document.querySelector(".email").value;
    let password = document.querySelector(".password").value;
    

    if (email === "" && password === "") {
        return alert("Fill your form")
    } else {

    axios.post('user-info-git-main-hafizmominhussain222-gmailcoms-projects.vercel.app/login', {
        email: email,
        password: password
    })
        .then(function (res) {
            if (res.data.message === "Login successfully") {
                console.log(res.data.message);
                alert(res.data.message);
                console.log(res.data);
                let userId =res.data.data._id;
                localStorage.setItem("token",res.data.token);
                localStorage.setItem("id",userId);
                window.location.href = `user-info-git-main-hafizmominhussain222-gmailcoms-projects.vercel.app/profile.html`;  
            } else {
                console.log(res.data)
                alert(res.data)
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        email.value = ""
        password.value = ""
    }
})
}
login()





// setTimeout(()=>
// {
//     const emailFullName = login()
//     console.log(emailFullName);
// },3000)

// function getdata(){
//     const token = localStorage.getItem('token')
    
// axios.get('http://localhost:9000/data', {
//     headers: {
//         'Authorization': `Bearer ${token}`
//     }
// }).then((res)=>{
//     console.log(res);
    
// }).catch((err)=>{
//     console.log(err);
// })
// }


