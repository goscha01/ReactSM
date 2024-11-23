import React, { useEffect } from 'react'
import { Canvas, Circle, FabricObject, Path } from 'fabric';
import { Properties } from './CanvasWrapper';
import { RoundPathString } from '@/utils/helper';


interface PropertiesPanelProps {
    canvas: Canvas | null;
    selectedObject: FabricObject | null;
    objectProperties: Properties | null;
    setObjectProperties: (properties: Properties | null) => void;
    setSelectedObject: (object: FabricObject | null) => void;
}

export default function PropertiesPanel({ canvas, selectedObject, objectProperties, setObjectProperties, setSelectedObject }: PropertiesPanelProps) {

    const handleFillColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedObject) {
            selectedObject.set({ fill: e.target.value });
            setObjectProperties({
                ...objectProperties,
                fill: e.target.value,
            });
            canvas?.renderAll();
        }
    }
    const handleStrokeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedObject) {
            selectedObject.set({ stroke: e.target.value });
            setObjectProperties({
                ...objectProperties,
                stroke: e.target.value,
            });
            canvas?.renderAll();
        }
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedObject) {
            selectedObject.set({ text: e.target.value });
            setSelectedObject(selectedObject);
            setObjectProperties({
                ...objectProperties,
                text: e.target.value,
            });
            canvas?.renderAll();
        }
    }

    const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (selectedObject) {
            selectedObject.set({ fontSize: parseInt(e.target.value) });
            setObjectProperties({
                ...objectProperties,
                fontSize: parseInt(e.target.value),
            });
            canvas?.renderAll();
        }
    }

    const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedObject && canvas) {
            const wh = canvas.getWidth();
            selectedObject.set({ radius: parseInt(e.target.value) * ((wh / 4) / 100) * 2 });
            selectedObject.set({ left: wh / 2 - selectedObject.getScaledWidth() / 2 });
            selectedObject.set({ top: wh / 2 - selectedObject.getScaledHeight() / 2 });
            setObjectProperties({
                ...objectProperties,
                radius: parseInt(e.target.value) * ((wh / 4) / 100) * 2,
            });
            canvas?.renderAll();
        }
    }

    const handleRoundedTextRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedObject && canvas) {
            const wh = canvas.getWidth();
            const radius = parseInt(e.target.value) * ((wh / 4) / 100) * 2;
            const pathString = RoundPathString(radius, wh, wh);

            const path = new Path(pathString, {
                fill: 'transparent',
                stroke: 'transparent',
                selectable: false,
            });
            selectedObject.set({
                path: path,
                radius: radius / 2,
            });
            setObjectProperties({
                ...objectProperties,
                path: path,
                radius: radius / 2,
            });
            canvas?.renderAll();
        }
    }

    const handleStrokeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedObject && canvas) {
            selectedObject.set({ strokeWidth: parseInt(e.target.value) });
            selectedObject.set({ left: canvas.getWidth() / 2 - selectedObject.getScaledWidth() / 2 });
            selectedObject.set({ top: canvas.getHeight() / 2 - selectedObject.getScaledHeight() / 2 });
            setObjectProperties({
                ...objectProperties,
                strokeWidth: parseInt(e.target.value),
            });
            canvas?.renderAll();
        }
    }

    const handleSpacingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedObject) {
            selectedObject.set({ charSpacing: parseInt(e.target.value) * 8 });
            setObjectProperties({
                ...objectProperties,
                charSpacing: parseInt(e.target.value),
            });
            canvas?.renderAll();
        }
    }

    const handleStartPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedObject) {
            selectedObject.set({ pathStartOffset: parseInt(e.target.value) * 6 });
            setObjectProperties({
                ...objectProperties,
                pathStartOffset: parseInt(e.target.value),
            });
            canvas?.renderAll();
        }
    }

    const handleRotationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedObject) {
            selectedObject.set({ angle: parseInt(e.target.value) });
            setObjectProperties({
                ...objectProperties,
                angle: parseInt(e.target.value),
            });
            canvas?.renderAll();
        }
    }

    const handlePositionXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedObject) {
            selectedObject.set({ left: parseInt(e.target.value) });
            setObjectProperties({
                ...objectProperties,
                left: parseInt(e.target.value),
            });
            canvas?.renderAll();
        }
    }

    const handlePositionYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedObject) {
            selectedObject.set({ top: parseInt(e.target.value) });
            setObjectProperties({
                ...objectProperties,
                top: parseInt(e.target.value),
            });
            canvas?.renderAll();
        }
    }

    const handleBoldClick = () => {
        if (selectedObject) {
            const newFontWeight = objectProperties?.fontWeight === 'bold' ? 'normal' : 'bold';
            selectedObject.set({ fontWeight: newFontWeight });
            setObjectProperties({
                ...objectProperties,
                fontWeight: newFontWeight,
            });
            canvas?.renderAll();
        }
    }

    const handleItalicClick = () => {
        if (selectedObject) {
            const newFontStyle = objectProperties?.fontStyle === 'italic' ? 'normal' : 'italic';
            selectedObject.set({ fontStyle: newFontStyle });
            setObjectProperties({
                ...objectProperties,
                fontStyle: newFontStyle,
            });
            canvas?.renderAll();
        }
    }

    const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (selectedObject) {
            selectedObject.set({ fontFamily: e.target.value });
            setObjectProperties({
                ...objectProperties,
                fontFamily: e.target.value,
            });
            canvas?.renderAll();
        }
    }

    const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedObject) {
            // Map 0-100 range to 0.5-1.5 scale
            // const scale = 0.5 + (parseInt(e.target.value) / 100) * 1;
            const scale = parseInt(e.target.value) / 100;
            selectedObject.set({
                scaleX: scale,
                scaleY: scale,
            });
            setObjectProperties({
                ...objectProperties,
                scaleX: scale,
                scaleY: scale,
            });
            canvas?.renderAll();
        }
    }


    if (!canvas || !objectProperties) return null;
    if (!selectedObject) {
        return (<div className='px-2 py-1 flex flex-col items-center justify-center'>
            <h6 className='select-none font-medium text-xs text-slate-500'>Select a layer</h6>
        </div>)
    };

    if (selectedObject.type === 'circle') {
        return (
            <div className='flex flex-col gap-2 mt-3 text-sm'>
                <h5 className='text-center'>{objectProperties.uname}</h5>
                <div className='max-w-[150px] mx-auto border rounded-md px-2 py-0.5 flex items-center justify-between gap-1'>
                    <label htmlFor="color">Color</label>
                    <input type="color" name="color" id="color" value={objectProperties?.stroke} onChange={handleStrokeColorChange} />
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <label htmlFor="radius">Radius {objectProperties?.radius ? Math.ceil(objectProperties.radius * (100 / (canvas.getWidth() / 4)) / 2) : 0}%</label>
                    <input className='w-full h-1 bg-[#b2b2b2] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff8800]' type="range"
                        value={objectProperties?.radius ? objectProperties.radius * (100 / (canvas.getWidth() / 4)) / 2 : 0}
                        min="1"
                        max="100"
                        name="radius"
                        id="radius"
                        onChange={handleRadiusChange} />
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <label htmlFor="stroke">Stroke {objectProperties?.strokeWidth}%</label>
                    <input className='w-full h-1 bg-[#b2b2b2] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff8800]'
                        type="range"
                        value={objectProperties?.strokeWidth}
                        min="1"
                        max="100"
                        name="stroke"
                        id="stroke"
                        onChange={handleStrokeChange} />
                </div>
            </div>
        )
    } else if (selectedObject.type === 'text') {
        return (
            <div className='flex flex-col gap-2 mt-3 text-sm'>
                <h5 className='text-center'>{objectProperties.uname}</h5>
                <div className='grid grid-cols-2 gap-2'>
                    <select name="font" id="font" className='border rounded-md px-1 py-0.5' onChange={handleFontChange}>
                        <option selected={objectProperties?.fontFamily === 'Arial'} value="Arial" style={{ fontFamily: 'Arial' }}>Arial</option>
                        <option selected={objectProperties?.fontFamily === 'Calibri'} value="Calibri" style={{ fontFamily: 'Calibri' }}>Calibri</option>
                        <option selected={objectProperties?.fontFamily === 'Courier New'} value="Courier New" style={{ fontFamily: 'Courier New' }}>Courier New</option>
                        <option selected={objectProperties?.fontFamily === 'Tahoma'} value="Tahoma" style={{ fontFamily: 'Tahoma' }}>Tahoma</option>
                        <option selected={objectProperties?.fontFamily === 'Times New Roman'} value="Times New Roman" style={{ fontFamily: 'Times New Roman' }}>Times New Roman</option>
                        <option selected={objectProperties?.fontFamily === 'Verdana'} value="Verdana" style={{ fontFamily: 'Verdana' }}>Verdana</option>
                        <option selected={objectProperties?.fontFamily === 'Comic Sans MS'} value="Comic Sans MS" style={{ fontFamily: 'Comic Sans MS' }}>Comic Sans MS</option>
                        <option selected={objectProperties?.fontFamily === 'Days'} value="Days" style={{ fontFamily: 'Days' }}>Days</option>
                        <option selected={objectProperties?.fontFamily === 'Simpleiriska'} value="Simpleiriska" style={{ fontFamily: 'Simpleiriska' }}>Simpleiriska</option>
                        <option selected={objectProperties?.fontFamily === 'Marck Script'} value="Marck Script" style={{ fontFamily: 'Marck Script' }}>Marck Script</option>
                    </select>
                    <select name="fontSize" id="fontSize" className='border rounded-md px-1 py-0.5' onChange={handleFontSizeChange}>
                        {[6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 42, 48, 56, 64, 72, 80].map((size) => (
                            <option key={size} value={size} selected={objectProperties?.fontSize === size}>{size}</option>
                        ))}
                    </select>
                    <div className="border rounded-md px-1 py-0.5 grid grid-cols-2 gap-1 divide-x">
                        <button onClick={handleBoldClick} className='bg-slate-50 hover:bg-slate-100 transition-colors duration-200'>B</button>
                        <button onClick={handleItalicClick} className='bg-slate-50 hover:bg-slate-100 transition-colors duration-200'>I</button>
                    </div>
                    <div className='border rounded-md px-2 py-0.5 flex items-center justify-between gap-1'>
                        <label htmlFor="color">Color</label>
                        <input type="color" name="color" id="color" value={objectProperties?.fill} onChange={handleFillColorChange} />
                    </div>
                </div>
                <input type="text" name="text" id="text" className='border rounded-md px-2 py-0.5' placeholder='Add some text' value={objectProperties?.text} onChange={handleTextChange} />
                <div className='flex flex-col items-center gap-2'>
                    <label htmlFor="radius">Radius {objectProperties?.radius ? Math.ceil(objectProperties.radius * (100 / (canvas.getWidth() / 4))) : 0}%</label>
                    <input className='w-full h-1 bg-[#b2b2b2] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff8800]' type="range"
                        value={objectProperties?.radius ? objectProperties.radius * (100 / (canvas.getWidth() / 4)) : 0}
                        min="1"
                        max="100"
                        name="radius"
                        id="radius"
                        onChange={handleRoundedTextRadiusChange} />
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <label htmlFor="spacing">Spacing {objectProperties?.charSpacing}%</label>
                    <input className='w-full h-1 bg-[#b2b2b2] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff8800]'
                        type="range"
                        value={objectProperties?.charSpacing}
                        min="1"
                        max="100"
                        name="spacing"
                        id="spacing"
                        onChange={handleSpacingChange} />
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <label htmlFor="startPoint">Start Point {objectProperties.pathStartOffset ? (objectProperties.pathStartOffset / 105 * 100).toFixed(0) : 0}%</label>
                    <input className='w-full h-1 bg-[#b2b2b2] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff8800]' type="range" value={objectProperties.pathStartOffset} min="0" max="105" name="startPoint" id="startPoint" onChange={handleStartPointChange} />
                </div>

            </div>
        )
    }
    else if (selectedObject.type === 'i-text') {
        return (
            <div className='flex flex-col gap-2 mt-3 text-sm'>
                <h5 className='text-center'>{objectProperties.uname}</h5>
                <div className='grid grid-cols-2 gap-2'>
                    <select name="font" id="font" className='border rounded-md px-1 py-0.5' onChange={handleFontChange}>
                        <option selected={objectProperties?.fontFamily === 'Arial'} value="Arial" style={{ fontFamily: 'Arial' }}>Arial</option>
                        <option selected={objectProperties?.fontFamily === 'Calibri'} value="Calibri" style={{ fontFamily: 'Calibri' }}>Calibri</option>
                        <option selected={objectProperties?.fontFamily === 'Courier New'} value="Courier New" style={{ fontFamily: 'Courier New' }}>Courier New</option>
                        <option selected={objectProperties?.fontFamily === 'Tahoma'} value="Tahoma" style={{ fontFamily: 'Tahoma' }}>Tahoma</option>
                        <option selected={objectProperties?.fontFamily === 'Times New Roman'} value="Times New Roman" style={{ fontFamily: 'Times New Roman' }}>Times New Roman</option>
                        <option selected={objectProperties?.fontFamily === 'Verdana'} value="Verdana" style={{ fontFamily: 'Verdana' }}>Verdana</option>
                        <option selected={objectProperties?.fontFamily === 'Comic Sans MS'} value="Comic Sans MS" style={{ fontFamily: 'Comic Sans MS' }}>Comic Sans MS</option>
                        <option selected={objectProperties?.fontFamily === 'Days'} value="Days" style={{ fontFamily: 'Days' }}>Days</option>
                        <option selected={objectProperties?.fontFamily === 'Simpleiriska'} value="Simpleiriska" style={{ fontFamily: 'Simpleiriska' }}>Simpleiriska</option>
                        <option selected={objectProperties?.fontFamily === 'Marck Script'} value="Marck Script" style={{ fontFamily: 'Marck Script' }}>Marck Script</option>
                    </select>
                    <select name="fontSize" id="fontSize" className='border rounded-md px-1 py-0.5' onChange={handleFontSizeChange}>
                        {[6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 42, 48, 56, 64, 72, 80].map((size) => (
                            <option key={size} value={size} selected={objectProperties?.fontSize === size}>{size}</option>
                        ))}
                    </select>
                    <div className="border rounded-md px-1 py-0.5 grid grid-cols-2 gap-1 divide-x">
                        <button onClick={handleBoldClick} className='bg-slate-50 hover:bg-slate-100 transition-colors duration-200'>B</button>
                        <button onClick={handleItalicClick} className='bg-slate-50 hover:bg-slate-100 transition-colors duration-200'>I</button>
                    </div>
                    <div className='border rounded-md px-2 py-0.5 flex items-center justify-between gap-1'>
                        <label htmlFor="color">Color</label>
                        <input type="color" name="color" id="color" value={objectProperties?.fill} onChange={handleFillColorChange} />
                    </div>
                </div>
                <input type="text" name="text" id="text" className='border rounded-md px-2 py-0.5' placeholder='Add some text' value={objectProperties?.text} onChange={handleTextChange} />
                <div className='flex flex-col items-center gap-2'>
                    <label htmlFor="positionX">Position X: {objectProperties?.left ? (objectProperties.left / canvas.getWidth() * 100).toFixed(0) : 0}%</label>
                    <input className='w-full h-1 bg-[#b2b2b2] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff8800]' type="range"
                        value={objectProperties?.left}
                        min="0"
                        max={canvas.getWidth()}
                        name="positionX"
                        id="positionX"
                        onChange={handlePositionXChange} />
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <label htmlFor="positionY">Position Y: {objectProperties.top ? (objectProperties.top / canvas.getHeight() * 100).toFixed(0) : 0}%</label>
                    <input className='w-full h-1 bg-[#b2b2b2] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff8800]' type="range" value={objectProperties?.top} min="0" max={canvas.getHeight()} name="positionY" id="positionY" onChange={handlePositionYChange} />
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <label htmlFor="rotation">Rotation: {objectProperties.angle ? (objectProperties.angle / 360 * 100).toFixed(0) : 0}%</label>
                    <input className='w-full h-1 bg-[#b2b2b2] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff8800]' type="range" value={objectProperties.angle} min="0" max="360" step="10" name="rotation" id="rotation" onChange={handleRotationChange} />
                </div>

            </div>
        )
    }
    else if (selectedObject.type === 'image') {
        return (
            <div className='flex flex-col gap-2 mt-3 text-sm'>
                <h5 className='text-center'>{objectProperties.uname}</h5>
                <div className='flex flex-col items-center gap-2'>
                    <label htmlFor="positionX">Position X: {objectProperties?.left ? (objectProperties.left / canvas.getWidth() * 100).toFixed(0) : 0}%</label>
                    <input className='w-full h-1 bg-[#b2b2b2] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff8800]' type="range"
                        value={objectProperties?.left}
                        min="0"
                        max={canvas.getWidth()}
                        name="positionX"
                        id="positionX"
                        onChange={handlePositionXChange} />
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <label htmlFor="positionY">Position Y: {objectProperties.top ? (objectProperties.top / canvas.getHeight() * 100).toFixed(0) : 0}%</label>
                    <input className='w-full h-1 bg-[#b2b2b2] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff8800]' type="range" value={objectProperties?.top} min="0" max={canvas.getHeight()} name="positionY" id="positionY" onChange={handlePositionYChange} />
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <label htmlFor="size">Size: {objectProperties.scaleX ? (objectProperties.scaleX * 100).toFixed(0) : 0}%</label>
                    <input className='w-full h-1 bg-[#b2b2b2] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff8800]' type="range" value={objectProperties?.scaleX ? objectProperties.scaleX * 100 : 0} min="0" max="100" name="size" id="size" onChange={handleSizeChange} />
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <label htmlFor="rotation">Rotation: {objectProperties.angle ? (objectProperties.angle / 360 * 100).toFixed(0) : 0}%</label>
                    <input className='w-full h-1 bg-[#b2b2b2] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff8800]' type="range" value={objectProperties.angle} min="0" max="360" step="10" name="rotation" id="rotation" onChange={handleRotationChange} />
                </div>

            </div>
        )
    }
}
