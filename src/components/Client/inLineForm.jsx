import React from 'react';

function inLineForm() {
    const [categoryFields, setCategoryformfields] = useState(initialCategoryFields);
    const [categoryValues, setCategoryValues] = useState({});
    const handleChange = (value) => (e) => {
        if (handleAvailableChange) {
            handleAvailableChange(e);
        }
        setCategoryValues({ ...categoryValues, [value]: e.target.value });
    };
    return <div></div>;
}

export default inLineForm;
