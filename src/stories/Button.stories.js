import React from 'react';
import { BasicButtonGroup } from '../components/buttons'; // Importuj komponent

export default {
  title: 'Button Group', // Tytuł kategorii w Storybook
  component: BasicButtonGroup, // Komponent, który będzie opisany
};

// Opis różnych przypadków użycia komponentu
export const Default = () => <BasicButtonGroup />;
