import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductDetail } from './index';

// Mock the child components to test ProductDetail's composition
vi.mock('../ProductNavigation', () => ({
  ProductNavigation: () => <div data-testid="product-navigation">← Back to Products</div>,
}));

vi.mock('../ProductImage', () => ({
  ProductImage: () => <img data-testid="product-image" alt="Product" src="test.jpg" />,
}));

vi.mock('../ProductInfo', () => ({
  ProductInfo: () => (
    <div data-testid="product-info">
      <h1>Test Product</h1>
      <p>$99.99</p>
      <p>This is a test product description</p>
    </div>
  ),
}));

vi.mock('../ProductMeta', () => ({
  ProductMeta: () => <div data-testid="product-meta">Product Metadata</div>,
}));

vi.mock('../ProductActions', () => ({
  ProductActions: () => (
    <div data-testid="product-actions">
      <button>Add to Cart</button>
    </div>
  ),
}));

describe('ProductDetail Component', () => {
  it('renders all required child components in correct structure', () => {
    render(<ProductDetail />);

    // Verify ProductNavigation is rendered
    expect(screen.getByTestId('product-navigation')).toBeInTheDocument();

    // Verify ProductImage is rendered
    expect(screen.getByTestId('product-image')).toBeInTheDocument();

    // Verify ProductInfo is rendered
    expect(screen.getByTestId('product-info')).toBeInTheDocument();

    // Verify ProductMeta is rendered
    expect(screen.getByTestId('product-meta')).toBeInTheDocument();

    // Verify ProductActions is rendered
    expect(screen.getByTestId('product-actions')).toBeInTheDocument();
  });

  it('displays product information when ProductInfo component is rendered', () => {
    render(<ProductDetail />);

    // Verify product details from ProductInfo component
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('This is a test product description')).toBeInTheDocument();
  });

  it('displays navigation to return to product list', () => {
    render(<ProductDetail />);

    // Verify back navigation link is present
    expect(screen.getByText('← Back to Products')).toBeInTheDocument();
  });

  it('displays Add to Cart button for user interaction', () => {
    render(<ProductDetail />);

    // Verify Add to Cart button is present
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });
});
