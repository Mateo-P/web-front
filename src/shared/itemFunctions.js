export const areItemsEqual = (item, item2) =>
    item._id === item2._id && item.options === item2.options;

export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => {
        let optionPricesTotal = 0;

        item.options.forEach((opt) => {
            opt.choices.forEach((ent) => {
                optionPricesTotal += ent.extra_cost;
            });
        });

        return item.price + optionPricesTotal + amount;
    }, 0);
