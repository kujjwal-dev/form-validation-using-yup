import { useState } from "react";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  age: "",
  gender: "",
  interests: [],
  birthDate: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "phone number must be 10 digits")
    .required("Phone Number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "password must be atleast 8 characters")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "password must contain atleast one symbol"
    )
    .matches(/[0-9]/, "password must contain at least one number")
    .matches(/[a-z]/, "password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "password must contain at least one uppercase letter"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "passwords must match")
    .required("Confirm Password is required"),
  age: Yup.number()
    .typeError("age must be a number")
    .min(18, "you must be atleast 18 years old")
    .max(100, "you cannot be older than 100 years")
    .required("age is required"),
  gender: Yup.string().required("gender is required"),
  interests: Yup.array()
    .min(1, "select at least one interests")
    .required("interests are required"),
  birthDate: Yup.date().required("birth date is required"),
});

const FormWithYupAndFormik = () => {
  const { values, handleBlur, handleChange, handleSubmit, errors} = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // const handleCheckboxChange = (e) => {
  //   const { name, checked } = e.target;
  //   let updatedInterests = [...values.interests];
  //   if (checked) {
  //     updatedInterests.push(name);
  //   } else {
  //     updatedInterests = updatedInterests.filter(
  //       (interest) => interest !== name
  //     );
  //   }

  //   setFormData({
  //     ...formData,
  //     interests: updatedInterests,
  //   });
  // };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={values.firstName}
          placeholder="Enter your first name"
          onChange={handleChange}
        />
        {errors.firstName && <div className="error">{errors.firstName}</div>}
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={values.lastName}
          placeholder="Enter your last name"
          onChange={handleChange}
        />
        {errors.lastName && <div className="error">{errors.lastName}</div>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={values.email}
          placeholder="Enter your email"
          onChange={handleChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={values.phoneNumber}
          placeholder="Enter your phone number"
          onChange={handleChange}
        />
        {errors.phoneNumber && (
          <div className="error">{errors.phoneNumber}</div>
        )}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={values.password}
          placeholder="Enter your password"
          onChange={handleChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          placeholder="Confirm your password"
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={values.age}
          placeholder="Enter your age"
          onChange={handleChange}
        />
        {errors.age && <div className="error">{errors.age}</div>}
      </div>

      <div>
        <label>Gender:</label>
        <select name="gender" value={values.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <div className="error">{errors.gender}</div>}
      </div>

      <div>
        <label>Interests:</label>
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={values.interests.includes("coding")}
            onChange={handleCheckboxChange}
          />
          Coding
        </label>
        <label>
          <input
            type="checkbox"
            name="sports"
            checked={values.interests.includes("sports")}
            onChange={handleCheckboxChange}
          />
          Sports
        </label>
        <label>
          <input
            type="checkbox"
            name="reading"
            checked={values.interests.includes("reading")}
            onChange={handleCheckboxChange}
          />
          Reading
        </label>
        {errors.interests && <div className="error">{errors.interests}</div>}
      </div>
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="birthDate"
          value={values.birthDate}
          placeholder="Enter your date of birth"
          onChange={handleChange}
        />
        {errors.birthDate && <div className="error">{errors.birthDate}</div>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormWithYupAndFormik;
