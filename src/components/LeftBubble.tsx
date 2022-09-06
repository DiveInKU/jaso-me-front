import GlobalStyled from "styles/GlobalStyled";
import themes from "styles/themes";
import { BubbleProps } from "types/interview-type";

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
                borderTopRightRadius: 6,
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6
            }}>
            {text}
        </div>
    )
}

export default LeftBubble;