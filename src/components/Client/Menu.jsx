import MenuListItems from './MenuListItems';
import MenuCategory from './MenuCategory';
import Checkout from './Checkout';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 90,
        paddingBottom: '60vh'
    },
    categories: {
        margin: theme.spacing(2)
    }
}));

export default function Menu({ categories, viewonly, restaurantId }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.categories}>
                {categories.map((category, i) => (
                    <MenuCategory key={i} index={i} name={category.name}>
                        <MenuListItems
                            items={category.items}
                            restaurantId={restaurantId}
                            viewonly={viewonly}
                        />
                    </MenuCategory>
                ))}
            </div>
            {!viewonly && <Checkout />}
        </div>
    );
}
