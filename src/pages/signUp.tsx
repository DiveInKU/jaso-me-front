import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import jasoMeLogo from '../assets/svgs/jasoMeLogo.svg';
import { TextField } from "@material-ui/core";
import { Button,Divider,IconButton } from '@mui/material';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import '../App.css'; 

const SignUp: React.FC = () => {
    let navigate = useNavigate();
    const [id,setId] = useState<string>("");
    const [pw,setPw] = useState<string>("");

    const emailChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setId(e.target.value);
    }

    const signIn=(e: React.MouseEvent<HTMLButtonElement>)=>{
        console.log(id);
        console.log(pw);
        navigate("/home");
    }

    const backToLoginPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/Login");
    }

    return(
        <div className="Main">
            <header className="Main-header">
                <img src={jasoMeLogo} className="Main-logo" alt="logo" />
                <Divider style={{
                    backgroundColor: "#F2F2F2",
                    border: "1px solid #F2F2F2",
                      }}></Divider>
            </header>
            <IconButton onClick={backToLoginPage}>
                <ArrowBackIosOutlinedIcon className="back-icon"></ArrowBackIosOutlinedIcon>
            </IconButton>
            <div className='Signup-body'>
                <div className='signup-text'>{"회원가입"}</div>
                <div className='text-property'>{"이메일"}</div>
                <TextField type="email" className='input-property' variant="outlined" size="small" placeholder='jasome@gmail.com'
                    onChange={emailChange} style={{
                        width:"400px",
                        marginBottom:"30px",
                    }}
                />
                <div className='text-property'>{"이름"}</div>
                <TextField type="text" className='input-property' variant="outlined" size="small" placeholder='이름을 입력하세요.'
                    onChange={emailChange} style={{
                        width:"400px",
                        marginBottom:"30px",

                    }}
                />
                <div className='text-property'>{"비밀번호"}</div>
                <TextField type="password" className='input-property' variant="outlined" size="small" placeholder='비밀번호를 입력하세요.'
                    onChange={emailChange} style={{
                        width:"400px",
                        marginBottom:"30px",
                    }}
                />
                <div className='text-property'>{"비밀번호 확인"}</div>
                <TextField type="password" className='input-property' variant="outlined" size="small" placeholder='********'
                    onChange={emailChange} style={{
                        width:"400px",
                        marginBottom:"30px",
                    }}
                />
                <Button className="button-login" variant="contained" onClick={signIn}
                        style={{
                        backgroundColor: "#4F62AC",
                        fontFamily: 'Notosans-medium',
                        fontStyle:"normal",
                        fontWeight: "500",
                        fontSize:"18px",
                        width:"400px",
                        height:"45px",
                      }} >시작하기</Button>
            </div>
        </div>
    )
}

export default SignUp;