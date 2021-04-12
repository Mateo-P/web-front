import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';

type Props = {
    text: String;
    onAction?: () => void;
    actionLabel?: String;
};

export default function EmptyItemsMessage({ text, onAction, actionLabel }: Props) {
    return (
        <Fade in={true} timeout={1000}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                width="100%"
                height="50vh"
                justifyContent="center">
                <Typography variant="h3" gutterBottom>
                    {text}
                </Typography>
                {actionLabel && (
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => onAction()}>
                        {actionLabel}
                    </Button>
                )}
            </Box>
        </Fade>
    );
}
