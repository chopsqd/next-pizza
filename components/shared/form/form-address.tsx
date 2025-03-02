"use client"

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface IFormAddressProps {
  onChange: (value: string) => void;
}

export const FormAddress: React.FC<IFormAddressProps> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token={process.env.DADATA_API_KEY}
      onChange={onChange}
    />
  )
};