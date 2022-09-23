import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Mock Emoji App', () => {
  it('renders all page elements', () => {
    render(<App />);
    const pageTitle = screen.getByRole('heading', { name: /emojify! 😄/i });
    const pageSubTitle = screen.getByRole('heading', { name: /turn your text into emojis!/i });
    const inputField = screen.getByRole('textbox');
    const resultBox = screen.getByTestId('result-box');
    const footerInfo = screen.getByRole('contentinfo');

    expect(pageTitle).toBeInTheDocument();
    expect(pageSubTitle).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    expect(resultBox).toBeInTheDocument();
    expect(footerInfo).toBeInTheDocument();
  });

  it('should able to type into input textarea', () => {
    render(<App />);
    const inputField = screen.getByRole('textbox');
    userEvent.type(inputField, 'Hello World!');
    expect(inputField).toHaveValue('Hello World!')
  })

  it('should replace word with related emoji', () => {
    render(<App />);
    const inputField = screen.getByRole('textbox');
    const resultBox = screen.getByTestId('result-box');
    userEvent.type(inputField, 'pizza');
    expect(inputField).toHaveValue('pizza')
    expect(resultBox).toHaveTextContent('🍕')
  })

  it('should update resultbox with correct values', () => {
    render(<App />);
    const inputField = screen.getByRole('textbox');
    const resultBox = screen.getByTestId('result-box');

    userEvent.type(inputField, 'pizza cat and octopus, hello wave');
    expect(resultBox).toHaveTextContent('🍕 🐈 and 🐙, 👋 🌊')
  })

  it('should ignore punctuation characters', () => {
    render(<App />);
    const inputField = screen.getByRole('textbox');
    const resultBox = screen.getByTestId('result-box');

    userEvent.type(inputField, 'cat\' cat" cat+ cat, cat? cat\\ cat| <cat> cat! cat@ cat# cat$ cat% cat^ cat& cat* (cat) cat- cat_ cat= cat` cat~ cat.');
    expect(resultBox).toHaveTextContent('🐈\' 🐈" 🐈+ 🐈, 🐈? 🐈\\ 🐈| <🐈> 🐈! 🐈@ 🐈# 🐈$ 🐈% 🐈^ 🐈& 🐈* (🐈) 🐈- 🐈_ 🐈= 🐈` 🐈~ 🐈.');
  })

  // TODO fix failing tests
  it.skip('should ignore special characters', () => {
    render(<App />);
    const inputField = screen.getByRole('textbox');
    const resultBox = screen.getByTestId('result-box');

    userEvent.type(inputField, '{cat} [cat]');
    expect(inputField).toHaveValue('{cat} [cat]')
    expect(resultBox).toHaveTextContent('{🐈} [🐈]');
  })

  it.skip('should handle newlines', () => {
    render(<App />);
    const inputField = screen.getByRole('textbox');
    const resultBox = screen.getByTestId('result-box');

    userEvent.type(inputField, 'cat\ncat\ncat');
    expect(resultBox).toHaveTextContent('🐈\n🐈\n🐈')
  })
})
