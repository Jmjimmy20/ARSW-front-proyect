import React, { Component } from 'react'
import cookie from 'react-cookies'
import { Grid, FormControl, InputLabel, NativeSelect, Paper, Typography } from '@material-ui/core'
import Axios from 'axios'
import CustomTable from '../CustomTablex';

export default class C_Assistant extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            enfermeras: [],
            A_name:'',
            A_id:'',
            A_idDoc:'',
            A_idType:'',
            A_correo:'',
            rows:[]
        }
    }

    componentDidMount() {
        var token = cookie.load('userToken');
        console.log(token);
        Axios.get("/nurse/users")
        .then(res =>{
            let auxList = [];
            for(const datos of res.data){
                if(datos.nurses.length!==0){
                auxList.push(datos)
                }
            }
            console.log(res.data)
            this.setState({
                enfermeras:auxList
            })
        });
        
    }
    
    headCells = [
        { id: 'nTask', label: 'Tarea' },
        { id: 'dTask', label: 'Descripción' }
      ];

    getAux = (event) => {
        let auxNurse = event.target.value;
        //console.log(event.target.value);
        
        for(const nur of this.state.enfermeras){
            if(nur.userId === parseInt(auxNurse)){
                this.setState({
                    A_name: nur.nurses[0].name,
                    A_idDoc:nur.govId,
                    A_idType:nur.govType
                })
                
                Axios.get("/nurse/undergoes/notdone/nurse/" + nur.nurses[0].nurseId)
                .then(res =>{
                    let tempRows = []
                    for(const underAux of res.data){
                        Axios.get("/nurse/procedure/undergoes/" + underAux.undergoesId)
                        .then(resTask =>{
                            this.setState((state)=>{
                                let row = {name:resTask.data.procedureId, nTask: resTask.data.name, dTask: resTask.data.description }
                                tempRows.push(row)
                            })
                        })
                    }
                    return ({
                        rows:tempRows
                    })
                    
                })
                
            }
        }
    }
    

    render() {
        return (
            <div>
                <Grid item xs={12}>
                    <Typography variant="h2" gutterBottom align="center" color='textSecondary'>
                        Consultar Auxiliar
                    </Typography>
                </Grid>
                <Grid container style={{paddingTop:'2%'}}>
                    <Grid item xs={11} component={Paper} style={{ padding: "2%", marginBottom: "2%" }}>
                        <FormControl fullWidth error={this.state.errorType}>
                            <InputLabel id="typeNurseInput">Enfermera</InputLabel>
                            <NativeSelect 
                                fullWidth
                                value={this.state.P_id}
                                onChange={this.getAux}
                                >
                                <option value=""> </option>
                                {this.state.enfermeras.map((nuraux, index) => {
                                    let n_name = nuraux.nurses[0].name
                                    let n_id = nuraux.nurses[0].nurseId
                                    return(
                                        <option key={index} value={nuraux.userId}> {n_id} - {n_name} </option>
                                    );
                                })}
                                
                            </NativeSelect>
                        </FormControl>
                    </Grid>

                    <Grid item xs={11} component={Paper} style={{ padding: "2%", marginBottom: "2%" }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography>
                                    Nombre:  { this.state.A_name }
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    Tipo de documento:  { this.state.A_idType }
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                Documento de Indentidad:  { this.state.A_idDoc }
                                </Typography>
                            </Grid>  
                        </Grid>
                    </Grid>
                    
                        <Grid item xs={11} component={Paper} style={{ padding: "2%", marginBottom: "2%" }}>
                            <CustomTable rows={this.state.rows} headCells={this.headCells} title={"Tareas"} />
                        </Grid>
                    
                    
                </Grid>
            </div>
        )
    }
}
