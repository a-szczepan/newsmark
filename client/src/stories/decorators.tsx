import React from 'react';

export const marginDecorator = (Story) => (
  <div style={{ margin: '3em' }}>
    <Story />
  </div>
);
