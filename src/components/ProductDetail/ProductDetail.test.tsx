import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { CartProvider } from '../../contexts/CartContext';
import type { Product } from '../../types/product';

/**
 * ProductDetail Component Tests
 * 
 * Testing Approach:
 * These tests use real child components with MSW to mock API responses.
 * No components are mocked - we test the actual integration behavior.
 * Only the minimal router functionality (useParams) is mocked to provide route params.
 */

// Mock only useParams and Link, preserve everything else from @tanstack/react-router
vi.mock('@tanstack/react-router', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@tanstack/react-router')>();
  return {
    ...mod,
    useParams: vi.fn(() => ({ productId: '1' })),
    Link: ({ to, children, className }: any) => (
      <a href={to} className={className}>
        {children}
      </a>
    ),
  };
});

// Import ProductDetail after mocks are set up
const { ProductDetail } = await import('./index');


// Mock product data
const mockProduct: Product = {
  id: 1,
  title: 'Smartphone X',
  description: 'Latest smartphone with advanced features',
  price: 799.99,
  category: 'Electronics',
  rating: 4.5,
  stock: 25,
  brand: 'TechCorp',
  availabilityStatus: 'In Stock',
  returnPolicy: '30 days',
  thumbnail: 'https://example.com/phone.jpg',
  images: ['https://example.com/phone.jpg'],
};

// Set up MSW server to mock API calls
const server = setupServer(
  http.get('https://dummyjson.com/products/1', () => {
    return HttpResponse.json(mockProduct);
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Helper to create test wrapper with providers
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { 
        retry: false,
        // Disable caching for tests to ensure fresh data
        staleTime: 0,
        gcTime: 0,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <CartProvider>{children}</CartProvider>
    </QueryClientProvider>
  );
};

describe('ProductDetail Component', () => {
  it('renders product details correctly including title, price, and description', async () => {
    const Wrapper = createWrapper();
    render(<ProductDetail />, { wrapper: Wrapper });

    // Wait for and verify product title is rendered
    expect(await screen.findByText('Smartphone X')).toBeInTheDocument();

    // Verify price is rendered with proper formatting
    expect(screen.getByText('$799.99')).toBeInTheDocument();

    // Verify product description is rendered
    expect(screen.getByText('Latest smartphone with advanced features')).toBeInTheDocument();
  });

  it('displays navigation link to return to product list', async () => {
    const Wrapper = createWrapper();
    render(<ProductDetail />, { wrapper: Wrapper });

    // Wait for component to render
    await screen.findByText('Smartphone X');

    // Verify back navigation link is present
    const backLink = screen.getByText('← Back to Products');
    expect(backLink).toBeInTheDocument();

    // Verify it's a proper link to the home page
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('renders Add to Cart button for user interaction', async () => {
    const Wrapper = createWrapper();
    render(<ProductDetail />, { wrapper: Wrapper });

    // Wait for component to render
    await screen.findByText('Smartphone X');

    // Verify the Add to Cart button is available
    const addButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addButton).toBeInTheDocument();
  });

  it('displays product image when rendered', async () => {
    const Wrapper = createWrapper();
    render(<ProductDetail />, { wrapper: Wrapper });

    // Wait for component to render
    await screen.findByText('Smartphone X');

    // Verify product image is present
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Smartphone X');
  });
});
