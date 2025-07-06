"use client";

import { SupermarketProvider, useSupermarket } from '@/utils/SupermarketContext';

function TestConsumer() {
  const context = useSupermarket();
  return <pre>{JSON.stringify(context, null, 2)}</pre>;
}

export default function TestContextPage() {
  return (
    <SupermarketProvider>
      <h1>Test Supermarket Context</h1>
      <TestConsumer />
    </SupermarketProvider>
  );
} 