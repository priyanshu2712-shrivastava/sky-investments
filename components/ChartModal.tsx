'use client';

import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface DataPoint {
    name: string;
    value: number;
}

interface ChartModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { title: string; type: string; data: DataPoint[] }) => void;
    initialData?: { title: string; type: string; data: DataPoint[] };
}

export default function ChartModal({ isOpen, onClose, onSave, initialData }: ChartModalProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [type, setType] = useState(initialData?.type || 'bar');
    const [dataPoints, setDataPoints] = useState<DataPoint[]>(
        initialData?.data || [{ name: '', value: 0 }]
    );

    if (!isOpen) return null;

    const addDataPoint = () => {
        setDataPoints([...dataPoints, { name: '', value: 0 }]);
    };

    const removeDataPoint = (index: number) => {
        const newDataPoints = dataPoints.filter((_, i) => i !== index);
        setDataPoints(newDataPoints.length ? newDataPoints : [{ name: '', value: 0 }]);
    };

    const updateDataPoint = (index: number, field: keyof DataPoint, value: string | number) => {
        const newDataPoints = [...dataPoints];
        if (field === 'value') {
            newDataPoints[index][field] = Number(value) || 0;
        } else {
            newDataPoints[index][field] = String(value);
        }
        setDataPoints(newDataPoints);
    };

    const handleSave = () => {
        if (!title.trim()) {
            alert('Please enter a chart title');
            return;
        }
        const filteredData = dataPoints.filter(p => p.name.trim() !== '');
        if (filteredData.length === 0) {
            alert('Please add at least one data point with a name');
            return;
        }
        onSave({ title, type, data: filteredData });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="text-lg font-semibold text-gray-900">Configure Chart</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto flex-1">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Chart Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Market Share 2024"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>

                    {/* Chart Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Chart Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                        >
                            <option value="bar">Bar Chart</option>
                            <option value="line">Line Chart</option>
                            <option value="area">Area Chart</option>
                            <option value="pie">Pie Chart</option>
                        </select>
                    </div>

                    {/* Data Points */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">Data Points</label>
                            <button
                                type="button"
                                onClick={addDataPoint}
                                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                            >
                                <Plus size={14} /> Add Row
                            </button>
                        </div>
                        <div className="space-y-2">
                            {dataPoints.map((point, index) => (
                                <div key={index} className="flex gap-2 items-center group">
                                    <input
                                        type="text"
                                        value={point.name}
                                        onChange={(e) => updateDataPoint(index, 'name', e.target.value)}
                                        placeholder="Label (e.g. Jan)"
                                        className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    />
                                    <input
                                        type="number"
                                        value={point.value}
                                        onChange={(e) => updateDataPoint(index, 'value', e.target.value)}
                                        placeholder="Value"
                                        className="w-24 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    />
                                    <button
                                        onClick={() => removeDataPoint(index)}
                                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                        title="Remove row"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                    >
                        Insert Chart
                    </button>
                </div>
            </div>
        </div>
    );
}
