"use client";

import { useState } from 'react';
import Head from 'next/head';

import ColorPicker from './components/ColorPicker'
import DrawingGrid from './components/DrawingGrid';
import styles from './styles.module.css';

const FaviconGenPage = () => {
  const [selectedColor, setSelectedColor] = useState('#000000');

  return (
    <>
    <Head>
        <title>Lofn : Favicon Generator</title>
        <meta name="description" content="Generate your custom favicons easily" />
      </Head>
    <div className={styles.container}>
      <div className={styles.colorPickerContainer}>
        <ColorPicker onColorChange={setSelectedColor} />
      </div>
      <div className={styles.gridContainer}>
        <DrawingGrid selectedColor={selectedColor} />
      </div>
    </div>
    </>
  );
}

export default FaviconGenPage;