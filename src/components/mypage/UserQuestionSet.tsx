import React, { useState, useEffect } from 'react'
import { TextField } from "@material-ui/core";
import { MyPageProps } from 'types/mypage/mypage-type';

const UserQuestionSet:React.FC<MyPageProps> = ({index, onSetPair, defaultContent}) => {
    const [content, setContent] = useState<string>("");

    const contentChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setContent(e.target.value);
        onSetPair(content, index);
    }

    // useEffect(() => {
    //     onSetPair(content, index);
    //     console.log('content 저장',content);
    // },[content]);

    return(
        <TextField onChange={contentChange} style={{ marginTop: 10, marginBottom: 10, width: 1000}}
                        type="text" 
                        className='input-id' 
                        variant="outlined" 
                        size="small" 
                        placeholder='제목을 입력하세요.'
                        defaultValue={defaultContent}/>
        
    )
}

export default UserQuestionSet;