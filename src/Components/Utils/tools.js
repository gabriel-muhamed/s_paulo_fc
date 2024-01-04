import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

import spaulologo from "../../Resources/images/sao-paulo-fc-logo.png";
import { FormHelperText } from "@mui/material";

export const SPLogo = (props) => {
  const template = <div
    className="img_cover"
    style={{
      width: props.width,
      height: props.height,
      background: `url(${spaulologo}) no-repeat`
    }}
  ></div>

  if (props.link) {
    return (
      <Link className="link_logo" to={props.linkTo}>
        {template}
      </Link>
    )
  } else {
    return template
  }
}

export const showToastError = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_LEFT,
  });
};

export const showToastSuccess = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_LEFT,
  });
};

export const NavigateHandler = () => {
  const navigate = useNavigate();

  return (
    logoutHandler(navigate())
  );
};

export const logoutHandler = (navigate) => {
  auth
    .signOut()
    .then(() => {
      navigate("/sign_in");
      showToastSuccess("Você foi deslogado!");
    })
    .catch((error) => {
      showToastError("Erro" + error);
    });
};

export const Tag = (props) => {
  const template = <div
    style={{
      background: props.bck ? props.bck : '#ffffff',
      fontSize: props.fs ? props.fs : '15px',
      color: props.cl ? props.cl : '#000000',
      padding: '5px 10px',
      display: 'inline-block',
      fontFamily: 'Righteous',
      ...props.add
    }}
  >
    {props.children}
  </div>

  if (props.link) {
    return (
      <Link to={props.linkTo}>
        {template}
      </Link>
    )
  } else {
    return template
  }
}

export const textErrorHelper = (formik, values) => ({
  error: formik.errors[values] && formik.touched[values],
  helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
})

export const selectErrorHelper = (formik, values) => {
  if (formik.errors[values] && formik.touched[values]) {
    return (<FormHelperText>{formik.errors[values]}</FormHelperText>)
  }
  return false;
}

export const selectIsError = (formik, values) => {
  return formik.errors[values] && formik.touched[values];
}