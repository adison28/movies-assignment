import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom'

describe('Checks a text in component', () => {

  it('checks the sample text', () => {
    const { getByText } = render(<App />);
    const titleValue = getByText('Choose a sorting option:')
    expect(titleValue).toBeInTheDocument('Choose a sorting option: ')
  })
})

describe('check dropdwon existance', () => {
  test('check for options', () => {
    render(<App />)
    
  })
})