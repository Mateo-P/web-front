import { useState } from 'react';
import { useStateValue } from 'State/StateProvider';
import Drawer from 'components/shared/Drawer';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { formatCurrency } from 'shared/currencyFormat';
import Button from '@material-ui/core/Button';
import ItemOptions from './ItemOptions';
import ItemDetailImage from './ItemDetailImage';
import { makeStyles } from '@material-ui/core/styles';
import Counter from 'components/shared/Counter';

const useStyles = makeStyles((theme) => ({
    orderButton: {
        padding: theme.spacing(2),
        paddingBottom: theme.spacing(10),
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
    }
}));

const areRequiredOptionsSelected = (selectedOptions, filteredOptions) => {
    let areSelected = true;

    filteredOptions.forEach((fo) => {
        const optionToCompare = selectedOptions.find((so) => so.name === fo.name);

        if (optionToCompare && optionToCompare.entries < fo.min) {
            areSelected = false;
        }
    });

    return areSelected;
};

const filterOptions = (item) => {
    if (item.options) {
        return item.options.filter((opt) => opt.entries && opt.entries.length >= 1);
    } else return [];
};

export default function ItemDetail({ item, open, setOpen, viewonly }) {
    const [quantity, setQuantity] = useState(1);
    const classes = useStyles();
    const [{ selectedOptions }, dispatch] = useStateValue();

    const addToBasket = () => {
        setOpen(false);
        let newItem = { ...item, options: selectedOptions };

        for (let index = 0; index < quantity; index++) {
            dispatch({
                type: 'ADD_TO_BASKET',
                item: newItem
            });
        }
    };

    const filteredOptions = filterOptions(item);
    const shouldButtonDisable = !areRequiredOptionsSelected(selectedOptions, filteredOptions);

    return (
        <Drawer open={open} setOpen={setOpen}>
            <ItemDetailImage src={item.image} onClick={() => setOpen(false)} />
            <Box p={2}>
                <Typography variant="h4" gutterBottom>
                    {item.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {item.description}
                </Typography>
                <Typography variant="h4" gutterBottom align="right">
                    {formatCurrency(item.price)}
                </Typography>
                {item.options ? (
                    <ItemOptions options={filteredOptions} viewonly={viewonly} />
                ) : (
                    <Box height="24px" />
                )}
                {!viewonly && (
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h6" gutterBottom>
                            Cantidad:
                        </Typography>
                        <Counter value={quantity} setValue={setQuantity} minValue={1} />
                    </Box>
                )}
            </Box>
            {!viewonly && (
                <Button
                    disabled={shouldButtonDisable}
                    className={classes.orderButton}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={addToBasket}
                    fullWidth>
                    <Typography variant="h6">añadir a mi pedido</Typography>
                </Button>
            )}
        </Drawer>
    );
}
