import React from 'react';

const defaultNegative = () => null;

export default function renderIf (conditional, affirmative, negative = defaultNegative) {
  return conditional ? affirmative() : negative();
}
