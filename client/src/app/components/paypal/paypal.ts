import { PayPalNamespace } from '@paypal/paypal-js';

interface CustomWindow extends Window {
  paypal: PayPalNamespace | null | undefined;
}

const customWindow = window as CustomWindow;

export function getPayPal(): PayPalNamespace {
  if (!customWindow.paypal) {
    throw new Error('PayPal SDK not loaded.');
  }
  return customWindow.paypal;
}