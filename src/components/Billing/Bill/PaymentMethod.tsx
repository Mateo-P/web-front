import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { FormattedMessage } from 'react-intl';
export default function PaymentMethod({ hook }) {
    const [paymentMethod, setPaymentMethod] = hook;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod((event.target as HTMLInputElement).value);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend"><FormattedMessage id="payMethod" /></FormLabel>
            <RadioGroup
                aria-label="gender"
                name="gender1"
                value={paymentMethod}
                onChange={handleChange}>
                <FormControlLabel value="CARD" control={<Radio />} label="Tarjeta" />
                <FormControlLabel value="CASH" control={<Radio />} label="Efectivo" />
            </RadioGroup>
        </FormControl>
    );
}
