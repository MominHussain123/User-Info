const {datacolllection} = require("../Model/userModel.js");
const {todocolllection} = require("../Model/todoModel.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring")
const bcrypt = require("bcrypt");
const saltround = 10;
require("dotenv").config();
const seckey = "Mominhussain";
const multer = require('multer');

const cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: 'dakadsn2w',
    api_key: '223556682224863',
    api_secret: 'uJ1uwFrVbX5-9KswURDb7c-ca3M' // Click 'View API Keys' above to copy your API secret
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({
    storage: storage
})

// Signup route
const signup = async (req, resp) => {
    try {
        const { fullName, email, password, phoneNo, Country, Dateofbirth, Gender, city } = await req.body;

        const profileImage = await req.file;
        console.log(profileImage);

        if (!profileImage) {
            return resp.send('No file uploaded.');
        }


        // Check if email already exists
        const Existemail = await datacolllection.findOne({ email: email });
        // Check if fullName already exists
        const Existfname = await datacolllection.findOne({ fullName: fullName });
        if (Existemail) {
            return resp.send("This Email already exists");
        }
        if (Existfname) {
            return resp.send("Firstname already exists");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return resp.send("Please enter a valid email address.");
        }
        const passwordlength = /^.{6,}$/
        const passwordLowercase = /^(?=.*[a-z])/;
        const passwordUppercase = /^(?=.*[A-Z])/;
        const passwordNumber = /^(?=.*\d)/;
        const passwordSpecialCharacters = /^(?=.*[\W_])/;
        if (!passwordlength.test(password)) {
            return resp.send("Password must be at least 6 characters");
        }
        if (!passwordLowercase.test(password)) {
            return resp.send("Password must be contain lowercase");
        }
        else if (!passwordUppercase.test(password)) {
            return resp.send("Password must be contain uppercase");
        }
        else if (!passwordNumber.test(password)) {
            return resp.send("Password must be contain numbers");
        }
        else if (!passwordSpecialCharacters.test(password)) {
            return resp.send("Password must be contain  special characters.");
        }
        // Encrypt the password
        const salt = bcrypt.genSaltSync(saltround);
        const hash = bcrypt.hashSync(password, salt);


        
        const upload = await cloudinary.uploader.upload(profileImage.path);
        
        // Create new user
        const data = new datacolllection({
            fullName: fullName,
            email: email,
            password: hash,
            profileImage:upload.secure_url, 
            city: city,
            phoneNo: phoneNo,
            randomToken: "",
            Country: Country,
            Gender: Gender,
            Dateofbirth: Dateofbirth
        });

        // Save user data
        data.save();
        console.log(upload);

        resp.status(201).send({
            message: "User registered successfully",
            data: data
        });
    } catch (error) {
        resp.send({
            status: 200,
            message: "An error occurred",
            error: error.message,
        });
    }
};

// const signup = async (req, resp) => {
//     try {
//         const { fullName, email, password, phoneNo, Country, Dateofbirth, Gender, city } = req.body;
//         const profileImage = req.files;
//         console.log(profileImage); // Multiple files ke liye req.files use karein

//         if (!profileImage || profileImage.length === 0) {
//             return resp.status(400).send("No files uploaded.");
//         }

//         // Check if email or fullName already exists
//         const Existemail = await datacolllection.findOne({ email: email });
//         const Existfname = await datacolllection.findOne({ fullName: fullName });
//         if (Existemail) return resp.status(400).send("This Email already exists");
//         if (Existfname) return resp.status(400).send("Firstname already exists");

//         // Email validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) return resp.status(400).send("Please enter a valid email address.");

//         // Password validation
//         const passwordlength = /^.{6,}$/;
//         const passwordLowercase = /^(?=.*[a-z])/;
//         const passwordUppercase = /^(?=.*[A-Z])/;
//         const passwordNumber = /^(?=.*\d)/;
//         const passwordSpecialCharacters = /^(?=.*[\W_])/;
//         if (!passwordlength.test(password)) return resp.status(400).send("Password must be at least 6 characters");
//         if (!passwordLowercase.test(password)) return resp.status(400).send("Password must contain lowercase");
//         if (!passwordUppercase.test(password)) return resp.status(400).send("Password must contain uppercase");
//         if (!passwordNumber.test(password)) return resp.status(400).send("Password must contain numbers");
//         if (!passwordSpecialCharacters.test(password)) return resp.status(400).send("Password must contain special characters.");

//         // Encrypt the password
//         const salt = bcrypt.genSaltSync(saltround);
//         const hash = bcrypt.hashSync(password, salt);

//         // Upload profile images to Cloudinary and collect URLs
//         const uploadPromises = profileImage.map((image) =>
//             cloudinary.uploader.upload(image.path)
//         );
//         const uploadResults = await Promise.all(uploadPromises);
//         const secureUrls = uploadResults.map(result => result.secure_url);

//         // Create new user with profile images
//         const data = new datacolllection({
//             fullName: fullName,
//             email: email,
//             password: hash,
//             profileImage: secureUrls, // Save array of URLs
//             city: city,
//             phoneNo: phoneNo,
//             randomToken: "",
//             Country: Country,
//             Gender: Gender,
//             Dateofbirth: Dateofbirth
//         });

//         // Save user data
//         await data.save();

//         resp.status(201).send({
//             message: "User registered successfully",
//             data: data
//         });
//     } catch (error) {
//         resp.send({
//             message: "An error occurred",
//             error: error.message,
//         });
//     }
// };

// Login route
const login = async (req, resp) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const getdata = await datacolllection.findOne({ email: email });
        console.log("LOGIN DATA GET >> ", getdata);

        if (!getdata) {
            return resp.status(200).send("User not found");
        }

        // Check password length
        // if (password.length < 6) {
        //     return resp.send("Password must be at least 6 characters");
        // }

        // Compare passwords
        const match = bcrypt.compareSync(password, getdata.password);
        if (!match) {
            return resp.status(200).send("Incorrect password");
        }
        jwt.sign({ getData }, seckey, { expiresIn: "60m" }, (err, token) => {
            if (err) return resp.send({ err: err })
            resp.send({
                status: 200,
                message: "Login successfully",
                data: getdata,
                token: token
            });
        })
    } catch (error) {
        resp.status(200).send({
            message: "An error occurred",
            error: error.message
        });
    }
};
// Update route
const Update = async (req, resp) => {
    try {
        const { name, lname, email, phone, gender, password } = req.body;
        const data = await datacolllection.findByIdAndUpdate(req.params.id, { name, email, lname, phone, gender, password }, { new: true });

        // Check password length
        if (password.length < 6) {
            return resp.send("Password must be at least 6 characters!");
        }
        // Check if data not found
        if (!data) {
            return resp.status(404).send("User not found");
        }

        resp.send({
            status: 200,
            message: "User updated successfully",
            data: data
        });
    } catch (error) {
        resp.send({
            status: 200,
            message: "error occurred",
            error: error.message
        });
    }
};
// Get all users route
const getData = async (req, resp) => {
    try {
        // Find User all data
        const data = await datacolllection.find();
        // Check if data not found
        if (!data.length) {
            return resp.status(404).send("No data found");
        }

        resp.status(200).send({
            message: "Data retrieved successfully",
            data: data
        });
    } catch (error) {
        resp.status(500).send({
            message: "error occurred",
            error: error.message
        });
    }
};
// Delete user route
const deletedata = async (req, resp) => {
    try {
        // Find User data
        const data = await datacolllection.findByIdAndDelete(req.params.id);
        // Check if data not found
        if (!data) {
            return resp.status(404).send("User not found");
        }

        resp.status(200).send({
            message: "User deleted successfully",
            data: data
        });
    } catch (error) {
        resp.status(500).send({
            message: "error occurred",
            error: error.message
        });
    }

}
// todo add route
const todoadd = async (req, resp) => {
    try {
        const { todo } = req.body;
        const Existtodo = await todocolllection.findOne({ todo: todo })
        if (Existtodo) {
            return resp.send({ message: "Todo already exist" });
        }
        const data = new todocolllection({
            todo: todo
        })
        data.save();
        resp.send({
            status: 200,
            message: "Todo added successfully",
            data: data
        });

    }
    catch (error) {
        resp.send({
            status: 200,
            message: "error occurred",
            error: error.message
        });

    }
}
// todo Update route
const todoUpdate = async (req, resp) => {
    try {
        const { todo } = req.body;
        
        const data = await todocolllection.findByIdAndUpdate(req.params.id, { todo }, { new: true });

        // Check if data not found
        if (!data) {
            return resp.send("User not found");
        }

        resp.send({
            status: 200,
            message: "todo updated successfully",
            data: data
        });
    } catch (error) {
        resp.send({
            status: 200,
            message: "error occurred",
            error: error.message
        });
    }
};
// todo delete route
const tododelete = async (req, resp) => {
    try {
        // Find User data
        const data = await todocolllection.findByIdAndDelete(req.params.id);
        // Check if data not found
        if (!data) {
            return resp.status(404).send("User not found");
        }

        resp.status(200).send({
            message: "todo deleted successfully",
            data: data
        });
    } catch (error) {           
        resp.send({
            status: 200,
            message: "error occurred",
            error: error.message
        });
    }

}
// todo getalltodo route
const getalltodo = async (req, resp) => {
    try {
        const data = await todocolllection.find();

        if (!data.length) {
            return resp.send("No data found");
        }

        resp.send({
            status: 200,
            message: "todo retrieved successfully",
            data: data
        });
    } catch (error) {
        resp.send({
            status: 200,
            message: "error occurred",
            error: error.message
        });
    }
}
// forgot password  route
const forgotpassword = async (req, resp) => {
    try {
        const { email } = req.body

        const getdata = await datacolllection.findOne({ email: email });
        if (getdata) {
            const randomString = randomstring.generate();

            const data = await datacolllection.updateOne(
                { email: email },
                { $set: { randomToken: randomString } }
            )
            sendEmail(getdata.fullName, getdata.email, randomString)
            resp.send({
                status: true,
                message: "Please check your email",
            })
        }
        else {
            return resp.send("Email not found");
        }
    } catch (error) {
        resp.send({
            status: 400,
            message: "Error occurred",
            error: error.message
        });
    }
}
// send email route
const sendEmail = async (name, email, token) => {

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "hafizmominhussain222@gmail.com",
                pass: "zhxv vvsd ihpq pvpg",
            },
        });
        const mailOption = {
            from: "hafizmominhussain222@gmail.com",
            to: email,
            subject: "for reset password",
            html: `<p>hi ${name} ,please copy this link <a href='user-info-git-main-hafizmominhussain222-gmailcoms-projects.vercel.app/resetpassword.html?token=${token}'>reset password</a> `
        }
        transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("mail has sent", info.response);
            }
        })
    }
    catch (error) {
        console.error("Error occurred: ", error);
    }
};
// reset password route
const resetpassword = async (req, resp) => {
    try {
        const token = req.query.token;
        const tokenData = await datacolllection.findOne({ randomToken: token });

        if (tokenData) {
            const password = req.body.password;
            const salt = bcrypt.genSaltSync(saltround);
            const hash = bcrypt.hashSync(password, salt);

            // ObjectId ko directly pass karo
            const userdata = await datacolllection.findByIdAndUpdate(tokenData._id, { $set: { password: hash, randomToken: "" } },{ new: true } );
            resp.send({
                status: 200,
                message: "Password updated successfully",
                success: true
            });
        } else {
            resp.send({
                status: 404,
                message: "Invalid token",
                success: false
            });
        }
    } catch (error) {
        resp.send({
            status: 500,
            message: "Error occurred",
            error: error.message
        });
    }
};


// profileget data route
const profileget = async (req, res) => {
    try {
        const { id } = req.params
        const user = await datacolllection.findOne({_id:id});
        if (!user) return res.send({ message: 'User not found' });
        res.send(user);
    } catch (error) {
        res.send({ message: 'Server error' });
    }
};



module.exports = {
    signup,
    login,
    getData,
    Update,
    deletedata,
    sendEmail,
    forgotpassword,
    todoadd,
    todoUpdate,
    tododelete,
    getalltodo,
    upload,
    resetpassword,
    profileget
};
