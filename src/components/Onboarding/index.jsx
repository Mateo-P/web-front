import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useStateValue } from 'State/StateProvider';
import fetcher from 'shared/fetcher';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(2)
            },
            textAlign: 'center'
        },
        input: {
            backgroundColor: 'white'
        },
        button: {
            marginTop: theme.spacing(2),
            paddingLeft: theme.spacing(5),
            paddingRight: theme.spacing(5),
            paddingBottom: theme.spacing(2),
            paddingTop: theme.spacing(2)
        }
    })
);

export default function Onboarding() {
    const classes = useStyles();
    const [restaurantName, setRestaurantName] = useState(null);
    const [{ token }] = useStateValue();
    const router = useRouter();

    const handleChange = (event) => {
        setRestaurantName(event.target.value);
    };

    const onSubmit = async () => {
        console.log('submit');
        await fetcher('restaurants/', 'POST', token, {
            name: restaurantName,
            plan: 0
        });
        router.push('/restaurants');
    };

    return (
        <Box
            p={4}
            bgcolor="secondary.main"
            color="#ffffff"
            height="100vh"
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="center">
            <Typography variant="h1" gutterBottom>
                Bienvenido a Compleat.
            </Typography>
            {/* <Typography variant="h4" gutterBottom>
                Para empezar ingresa la siguiente información sobre tu restaurante.
            </Typography> */}
            <Typography variant="h4" gutterBottom>
                ¿Cómo se llama tu restaurante?
            </Typography>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    InputProps={{
                        className: classes.input
                    }}
                    placeholder="Nombre..."
                    onChange={handleChange}
                />
            </form>
            <Button
                onClick={() => onSubmit()}
                size="large"
                color="primary"
                variant="contained"
                className={classes.button}
                disabled={!(restaurantName !== null && restaurantName.length >= 2)}>
                ¡Empezar ya!
            </Button>
        </Box>
    );
}
