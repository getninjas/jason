import React from 'react';

export const display = visible => (visible ? 'block' : 'none');

export const createMarkup = html => ({ __html: html });

export const addHeaderMarkup = (headerMarkup) => {
  if (headerMarkup) {
    return <div className="__headerMarkup__" dangerouslySetInnerHTML={ createMarkup(headerMarkup) } />;
  }
  return '';
};
