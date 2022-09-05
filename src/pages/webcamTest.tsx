import React, { useState } from 'react';
import GlobalStyles from 'styles/GlobalStyles';
import { useNavigate } from 'react-router';
import themes from 'styles/themes';

const WebcamTest: React.FC = () => {

    let navigate = useNavigate();

    return(
        <GlobalStyles.ViewCol style={{ backgroundColor: themes.colors.background}}></GlobalStyles.ViewCol>
    )
}

export default WebcamTest;