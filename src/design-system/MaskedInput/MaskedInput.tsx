import { Form, Input, type InputProps } from 'antd';
import { useState } from 'react';
import { applyMask, getRightMask, getUnmaskedValue, MASK_PHONE_11 } from '../../shared/utils/mask';

type MaskedInput = {
    name: string
} & InputProps;

function MaskedInput({ name, value, ...restProps }: MaskedInput) {
    const [maskedValue, setMaskedValue] = useState(value ?? '');

    const form = Form.useFormInstance();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {        
        const value = e.target.value;
        const unmaskedValue = getUnmaskedValue(value);

        const currentPattern = getRightMask(unmaskedValue);

        const newMaskedValue = applyMask(unmaskedValue, currentPattern);

        setMaskedValue(newMaskedValue);

        form.setFieldsValue({ [name]: unmaskedValue });
    };

    return (
        <Input
            {...restProps}
            value={maskedValue}
            maxLength={MASK_PHONE_11.length}
            placeholder={MASK_PHONE_11}
            onChange={onChange}
        />
    );
}

export default MaskedInput;