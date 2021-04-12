import Typography from '@material-ui/core/Typography';
import { Element } from 'react-scroll';
import LazyLoad from 'react-lazyload';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(3)
    }
}));

export default function MenuCategory(props) {
    const { name, index, children } = props;
    const classes = useStyles();

    return (
        <Element name={index + 'e'}>
            <LazyLoad once offset={100} height={'75vh'}>
                <Typography variant="h4" className={classes.title}>
                    {name}
                </Typography>
                {children}
            </LazyLoad>
        </Element>
    );
}
