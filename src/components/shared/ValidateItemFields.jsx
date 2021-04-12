import React from 'react';

import { useStateValue } from '../../State/StateProvider';
function ValidateItemFields() {
    const [{ itemFormFields, item }, dispatch] = useStateValue();
    const error = (fields) => {
        dispatch({
            type: 'SET_FIELDS_ERRORS',
            itemFormFields: fields
        });
    };
    const validateForm = (formFields, formValues, hook) => {
        let validator = true;
        formFields.forEach((field) => {
            if (formValues[field.value] == '' || formValues[field.value] == undefined)
                validator = false;
        });
        hook(
            formFields.map((formField) =>
                formValues[formField.value] == '' || formValues[formField.value] == undefined
                    ? { ...formField, error: 'campo requerido' }
                    : formField
            )
        );

        return validator;
    };
    return validateForm(itemFormFields, item, error);
}

export default ValidateItemFields;
