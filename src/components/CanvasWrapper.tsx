"use client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Canvas, Circle, Rect, IText, FabricObject, Path, FabricText, FabricImage } from 'fabric';
import { useEffect, useState, useRef } from 'react';
import PropertiesPanel from '@/components/PropertiesPanel';
import LayersList from './LayersList';
import { RoundPathString } from '@/utils/helper';
import Image from 'next/image';

export interface Properties {
  uname?: string;
  text?: string;
  fill?: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
  fontFamily?: string;
  left?: number;
  top?: number;
  rotation?: number;
  angle?: number;
  radius?: number;
  strokeWidth?: number;
  stroke?: string;
  scaleX?: number;
  scaleY?: number;
  pathStartOffset?: number;
  charSpacing?: number;
  path?: Path;
}
export interface LayerObject {
  id: string;
  name: string;
  object: FabricObject;
}

// Add this interface to extend FabricText properties
interface CustomFabricText extends FabricText {
  radius: number;
  pathStartOffset: number;
  charSpacing: number;
}

export default function CanvasWrapper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<FabricObject | Circle | IText | CustomFabricText | null>(null);
  const [objectProperties, setObjectProperties] = useState<Properties | null>(null);
  const [layers, setLayers] = useState<LayerObject[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvasContainer = document.getElementById('canvas-container');
      if (!canvasContainer) return;

      const width = canvasContainer.offsetWidth;
      const height = canvasContainer.offsetHeight;

      // Calculate initial size based on container dimensions
      const size = Math.min(height, width);
      const initCanvas = new Canvas(canvasRef.current, {
        height: size,
        width: size,
        backgroundColor: 'transparent',
        selection: false,
        hoverCursor: 'default',
      });
      initCanvas.renderAll();
      setCanvas(initCanvas);

      return () => {
        setLayers([]);
        initCanvas.dispose();
      };
    }
  }, []);

  useEffect(() => {
    const resizeCanvas = () => {
      if (!canvas || !canvasRef.current) return;

      const canvasContainer = document.getElementById('canvas-container');
      if (!canvasContainer) return;

      const width = canvasContainer.offsetWidth;
      const height = canvasContainer.offsetHeight;

      // Calculate new size based on container dimensions
      const size = Math.min(height, width);

      // Store original dimensions and positions
      const originalWidth = canvas.getWidth();

      const objects = canvas.getObjects().map(obj => ({
        obj,
        originalLeft: obj.left,
        originalTop: obj.top,
        originalScaleX: obj.scaleX,
        originalScaleY: obj.scaleY
      }));

      // Update canvas dimensions
      canvas.setDimensions({
        width: size,
        height: size
      });

      // Scale and reposition all objects proportionally
      const scaleFactor = size / originalWidth;
      objects.forEach(({ obj, originalLeft, originalTop, originalScaleX, originalScaleY }) => {
        if (originalLeft !== undefined && originalTop !== undefined) {
          obj.set({
            left: originalLeft * scaleFactor,
            top: originalTop * scaleFactor,
            scaleX: originalScaleX! * scaleFactor,
            scaleY: originalScaleY! * scaleFactor
          });
        }
        obj.setCoords();
      });

      canvas.renderAll();
      canvas.requestRenderAll();
    };

    // Initial resize
    resizeCanvas();

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    // Add resize event listener
    window.addEventListener('resize', debouncedResize);

    // Cleanup
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', debouncedResize);
    };
  }, [canvas]);

  const handleSetLayer = (object: FabricObject) => {
    if (!canvas) return;
    const nameKey = {
      circle: 'Circle',
      'i-text': 'LineText',
      text: 'RoundedText',
      image: 'Image',
    }
    const typeCount = layers.filter(layer =>
      layer.name.startsWith(nameKey[object.type as keyof typeof nameKey])
    ).length + 1;
    const name = `${nameKey[object.type as keyof typeof nameKey]} #${typeCount}`;

    // Replace crypto.randomUUID() with a more compatible UUID generation
    const generateUUID = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };

    const newLayer = { id: generateUUID(), name, object };
    setLayers(prev => [...prev, newLayer]);
  };

  const deleteLayer = (id: string) => {
    if (!canvas) return;

    const layerToDelete = layers.find(layer => layer.id === id);
    if (!layerToDelete) return;

    if (layerToDelete.object === selectedObject) {
      setSelectedObject(null);
      setObjectProperties(null);
    }
    setCanvas((prevCanvas) => {
      prevCanvas?.remove(layerToDelete.object);
      return prevCanvas;
    });
    setLayers(prev => prev.filter(layer => layer.id !== id));
    canvas.renderAll();
  };

  useEffect(() => {
    if (selectedObject) {
      const isText = selectedObject instanceof IText || selectedObject instanceof FabricText;
      const layer = layers.find(layer => layer.object === selectedObject);
      setObjectProperties({
        ...(isText && { text: selectedObject.text || "" }),
        ...(layer && { uname: layer.name }),
        fill: selectedObject?.fill as string,
        fontSize: isText ? selectedObject.fontSize || 20 : undefined,
        fontWeight: isText ? selectedObject.fontWeight as string : undefined,
        fontStyle: isText ? selectedObject.fontStyle as string : undefined,
        fontFamily: isText ? selectedObject.fontFamily as string : undefined,
        left: selectedObject?.left,
        top: selectedObject?.top,
        stroke: selectedObject?.stroke as string,
        strokeWidth: selectedObject?.strokeWidth,
        scaleX: selectedObject?.scaleX,
        scaleY: selectedObject?.scaleY,
        rotation: selectedObject?.angle || 0,
        angle: selectedObject?.angle || 0,
        ...((selectedObject instanceof Circle) &&
          { radius: (selectedObject as Circle).radius }),
        ...((selectedObject instanceof FabricText) &&
          { radius: (selectedObject as CustomFabricText).radius / 1.5 }),
        ...((selectedObject instanceof FabricText && 'pathStartOffset' in selectedObject) &&
          { pathStartOffset: (selectedObject as CustomFabricText).pathStartOffset! / 8 }),
        ...((selectedObject instanceof FabricText && 'charSpacing' in selectedObject) &&
          { charSpacing: (selectedObject as CustomFabricText).charSpacing! / 8 }),
      });
    }
  }, [selectedObject]);

  const addShape = () => {
    if (canvas) {
      const radius = 130;
      const shape = new Circle({
        radius: radius,
        fill: 'transparent',
        stroke: '#000',
        strokeWidth: 2,
        left: canvas.getWidth() / 2 - radius,
        top: canvas.getHeight() / 2 - radius,
        selectable: false,
      });
      canvas.add(shape);
      handleSetLayer(shape)
      setSelectedObject(shape);
      setPropertiesOpen(true);
    }
  };

  const addInlineText = () => {
    if (canvas) {
      const text = new IText('Hello, world!', {
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2,
        fill: '#000',
        fontSize: 14,
        selectable: false,
        originX: 'center',
        originY: 'center',
        angle: 0,
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontFamily: 'Calibri',
      });
      canvas.add(text);
      handleSetLayer(text)
      setSelectedObject(text);
      setPropertiesOpen(true);
    }
  };

  const addRoundedText = () => {
    if (canvas) {
      const radius = 100;
      const pathString = RoundPathString(radius, canvas.getWidth(), canvas.getHeight());

      const path = new Path(pathString, {
        fill: 'transparent',
        stroke: 'transparent',
        selectable: false,
      });
      const text = "Curved Text is lorem ipsum dolor sit";
      const textOnPath = new FabricText(text, {
        fontSize: 14,
        path: path,
        top: canvas.getHeight() / 2,
        left: canvas.getWidth() / 2,
        textAlign: 'center',
        fontFamily: 'Calibri',
        absolutePositioned: true,
        originX: 'center',
        originY: 'center',
        selectable: false,
        pathStartOffset: 0,
        charSpacing: 80,
        radius: 100,
        reverse: false // Set reverse to false to make text go left to right
      });

      canvas.add(textOnPath);
      handleSetLayer(textOnPath)
      setSelectedObject(textOnPath);
      setPropertiesOpen(true);
    }
  };

  const addImage = () => {
    if (canvas) {
      // Reset the input value to allow selecting the same file again
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }

      imageInputRef.current?.click();

      // Remove previous listeners to prevent multiple handlers
      const handleImageUpload = (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          const url = URL.createObjectURL(file);
          try {
            FabricImage.fromURL(url, {
              crossOrigin: 'anonymous',
            }).then((img) => {
              // Calculate scale to fit image within canvas
              const canvasWidth = canvas.getWidth();
              const canvasHeight = canvas.getHeight();
              const imgWidth = img.width || 0;
              const imgHeight = img.height || 0;

              let scale = 1;
              if (imgWidth > canvasWidth || imgHeight > canvasHeight) {
                const scaleX = canvasWidth / imgWidth;
                const scaleY = canvasHeight / imgHeight;
                scale = Math.min(scaleX, scaleY);
              }

              img.set({
                left: canvasWidth / 2,
                top: canvasHeight / 2,
                selectable: false,
                angle: 0,
                scaleX: scale,
                scaleY: scale,
                originX: 'center',
                originY: 'center',
              });
              canvas.add(img);
              handleSetLayer(img);
              setSelectedObject(img);
              setPropertiesOpen(true);
              // Clean up the URL and remove the listener
              URL.revokeObjectURL(url);
              imageInputRef.current?.removeEventListener('change', handleImageUpload);
            });
          } catch (error) {
            console.error(error);
            imageInputRef.current?.removeEventListener('change', handleImageUpload);
          }
        }
      };

      imageInputRef.current?.addEventListener('change', handleImageUpload);
    }
  };

  const downloadCanvas = () => {
    if (canvas) {
      try {
        const base64 = canvas.toDataURL();
        const a = document.createElement('a');
        a.href = base64;
        a.download = 'MyStampMaker-Stamp.png';
        a.click();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const bringForward = (id: string) => {
    if (!canvas) return;

    const layer = layers.find(layer => layer.id === id);
    if (!layer) return;

    canvas.bringObjectForward(layer.object);
    canvas.renderAll();

    // Update layers array to reflect new z-index order
    setLayers(prev => {
      const currentIndex = prev.findIndex(l => l.id === id);
      if (currentIndex < prev.length - 1) {
        const newLayers = [...prev];
        [newLayers[currentIndex], newLayers[currentIndex + 1]] =
          [newLayers[currentIndex + 1], newLayers[currentIndex]];
        return newLayers;
      }
      return prev;
    });
  };

  const sendBackward = (id: string) => {
    if (!canvas) return;

    const layer = layers.find(layer => layer.id === id);
    if (!layer) return;

    canvas.sendObjectBackwards(layer.object);
    canvas.renderAll();

    // Update layers array to reflect new z-index order
    setLayers(prev => {
      const currentIndex = prev.findIndex(l => l.id === id);
      if (currentIndex > 0) {
        const newLayers = [...prev];
        [newLayers[currentIndex], newLayers[currentIndex - 1]] =
          [newLayers[currentIndex - 1], newLayers[currentIndex]];
        return newLayers;
      }
      return prev;
    });
  };

  return (
    <div className='flex-1 w-full mx-auto px-3 md:px-4'>
      <Image src={'/images/banners/banner_bottom.png'} height={59} width={468} alt='MyStampMaker' className='sm:hidden mt-4 flex-shrink w-full object-contain h-auto' />
      <div className='flex pt-4 2xl:pt-6 gap-4 xl:gap-6 2xl:gap-8'>
        <Image src={'/images/banners/banner_left.png'} height={300} width={88} alt='MyStampMaker' className='hidden lg:block lg:w-14 xl:w-24 2xl:w-32 object-contain h-auto' />
        <div className="flex-1 w-full flex gap-2 lg:gap-4 xl:gap-6 2xl:gap-12 pb-4">
          {/* Left Floating Buttons */}
          <div className={`md:hidden z-40 fixed top-1/2 -translate-y-1/2 ${panelOpen ? '-left-full' : 'left-2'} transition-all duration-500`}>
            <button onClick={() => setPanelOpen(!panelOpen)} className='bg-alpha text-white text-sm -translate-x-1/2 -translate-y-1/2 rounded-b-lg px-4 py-1 shadow-md hover:shadow-xl transition-all duration-200 -rotate-90'>Layers</button>
          </div>
          {/* Right Floating Buttons */}
          <div className={`md:hidden z-40 fixed top-1/2 -translate-y-1/2 ${propertiesOpen ? '-right-full' : 'right-3'} transition-all duration-500`}>
            <button onClick={() => setPropertiesOpen(!propertiesOpen)} className='bg-alpha text-white text-sm translate-x-1/2 -translate-y-1/2 rounded-t-lg px-4 py-1 shadow-md hover:shadow-xl transition-all duration-200 -rotate-90'>Properties</button>
          </div>
          <div className={`w-[12rem] lg:w-[14rem] xl:w-[16rem] 2xl:w-[24rem] fixed z-20 md:left-auto md:top-auto md:relative border drop-shadow-md rounded-2xl bg-white p-4 overflow-y-auto transition-all duration-500 ${panelOpen ? 'left-0 z-50 max-h-[50vh]' : '-left-full'}`}>
            <div className='text-end'> <button onClick={() => setPanelOpen(!panelOpen)} className='md:hidden sticky translate-x-4 -translate-y-4 top-0 right-0 ms-auto text-sm bg-alpha text-white px-3 py-1 hover:bg-alpha/80 transition-colors duration-200'>X</button></div>
            <h2 className='text-lg font-medium text-center border-b-2 border-black -mt-4 md:mt-0 pb-1'>Layers</h2>
            <LayersList
              layers={layers}
              deleteLayer={deleteLayer}
              selectedObject={selectedObject}
              setSelectedObject={setSelectedObject}
              bringForward={bringForward}
              sendBackward={sendBackward}
            />
          </div>
          <div className="flex-1 mx-auto place-items-center border shadow drop-shadow-md rounded-2xl bg-white p-4 flex flex-col gap-6">
            <div className="w-full flex items-center justify-evenly gap-1 lg:gap-3 text-sm">
              <input hidden ref={imageInputRef} type="file" name="image" id="image" accept="image/*" />
              <button className="select-none flex items-center gap-1 border rounded-md px-2 lg:px-1 xl:px-2 py-1 shadow-md hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-200" onClick={addRoundedText}>
                <Image src="/images/icons/text_line.svg" height={20} width={20} alt="Add Inline Text" className="size-6 lg:size-8" />
                <span className='text-[10px] md:text-xs text-start leading-tight flex-shrink break-words'>Rounded Text</span></button>
              <button className="select-none flex items-center gap-1 border rounded-md px-2 lg:px-1 xl:px-2 py-1 shadow-md hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-200" onClick={addInlineText}>
                <Image src="/images/icons/text_round.svg" height={20} width={20} alt="Add Inline Text" className="size-6 lg:size-8" />
                <span className='text-[10px] md:text-xs text-start leading-tight flex-shrink break-words'>Inline Text</span></button>
              <button className="select-none flex items-center gap-1 border rounded-md px-2 lg:px-1 xl:px-2 py-1 shadow-md hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-200" onClick={addShape}>
                <Image src="/images/icons/shape.svg" height={20} width={20} alt="Add Shape" className="size-6 lg:size-8" />
                <span className='text-[10px] md:text-xs text-start leading-tight flex-shrink break-words'>Add Shape</span></button>
              <button className="select-none flex items-center gap-1 border rounded-md px-2 lg:px-1 xl:px-2 py-1 shadow-md hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-200" onClick={addImage}>
                <Image src="/images/icons/image.svg" height={20} width={20} alt="Add Image" className="size-6 lg:size-8" />
                <span className='text-[10px] md:text-xs text-start leading-tight flex-shrink break-words'>Add Image</span></button>
            </div>
            <div id="canvas-container" className="flex items-center justify-center overflow-hidden relative aspect-square size-[80vw] md:size-[38vw] lg:size-[28vw] xl:size-[24vw] 2xl:size-[26vw]">
              <div className="absolute inset-0 bg-[url('/images/canvas-grid.svg')] bg-repeat bg-center" />
              <canvas ref={canvasRef} />
            </div>
            <button className="bg-beta text-white rounded-md px-4 py-2 shadow-md hover:shadow-xl transition-all duration-200" onClick={downloadCanvas}>Download</button>

          </div>
          <div className={`w-[12rem] lg:w-[14rem] xl:w-[16rem] 2xl:w-[24rem] fixed z-20 md:right-auto md:top-auto md:relative border drop-shadow-md rounded-2xl bg-white p-4 overflow-y-auto transition-all duration-500 ${propertiesOpen ? 'right-0 z-50 max-h-[50vh]' : '-right-full'}`}>
            <button onClick={() => setPropertiesOpen(!propertiesOpen)} className='md:hidden sticky -translate-x-4 -translate-y-4 top-0 left-0 text-sm bg-alpha text-white px-3 py-1 hover:bg-alpha/80 transition-colors duration-200'>X</button>
            <h2 className='text-lg font-medium text-center border-b-2 border-black -mt-4 md:mt-0 pb-1'>Properties</h2>
            <PropertiesPanel canvas={canvas} selectedObject={selectedObject} objectProperties={objectProperties} setObjectProperties={setObjectProperties} setSelectedObject={setSelectedObject} />
          </div>
        </div>
        <Image src={'/images/banners/banner_left.png'} height={300} width={88} alt='MyStampMaker' className='hidden lg:block lg:w-14 xl:w-24 2xl:w-32 object-contain h-auto' />
      </div>
      <div className='sm:w-[calc(100%-12rem)] md:w-[calc(100%-14rem)] lg:w-[calc(100%-18rem)] mx-auto grid sm:grid-cols-2 gap-2 2xl:gap-10'>
        <Image src={'/images/banners/banner_bottom.png'} height={59} width={468} alt='MyStampMaker' className='flex-shrink w-full object-contain h-auto' />
        <Image src={'/images/banners/banner_bottom.png'} height={59} width={468} alt='MyStampMaker' className='flex-shrink hidden sm:block w-full object-contain h-auto' />
      </div>
    </div>
  )
}
