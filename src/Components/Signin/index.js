import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showToastError, showToastSuccess } from "../Utils/tools";

const SignIn = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "spaulo@gmail.com",
      password: "spaulo123",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email inválido.")
        .required("O email é obrigatório."),
      password: Yup.string()
        .min(8, "Senha com mínimo de 8 dígitos!")
        .required("A senha é obrigatória."),
    }),
    onSubmit: (values) => {
      // go to server with field values
      setLoading(true);
      submitForm(values);
    },
  });

  const submitForm = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        navigate("/dashboard");
        showToastSuccess("Seja Bem-vindo!");
      })
      .catch((error) => {
        setLoading(false);
        showToastError(error.message);
      });
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <>
      {!user ? (
        <div className="container">
          <div className="signin_wrapper" style={{ margin: "100px" }}>
            <form onSubmit={formik.handleSubmit}>
              <h2>Por favor, insira as informações!</h2>
              <input
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error_label">{formik.errors.email}</div>
              ) : null}

              <input
                name="password"
                placeholder="Senha"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error_label">{formik.errors.password}</div>
              ) : null}

              {loading ? (
                <CircularProgress className="progress" />
              ) : (
                <button type="submit">Entrar</button>
              )}
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SignIn;
