import GlobalStyled from "styles/GlobalStyled";
import themes from "styles/themes";
import { BubbleProps } from "types/interview/interview-type";

const RightBubble: React.FC<BubbleProps> = ({ text }) => {
    return (
        <div 
            style={{ 
                width: 'auto',
                height: 'auto',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                padding: 20,
                margin: 20,
                backgroundColor: themes.colors.blue_4,
                color: themes.colors.main_blue,
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6
            }}>
            {text}
        </div>
    )
}

export default RightBubble;