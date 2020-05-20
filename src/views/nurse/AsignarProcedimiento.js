import MomentUtils from '@date-io/moment';
import { FormControl, InputLabel, NativeSelect, Grid, TextField, Button, Typography, Paper } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import React, { Component } from 'react';
import Axios from 'axios'

class AsignarProcedimiento extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      selectedTime: new Date(),
      procedure: '',
      procedureId: '',
      procedures: [],
      enfermeras:[],
      enfermera:'',
      pacientes:[],
      P_name:'',
      P_id:'',
      P_direccion:'',
      P_genero:'',
      P_idDoc:'',
      P_idType:'',
      P_telefono:'',
      P_rh:'',
      camas:[],
      cama:'',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem velit, rhoncus at augue nec, aliquam mattis sapien. Donec eu libero ut magna vehicula vehicula in sit amet nisl. Ut tincidunt ante sed pharetra consequat. Integer quis nisl neque. Suspendisse accumsan nisi vitae nisl tempor, scelerisque tempor justo commodo. Mauris volutpat mi a facilisis dapibus. Praesent non sagittis quam. Vestibulum molestie ex eu est eleifend, eget egestas est sodales. Duis vitae ligula vitae ligula blandit tincidunt a et sapien. Maecenas eu leo sit amet magna blandit elementum eu non velit. Nam cursus nisi ac orci bibendum, sed varius nisl rhoncus. Suspendisse ac blandit mi. Sed ultrices consectetur tortor vel porttitor. Vestibulum non augue lobortis, mollis nunc ut, ullamcorper nisl. Integer magna sapien, commodo ut suscipit eu, sodales eu lacus."
    }
  }

  componentDidMount() {
    Axios
    .get('/nurse/procedures')
    .then(res => {
      this.setState({ procedures: res.data });
    });
    Axios.get("/nurse/users")
      .then(res =>{
        let auxList = [];
        for(const datos of res.data){
            if(datos.nurses.length!==0){
              auxList.push(datos)
            }
        }
        console.log(auxList)
          this.setState({
              enfermeras:auxList
          })
      });

      
    Axios.get("nurse/room/patient/" + this.props.pacient)  
      .then(res =>{
        console.log(res)
      })

    Axios.get("/nurse/patients")
      .then(res =>{
          console.log(res.data)
          this.setState({
              pacientes:res.data
          })
      });

      Axios.get("/nurse/beds/romnumber/available")
      .then(res =>{
        this.setState({
          camas:res.data
        })
      })
    
  }

  getPatient = (event) => {
    let auxPaciente = event.target.value;
    //console.log(event.target.value);
    
    for(const paci of this.state.pacientes){
        if(paci.patientId === parseInt(auxPaciente)){
            Axios.get("/nurse/patient/" + paci.patientId)
            .then(res => {
                this.setState({
                    P_name: res.data.name,
                    P_id:res.data.patientId,
                    P_direccion:res.data.address,
                    P_genero:res.data.gender,
                    P_idDoc:res.data.govId,
                    P_idType:res.data.govType,
                    P_telefono:res.data.phone,
                    P_rh:res.data.rh
                })

            })
            
        }
    }
}

  
  handleChangeProcedure = (event) => {
    //console.log(event);
    let value = event.target.value
    this.setState((state) => {
      for (const procedure of state.procedures) {
        console.log(procedure, value);
        if (procedure.procedureId === parseInt(value)) {
          return {
            procedure: value,
            procedureId: procedure.name,
            description: procedure.description
          }
        }
      }
    });
  }

  getNurses = (event) =>{
    let auxNurse = event.target.value;
    this.setState({
      enfermera: auxNurse
    })
    
  }

  getCamas =(event) =>{
    let auxCama = event.target.value;
    this.setState({
      cama:auxCama
    })
  }

  handleChangeProcedureID = (event) => {
    //console.log(event);
    this.setState({ procedureId: event.target.value });
  }

  handleDateChange = (event) => {
    // console.log(event);
    this.setState({ selectedDate: event});
  }

  handleTimeChange = (event) => {
    // console.log(event);
    this.setState({ selectedTime: event });
  }

  search = () => {
    if (this.state.procedureId !== '') {
      for (const procedure of this.state.procedures) {
        if (procedure.name === this.state.procedureId) {
          console.log(procedure);
          this.setState({ procedure: procedure.procedureId, description: procedure.description });
        }
      }
    }
  }

  asignar=() =>{

  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
              <Typography variant={"h6"}>
                Escoja el paciente
              </Typography>
              <FormControl fullWidth error={this.state.errorType}>
                  <InputLabel id="typeNurseInput">Paciente</InputLabel>
                  <NativeSelect 
                      fullWidth
                      value={this.state.P_id}
                      onChange={this.getPatient}
                      >
                      <option value=""> </option>
                      {this.state.pacientes.map((paciente, index) => {
                          return(
                          <option key={index} value={paciente.patientId}> {paciente.patientId} - {paciente.name} </option>
                          );
                      })}
                      
                  </NativeSelect>
              </FormControl>
          </Grid>
          <Grid item xs={12} > 
            <Typography variant={"h6"}>
              Escoja el procedimient
            </Typography>
            
            <FormControl fullWidth>
              <InputLabel id="typeNurseInput">Procedimiento</InputLabel>
              <NativeSelect
                fullWidth
                value={this.state.procedure}
                onChange={this.handleChangeProcedure}
              >
                <option value=""> </option>
                {this.state.procedures.map((procedure) => {
                  return (
                    <option key={procedure.procedureId} value={procedure.procedureId}> {procedure.name} - {procedure.description}</option>
                  )
                })}
              </NativeSelect>
            </FormControl>
          </Grid>

          <Grid item xs={12} >
            <Grid container>
              <Grid item xs={12}>
                <div style={{marginTop: "3%"}}>
                  <Typography variant={"h6"}>
                    Agregar mediante código
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} style={{paddingTop: "2%"}}>
                <TextField fullWidth
                  value={this.state.procedureId}
                  onChange={this.handleChangeProcedureID}
                  id="procedureId"
                  label={"Codigo del Procedimiento"}
                  type="search"
                />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={5} >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  onClick={this.search}
                >
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} >
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Grid container>
                <Grid item xs={5} >
                  <DatePicker
                    label="Selecciona una fecha"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    format="DD/MM/yyyy"
                    //variant="static"
                    //orientation="landscape"
                    views={["year", "month", "date"]}
                    cancelLabel={"Cancelar"}
                    okLabel={"Aceptar"}
                    todayLabel={"Hoy"}
                    showTodayButton
                  />
                </Grid>
                <Grid item xs={1} ></Grid>
                <Grid item xs={5} >
                  <TimePicker
                    showTodayButton
                    todayLabel="Ahora"
                    label="Selecciona una hora"
                    value={this.state.selectedTime}
                    minutesStep={5}
                    onChange={this.handleTimeChange}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={12} >
            <Typography variant={"h6"} style={{ marginTop: 16, marginBottom: 16 }}>
              {"Descripción"}
            </Typography>
            <Typography variant={"body1"} paragraph>
              {this.state.description}
            </Typography>
          </Grid>
          <Grid item xs={12} > 
            <Typography variant={"h6"}>
              Cama
            </Typography>
            
            <FormControl fullWidth>
              <InputLabel id="typeNurseInput">Cama</InputLabel>
              <NativeSelect
                fullWidth
                value={this.state.cama}
                onChange={this.getCamas}
              >
                <option value=""> </option>
                {this.state.camas.map((bedaux, index) => {
                  return (
                    <option key={index} value={bedaux.bedId}> {bedaux.bedId} </option>
                    )
                })}
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} > 
            <Typography variant={"h6"}>
              Asignar Enfermera
            </Typography>
            
            <FormControl fullWidth>
              <InputLabel id="typeNurseInput">Enfermera</InputLabel>
              <NativeSelect
                fullWidth
                value={this.state.enfermera}
                onChange={this.getNurses}
              >
                <option value=""> </option>
                {this.state.enfermeras.map((nuraux, index) => {
                  let n_name = nuraux.nurses[0].name
                  let n_id = nuraux.nurses[0].nurseId
                  return (
                    <option key={index} value={nuraux.userId}> {n_id} - {n_name} </option>
                    )
                })}
              </NativeSelect>
            </FormControl>
          </Grid>

          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={this.asignar}
            >
              Asignar
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default AsignarProcedimiento;
