import React, { useState } from 'react'
import { TextField } from "@material-ui/core";
import { MyPageProps } from 'types/mypage/mypage-type';

const UserQuestionSet:React.FC<MyPageProps> = ({index, defaultContent}) => {
    //const [content, setContet] = useState<string>(defaultContent);
    return(
        <TextField style={{ marginTop: 10, marginBottom: 10, width: 1000}}
                        type="text" 
                        className='input-id' 
                        variant="outlined" 
                        size="small" 
                        placeholder='제목을 입력하세요.'
                        defaultValue={defaultContent}/>
        
    )
}

export default UserQuestionSet;