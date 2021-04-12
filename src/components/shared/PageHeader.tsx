import { FC, ReactNode } from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: theme.spacing(2),
            alignItems: 'center'
        },
        title: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    })
);
interface Props {
    title: string;
    titleOption?: ReactNode;
    children?: ReactNode;
}
const PageHeader: FC<Props> = ({ title, titleOption, children }) => {
    const classes = useStyles();

    return (
        <div className={classes.header}>
            <div className={classes.title}>
                <Typography variant="h4">{title}</Typography>
                {titleOption && <>&nbsp; {titleOption}</>}
            </div>
            {children}
        </div>
    );
};
export default PageHeader;
