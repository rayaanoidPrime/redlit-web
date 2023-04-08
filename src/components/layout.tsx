import React from 'react';
import Wrapper , { WrapperVariant } from "./wrapper";
import { NavBar } from './NavBar';

interface LayoutProps {
    children: React.ReactNode;
    variant?: WrapperVariant;
  }
export const Layout : React.FC<LayoutProps>  = ({children , variant = "regular"}) => {

    return (
        <>
          <NavBar />
          <Wrapper variant={variant}>{children}</Wrapper>
        </>
      );

}