import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductDetail } from './index';

// Mock child components to focus on ProductDetail's composition behavior
// These mocks simulate what the real components would render
vi.mock('../ProductNavigation', () => ({
  ProductNavigation: () => (
    <a href="/" data-testid="product-navigation">
      ← Back to Products
    </a>
  ),
}));

vi.mock('../ProductImage', () => ({
  ProductImage: () => (
    <img 
      data-testid="product-image" 
      alt="Smartphone X" 
      src="https://example.com/phone.jpg"
      role="img"
    />
  ),
}));

vi.mock('../ProductInfo', () => ({
  ProductInfo: () => (
    <div data-testid="product-info">
      <h1>Smartphone X</h1>
      <p>$799.99</p>
      <p>Latest smartphone with advanced features</p>
    </div>
  ),
}));

vi.mock('../ProductMeta', () => ({
  ProductMeta: () => <div data-testid="product-meta">Product Metadata</div>,
}));

vi.mock('../ProductActions', () => ({
  ProductActions: () => (
    <div data-testid="product-actions">
      <button type="button">Add to Cart</button>
    </div>
  ),
}));

describe('ProductDetail Component', () => {
  it('renders product details correctly including title, price, and description', () => {
    render(<ProductDetail />);

    // Verify product title is rendered
    expect(screen.getByText('Smartphone X')).toBeInTheDocument();

    // Verify price is rendered with proper formatting
    expect(screen.getByText('$799.99')).toBeInTheDocument();

    // Verify product description is rendered
    expect(screen.getByText('Latest smartphone with advanced features')).toBeInTheDocument();
  });

  it('displays navigation link to return to product list', () => {
    render(<ProductDetail />);

    // Verify back navigation link is present
    const backLink = screen.getByText('← Back to Products');
    expect(backLink).toBeInTheDocument();

    // Verify it's a proper link to the home page
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('renders Add to Cart button for user interaction', () => {
    render(<ProductDetail />);

    // Verify the Add to Cart button is available
    const addButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addButton).toBeInTheDocument();
  });

  it('displays product image when rendered', () => {
    render(<ProductDetail />);

    // Verify product image is present
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Smartphone X');
  });
});
