import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router';
import { FormControl,Grid,Button,Divider } from '@mui/material';
import { TextField, InputAdornment } from "@material-ui/core";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//import iconGoogle from '../assets/svgs/iconGoogle.svg';
import jasoMeLogo from '../assets/svgs/jasoMeLogo.svg';
import mainIlst from '../assets/svgs/mainIlst.svg';
import ApiService from 'apis/apiService';
import '../App.css'; 

const Login: React.FC = () => {
    const apiService = ApiService();
    let navigate = useNavigate();
    const [id,setId] = useState<string>("");
    const [pw,setPw] = useState<string>("");
    const [lgcode,setLgcode] = useState<number>(0);
    const errortext = ["* 이메일, 비밀번호를 모두 입력해주세요.","* 이메일 형식을 올바르게 입력해 주세요.",
    "* 등록되지 않은 이메일입니다.","* 비밀번호가 일치하지 않습니다."];
    const [text,setText] = useState<string>("");

    useEffect(() => {
      console.log('return code '+ lgcode);
      setMessage(lgcode);
    },[lgcode]);

    const postMembersLogin = async (id:string, pw:string) => {
      await apiService
      .postMembersLogin(id,pw)
      .then((res) => {
          // console.log(res.data);
          // console.log(res.data.code);
          // console.log(res.data.message);
          // console.log(res.data.result);
          window.localStorage.setItem('jwt',res.data.result);
          
          //console.log("고유주소 출력 " + localStorage.getItem('jwt')); //저장 확인

          apiService.getTestMembers()
          .then((res) => {
            // console.log(res.data);
            // console.log(res.data.code);
            // console.log(res.data.message);
            console.log(res.data.result);
            console.log("jwt값 확인"+localStorage.getItem('jwt'));
          })
          .catch((err) => {
            // console.log(err);
            // console.log(err.response.data.code);
            // console.log(err.response.data.message);
            // console.log(err.response.data.result);
            console.log("jwt값 확인"+localStorage.getItem('jwt'));
        });

          navigate("/home");
      })
      .catch((err) => {
          console.log(err);
          console.log(err.response.data.code);
          setLgcode(err.response.data.code);
      });
    }

    const setMessage = async (lgcode:number) => {
      if (lgcode===1110)
        setText(errortext[0]);
      else if (lgcode===1111)
        setText(errortext[1]);
      else if(lgcode===2002)
        setText(errortext[2]);
      else if(lgcode===2003)
        setText(errortext[3]);
    }

    const idChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setId(e.target.value);
    }
    
    const pwChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setPw(e.target.value);
    }
    
    const signIn=(e: React.MouseEvent<HTMLButtonElement>)=>{
        postMembersLogin(id,pw);
    }

    const goToSignUpPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/signUp");
    }

    return (
        <div className="Main">
          <header className="Main-header">
            <img src={jasoMeLogo} className="Main-logo" alt="logo" />
           
          </header>
          <div className="Main-body">
            <div className="body1">
              <img src={mainIlst} className="Main-illust" alt="illust" />
              <div className='Main-text1'>{"취업 준비 서비스!"}</div>
              <div className='Main-text2'>{"자기소개서 작성, 모의 면접"}</div>
              <div className='Main-text3'>{"모두 자소:me에서!"}</div>
            </div>
            <div className='body2'>
              <div className='login'>{"로그인"}</div>
              <div className="duplie-property" style={{
                        marginBottom:"7px",
                        marginLeft:"5px",
                    }}>{text}</div>
                <FormControl component="fieldset" variant="standard">
                  <Grid container spacing={1} marginBottom={2}>
                    <Grid item xs={12}>
                      <TextField type="email" className='input-property' variant="outlined" size="small" placeholder='이메일을 입력하세요.'
                        onChange={idChange}
                        InputProps={{
                          startAdornment: (
                          <InputAdornment position="start">
                          <EmailOutlinedIcon color="disabled"/>
                          </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField type="password" className='input-property' variant="outlined" size="small" placeholder='비밀번호를 입력하세요.'
                        onChange={pwChange}
                        InputProps={{
                          startAdornment: (
                          <InputAdornment position="start">
                          <LockOutlinedIcon color="disabled"/>
                          </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
    
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Button className="button-login" variant="contained" onClick={signIn}
                        style={{
                        backgroundColor: "#4F62AC",
                        fontFamily: 'Notosans-medium',
                        fontStyle:"normal",
                        fontWeight: "500",
                      }} >자소미 계정으로 로그인하기</Button>
                    </Grid>
    
                    {/* <Grid item xs={12}>
                        <Button className="button-google" variant="contained"
                          style={{
                          backgroundColor: "#ffffff",
                          color:"#000000",
                          fontFamily: 'Opensans-medium',
                          fontStyle:"normal",
                          fontWeight: "500",
                          textTransform: 'none'
                        }} >
                          <img src={iconGoogle} className="icon-google" alt="icongoogle" />
                          Google 계정으로 로그인하기</Button>
                    </Grid> */}
                  </Grid>
                  </FormControl>
    
                  <Grid container spacing={1} marginTop={1} >
                    <Grid item xs={3.125}></Grid>
                    <Grid item xs={0.75} className="grid-divider">
                      <Divider style={{
                        backgroundColor: "#4F62AC",
                        width:"35px",
                      }}></Divider>
                    </Grid>
                    <Grid item xs={1.5} className="grid-divider">
                      <Button className="signup" variant="text" onClick={goToSignUpPage}
                        style={{
                        color:"#000000",
                        fontSize:"12px",
                        fontFamily: 'Notosans-medium',
                        fontStyle:"normal",
                        fontWeight: "500"}}>회원가입</Button>
                    </Grid>
                    <Grid item xs={0.75} className="grid-divider">
                      <Divider style={{
                        backgroundColor: "#4F62AC",
                        width:"45px",
                      }}></Divider>
                    </Grid>
                    <Grid item xs={2} className="grid-divider">
                      <Button className="findpw" variant="text" 
                        style={{
                        color:"#000000",
                        fontSize:"12px",
                        fontFamily: 'Notosans-medium',
                        fontStyle:"normal",
                        fontWeight: "500"}}>비밀번호 찾기</Button>
                    </Grid>
                    <Grid item xs={0.75} className="grid-divider">
                      <Divider style={{
                        backgroundColor: "#4F62AC",
                        width:"35px",
                      }}></Divider>
                    </Grid>
                    <Grid item xs={3.125}></Grid>
                  </Grid>
                
              </div>
            </div>
        </div>
    )
}


export default Login;