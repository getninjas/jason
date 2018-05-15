import React from 'react';

export const display = visible => (visible ? 'block' : 'none');

export const createMarkup = html => ({ __html: html });

export const addHeaderMarkup = headerMarkup => (headerMarkup ? <div className="__headerMarkup__" dangerouslySetInnerHTML={ createMarkup(headerMarkup) } /> : '');
