"use client";

import { useState } from "react";

export default function SkipToContent() {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <a
            href="#main-content"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`
                fixed top-4 left-4 z-[100] px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg shadow-xl transition-transform duration-200
                ${isFocused ? "translate-y-0" : "-translate-y-[200%]"}
            `}
        >
            Skip to Content
        </a>
    );
}
