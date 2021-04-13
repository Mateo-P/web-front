import Grid from '@material-ui/core/Grid';
import Chip from 'components/shared/Chip';

export default function OrderOptions({ options = [] }) {
    const showEntries = () => {
        return options.map((option) =>
            option.entries.map((entry, i) => {
                return (
                    <Grid key={`op${i}`} item>
                        <Chip
                            fullWidth
                            light
                            label={
                                <>
                                    <b>{option.name}:</b>&nbsp;{entry.name}
                                </>
                            }
                        />
                    </Grid>
                );
            })
        );
    };

    return (
        <Grid container item xs={12}>
            {showEntries()}
        </Grid>
    );
}
