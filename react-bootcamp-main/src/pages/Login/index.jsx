import { React } from 'react'
import { Button, Form, FormFeedback, Input, Label } from 'reactstrap'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Navigate } from 'react-router-dom'
import './style.css'
import request from '../../request'

const validationSchema = yup.object().shape({
  username: yup.string().min(3).required(),
  password: yup.string().min(8).required(),
});

const Login = () => {
  const isAuth = sessionStorage.getItem('access_token')
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: () => handleLogin()
  });

  const handleLogin = async () => {
    const form = formik.values
    await request.post(`http://localhost:7777/login`, form)
      .then(({ token }) => {
        sessionStorage.setItem('access_token', token)
      })
      .catch(err => console.error(err))
  }

  if (isAuth) return <Navigate to="/dashboard" />;

  return (
    <div className="login_page">
      <Form className="form-container" onSubmit={formik.handleSubmit}>
        <h1 className="title" >Login</h1>
        <p className="desc"> Welcome to Product Dashboard</p>
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
        <Button className="btn-submit" type="submit">
          Login
        </Button>
        <p className="signup">
          Don't have account <a href='/register'> Signup Now </a>
        </p>
      </Form>
    </div >
  )
}

export default Login;