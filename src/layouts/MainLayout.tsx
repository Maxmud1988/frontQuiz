import React, { useRef, useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import LanguageSwitcher from '../components/LanguageSwitcher';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Определяем высоту верхней и нижней панели
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    if (footerRef.current) {
      setFooterHeight(footerRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };

    // Добавляем обработчик изменения размера окна
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* Верхняя панель */}
      <AppBar position="static" ref={headerRef}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">My App</Typography>
        </Toolbar>
        <LanguageSwitcher />
      </AppBar>

      {/* Основной контент */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 2,
          minHeight: `calc(100vh - ${headerHeight}px - ${footerHeight}px)`, // Оставшееся пространство
        }}
      >
        {children}
      </Box>

      {/* Нижняя панель */}
      <Box
        component="footer"
        ref={footerRef}
        sx={{
          backgroundColor: '#f8f9fa',
          py: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2">
          © 2025 Quiz App. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default MainLayout;
