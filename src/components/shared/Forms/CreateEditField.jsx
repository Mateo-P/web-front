import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import CreateFormFields from 'components/shared/Forms/CreateFormFields';
import Grid from '@material-ui/core/Grid';

function CreateEditField({ fields, optionValues, handleChange, validation, onClick }) {
    return (
        <>
            <Grid container spacing={1}>
                {fields.map((field, i) => {
                    return (
                        <Grid item xs={12} sm={4} key={i}>
                            <CreateFormFields
                                field={field}
                                formValues={optionValues}
                                handleChange={handleChange}
                            />
                        </Grid>
                    );
                })}

                <IconButton onClick={onClick} aria-label="delete">
                    {validation ? <DoneIcon fontSize="small" /> : <CloseIcon fontSize="small" />}
                </IconButton>
            </Grid>
        </>
    );
}

export default CreateEditField;
