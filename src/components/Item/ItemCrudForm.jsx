import Createform from 'components/shared/Forms/Createform';
import { useStateValue } from '../../State/StateProvider';
import ItemOptions from '../MenuManager/ItemOptions/ItemOptions';
import { DropzoneArea } from 'material-ui-dropzone';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    Dropzone: {
        width: '100%',
        marginTop: '15px'
    }
});

export default function ItemCrudForm() {
    const classes = useStyles();
    const [{ itemFormFields, item }, dispatch] = useStateValue();

    const handleChange = (value) => (e) => {
        let payload =
            value === 'price' ? parseInt(e.target.value.replace(/[ ,.]/g, '')) : e.target.value;
        dispatch({
            type: 'SET_ATRIBUTE_TO_ITEM',
            value,
            payload
        });
    };
    const handleFileUpload = async (file) => {
        dispatch({
            type: 'SET_ATRIBUTE_TO_ITEM',
            value: 'file',
            payload: file[0]
        });
    };
    return (
        <Createform fields={itemFormFields} handleChange={handleChange} formValues={item}>
            <ItemOptions />
            <div className={classes.Dropzone}>
                <DropzoneArea
                    dropzoneText={'Arrastra una imagen aquí'}
                    onChange={handleFileUpload}
                    filesLimit={1}
                />
            </div>
        </Createform>
    );
}
