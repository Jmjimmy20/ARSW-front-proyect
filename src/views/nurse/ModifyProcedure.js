import React, { Component } from 'react';
import { Grid, Typography, FormControl, InputLabel, NativeSelect, TextField, Button } from '@material-ui/core';
import Axios from 'axios'

class ModifyProcedure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      procedure: '',
      procedureModify: '',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem velit, rhoncus at augue nec, aliquam mattis sapien.",
      descriptionModify: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem velit, rhoncus at augue nec, aliquam mattis sapien.",
      procedures: []
    }
  }

  componentDidMount() {
    Axios
      .get('/nurse/procedures')
      .then(res => {
        this.setState({ procedures: res.data });
      });
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
            description: procedure.description
          }
        }
      }
    });
  }

  handleChangeProcedureModify = (event) => {
    //console.log(event);
    let value = event.target.value
    this.setState((state) => {
      for (const procedure of state.procedures) {
        console.log(procedure, value);
        if (procedure.procedureId === parseInt(value)) {
          return {
            procedureModify: value,
            descriptionModify: procedure.description
          }
        }
      }
    });
  }

  handleChangeProcedureID = (event) => {
    //console.log(event);
    this.setState({ procedureId: event.target.value });
  }

  search = () => {
    if (this.state.procedureId !== '') {
      for (const procedure of this.state.procedures) {
        if (procedure.name === this.state.procedureId) {
          this.setState({ procedure: procedure.procedureId, description: procedure.description });
        }
      }
    }
  }

  cancel = () => {

  }

  acept = () => {

  }
  
  render() {
    return (
      <div>
        <Grid container >
          <Grid item xs={12}>
            <Grid container >
              <Grid item xs={6}>
                <Typography variant={"h6"} >
                  Escoja el procedimiento a modificar
                </Typography>
                
                <FormControl fullWidth>
                  <InputLabel id="typeNurseInput">Procedimiento</InputLabel>
                  <NativeSelect
                    fullWidth
                    value={this.state.procedureModify}
                    onChange={this.handleChangeProcedureModify}
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
              <Grid item xs={1}></Grid>
              <Grid item xs={5}>
                <Typography variant={"h6"} style={{ marginTop: 16, marginBottom: 16 }}>
                  {"Descripción"}
                </Typography>
                <Typography variant={"body1"} paragraph>
                  {this.state.descriptionModify}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} style={{marginTop: 16}}>
            <Grid container >
              <Grid item xs={6}>
                <Typography variant={"h6"} >
                  Escoja el procedimiento
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
              <Grid item xs={1}></Grid>
              <Grid item xs={5}>
                <Typography variant={"h6"} style={{ marginTop: 16, marginBottom: 16 }}>
                  {"Descripción"}
                </Typography>
                <Typography variant={"body1"} paragraph>
                  {this.state.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} >
            <Grid container>
              <Grid item xs={12}>
                <div style={{ marginTop: "3%" }}>
                  <Typography variant={"h6"}>
                    Agregar mediante código
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} style={{ paddingTop: "2%" }}>
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
            <Grid container>
              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  onClick={this.cancel}
                >
                  Aceptar
                </Button>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={5} >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className="submit"
                  onClick={this.acept}
                >
                  Cancelar procedimiento
                </Button>
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>
      </div>
    );
  }
}

export default ModifyProcedure;
