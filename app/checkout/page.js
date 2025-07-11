"use client";

import Head from 'next/head';
import { useCheckoutState } from './hooks';
import { CheckoutContent } from './components';

export default function Checkout() {
  const {
    isRedirecting,
    loading,
    orderComplete,
    isEmpty,
    cartItems,
    setOrderComplete,
  } = useCheckoutState();

  return (
    <>
      <Head>
        <title>Checkout - Jonbliss Supermarket</title>
        <meta name="description" content="Complete your purchase at Jonbliss Supermarket. Secure checkout with multiple payment options." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <CheckoutContent
        isRedirecting={isRedirecting}
        loading={loading}
        orderComplete={orderComplete}
        isEmpty={isEmpty}
        cartItems={cartItems}
        setOrderComplete={setOrderComplete}
      />
    </>
  );
} 