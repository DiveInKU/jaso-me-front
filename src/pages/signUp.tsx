import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import jasoMeLogo from '../assets/svgs/jasoMeLogo.svg';
import { TextField } from "@material-ui/core";
import { Button,Divider,IconButton } from '@mui/material';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ApiService from 'apis/apiService';
import '../App.css'; 

const SignUp: React.FC = () => {
    const apiService = ApiService();
    let navigate = useNavigate();
    const [id,setId] = useState<string>("");
    const [pw,setPw] = useState<string>("");
    const [repw,setRepw] = useState<string>("");
    const [name,setName] = useState<string>("");
    const [idcode,setIdcode] = useState<number>(0);
    const [scode,setScode] = useState<number>(0);

    const getMembers = async (id:string) => {
        await apiService
        .getMembers(id)
        .then((res) => {
            console.log(res.data);
            setIdcode(res.data.code);
            console.log(res.data.code);
            console.log(res.data.message);

            console.log('return code '+ idcode);
        })
        .catch((err) => {
            console.log(err);
            console.log(err.response.data.code);
            console.log(err.response.data.message);

            setIdcode(err.response.data.code);
            console.log('return code '+ idcode);
        });
    }

    const postMembersNew = async (id:string, name:string, pw:string) => {
        await apiService
        .postMembersNew(id,name,pw)
        .then((res) => {
            console.log(res.data);
            setScode(res.data.code);
            console.log(res.data.code);
            console.log(res.data.message);
            console.log(res.data.detail);
            navigate("/Login");
        })
        .catch((err) => {
            console.log(err);
            console.log(err.response.data.code);
        });
    }

    const emailChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setId(e.target.value);
    }
    const pwChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setPw(e.target.value);
    }
    const repwChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setRepw(e.target.value);
    }
    const nameChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value);
    }

    const signIn=(e: React.MouseEvent<HTMLButtonElement>)=>{
        postMembersNew(id,name,pw);
        console.log(id);
        console.log(name);
        console.log(pw);
    }

    const backToLoginPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/Login");
    }

    const doubleCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
        getMembers(id);

    }

    const emailValidation = ()=>{
        var check = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
        return check.test(id);
    }

    const nameValidation = ()=>{
        var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        return check.test(name);
    }

    const pwValidation = ()=>{
        var check = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,10}$/
        return check.test(pw);
    }

    const repwValidation = ()=>{
        if(pw === repw)
            return true;
    }

    const signupCheck = ()=>{
        if(emailValidation()&&nameValidation()&&pwValidation()&&repwValidation())
            return true;
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
                <div className='text-property1' style={{}}>{"이메일"}
                    <Button className="email-doublecheck" variant="contained" onClick={doubleCheck} disabled={emailValidation()?false:true}
                        style={{
                            marginLeft:"15px",marginBottom:"7px",
                            backgroundColor: "#4F62AC", fontFamily: 'Notosans-medium', fontStyle:"normal",
                            fontWeight: "500", fontSize:"12px", width:"100px", height:"30px"
                        }} >중복 확인</Button>
                </div>

                <div style={{marginBottom:"30px",}}>
                    <TextField type="text" className='input-property' variant="outlined" size="small" placeholder='jasome@gmail.com' 
                    onChange={emailChange} error={(id==="") ||emailValidation()?false:true} helperText={(id==="")||emailValidation()?"":"이메일 형식에 맞지 않습니다."}
                    style={{
                        width:"400px",
                    }}

                    />
                    {(idcode===1000) &&
                    <div className="recog-property" style={{
                        marginTop:"3px",
                        marginLeft:"5px",
                    }}>{"* 사용가능한 이메일입니다."}</div>}
                    
                    {((idcode!==1000) && (idcode!==0)) &&
                    <div className="duplie-property" style={{
                        marginTop:"3px",
                        marginLeft:"5px",
                    }}>{"* 사용불가능한 이메일입니다."}</div>}
                </div>

                <div className='text-property'>{"이름"}</div>
                <TextField type="text" className='input-property' variant="outlined" size="small" placeholder='이름을 입력하세요.'
                    onChange={nameChange} error={(name==="")||nameValidation()?false:true} helperText={(name==="")||nameValidation()?"":"한글만 입력이 가능합니다."}
                    style={{
                        width:"400px",
                        marginBottom:"30px",

                    }}
                />

                <div className='text-property'>{"비밀번호"}</div>
                <TextField type="password" className='input-property' variant="outlined" size="small" placeholder='비밀번호를 입력하세요.'
                    onChange={pwChange} error={(pw==="")||pwValidation()?false:true} helperText={(pw==="")||pwValidation()?"":"영문, 숫자를 포함한 6~10자리만 입력이 가능합니다."}
                    style={{
                        width:"400px",
                        marginBottom:"30px",
                    }}
                />
                <div className='text-property'>{"비밀번호 확인"}</div>
                <TextField type="password" className='input-property' variant="outlined" size="small" placeholder='********'
                    onChange={repwChange} error={(repw==="")||repwValidation()?false:true} helperText={(repw==="")||repwValidation()?"":"비밀번호가 올바르지 않습니다."}
                    style={{
                        width:"400px",
                        marginBottom:"30px",
                    }}
                />
                <Button className="button-login" variant="contained" onClick={signIn} disabled={signupCheck()?false:true}
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