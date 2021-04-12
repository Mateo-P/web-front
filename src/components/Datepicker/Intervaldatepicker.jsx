import Datepicker from './Datepicker';

export default function Intervaldatepicker({ uselowdate, usetopdate }) {
    return (
        <>
            <Datepicker label="Fecha inicio" useDate={uselowdate} />
            <Datepicker label="Fecha fin" useDate={usetopdate} />
        </>
    );
}
