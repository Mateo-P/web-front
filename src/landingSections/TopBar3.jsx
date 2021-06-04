import React, { useState } from 'react';
import { classList } from '../shared/utils';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import { Link } from 'react-scroll';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { LOCALES } from '../i18n/locales';

const useStyles = makeStyles(({ spacing, palette }) => ({
    navigation: {
        width: '100%',
        display: 'flex'
    },
    mobile: {
        flexDirection: 'column',
        padding: 0
    },
    option: {
        fontWeight: '450',
        fontSize: '16px',
        marginLeft: spacing(4),
        marginRight: spacing(4),
        listStyle: 'none',
        cursor: 'pointer',
        '&:hover': {
            color: palette.primary.main
        }
    },
    optionmobile: {
        marginTop: spacing(1),
        marginBottom: spacing(1)
    }
}));
const TopBar3 = ({ setLanguage }) => {
    const classes = useStyles();
    const [isClosed, setIsClosed] = useState(true);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // let scrollableElement = document.querySelector('.scrollable-content');
    // if (!scrollableElement) scrollableElement = window;

    let toggleIcon = isClosed ? 'menu' : 'close';

    // const handleScroll = () => {
    //     return debounce(({ target: { scrollTop } }) => {
    //         let isCurrentTop = scrollTop < 100 || scrollableElement.scrollY < 100;
    //         setIsTop(isCurrentTop);
    //     }, 20);
    // };

    // handleScrollRef = handleScroll();

    const navigation = clsx({
        [classes.navigation]: true,
        [classes.mobile]: isMobile
    });
    const option = clsx({
        [classes.option]: true,
        [classes.optionmobile]: isMobile
    });
    const close = () => {
        setIsClosed(false);
    };

    const handleChange = (event) => {
        setLanguage(LOCALES[event.target.value]);
    };

    return (
        <section
            className={classList({
                header: true,
                'bg-black': true,
                'header-fixed': true,
                closed: isClosed
            })}
            style={{ border: isMobile ? 0 : '1px solid rgba(0,0,0,0.12)' }}>
            <div className="container header-container">
                <div className="brand">
                    <img style={{ cursor: 'pointer' }} src="./compleat.svg" alt="" />
                </div>
                <ul className={navigation}>
                    <Link className="test6" to="1" spy={true} smooth={true} duration={500}>
                        <li className={option}>
                            <div to="intro3" onScroll={close}>
                                <FormattedMessage id="home" />
                            </div>
                        </li>
                    </Link>
                    <Link className="test6" to="2" spy={true} smooth={true} duration={500}>
                        <li className={option}>
                            <div to="service3" onScroll={close}>
                                <FormattedMessage id="howWorks" />
                            </div>
                        </li>
                    </Link>
                    <Link className="test6" to="3" spy={true} smooth={true} duration={500}>
                        <li className={option}>
                            <div to="service5" onScroll={close}>
                                <FormattedMessage id="benefits" />
                            </div>
                        </li>
                    </Link>
                    <Link className="test6" to="5" spy={true} smooth={true} duration={500}>
                        <li className={option}>
                            <div to="pricing1" onScroll={close}>
                                <FormattedMessage id="prices" />
                            </div>
                        </li>
                    </Link>
                    <div>
                        <label>
                            <FormattedMessage id="language" />
                            <select onBlur={handleChange}>
                                <option value="ENGLISH">English</option>
                                <option value="SPANISH">Español</option>
                            </select>
                        </label>
                    </div>
                </ul>
                <div className="m-auto" />

                <IconButton
                    className="header__toggle"
                    color={'#FFFF'}
                    onClick={() => {
                        setIsClosed(!isClosed);
                    }}>
                    <Icon>{toggleIcon}</Icon>
                </IconButton>
            </div>
        </section>
    );
};

export default TopBar3;
