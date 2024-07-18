import ErrorHandler from "../middlewares/error.js";
import { Reservation } from "../models/reservation.js";
import { Registration } from "../models/registration.js";

export const send_reservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;
  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
  }

  try {
    await Reservation.create({ firstName, lastName, email, date, time, phone });
    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }

    // Handle other errors
    return next(error);
  }
};

// export const user_registration = async (req, res, next) => {
//   // const { firstName, email, date, phone } = req.body;
//   // if (!firstName || !email || !date || !phone) {
//   //   return next(new ErrorHandler("Please Fill Full Registration Form!", 400));
//   // }

//   // try {
//   //   await Registration.create({ firstName, email, date, phone });
//   //   res.status(201).json({
//   //     success: true,
//   //     message: "Registration Sent Successfully!",
//   //   });
//   // } catch (error) {
//   //   // Handle Mongoose validation errors
//   //   if (error.name === "ValidationError") {
//   //     const validationErrors = Object.values(error.errors).map(
//   //       (err) => err.message
//   //     );
//   //     return next(new ErrorHandler(validationErrors.join(", "), 400));
//   //   }

//   //   // Handle other errors
//   //   return next(error);
//   // }

//   const { firstName, email, date, phone } = req.body;
//   let errors = [];

//   //Check Requied Fields
//   if (!firstName || !email || !date || !phone) {
//     errors.push({ msg: "Please fill in all fields" });
//   }
//   // //Password Match
//   // if (password !== password2) {
//   //   errors.push({ msg: "Password do not match" });
//   //   return;
//   // }
//   // //Check Password Lenght
//   // if (password.length < 6) {
//   //   errors.push({ msg: "Password should be atleast 6 characters" });
//   // }

//   if (errors.length > 0) {
//     res.status("registration", {
//       errors,
//       firstName,
//       email,
//       date,
//       phone,
//     });
//   } else {
//     // Validation Passed
//     Registration.findOne({ email: email }).then((user) => {
//       if (user) {
//         // user exists
//         errors.push({ msg: "Email is already registerd" });
//         res.status("registration", {
//           errors,
//           firstName,
//           email,
//           date,
//           phone,
//         });
//       } else {
//         const newUser = new Registration({
//           firstName,
//           email,
//           date,
//           phone,
//           provider: "email",
//         });
//         //Hash password
//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             newUser.password = hash;
//             newUser
//               .save()
//               .then((user) => {
//                 res.status(201).json({
//                   success: true,
//                   message: "Registration Sent Successfully!",
//                 });
//                 // res.redirect("/users/login");
//               })
//               .catch((err) => {
//                 console.log(err);
//               });
//           });
//         });
//       }
//     });
//   }
// };

export const user_registration = async (req, res, next) => {
  const { email, password } = req.body;

  const data = {
    email: email,
    password: password,
  };

  try {
    const check = await Registration.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await Registration.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
  }
};

// const { email, password } = req.body;

// try {
//   const check = await collection.findOne({ email: email });

//   if (check) {
//     res.json("exist");
//   } else {
//     res.json("notexist");
//   }
// } catch (e) {
//   res.json("fail");
// }

// export default { send_reservation };
