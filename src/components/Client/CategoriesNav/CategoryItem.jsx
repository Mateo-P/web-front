import Chip from 'components/shared/Chip';
import { Link } from 'react-scroll';

export default function CategoryItem({ text, selected, index, handleSetActive }) {
    return (
        <Link
            to={`${index}e`}
            spy={true}
            smooth={true}
            onSetActive={() => {
                handleSetActive(null, index);
            }}
            offset={-200}>
            <Chip clickable label={text} fill={selected} fullWidth />
        </Link>
    );
}
