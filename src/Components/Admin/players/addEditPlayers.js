import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../../Hoc/adminLayout'
import FileUpload from '../../Utils/fileUploader'

import { useFormik } from "formik"
import * as Yup from "yup"

import { selectErrorHelper, selectIsError, showToastError, showToastSuccess, textErrorHelper } from '../../Utils/tools'
import { TextField, Select, MenuItem, FormControl, Button } from '@mui/material'
import { add, createDoc, getOne, getRef, playersCollection, storage } from '../../../firebase'
import { setDoc } from 'firebase/firestore'
import { getDownloadURL } from 'firebase/storage'

const defaultValues = {
    name: '',
    lastname: '',
    number: '',
    position: '',
    image: ''
}

const AddEditPlayers = (props) => {
    const [formType, setFormType] = useState('');
    const [values, setValues] = useState(defaultValues)
    const [loading, setLoading] = useState(false);
    const [defaultImg, setDefaultImg] = useState('')
    const { playerid } = useParams();
    const navigate = useNavigate()

    const submitForm = (values) => {
        let dataToSubmit = values;
        setLoading(true)

        if (formType === 'add') {
            add(playersCollection, dataToSubmit)
                .then(() => {
                    showToastSuccess('Jogador adicionado');
                    formik.resetForm();
                    navigate('/admin_players')
                }).catch(error => {
                    showToastError(error)
                })
        } else {
            setDoc(createDoc(playersCollection, playerid), (dataToSubmit))
                .then(() => {
                    showToastSuccess('Jogador atualizado')
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    setLoading(false)
                })
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Essa seção é necessária'),
            lastname: Yup.string()
                .required('Essa seção é necessária'),
            number: Yup.number()
                .required('Essa seção é necessária')
                .min('0', "O valor mínimo é 0")
                .max('100', "O valor máximo é 100"),
            position: Yup.string()
                .required('Essa seção é necessária'),
            image: Yup.string()
                .required('Essa seção é necessária'),
        }),
        onSubmit: (values) => {
            submitForm(values);
        }
    });

    useEffect(() => {
        if (playerid) {
            getOne(createDoc(playersCollection, playerid))
                .then((querySnapshot) => {
                    const imageRef = getRef(storage, `players/${querySnapshot.data().image}`);
                    getDownloadURL(imageRef)
                        .then(url => {
                            updateImageName(querySnapshot.data().image)
                            setDefaultImg(url)
                        })
                    setFormType('edit')
                    setValues(querySnapshot.data())
                })
                .catch((error) => {
                    console.error("Erro ao obter dados do jogador:", error);
                });
        } else {
            setFormType('add');
            setValues(defaultValues)
        }
    }, [playerid])

    const updateImageName = (filename) => {
        formik.setFieldValue('image', filename)
    }

    const resetImg = () => {
        formik.setFieldValue('image', '')
        setDefaultImg('')
    }

    return (
        <AdminLayout title={formType === 'add' ? 'Adicionar jogador' : 'Editar jogador'}>
            <div className='editplayers_dialog_wrapper'>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl error={selectIsError(formik, 'image')}>
                            <FileUpload
                                dir='players'
                                defaultImg={defaultImg}
                                defaultImgName={formik.values.image}
                                filename={(filename) => updateImageName(filename)}
                                resetImg={() => resetImg()}
                            />
                        </FormControl>
                        <hr />
                        <h4>Informações do Jogador</h4>
                        <div className='mb-5'>
                            <FormControl>
                                <TextField
                                    id="name"
                                    name="name"
                                    variant="outlined"
                                    placeholder='Nome do jogador'
                                    {...formik.getFieldProps('name')}
                                    {...textErrorHelper(formik, 'name')}
                                />
                            </FormControl>
                        </div>
                        <div className='mb-5'>
                            <FormControl>
                                <TextField
                                    id="lastname"
                                    name="lastname"
                                    variant="outlined"
                                    placeholder='Sobrenome do jogador'
                                    {...formik.getFieldProps('lastname')}
                                    {...textErrorHelper(formik, 'lastname')}
                                />
                            </FormControl>
                        </div>
                        <div className='mb-5'>
                            <FormControl>
                                <TextField
                                    type='number'
                                    id="number"
                                    name="number"
                                    variant="outlined"
                                    placeholder='Número do jogador'
                                    {...formik.getFieldProps('number')}
                                    {...textErrorHelper(formik, 'number')}
                                />
                            </FormControl>
                        </div>
                        <div className='mb-5'>
                            <FormControl error={selectIsError(formik, 'position')}>
                                <Select
                                    id="position"
                                    name="position"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('position')}
                                >
                                    <MenuItem value="" disabled>Escolha uma posição</MenuItem>
                                    <MenuItem value="Goleiro">Goleiro</MenuItem>
                                    <MenuItem value="Zagueiro">Zagueiro</MenuItem>
                                    <MenuItem value="Lateral Direito">Lateral Direito</MenuItem>
                                    <MenuItem value="Lateral Esquerdo">Lateral Esquerdo</MenuItem>
                                    <MenuItem value="Volante">Volante</MenuItem>
                                    <MenuItem value="Meia">Meia</MenuItem>
                                    <MenuItem value="Atacante">Atacante</MenuItem>
                                </Select>
                                {selectErrorHelper(formik, 'position')}
                            </FormControl>
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            color="error"
                            disabled={loading}
                        >
                            {formType === 'add' ?
                                'Adicionar jogador'
                                :
                                'Editar jogador'
                            }
                        </Button>

                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddEditPlayers;