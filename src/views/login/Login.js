import React, { Component } from 'react';
import cookie from 'react-cookies'
// Material Ui Elements
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// Css
import "./Login.css";
import Axios from 'axios';

export class login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errorEmail: false,
      password: "",
      errorPassword: false,
      company: "",
      errorCompany: false,
      showPassword: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleShowPassword = this.handleShowPassword.bind(this);
    this.handleCompany = this.handleCompany.bind(this);
    console.log(props);
  }
 
	componentDidMount() {
  }


  handleEmail= (event) => {
    this.setState({
      email: event.target.value,
      errorEmail: false,
    });
  }

  handlePassword= (event) => {
    this.setState({
      password: event.target.value,
      errorPassword: false,
    });
  }

  handleShowPassword = event => {
    this.setState({
      showPassword: !Boolean(this.state.showPassword),
    });
  }

  handleCompany = (event) => {
    this.setState({
      company: event.target.value,
      errorCompany: false,
    })
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  }

  handleClick = (event) => {
    event.preventDefault();

    if (this.state.email !== "" && this.state.password !== "") {
      let data = {
        username: this.state.email, 
        password: this.state.password 
      }

      Axios
        .post("http://localhost:8081/login", data, {
            headers: {
              'Content-Type':'application/json'
            }
          })
        .then(res => {
          if (res.status === 200 ) {
            var jwtDecode = require('jwt-decode');
            let token = res.headers.authorization;
            let deco = jwtDecode(token);
            cookie.save('userToken', token, { path: '/' })
            if (deco.jti === "ASSISTANT") 
              window.location.href = "/NurseAssistantBoard"
            else if (deco.jti === "ADMIN")
              window.location.href = "/Admin"
            else if (deco.jti === "MANAGER")
              window.location.href = "/Nurse"
          }
        }).catch(err => {
          alert("Error al autenticarce");
        })
    }
    else {
      if (this.state.email === "") {
        this.setState({
          errorEmail: true
        });
      }
      if (this.state.password === "") {
        this.setState({
          errorPassword: true
        });
      }
    }
  }

  
  
  render() {
    return (
      <React.Fragment>
        <Grid container component="main" className="root">
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className="image" />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className="paper">
              <Avatar className="avatar">
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className="form" noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="user"
                  label="ID User"
                  placeholder="12345"
                  name="user"
                  error={this.state.errorEmail}
                  value={this.state.email}
                  onChange={(e) => this.handleEmail(e)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="current-password"
                  error={this.state.errorPassword}
                  value={this.state.password}
                  type={this.state.showPassword ? 'text' : 'password'}
                  onChange={(e) => this.handlePassword(e)}
                  InputProps={{
                    endAdornment: (
                      < InputAdornment position="end" >
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={(e) => this.handleShowPassword(e)}
                          onMouseDown={(e) => this.handleMouseDownPassword(e)}
                        >
                          {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  onClick={(e) => this.handleClick(e)}
                >
                  Sign In
                </Button>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  href = {"/NurseAssistantBoard"}
                >
                  Enfermera Auxiliar
                </Button>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  href = {"/Nurse"}
                >
                  Enfermera Jefe
                </Button>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  href = {"/Admin"}
                >
                  Admin
                </Button>
                
                <Box mt={4}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

function Copyright() {
  return (
    <div className="copyright">
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © ' + new Date().getFullYear() + ' '}
        <Link color="inherit" href="#">
        ARSW
        </Link>
      </Typography>
    </div>
  );
}

export default login;