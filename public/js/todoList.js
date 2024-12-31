

const dataget = () => {
    const token = localStorage.getItem('token');
    axios.get('user-info-git-main-hafizmominhussain222-gmailcoms-projects.vercel.app/getalltodo')
        .then((res) => {
            console.log(res.data);

            document.getElementById("list-item").innerHTML = ""
            res.data.data.map(function (data) {
                var newData = `
                <li  class="list-group-item" id="${data._id}">
                <p>${data.todo}</p>
                <div class="button">
                <button href="javascript:void(0)" onclick="deleData('${data._id}')">Delete</button>
                <button href="javascript:void(0)" onclick="getEmailInInput('${data._id}','${data.todo}')">Edit</button>
                </div>
                </li>
                `
                document.getElementById("list-item").innerHTML += newData
            })
        })
        .catch((err) => {
            console.log(err);
        })
}

dataget()
// <div class="ubdate-data">
//     <textarea id="input-edit" placeholder="Enter your text"></textarea> 
//     <button onclick="saveItem()">Save</button>
// </div>             


const getEmailInInput = (id,email) => {
    console.log(id);
    
    document.getElementById(id).innerHTML = `
    <li class="Edit-list">
    <input type="text" value="${email}" id="editVal" />
    <button class="editbtn" onclick="Update('${id}')">Edit</button>
    </li>   
    `
}

// document.getElementById("input-edit").value = email
// console.log(id);
// idData.unshift(id)
// document.querySelector(".ubdate-data").classList.add("flex-data");
// console.log(idData);


const Update = (id) => {
    const todo = document.getElementById("editVal").value;
    axios.put('user-info-git-main-hafizmominhussain222-gmailcoms-projects.vercel.app/todoupdate/' + id, {
        todo:todo 
    }).then((res)=>{
        console.log(res.data.message);
        alert(res.data.message);
        dataget()
    }).catch((err)=>{
        console.log(err);
    })
}

    // alert("todo updated successfully");
    // document.querySelector(".ubdate-data").classList.remove("flex-data");
    // idData.shift()
    // console.log(idData);
    // dataget()
const deleData = (id) => {
    console.log(id);
    axios.delete('user-info-git-main-hafizmominhussain222-gmailcoms-projects.vercel.app/tododelete/' + id)
        .then((resp) => {
            console.log(resp);
            alert(resp.data.message)
        })
        .catch((error) => {
            console.log(error);
        })

    dataget()

}






const addItem = async () => {

    const input = document.getElementById("input");
    if (input.value === "") {
        alert("Enter your text in input")
    } else {
        await axios.post('user-info-git-main-hafizmominhussain222-gmailcoms-projects.vercel.app/todoadd', {
            todo: input.value
        })
            .then((resp) => {
                console.log(resp);
                alert(resp.data.message)
            })
            .catch((error) => {
                console.log(error);
            })
        setTimeout(dataget(), 2000)
        input.value = ""
    }
}

const getVal = ()=>{
    const Id = localStorage.getItem('id');
    console.log(Id);
    axios.get(`user-info-git-main-hafizmominhussain222-gmailcoms-projects.vercel.app/profileget/${Id}`)
        .then((res) => {
            const userData = res.data;
            console.log(userData);
            const setfullName = document.querySelector(".setfullName");
            const setemail = document.querySelector(".setemail");
            setfullName.textContent = res.data.fullName;
            setemail.textContent = res.data.email;
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
}
getVal()

