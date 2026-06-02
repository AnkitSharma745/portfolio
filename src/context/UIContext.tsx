"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
    isChatOpen: boolean;
    isCommandPaletteOpen: boolean;
    openChat: () => void;
    closeChat: () => void;
    toggleChat: () => void;
    openCommandPalette: () => void;
    closeCommandPalette: () => void;
    toggleCommandPalette: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

    const openChat = () => setIsChatOpen(true);
    const closeChat = () => setIsChatOpen(false);
    const toggleChat = () => setIsChatOpen((prev) => !prev);

    const openCommandPalette = () => setIsCommandPaletteOpen(true);
    const closeCommandPalette = () => setIsCommandPaletteOpen(false);
    const toggleCommandPalette = () => setIsCommandPaletteOpen((prev) => !prev);

    return (
        <UIContext.Provider
            value={{
                isChatOpen,
                isCommandPaletteOpen,
                openChat,
                closeChat,
                toggleChat,
                openCommandPalette,
                closeCommandPalette,
                toggleCommandPalette,
            }}
        >
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error("useUI must be used within a UIProvider");
    }
    return context;
}
