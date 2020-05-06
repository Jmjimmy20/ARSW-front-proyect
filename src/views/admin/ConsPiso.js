import React, { Component } from 'react'
import cookie from 'react-cookies'
import { Grid, FormControl, InputLabel, NativeSelect, Paper, Typography } from '@material-ui/core'
import Axios from 'axios'
import CustomTable from '../CustomTablex';

export default class ConsPiso extends Component {

    constructor(props){
        super(props);
        this.state={
            floorID:'',
            beds:'',
            rooms:0,
            pisos:[],
            rows: '',
            headCells: '',
            rows:[]

        }
    }

    headCells = [
        { id: 'IdRoom', label: 'Room' },
        { id: 'nCamas', label: 'Beds' }
      ];
      
    /*rows = [
        { id: 'name', name: 'Nicolas', lastname: 'Cardenas' , nCamas: '2'},
        { id: 'name', name: 'Jimmy', lastname: 'Moya', nCamas: '4' },
        { id: 'name', name: 'Juan', lastname: 'Mora', nCamas: '6'}

      ];*/

    componentDidMount(){
        var token = cookie.load('userToken');
        console.log(token);
        Axios.get("/admin/blocks")
        .then(res =>{
            console.log(res.data)
            this.setState({
                pisos:res.data
            })
        });
        console.log(this.state.pisos.length);
    }

    getFloor = (event) => {
        let floorID = event.target.value;
        //console.log(event.target.value);
        this.setState((state) => {
            let tempRows = []
            for(const floor of state.pisos){
                if(floor.blockcode === parseInt(floorID)){
                    for(const room of floor.rooms){
                        let row = {name:room.roomnumber , IdRoom: room.roomnumber, nCamas: room.beds.length};
                        tempRows.push(row)
                    }

                    return({
                        floorID: floor.blockfloor,
                        rooms : floor.rooms.length,
                        rows: tempRows
                    })
                }
            }
        })
    }


    render() {
        return (
            <div>
                <Grid item xs={12}>
                    <Typography variant="h2" gutterBottom align="center" color='textSecondary'>
                        Consultar Piso
                    </Typography>
                </Grid>
                <Grid container spacing={3} style={{paddingTop:'2%'}}>
                    <Grid item xs={12}  component={Paper} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                        <FormControl fullWidth error={this.state.errorType}>
                            <InputLabel id="typeNurseInput">Pisos</InputLabel>
                            <NativeSelect 
                                fullWidth
                                value={this.state.floorID}
                                onChange={this.getFloor}
                                >
                                <option value=""> </option>
                                {this.state.pisos.map((piso, index) => {
                                    console.log(piso)
                                    return(
                                        <option key={index} value={piso.blockcode}> {piso.blockcode}</option>
                                    );
                                })}
                                
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} style={{ paddingBottom:'10%'}}>
                    </Grid>

                    <Grid item xs={12}  component={Paper} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                        <Grid item xs={12}>
                            <Typography>
                                Numero de Piso:  { this.state.floorID }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Cantidad de cuartos:  { this.state.rooms }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTable rows={this.state.rows} headCells={this.headCells} title={"Datos Pisos"} />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
