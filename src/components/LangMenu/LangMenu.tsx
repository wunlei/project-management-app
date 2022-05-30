import React, { useEffect, useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { setLanguage } from 'redux/global/globalSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Language } from 'redux/global/globalTypes';
import { ReactComponent as ArrowIcon } from 'assets/icons/chevron-down.svg';

function LangMenu() {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const currLang = useAppSelector((state) => state.global.language);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLangChange = (lang: Language) => {
    dispatch(setLanguage(lang));
    handleClose();
  };

  useEffect(() => {
    i18n.changeLanguage(currLang);
  }, [currLang, i18n]);

  return (
    <>
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
    </>
  );
}

export default LangMenu;
