// src/components/Page.jsx
import React from 'react';

export const PageCover = React.forwardRef(({ children }, ref) => (
  <div ref={ref} className="page-cover">
    <div className="page-content text-white text-center">
      <h2 className="text-2xl font-bold">{children}</h2>
    </div>
  </div>
));

export const Page = React.forwardRef(({ title, content, image }, ref) => (
  <div ref={ref} className="page">
    <div className="page-content text-center text-black">
      <img src={image} alt={title} className="w-20 h-20 object-contain mx-auto mb-3" />
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm leading-relaxed">{content}</p>
    </div>
  </div>
));
