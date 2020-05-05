import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom';
import EAssistant from './E_Assistant';

export default class N_Assistant extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            nurseName:'',
            cedulaNurse:'',
            RHNurse:'',
            typeNurse: '',
            mailNurse:'',
            errorNurseName:false,
            errorCedula:false,
            errorRH:false,
            errorType:false,
            errorMail:false,
            typeDocument:'',
            errorTypeD:false
        }
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={6}>
                        <Grid item xs={3}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                                href = {"/Admin/nurse/E_Assistant"}
                                >
                                Asignar Enfermera
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Switch>
                            <Route path="/Admin/nurse/E_Assistant">
                                <EAssistant/>
                            </Route>
                        </Switch>
                    </Grid>
                </Grid>

            </div>
        )
    }
}
