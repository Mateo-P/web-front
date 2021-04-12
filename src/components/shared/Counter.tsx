import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

type Props = {
    value: number;
    setValue: (value: number) => void;
    minValue?: number;
};

export default function Counter({ value, setValue, minValue }: Props) {
    const onReduce = () => {
        if (typeof minValue === 'number') {
            if (value > minValue) {
                setValue(value - 1);
            }
        } else {
            setValue(value - 1);
        }
    };

    return (
        <ButtonGroup size="small" aria-label="small outlined button group">
            <Button variant="contained" color="primary" onClick={onReduce}>
                -
            </Button>
            <Button>{value}</Button>
            <Button variant="contained" color="primary" onClick={() => setValue(value + 1)}>
                +
            </Button>
        </ButtonGroup>
    );
}
