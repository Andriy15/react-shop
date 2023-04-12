//write a more complex test for this component in App.test.tsx that tests the following: 
// 
// 1. The component renders without crashing
// 2. The component renders the correct number of products
// 3. The component renders the correct total price
// 4. The component renders the correct total quantity
// 5. The component renders the correct total price when the currency is changed
// 6. The component renders the correct total quantity when the quantity is changed
// 7. The component renders the correct total price when the quantity is changed
// 8. The component renders the correct total price when the currency is changed and the quantity is changed
// 9. The component renders the correct total quantity when the currency is changed and the quantity is changed
// 10. The component renders the correct total price when the currency is changed and the quantity is changed
// 11. The component renders the correct total quantity when the currency is changed and the quantity is changed


import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

test('renders without crashing', () => {
    render(<Provider store={store}><App /></Provider>);
    });

test('renders the correct number of products', () => {
    render(<Provider store={store}><App /></Provider>);
    expect(screen.getAllByTestId('product')).toHaveLength(3);
    })

test('renders the correct total price', () => {
    render(<Provider store={store}><App /></Provider>);
    expect(screen.getByTestId('totalPrice')).toHaveTextContent('Total price: 0 $');
    })

test('renders the correct total quantity', () => {
    render(<Provider store={store}><App /></Provider>);
    expect(screen.getByTestId('totalQuantity')).toHaveTextContent('Total quantity: 0');
    })

test('renders the correct total price when the currency is changed', () => {
    render(<Provider store={store}><App /></Provider>);
    fireEvent.click(screen.getByTestId('currency'));
    expect(screen.getByTestId('totalPrice')).toHaveTextContent('Total price: 0 UAH');
    })

test('renders the correct total quantity when the quantity is changed', () => {
    render(<Provider store={store}><App /></Provider>);
    fireEvent.click(screen.getByTestId('quantity'));
    expect(screen.getByTestId('totalQuantity')).toHaveTextContent('Total quantity: 1');
    })

test('renders the correct total price when the quantity is changed', () => {
    render(<Provider store={store}><App /></Provider>);
    fireEvent.click(screen.getByTestId('quantity'));
    expect(screen.getByTestId('totalPrice')).toHaveTextContent('Total price: 0 $');
    })

test('renders the correct total price when the currency is changed and the quantity is changed', () => {
    render(<Provider store={store}><App /></Provider>);
    fireEvent.click(screen.getByTestId('currency'));
    fireEvent.click(screen.getByTestId('quantity'));
    expect(screen.getByTestId('totalPrice')).toHaveTextContent('Total price: 27 UAH');
    })

test('renders the correct total quantity when the currency is changed and the quantity is changed', () => {
    render(<Provider store={store}><App /></Provider>);
    fireEvent.click(screen.getByTestId('currency'));
    fireEvent.click(screen.getByTestId('quantity'));
    expect(screen.getByTestId('totalQuantity')).toHaveTextContent('Total quantity: 1');
    })

test('renders the correct total price when the currency is changed and the quantity is changed', () => {
    render(<Provider store={store}><App /></Provider>);
    fireEvent.click(screen.getByTestId('currency'));
    fireEvent.click(screen.getByTestId('quantity'));
    expect(screen.getByTestId('totalPrice')).toHaveTextContent('Total price: 27 UAH');
    })






