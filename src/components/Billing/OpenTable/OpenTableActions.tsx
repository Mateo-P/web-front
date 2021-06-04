import { MouseEvent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        actions: {
            borderTop: '1px solid #D3D3D3',
            paddingTop: theme.spacing(1),
            display: 'flex',
            justifyContent: 'flex-end'
        }
    })
);

type Props = {
    createBill: (event: MouseEvent<HTMLButtonElement>) => void;
};

function OpenTableActions({ createBill }: Props) {
    const classes = useStyles();
    return (
        <div className={classes.actions}>
            <Button onClick={createBill} variant="contained" color="primary">
            <FormattedMessage id="closeTable" />
            </Button>
        </div>
    );
}

export default OpenTableActions;
