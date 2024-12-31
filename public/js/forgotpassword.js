let submit = document.querySelector(".submit");

submit.addEventListener("click", () => {
    let email = document.querySelector(".email").value;
    if (email === "") {
        alert("fill your input")
    } else {
        axios.post('user-info-git-main-hafizmominhussain222-gmailcoms-projects.vercel.app/forgotpassword', {
            email: email,
        })
            .then(function (res) {
                alert(res.data.message);
                console.log(res.data)
                // window.location.href = "http://localhost:9000/resetpassword.html"
            })
            .catch(function (error) {
                console.log(error);
            })
    }
})

