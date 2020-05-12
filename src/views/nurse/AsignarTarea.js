import React, { Component } from 'react'
import { Grid, Typography, Paper, Button } from '@material-ui/core';
import CustomTable from '../CustomTable';
import Axios from 'axios';
import moment from 'moment';

export default class AsignarTarea extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            tareas:[]

        }
    }

    componentDidMount() {
        Axios.get("/nurse/undergoes/notdone")
        .then(res =>{
            console.log(res.data)
            this.setState((state) =>{
                let tempRows=[]
                for(const task of res.data){
                    let row = {name: task.undergoesId, IdUndergoes: task.undergoesId, nPaci: '', dPro:'', Hora:  moment(task.date).format('LT')}
                    tempRows.push(row)
                }
                return({
                    tareas: tempRows
                })
            })
        });
    }

    assignarTarea = (event) => {
        event.preventDefault();
    }

    headCells = [
        { id: 'IdUndergoes', label: 'Id' },
        { id: 'nPaci', label: 'Nombre' },
        { id: 'dPro', label: 'Procedimiento' },
        { id: 'Hora', label: 'Hora' }
      ];

    render() {
        return (
            <div>
                <Grid item xs ={12}>
                    <Typography variant="h4" gutterBottom align="center" color='textSecondary'>
                        Adicionar Tarea
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <CustomTable rows={this.state.tareas} headCells={this.headCells}/>
                </Grid>

                <Grid >
                <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submit"
                        onClick = {this.assignarTarea}
                        >
                        Asignar
                    </Button>
                </Grid>
            </div>
        )
    }
}
