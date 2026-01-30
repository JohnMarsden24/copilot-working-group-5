import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { useProduct } from '../../hooks/useProduct';
import { Layout } from '../../components/ui/Layout';
import { Header } from '../../components/Header';
import { ProductDetail } from '../../components/ProductDetail';
import { ErrorBoundary } from '../../components/ErrorBoundary';

const ProductPage = () => {
  // Hook call required to trigger data loading
  useProduct();

  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Main>
        <ProductDetail />
      </Layout.Main>
    </Layout>
  );
};

const ProductPageWithBoundaries = () => (
  <ErrorBoundary>
    <Suspense fallback={<p>Loading product...</p>}>
      <ProductPage />
    </Suspense>
  </ErrorBoundary>
);

export const Route = createFileRoute('/products/$productId')({
  component: ProductPageWithBoundaries,
});
