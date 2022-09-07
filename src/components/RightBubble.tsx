import GlobalStyled from "styles/GlobalStyled";
import themes from "styles/themes";
import { BubbleProps } from "types/interview-type";

const RightBubble: React.FC<BubbleProps> = ({ text }) => {
    return (
        <GlobalStyled.ViewCol 
            style={{ 
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: themes.colors.blue_4,
                color: themes.colors.main_blue,
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6
            }}>
            {text}
        </GlobalStyled.ViewCol>
    )
}

export default RightBubble;