import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Layout } from '../components/ui/Layout';
import { Header } from '../components/Header';
import { ProductGrid } from '../components/ProductGrid';
import { ProductCard } from '../components/ProductCard';
import { ErrorBoundary } from '../components/ErrorBoundary';

const IndexPage = () => {
  const { data } = useProducts();

  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Main>
        <h1>Featured Products</h1>
        <ProductGrid>
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </Layout.Main>
    </Layout>
  );
};

const IndexPageWithBoundaries = () => (
  <ErrorBoundary>
    <Suspense fallback={<p>Loading products...</p>}>
      <IndexPage />
    </Suspense>
  </ErrorBoundary>
);

export const Route = createFileRoute('/')({
  component: IndexPageWithBoundaries,
});
