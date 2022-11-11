import GlobalStyled from "styles/GlobalStyled";
import themes from "styles/themes";
import playIcon from "../../assets/svgs/playIcon.svg"
import styled from "styled-components";

const ReplayIcon: React.FC = () => {
    return (
        <GlobalStyled.ViewCol
            style={{
                width: '140px',
                height: '180px',
                cursor: 'pointer',
                alignItems: 'center',
            }}>
            <PlayIcon src={playIcon} />
            <IconText>다시보기</IconText>
        </GlobalStyled.ViewCol>
    )
}

const PlayIcon = styled.img`
    width: auto;
    height: auto;
`;

const IconText = styled.div`
    width: auto;
    height: auto;
    font-weight: bold;
    font-size: 24px;
    margin-top: 20px;
`;

export default ReplayIcon;