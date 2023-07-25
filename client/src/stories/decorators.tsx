import React from 'react';

export const paddingDecorator = (Story) => (
  <div style={{ padding: '1rem' }}>
    <Story />
  </div>
);
