import React, { Component } from 'react'
/* import { Grid, FormControl, InputLabel, NativeSelect, FormHelperText, Paper, Button, Typography, FormGroup, FormControlLabel, Select, MenuItem } from '@material-ui/core'
import Axios from 'axios'; */


export default class AddPiso extends Component {

    constructor(props){
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
                
            </div>
        )
    }
}
