import React from 'react'
import { LayerObject } from './CanvasWrapper';
import { FabricObject } from 'fabric';
import Image from 'next/image';

interface Props {
    layers: LayerObject[];
    deleteLayer: (id: string) => void;
    selectedObject: FabricObject | null;
    setSelectedObject: (object: FabricObject) => void;
    bringForward: (id: string) => void;
    sendBackward: (id: string) => void;
}

export default function LayersList({ layers, deleteLayer, selectedObject, setSelectedObject, bringForward, sendBackward }: Props) {
    return (
        <div className='flex flex-col gap-2 mt-3'>
            {
                layers.length === 0 && (
                    <div className='px-2 py-1 flex flex-col items-center justify-center'>
                        <h6 className='select-none font-medium text-xs text-slate-500'>No layers</h6>
                    </div>
                )
            }
            {layers.slice().reverse().map((layer, index) => (
                <div key={layer.id} className={`px-2 py-1 flex flex-col gap-1 border rounded-md ${selectedObject === layer.object ? 'border-black/70 shadow' : 'border-slate-200'} transition-all duration-200`}>
                    <h6 onClick={() => setSelectedObject(layer.object)} className='select-none font-medium text-xs text-alpha border-b pb-0.5 cursor-pointer'>{layer.name}</h6>
                    <div className='flex items-center justify-between gap-2'>
                        <button className='select-none flex items-center gap-1 text-[#ff8800] text-xs border rounded px-1 py-0 hover:bg-slate-100 transition-colors duration-200' onClick={() => deleteLayer(layer.id)}>
                            <span className='text-alpha text-[10px]'>Delete</span>
                            <span className='font-[Comic Sans MS] font-bold text-[10px]'>X</span>
                        </button>
                        <div className="flex items-center gap-1">
                            <button className='select-none text-xs border px-0.5 rounded hover:bg-slate-100 transition-colors duration-200' onClick={() => bringForward(layer.id)}>
                                <Image src={'/images/arrow.svg'} height={16} width={16} alt='up' />
                            </button>
                            <button className='select-none text-xs border px-0.5 rounded hover:bg-slate-100 transition-colors duration-200' onClick={() => sendBackward(layer.id)}>
                                <Image src={'/images/arrow.svg'} className='rotate-180' height={16} width={16} alt='up' />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
