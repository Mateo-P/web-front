import { FC } from 'react';
import MetricCard from '../History/MetricCard';
import { formatCurrency } from '../../shared/currencyFormat';

interface Props {
    total: Number;
}
const BillResume: FC<Props> = ({ total }) => {
    return <MetricCard title="Total Facturado" value={formatCurrency(total)} metric={null} />;
};

export default BillResume;
