import Entry from './typeEntry';

const validateEntry = (entry: Entry): boolean => {
    if (entry.price <= 0) {
        return false;
    }
    return entry.name !== '';
};

export default validateEntry;
