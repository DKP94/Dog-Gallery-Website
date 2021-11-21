import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import DogCard from './components/DogCard'

test('renders heading', () => {
  render(<App />);
  const heading = screen.getByText(/Dog Gallery/i);
  expect(heading).toBeInTheDocument();
});

test('renders custom search button', () => {
  render(<App />);
  const btn = screen.getByText(/Custom Search/i);
  expect(btn).toBeInTheDocument();
});

test('renders gallery', () => {
  render(<App />);
  const gallery = screen.getByTestId('photogallery');
  expect(gallery).toBeInTheDocument();
});

test('renders custom filter', () => {
  render(<App />);
  const filter = screen.getByTestId('custom_filter');
  expect(filter).toBeInTheDocument();
});

test('renders modal popup for custom search on click', () => {
  render(<App />);
  const filter = screen.getByText(/Custom Search/i);
  fireEvent.click(filter);
  screen.debug();
  const popup = screen.getByTestId('modal_popup');
  expect(popup).toBeInTheDocument();
});

test('Dogcard click should call api', () => {
  const handleClick = jest.fn()
  render(<DogCard src='' name='' callback={handleClick}/>);
  const card = screen.getByTestId('dog_card');
  fireEvent.click(card);
  screen.debug();
  expect(handleClick).toHaveBeenCalledTimes(1);
});


