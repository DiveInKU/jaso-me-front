import React, { useState } from 'react'
import { TextField } from "@material-ui/core";

const UserQuestionSet:React.FC = () => {
    
    return(
        <TextField style={{ marginTop: 10, marginBottom: 10, width: 1000}}
                        type="text" 
                        className='input-id' 
                        variant="outlined" 
                        size="small" 
                        placeholder='제목을 입력하세요.'/>
        
    )
}

export default UserQuestionSet;