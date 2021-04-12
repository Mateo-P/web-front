import { useState, useRef, useEffect, FC } from 'react';
import QRCode from 'qrcode.react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { exportComponentAsPNG } from 'react-component-export-image';

const useStyles = makeStyles({
    root: {
        maxWidth: 345
    },
    media: {
        width: '100%'
    }
});
interface Props {
    url: string;
    id?: string;
    name?: string;
}
const QRCard: FC<Props> = ({ url, id = '1', name }) => {
    const classes = useStyles();
    const contentRef = useRef();
    const [count, setCount] = useState('100px');

    useEffect(() => {
        if (contentRef) {
            setCount(contentRef.current.clientWidth);
        }
    }, [contentRef]);

    return (
        <Card className={classes.root}>
            <CardContent ref={contentRef}>
                <QRCode
                    className={classes.media}
                    id={id}
                    renderAs="svg"
                    includeMargin={false}
                    size={count}
                    level={'L'}
                    value={url}
                    // imageSettings={{
                    //     src: image,
                    //     height: count / 3,
                    //     width: count / 3,
                    //     excavate: true
                    // }}
                />
                <Typography variant="h4" component="h2">
                    {name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() =>
                        exportComponentAsPNG(contentRef, {
                            fileName: `${name}.png`
                        })
                    }>
                    Descargar
                </Button>
            </CardActions>
        </Card>
    );
};
export default QRCard;
