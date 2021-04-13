import { useState, useRef, useEffect, forwardRef } from 'react';
import QRCode from 'qrcode.react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { exportComponentAsPNG } from 'react-component-export-image';
import { COMPLEAT_LOGO_URI } from 'shared/constants';

const useStyles = makeStyles({
    root: {
        maxWidth: 345
    },
    media: {
        width: '100%'
    }
});

// eslint-disable-next-line react/display-name
const QRCardContent = forwardRef(({ classes, table, count, url }, ref) => (
    <CardContent ref={ref}>
        <QRCode
            className={classes.media}
            id={table?._id || '1'}
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
            {table && table.name}
        </Typography>
    </CardContent>
));

export default function QRCard({ url, table, image = COMPLEAT_LOGO_URI }) {
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
            <QRCardContent
                count={count}
                classes={classes}
                table={table}
                ref={contentRef}
                image={image}
                url={url}
            />
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() =>
                        exportComponentAsPNG(contentRef, {
                            fileName: `${table ? table.name : 'entrada'}.png`
                        })
                    }>
                    Descargar
                </Button>
            </CardActions>
        </Card>
    );
}
