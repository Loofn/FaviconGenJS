"use client";

import { useState } from 'react';
import ColorPicker from '../../components/ColorPicker'
import DrawingGrid from '../../components/DrawingGrid';
import styles from './globals.css';

export default function Home() {
  const [selectedColor, setSelectedColor] = useState('#000000');

  return (
    <div className={styles.container}>
      <div className={styles.colorPickerContainer}>
        <ColorPicker onColorChange={setSelectedColor} />
      </div>
      <div className={styles.gridContainer}>
        <DrawingGrid selectedColor={selectedColor} />
      </div>
    </div>
  );
}