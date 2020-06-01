import React,{useState} from 'react';
import {Redirect} from 'react-router-dom'
import './Login.scss'

import { signin, authenticate } from '../../apiHandlers/authHandler';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        color: 'primary'
      },
    },
  }));
const Login = () => {
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const classes = useStyles();
    const [values, setValues] = React.useState({
        error:'',
        loading:true,
        success:false,
        showPassword: false,
        didRedirect: false
      });
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      const onSubmit = (e) => {
        e.preventDefault()
        setValues({...values,error:'',loading:true})

        signin({userId,password}).then((data)=>{
          console.log(data.error)
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }else{
                authenticate(data,()=>{
                  setValues({...values,error:'',loading:false,success:true,didRedirect:true})
                })
                
                
            }
        })
      }

    return(
       <div className="login">
          
          {values.error && <Alert severity="error">{values.error}!</Alert>}
           <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="User Id" color= 'primary' value={userId} onChange={(e)=>setUserId(e.target.value)} /><br/>
                <FormControl className={clsx(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </FormControl>
                <br/>
                <Button variant="contained" color="primary" onClick={onSubmit}>
                  Log In
                </Button>
            </form>
            {values.didRedirect &&  <Redirect push to="/home" />}
       </div>
    )
}

export default Login
