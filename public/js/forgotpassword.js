let submit = document.querySelector(".submit");

submit.addEventListener("click", () => {
    let email = document.querySelector(".email").value;
    if (email === "") {
        alert("fill your input")
    } else {
        axios.post('http://localhost:9000/forgotpassword', {
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

