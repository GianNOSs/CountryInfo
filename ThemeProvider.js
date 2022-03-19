import React, { createContext } from 'react';

const DarkModeContext = createContext();
const animationContext = createContext();

export default function ThemeProvider({DarkMode, animation}) {

<DarkModeContext.Provider value={DarkMode}>
    <animationContext.Provider value={animation}>
        {props.children}
    </animationContext.Provider>
</DarkModeContext.Provider>
}