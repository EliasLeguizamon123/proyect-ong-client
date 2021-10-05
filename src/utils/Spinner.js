import React from 'react';
import Loader from 'react-loader-spinner';

export default function Spinner({
  type,
  color = 'C0C0C0',
  height,
  width,
  timeout,
}) {
  return (
    <Loader
      type={type}
      color={color}
      height={height}
      width={width}
      timeout={timeout}
    />
  );
}
