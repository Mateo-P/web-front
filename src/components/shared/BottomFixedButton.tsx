import { FC, ReactNode } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        justifyContent: 'space-between'
    },
    checkoutButton: {
        width: '100%',
        paddingTop: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(6),
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

type Props = {
    handleClick: () => void;
    children: ReactNode;
};

const BottomFixedButton: FC<Props> = ({ handleClick, children }) => {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <Button
                className={classes.checkoutButton}
                size="large"
                variant="contained"
                color="primary"
                onClick={handleClick}>
                {children}
            </Button>
        </div>
    );
};

export default BottomFixedButton;
