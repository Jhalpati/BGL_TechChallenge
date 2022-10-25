import * as React from "react";
import { render, screen } from '@testing-library/react';
import Weather from './weather.js';

test('renders the landing page', () => {
  render(<Weather />);
});