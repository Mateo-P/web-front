import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fromTable: {
            backgroundColor: theme.palette.primary.main
        },
        header: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular
        }
    })
);
function BillSummary({ _id, table, fromTable }) {
    const classes = useStyles();
    const header = clsx({
        [classes.fromTable]: fromTable
    });
    const subId = _id.substring(_id.length - 8, _id.length);
    return (
        <AccordionSummary
            className={header}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <div className={classes.header}>
                <Typography className={classes.heading}>🧾 {subId}...</Typography>
                <Typography className={classes.heading}>
                    {table.includes('(') ? '🏠 ' : '👥 '}
                    {table}
                </Typography>
            </div>
        </AccordionSummary>
    );
}

export default BillSummary;
