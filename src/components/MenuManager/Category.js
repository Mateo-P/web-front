import fetcher from 'shared/fetcher';

export const createCategory = async (newCategory, token, mutate) => {
    await fetcher('menu/categories/', 'POST', token, newCategory);
    mutate();
};
export const deleteCategory = async (categoryId, categories, token, mutate) => {
    let newCategories = categories.filter((cat) => cat.id !== categoryId);

    mutate(newCategories, false);
    await fetcher(`menu/categories/${categoryId}/`, 'DELETE', token);
    mutate();
};

export const updateCategory = async ({ categoryId, name }, categories, token, mutate) => {
    let newCategories = categories.map((cat) => {
        if (cat.id === categoryId) {
            cat.name = name;
            return cat;
        } else return cat;
    });

    mutate(newCategories, false);
    await fetcher(`menu/categories/${categoryId}/`, 'PATCH', token, { name });
    mutate();
};
export const sortCategory = async (id, move, categories, token, mutate) => {
    await fetcher('menu/move_category', 'POST', token, {
        id,
        move
    });
    mutate();
};
