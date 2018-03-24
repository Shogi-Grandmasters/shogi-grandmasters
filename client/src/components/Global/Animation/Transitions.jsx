import React from 'react';
import { CSSTransition, transit } from "react-css-transition";

export const FadeIn = (props) => {
  let supplementalProps = {};
  if (!props.active) supplementalProps.active = true;
  if (!props.transitionAppear) supplementalProps.transitionAppear = true;
  return (
    <CSSTransition
      {...props}
      {...supplementalProps}
      defaultStyle={{ opacity: 0 }}
      enterStyle={{ opacity: transit(1.0, 500, "ease-in-out") }}
      leaveStyle={{ opacity: transit(0, 500, "ease-in-out") }}
      activeStyle={{ opacity: 1.0 }}
    />
  )
};

export default {
  FadeIn,
};