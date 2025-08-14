import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '@/app/users/new/page';

describe('Add New User Page', () => {
    it('renders form fields and buttons', () => {
        render(<Page/>);
        expect(screen.getByText('Add New User')).toBeInTheDocument();
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Zip Code')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /Add User/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /Cancel/i})).toBeInTheDocument();
    });
});