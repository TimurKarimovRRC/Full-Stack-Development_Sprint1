import { useState } from "react";
import type {
    ChangeEvent,
    ChangeEventHandler,
} from "react";

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/**
 * Manages string-valued form presentation state.
 *
 * Returns:
 * - `values`: the current field values, keyed by each field's `name`.
 * - `handleChange`: an `onChange` handler for named input, select, and textarea fields.
 * - `reset`: restores all values to the initial values passed to the hook.
 */
export function useForm<T extends Record<string, string>>(initialValues: T) {
    const [values, setValues] = useState<T>(initialValues);

    const handleChange: ChangeEventHandler<FormElement> = (
        event: ChangeEvent<FormElement>,
    ) => {
        const { name, value } = event.currentTarget;
        if (!Object.prototype.hasOwnProperty.call(initialValues, name)) {
            return;
        }

        setValues((currentValues) => ({
            ...currentValues,
            [name]: value,
        }));
    };

    function reset() {
        setValues(initialValues);
    }

    return { values, handleChange, reset };
}
