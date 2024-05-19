import { useState } from 'react';
import { SketchPicker } from 'react-color';

const ColorPicker = ({ onColorChange }) => {
    const [color, setColor] = useState('#000000');

    const handleChangeComplete = (color) => {
        setColor(color.hex);
        onColorChange(color.hex);
    }

    return <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
};

export default ColorPicker;