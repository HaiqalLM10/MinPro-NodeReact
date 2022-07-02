import React from "react"
import { Button, Form, FormFeedback, Input, Label } from 'reactstrap'
import { useFormik } from 'formik'
import * as yup from 'yup'
import './style.css'
import request from "../../request"

const validationSchema = yup.object().shape({
  username: yup.string().min(3).required(),
  password: yup.string().min(8).required(),
  phone_number: yup.string(),
})

const RegisterPage = () => {

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      phone_number: 0
    },
    validationSchema: validationSchema,
    onSubmit: () => handleRegister()
  });

  const handleRegister = async () => {
    const form = formik.values
    console.log("form: ", form)
    await request.post(`http://localhost:7777/register`, form)
      .then(({ response }) => {
        window.location = "/";
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="register_page">
      <Form className="form-container" onSubmit={formik.handleSubmit}>
        <h1 className="title">Sign Up</h1>
        <p className="desc"> Fill this Form to Register</p>
        <div className="row-input">
          <Label>Username </Label>
          <Input
            id="username"
            name="username"
            placeholder={`Please type your username`}
            value={formik.values.username}
            onChange={formik.handleChange}
            invalid={formik.touched.username && Boolean(formik.errors.username)}
          />
          {
            formik.touched.username && Boolean(formik.errors.username) &&
            <FormFeedback className="error-feedback">{formik.errors.username}</FormFeedback>
          }
        </div>
        <br />
        <div className="row-input">
          <Label>Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder={`Please type your password`}
            value={formik.values.password}
            onChange={formik.handleChange}
            invalid={formik.touched.password && Boolean(formik.errors.password)}
          />
          {
            formik.touched.password && Boolean(formik.errors.password) &&
            <FormFeedback className="error-feedback">{formik.errors.password}</FormFeedback>
          }
        </div>
        <br />
        <div className="row-input">
          <Label>Phone Number </Label>
          <Input
            id="phone_number"
            name="phone_number"
            type="text"
            pattern="[0-9]*"
            placeholder={`Please type your phone number`}
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            invalid={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
          />
          {
            formik.touched.phone_number && Boolean(formik.errors.phone_number) &&
            <FormFeedback className="error-feedback">{formik.errors.phone_number}</FormFeedback>
          }
        </div>
        <br />
        <Button className="btn-submit" type="submit">
          Register
        </Button>
        <p className="signup">
          have account already <a href='/login'> Login Now </a>
        </p>
      </Form>
    </div>

  )
}

export default RegisterPage