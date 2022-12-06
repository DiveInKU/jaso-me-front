import GlobalStyled from "styles/GlobalStyled";
import themes from "styles/themes";
import { BubbleProps } from "types/interview/interview-type";

const LeftBubble: React.FC<BubbleProps> = ({ text }) => {
    return (
        <div
            style={{
                width: 'auto',
                height: 'auto',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                padding: 20,
                margin: 20,
                backgroundColor: themes.colors.main_blue,
                color: themes.colors.white,
                borderTopRightRadius: 15,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15
            }}>
            {text}
        </div>
    )
}

export default LeftBubble;