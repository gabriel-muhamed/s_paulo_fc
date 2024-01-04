import React, { useEffect, useState, useParams } from "react";
import AdminLayout from "../../../Hoc/adminLayout";
import { get, playersCollection, createQuery, createLimit, After } from "../../../firebase";
import { showToastError, showToastSuccess } from "../../Utils/tools";
import { Link } from "react-router-dom";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";

const AdminPlayers = () => {

    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false)
    const [players, setPlayers] = useState(null);

    useEffect(() => {
        if (!players) {
            setLoading(true);

            get(createQuery(playersCollection, createLimit(2)))
                .then(snapshot => {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const players = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    setLastVisible(lastVisible);
                    setPlayers(players);
                })
                .catch(error => {
                    console.error('Error getting documents: ', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [players]);


    const loadMorePlayers = () => {
        if (lastVisible) {
            setLoading(true);
            get(createQuery(playersCollection, createLimit(2), After(lastVisible)))
                .then(snapshot => {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const newPlayers = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    setLastVisible(lastVisible);
                    setPlayers([...players, ...newPlayers])

                }).catch(error => {
                    showToastError(error)
                }).finally(() => {
                    setLoading(false)
                })

        } else {
            showToastError('Não há jogadores para carregar')
        }
    }

    return (
        <AdminLayout title="Os Jogadores">
            <div className="mb-5">
                <Button
                    disableElevation
                    variant="outlined"
                    to={'/admin_players/add_player'}
                    color="error"
                    component={Link}
                >
                    Adicionar Jogador
                </Button>
            </div>

            <Paper className="mb-5">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Nome
                            </TableCell>
                            <TableCell>
                                Sobrenome
                            </TableCell>
                            <TableCell>
                                Número do Jogador
                            </TableCell>
                            <TableCell>
                                Posição
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players ?
                            players.map((player, i) => (
                                <TableRow key={player.id}>
                                    <TableCell>
                                        <Link to={`/admin_players/edit_player/${player.id}`}>
                                            {player.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin_players/edit_player/${player.id}`}>
                                            {player.lastname}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin_players/edit_player/${player.id}`}>
                                            {player.number}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin_players/edit_player/${player.id}`}>
                                            {player.position}
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
                onClick={() => loadMorePlayers()}
                color="error"
                disabled={loading}
            >
                Carregar mais jogadores
            </Button>

            <div className="admin_progress">
                { loading ? 
                    <CircularProgress thickness={7} style={{color: '#E99898'}}/>
                : null}
            </div>

        </AdminLayout>
    )
}

export default AdminPlayers