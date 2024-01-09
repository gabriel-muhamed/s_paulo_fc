import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Hoc/adminLayout";
import { get, mCollection, createQuery, createLimit, After } from "../../../firebase";
import { showToastError } from "../../Utils/tools";
import { Link } from "react-router-dom";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";

const AdminMatches = () => {

    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false)
    const [matches, setMatches] = useState(null);

    useEffect(() => {
        if (!matches) {
            setLoading(true);

            get(createQuery(mCollection, createLimit(2)))
                .then(snapshot => {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const matches = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    setLastVisible(lastVisible);
                    setMatches(matches);
                })
                .catch(error => {
                    console.error('Error getting documents: ', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [matches]);


    const loadMoreMatches = () => {
        if (lastVisible) {
            setLoading(true);
            get(createQuery(mCollection, createLimit(2), After(lastVisible)))
                .then(snapshot => {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const newMatches = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    setLastVisible(lastVisible);
                    setMatches([...matches, ...newMatches])

                }).catch(error => {
                    showToastError(error)
                }).finally(() => {
                    setLoading(false)
                })

        } else {
            showToastError('Não há partidas para carregar')
        }
    }

    return (
        <AdminLayout title="Partidas">
            <div className="mb-5">
                <Button
                    disableElevation
                    variant="outlined"
                    to={'/admin_matches/add_match'}
                    color="error"
                    component={Link}
                >
                    Adicionar Partida
                </Button>
            </div>

            <Paper className="mb-5">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Data
                            </TableCell>
                            <TableCell>
                                Partida
                            </TableCell>
                            <TableCell>
                                Resultado
                            </TableCell>
                            <TableCell>
                                Finalizado
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {matches ?
                            matches.map((match, i) => (
                                <TableRow key={match.id}>
                                    <TableCell>
                                        <Link to={`/admin_matches/edit_match/${match.id}`}>
                                            {match.date}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin_matches/edit_match/${match.id}`}>
                                            {match.away} <strong>-</strong> {match.local}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin_matches/edit_match/${match.id}`}>
                                            {match.resultAway} <strong>-</strong> {match.resultLocal}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin_matches/edit_match/${match.id}`}>
                                            {match.final === 'yes' ?
                                                <span className="matches_tag_red">Finalizado</span>
                                                :
                                                <span className="matches_tag_green">Não ocorreu ainda</span>
                                            }
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                            : null}
                    </TableBody>
                </Table>
            </Paper>

            <Button
                variant="contained"
                onClick={() => loadMoreMatches()}
                color="error"
                disabled={loading}
            >
                Carregar mais partidas
            </Button>

            <div className="admin_progress">
                {loading ?
                    <CircularProgress thickness={7} style={{ color: '#E99898' }} />
                    : null}
            </div>

        </AdminLayout>
    )
}

export default AdminMatches