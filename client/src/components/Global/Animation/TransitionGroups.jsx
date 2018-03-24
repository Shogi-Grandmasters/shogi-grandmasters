import React from 'react';
import { CSSTransitionGroup } from "react-css-transition";
import { FadeIn } from './Transitions.jsx';

export const FadeInGroup = (props) => (
  <CSSTransitionGroup {...props}>
    {
      React.Children.map(
        props.children,
        (child) => <FadeIn>{child}</FadeIn>,
      )
    }
  </CSSTransitionGroup>
);

export default {
  FadeInGroup,
}