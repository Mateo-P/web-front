import { FC } from 'react';
import MetricCard from '../History/MetricCard';
import { formatCurrency } from '../../shared/currencyFormat';
import { useIntl } from 'react-intl';
const intl = useIntl();

interface Props {
    total: Number;
}
const BillResume: FC<Props> = ({ total }) => {
    return <MetricCard title={intl.formatMessage({ id: 'totalTurnoever' })} value={formatCurrency(total)} metric={null} />;
};

export default BillResume;
