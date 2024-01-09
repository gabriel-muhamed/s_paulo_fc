import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import AdminLayout from "../../../Hoc/adminLayout";

import { useFormik } from "formik";
import * as Yup from 'yup';

import { showToastError, showToastSuccess, textErrorHelper, selectErrorHelper, selectIsError } from "../../Utils/tools";
import { TextField, Select, MenuItem, FormControl, Button } from '@mui/material'

import { add, createDoc, get, getOne, mCollection, teamsCollection } from "../../../firebase";
import { setDoc } from "firebase/firestore";

const defaultValues = {
    date: '',
    local: '',
    resultLocal: '',
    away: '',
    resultAway: '',
    referee: '',
    stadium: '',
    result: '',
    final: ''
}

const AddEditMatch = () => {

    const [loading, setLoading] = useState(false);
    const [formType, setFormType] = useState('');
    const [teams, setTeams] = useState(null);
    const [values, setValues] = useState(defaultValues)
    const { matchid } = useParams()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: Yup.object({
            date: Yup.string()
                .required('Essa seção é necessária'),
            local: Yup.string()
                .required('Essa seção é necessária'),
            resultLocal: Yup.number()
                .required('Essa seção é necessária')
                .min(0, 'O mínimo é 0')
                .max(99, 'O máximo 30'),
            away: Yup.string()
                .required('Essa seção é necessária'),
            resultAway: Yup.number()
                .required('Essa seção é necessária')
                .min(0, 'O mínimo é 0')
                .max(99, 'O máximo é 30'),
            referee: Yup.string()
                .required('Essa seção é necessária'),
            stadium: Yup.string()
                .required('Essa seção é necessária'),
            result: Yup.mixed()
                .required('Essa seção é necessária')
                .oneOf(['W', 'D', 'L', 'n/a']),
            final: Yup.mixed()
                .required('Essa seção é necessária')
                .oneOf(['yes', 'no'])
        }),
        onSubmit: (values) => {
            // submit form
            submitForm(values)
        }
    });

    useEffect(() => {
        if (!teams) {
            get(teamsCollection).then(snapshot => {
                const teams = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setTeams(teams)
            }).catch(error => {
                console.log(error)
            })
        }
    }, [teams])

    useEffect(() => {
        if (matchid) {
            getOne(createDoc(mCollection, matchid))
                .then((querySnapshot) => {
                    setFormType('edit')
                    setValues(querySnapshot.data())
                })
                .catch((error) => {
                    console.error("Erro ao obter dados da partida:", error);
                });
        } else {
            setFormType('add')
            setValues(defaultValues)
        }
    }, [matchid])

    const showTeams = () => (
        teams ?
            teams.map((item) => (
                <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
            ))
            : null
    )

    const submitForm = (values) => {
        let dataToSubmit = values;

        teams.forEach((team)=>{
            if(team.name === dataToSubmit.local){
                dataToSubmit['localThmb'] = team.thmb
            }
            if(team.name === dataToSubmit.away){
                dataToSubmit['awayThmb'] = team.thmb
            }
        })

        setLoading(true);
        if( formType === 'add' ){
            add(mCollection, dataToSubmit)
            .then(()=>{
                showToastSuccess('Partida adicionada')
                formik.resetForm();
            }).catch(error=>{
                showToastError('Algo de errado aconteceu, tente novamente mais tarde!')
                console.log(error)
            }).finally(()=>{
                setLoading(false)
            })
        } else {
            setDoc(createDoc(mCollection, matchid), (dataToSubmit))
                .then(() => {
                    showToastSuccess('Partida atualizada')
                }).catch(error => {
                    showToastError('Algo de errado aconteceu, tente novamente mais tarde!')
                    console.log(error)
                }).finally(() => {
                    setLoading(false)
                })
        }
    }

    return (
        <AdminLayout title={ formType === 'add' ? "Adicionar Partida" : values.away + " - " + values.local }>
            <div className="editmatch_dialog_wrapper">
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <h4>
                                Selecione a data
                            </h4>
                            <FormControl>
                                <TextField
                                    id="date"
                                    name="date"
                                    type="date"
                                    {...formik.getFieldProps('date')}
                                    {...textErrorHelper(formik, 'date')}
                                />
                            </FormControl>
                        </div>

                        <hr />

                        <div>
                            <h4>
                                Resultado do 1º time
                            </h4>
                            <FormControl error={selectIsError(formik, 'away')}>
                                <Select
                                    id="away"
                                    name="away"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('away')}
                                >
                                    <MenuItem disabled value="">Selecione um time</MenuItem>
                                    {showTeams()}
                                </Select>
                                {selectErrorHelper(formik, 'away')}
                            </FormControl>
                            <FormControl
                                style={{ marginLeft: '10px' }}
                            >
                                <TextField
                                    id="resultAway"
                                    name="resultAway"
                                    type="number"
                                    placeholder="Resultado"
                                    {...formik.getFieldProps('resultAway')}
                                    {...textErrorHelper(formik, 'resultAway')}
                                />
                            </FormControl>
                        </div>

                        <div>
                            <h4>
                                Resultado do 2º time
                            </h4>
                            <FormControl error={selectIsError(formik, 'local')}>
                                <Select
                                    id="local"
                                    name="local"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('local')}
                                >
                                    <MenuItem disabled value="">Selecione um time</MenuItem>
                                    {showTeams()}
                                </Select>
                                {selectErrorHelper(formik, 'local')}
                            </FormControl>
                            <FormControl
                                style={{ marginLeft: '10px' }}
                            >
                                <TextField
                                    id="resultLocal"
                                    name="resultLocal"
                                    type="number"
                                    placeholder="Resultado"
                                    {...formik.getFieldProps('resultLocal')}
                                    {...textErrorHelper(formik, 'resultLocal')}
                                />
                            </FormControl>
                        </div>

                        <hr />

                        <div>
                            <h4>
                                Informações da partida
                            </h4>
                            <div className="mb-5">
                                <FormControl>
                                    <TextField
                                        id="referee"
                                        name="referee"
                                        variant="outlined"
                                        placeholder="Nome do juiz"
                                        {...formik.getFieldProps('referee')}
                                        {...textErrorHelper(formik, 'referee')}
                                    />
                                </FormControl>
                            </div>

                            <div className="mb-5">
                                <FormControl>
                                    <TextField
                                        id="stadium"
                                        name="stadium"
                                        variant="outlined"
                                        placeholder="Nome do estádio"
                                        {...formik.getFieldProps('stadium')}
                                        {...textErrorHelper(formik, 'stadium')}
                                    />
                                </FormControl>
                            </div>

                            <div className="mb-5">
                                <FormControl error={selectIsError(formik, 'result')}>
                                    <Select
                                        id="result"
                                        name="result"
                                        variant="outlined"
                                        displayEmpty
                                        {...formik.getFieldProps('result')}
                                    >
                                        <MenuItem disabled value="">Selecione um resultado</MenuItem>
                                        <MenuItem value="W">Ganho</MenuItem>
                                        <MenuItem value="D">Empate</MenuItem>
                                        <MenuItem value="L">Derrota</MenuItem>
                                        <MenuItem value="n/a">Sem resultado</MenuItem>
                                    </Select>
                                    {selectErrorHelper(formik, 'result')}
                                </FormControl>
                            </div>

                            <div className="mb-5">
                                <FormControl error={selectIsError(formik, 'final')}>
                                    <Select
                                        id="final"
                                        name="final"
                                        variant="outlined"
                                        displayEmpty
                                        {...formik.getFieldProps('final')}
                                    >
                                        <MenuItem disabled value="">O jogo já ocorreu?</MenuItem>
                                        <MenuItem value="yes">Sim</MenuItem>
                                        <MenuItem value="no">Não</MenuItem>
                                    </Select>
                                    {selectErrorHelper(formik, 'final')}
                                </FormControl>
                            </div>

                            <Button
                                type="submit"
                                variant="outlined"
                                color="error"
                                disabled={loading}
                            >
                                {formType === 'add' ?
                                    'Adicionar partida'
                                    :
                                    'Editar partida'
                                }
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddEditMatch