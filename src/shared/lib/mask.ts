export const MASK_PHONE_10 = '(99) 9999-9999';
export const MASK_PHONE_11 = '(99) 99999-9999';

export const getRightMask = (value: string) => {
    const mask = value.length > 10
        ? MASK_PHONE_11
        : MASK_PHONE_10;

    return mask;
};

export const applyMask = (value: string, pattern: string) => {
    if (!value) return '';

    let maskedValue = '';
    let digitIndex = 0; // Nosso ponteiro para os dígitos em 'value'

    // Iteramos pelo Padrão (pattern)
    for (let i = 0; i < pattern.length; i++) {
        
        // 1. Se já usamos todos os dígitos, paramos imediatamente.
        if (digitIndex >= value.length) 
            break;

        const patternChar = pattern[i];

        // 2. Se o padrão pede um dígito ('9')
        if (patternChar === '9') {
            // Usamos o dígito da nossa 'value'
            maskedValue += value[digitIndex];
            digitIndex++; // E avançamos o ponteiro dos dígitos
        } else 
            // 3. Se o padrão pede um literal ('(', ')', ' ', '-')
            // Apenas o adicionamos.
            maskedValue += patternChar;
    }

    return maskedValue;
};

export const getUnmaskedValue = (value: string): string => {
    if (!value) return '';
    return value.replace(/\D/g, '');
};