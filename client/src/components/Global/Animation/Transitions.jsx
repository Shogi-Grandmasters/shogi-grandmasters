import React from 'react';
import { CSSTransition, transit } from "react-css-transition";

export const FadeIn = (props) => (
  <CSSTransition
    {...props}
    defaultStyle={{ opacity: 0 }}
    enterStyle={{ opacity: transit(1.0, 500, "ease-in-out") }}
    leaveStyle={{ opacity: transit(0, 500, "ease-in-out") }}
    activeStyle={{ opacity: 1.0 }}
  />
);

export default {
  FadeIn,
};