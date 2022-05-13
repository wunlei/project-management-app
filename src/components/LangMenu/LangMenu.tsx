import React, { useEffect } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { ReactComponent as ArrowIcon } from 'assets/icons/chevron-down.svg';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LANG } from 'constants/appConstants';

function LangMenu() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currLang, setCurrLang] = useState<string>(() => {
    const initialState = localStorage.getItem('lang') || DEFAULT_LANG;
    i18n.changeLanguage(initialState);
    return initialState;
  });

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLangChange = (lang: string) => {
    setCurrLang(lang);
    handleClose();
  };

  useEffect(() => {
    localStorage.setItem('lang', currLang);
    i18n.changeLanguage(currLang);
  }, [currLang]);

  return (
    <div>
      <Button
        id="lang-menu-button"
        aria-controls={open ? 'lang-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ArrowIcon />}
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {currLang}
      </Button>
      <Menu
        id="lang-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lang-menu-button',
        }}
        elevation={3}
      >
        <MenuItem
          onClick={() => {
            handleLangChange('en');
          }}
        >
          EN
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleLangChange('ru');
          }}
        >
          RU
        </MenuItem>
      </Menu>
    </div>
  );
}

export default LangMenu;
