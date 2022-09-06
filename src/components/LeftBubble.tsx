import GlobalStyled from "styles/GlobalStyled";
import themes from "styles/themes";
import { BubbleProps } from "types/interview-type";

const LeftBubble: React.FC<BubbleProps> = ({ text }) => {
    return (
        <GlobalStyled.ViewCol 
            style={{ 
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: themes.colors.main_blue,
                color: themes.colors.white,
                borderTopRightRadius: 6,
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6
            }}>
            {text}
        </GlobalStyled.ViewCol>
    )
}

export default LeftBubble;