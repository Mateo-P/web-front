export const areItemsEqual = (item, item2) =>
    item._id === item2._id && item.options === item2.options;

export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => {
        let optionPricesTotal = 0;

        item.options.forEach((opt) => {
            opt.entries.forEach((ent) => {
                optionPricesTotal += ent.price;
            });
        });

        return item.price + optionPricesTotal + amount;
    }, 0);
