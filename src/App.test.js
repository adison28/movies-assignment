import { render, screen, fireEvent, getByTestId, getByDisplayValue, getAllByText } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom'

describe('Checks a text in component', () => {
  it('checks the sample text', () => {
    const { getByText } = render(<App />);
    const titleValue = getByText('Choose a sorting option:')
    expect(titleValue).toBeInTheDocument('Choose a sorting option: ')
  })
})

describe('Checks search field in component', () => {
  it('checks the search field', () => {
    const { getByPlaceholderText } = render(<App />);
    const searchElement = getByPlaceholderText('type to search')
    expect(searchElement).toBeInTheDocument()

    fireEvent.change(searchElement)
  })
})

describe('check dropdwon existance', () => {
  it('check for dropdwon', () => {
    render(<App />)
    const dropdownElement = screen.getByTestId('dropdown')
    expect(dropdownElement).toBeInTheDocument()
  })
})
