type Option = {
    name: string;
};

const validateOptions = (option: Option): boolean => {
    return option.name !== '';
};

export default validateOptions;
