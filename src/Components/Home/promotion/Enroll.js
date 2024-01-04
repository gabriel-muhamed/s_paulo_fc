import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useFormik } from "formik";
import { CircularProgress } from "@mui/material";
import * as Yup from 'yup';

import { showToastError, showToastSuccess } from "../../Utils/tools";
import { promotionsCollection , get, createQuery, createWhere, add } from "../../../firebase";

const Enroll = () => {
    const [loading, setLoading] = useState(false);

    const submitForm = async(values) => {
        try{
            const isOnTheList = await get(createQuery(promotionsCollection, createWhere('email','==', values.email)))
            if(isOnTheList.docs.length >= 1){
                showToastError('Parece que você já está na lista!');
                return setLoading(false);
            }
            await add(promotionsCollection, { email: values.email });
            formik.resetForm();
            showToastSuccess('Você está participando do sorteio, boa sorte!');
            return setLoading(false);
        }catch(error){
            console.log(error)
        }
    }

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: Yup.object({
            email:Yup.string()
            .email("E-mail inválido!")
            .required("E-mail é necessário!")
        }),
        onSubmit: (values, { resetForm }) => {
            setLoading(true);
            submitForm(values, resetForm);
        }
    })

    return (
        <Fade>
            <div className="enroll_wrapper">
                <form onSubmit={formik.handleSubmit}>
                    <div className="enroll_title">
                        Insira o seu email
                    </div>
                    <div className="enroll_input">
                        <input
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder="Insira o seu email!"
                        />


                        {formik.touched.email && formik.errors.email ?
                            <div className="error_label">
                                {formik.errors.email}
                            </div>
                            : null}

                        {loading ?
                            <CircularProgress color="secondary" className="progress" />
                            :
                            <button
                                type="submit"
                            >
                                Participe agora!
                            </button>
                        }

                        <div className="enroll_discl">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </div>

                    </div>
                </form>
            </div>
        </Fade>
    )
}

export default Enroll;