import React from 'react';
import '../i18n'; // initialize i18next
import AskAI from '../components/AskAI';

export default function Root({ children }) {
    return (
        <>
            {children}
            <AskAI />
        </>
    );
}

