"use client";

import { useState, useRef, useEffect } from "react";
import html2canvas from 'html2canvas';
import { createCanvas, loadImage } from 'canvas';
import { saveAs } from 'file-saver';
import styles from './DrawingGrid.module.css';

const DrawingGrid = ({ selectedColor }) => {
    const initialGrid = Array(16).fill().map(() => Array(16).fill(''));
    const [grid, setGrid] = useState(initialGrid);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isEraser, setIsEraser] = useState(false);
    const gridRef = useRef();

    const handleMouseDown = (rowIdx, colIdx) => {
        setIsDrawing(true);
        updateCellColor(rowIdx, colIdx);
    };
    
    const handleMouseUp = () => {
        setIsDrawing(false);
    };
    
    const handleMouseEnter = (rowIdx, colIdx) => {
        if (isDrawing) {
          updateCellColor(rowIdx, colIdx);
        }
    };

    const handleReset = () => {
        setGrid(initialGrid);
    };

    const updateCellColor = (rowIdx, colIdx) => {
        const newGrid = grid.map((row, rIdx) =>
          row.map((cell, cIdx) => {
            if (rIdx === rowIdx && cIdx === colIdx) {
              return isEraser ? '' : selectedColor;
            }
            return cell;
          })
        );
        setGrid(newGrid);
    };

    const updateFavicon = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
    
        grid.forEach((row, rowIdx) => {
          row.forEach((color, colIdx) => {
            if (color) {
              ctx.fillStyle = color;
              ctx.fillRect(colIdx, rowIdx, 1, 1);
            }
          });
        });
    
        const favicon = canvas.toDataURL('image/x-icon');
        const link = document.createElement('link');
        const oldLink = document.getElementById('favicon');
        link.id = 'favicon';
        link.rel = 'icon';
        link.href = favicon;
        if (oldLink) {
          document.head.removeChild(oldLink);
        }
        document.head.appendChild(link);
      };

    useEffect(() => {
        updateFavicon();
    }, [grid]);

    const handleDownload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
    
        grid.forEach((row, rowIdx) => {
          row.forEach((color, colIdx) => {
            if (color) {
              ctx.fillStyle = color;
              ctx.fillRect(colIdx, rowIdx, 1, 1);
            }
          });
        });
    
        canvas.toBlob((blob) => {
          saveAs(blob, 'drawing.ico');
        }, 'image/x-icon');
      };

    return (
        <div
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div className={styles.grid} ref={gridRef}>
                {grid.map((row, rowIdx) =>
                    row.map((cell, colIdx) => (
                        <div
                            key={`${rowIdx}-${colIdx}`}
                            className={styles.cell}
                            style={{ backgroundColor: cell }}
                            onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
                            onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
                        />
                    ))
                )}
            </div>
            <button onClick={() => setIsEraser(!isEraser)}>
                {isEraser ? 'Switch to Draw' : 'Switch to Eraser'}
            </button>
            <button onClick={handleDownload}>Download favicon</button>
            <button onClick={handleReset}>Reset Grid</button>
        </div>
    );
};

export default DrawingGrid;