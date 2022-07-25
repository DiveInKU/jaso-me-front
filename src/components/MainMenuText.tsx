import React from 'react';
import rightArrow from '../assets/svgs/rightArrow.svg';

type MenuTextProps = {
    title: string;
    desc: string;
    sign: string;
    onClick: () => void
}

const MainMenuText: React.FC<MenuTextProps> = ({ title, desc, sign, onClick }) => {

    return (
        <div
         onClick={onClick}
         style={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'flex-start',
        }}>
            <div style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 15}}>{title}</div>
            <div style={{ fontSize: 18, marginBottom: 15}}>{desc}</div>
            <div style={{  
                display: 'flex', 
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <div style={{ fontSize: 13 , marginRight: 5}}>{sign}</div>
                <img src={rightArrow} />
            </div>
        </div>
    )
}

export default MainMenuText;