/**
 * @jest-environment jsdom
 */
import {render} from "@testing-library/react";
import Page from '@/app/users/new/page';
import React from 'react';
import {expect} from '@jest/globals';

it("renders users/new/page", () => {
    const {container} = render(<Page/>);
    expect(container).toMatchSnapshot();
});