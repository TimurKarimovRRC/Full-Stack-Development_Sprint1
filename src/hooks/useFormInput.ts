import { useState } from "react";
import type { ValidationResult } from "../types/validation";

export function useFormInput(initialValue = "") {
    const [value, updateValue] = useState(initialValue);
    const [messages, setMessages] = useState<string[]>([]);

    function setValue(nextValue: string) {
        updateValue(nextValue);
        setMessages([]);
    }

    function validate(
        callback: (value: string) => ValidationResult
    ): ValidationResult {
        const result = callback(value);

        setMessages(result.errors);

        return result;
    }

    function reset() {
        updateValue(initialValue);
        setMessages([]);
    }

    return {
        value,
        setValue,
        messages,
        validate,
        reset,
    };
}

