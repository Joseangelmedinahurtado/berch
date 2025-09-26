import React, { useState, useMemo } from 'react';
import { Plus, Trash2, FileText, AlertTriangle, Target, TrendingUp, CheckCircle, X, Save, Edit, ArrowLeft, HelpCircle, Upload, ArrowUpDown } from 'lucide-react';

// --- UPDATED: Header Component with corrected logo link and improved layout ---
const AppHeader = () => (
    <div className="grid grid-cols-12 gap-px items-stretch border border-gray-300 rounded-lg overflow-hidden bg-gray-300 mb-8 shadow-sm">
        <div className="col-span-12 sm:col-span-3 text-center bg-white p-3 flex items-center justify-center">
            {/* --- FIX: Replaced broken image link with the new one provided --- */}
            <img 
                src="https://cdnprodwpv2.avantassessment.com/wp-content/uploads/Colegio-Berchmans-logo-1.webp" 
                alt="Logo Colegio Berchmans" 
                className="h-16 object-contain"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x60/FFFFFF/000000?text=Logo'; }}
            />
        </div>
        <div className="col-span-12 sm:col-span-6 text-center bg-yellow-50 p-3 flex items-center justify-center">
            <h2 className="text-xl font-bold text-green-800 leading-tight">IDENTIFICACIÓN Y CONTROL DE ACCIONES DE MEJORA</h2>
        </div>
        <div className="col-span-12 sm:col-span-3 text-center bg-white p-3 flex flex-col justify-center space-y-2">
            <div className="border border-gray-300 p-2 rounded">
                <p className="font-semibold text-gray-700 text-sm">ADO-03-R03</p>
            </div>
            <div className="border border-gray-300 p-2 rounded">
                <p className="font-semibold text-gray-700 text-sm">V3</p>
            </div>
        </div>
    </div>
);

// --- NEW: Help Modal Component ---
const HelpModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in-fast">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <HelpCircle className="text-green-700" />
                        Manual de Usuario
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto space-y-6">
                    <p className="text-gray-600">¡Bienvenido! Esta guía te ayudará a utilizar la herramienta para registrar y gestionar las acciones de mejora de manera eficiente.</p>
                    
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">1. Vista Principal: Listado de Acciones</h3>
                        <p>Al abrir la aplicación, verás la pantalla principal con el listado de todas las acciones que se han creado.</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li><strong className="font-semibold text-gray-800">Crear Nueva Acción:</strong> En la parte superior, encontrarás el botón para empezar a registrar una nueva acción correctiva, preventiva o un plan de mejora.</li>
                            <li><strong className="font-semibold text-gray-800">Tabla de Acciones:</strong> El listado te muestra un resumen de cada acción, incluyendo su ID, tipo, fecha y proceso asociado.</li>
                            <li><strong className="font-semibold text-gray-800">Visualizar (👁️), Editar (✏️) y Eliminar (🗑️):</strong> A la derecha de cada acción, tienes íconos para ver los detalles, modificar o borrar un registro.</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">2. Creación y Edición de una Acción</h3>
                        <p>Al crear o editar una acción, accederás a un formulario guiado por pasos.</p>
                         <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li><strong className="font-semibold text-gray-800">Navegación por Pasos:</strong> En la parte superior, verás una barra de progreso. Puedes hacer clic en cualquier paso o usar los botones "Anterior" y "Siguiente".</li>
                            <li><strong className="font-semibold text-gray-800">Volver al Listado:</strong> Si deseas cancelar, haz clic en "← Volver al listado".</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">3. Descripción de las Hojas del Formulario</h3>
                        <ol className="list-decimal list-inside space-y-3 text-gray-600">
                            <li><strong className="font-semibold text-gray-800">Información General:</strong> Define el tipo, ámbito, proceso, fecha y la fuente única de la acción.</li>
                            <li><strong className="font-semibold text-gray-800">Descripción NC (No Conformidad):</strong> Detalla el problema y adjunta archivos de soporte si es necesario.</li>
                            <li><strong className="font-semibold text-gray-800">Acción Directa:</strong> Registra las acciones inmediatas y su seguimiento específico.</li>
                            <li><strong className="font-semibold text-gray-800">Análisis de Causas:</strong> Usa el Diagrama de Ishikawa y completa los "5 Porqués" (mínimo 3, máximo 5). <strong className="text-red-600">Es obligatorio llenar todos los campos de "porqués" para poder guardar.</strong></li>
                            <li><strong className="font-semibold text-gray-800">Plan de Mejora:</strong> Define el plan a largo plazo y su seguimiento.</li>
                            <li><strong className="font-semibold text-gray-800">Riesgos y Oportunidades:</strong> Es la última hoja. Aquí analizas los posibles riesgos y oportunidades y registras el cierre final. En esta hoja encontrarás el botón para **Guardar Acción**.</li>
                        </ol>
                    </div>
                </div>
                 <div className="p-4 bg-gray-50 border-t text-right">
                    <button onClick={onClose} className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition-colors">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Helper Components for each step ---
// These components are defined outside the main component to prevent them from
// being recreated on every render, which avoids issues like input fields losing focus.

const InformacionGeneral = ({ formData, updateForm }) => (
    <div className="space-y-6 animate-fade-in">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">TIPO DE ACCIÓN</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['correctiva', 'directa', 'preventiva', 'planMejora'].map(type => (
                    <label key={type} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-green-50 transition-colors has-[:checked]:bg-green-100 has-[:checked]:border-green-400">
                        <input
                            type="radio"
                            name="tipoAccion"
                            value={type}
                            checked={formData.tipoAccion === type}
                            onChange={(e) => updateForm('tipoAccion', e.target.value)}
                            className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                        />
                        <span className="ml-3 text-sm font-medium text-gray-800">
                            {/* Simple text transformation for better readability */}
                            { {correctiva: 'Correctiva', directa: 'Directa', preventiva: 'Preventiva', planMejora: 'Plan de Mejora'}[type] }
                        </span>
                    </label>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ÁMBITO</label>
                <input
                    type="text"
                    value={formData.ambito}
                    onChange={(e) => updateForm('ambito', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    placeholder="Ej: FORMACIÓN INTEGRAL"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PROCESO</label>
                <input
                    type="text"
                    value={formData.proceso}
                    onChange={(e) => updateForm('proceso', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    placeholder="Ej: ENSEÑANZA Y APRENDIZAJE"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">FECHA</label>
                <input
                    type="month"
                    value={formData.fecha}
                    onChange={(e) => updateForm('fecha', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">ACCIÓN DE MEJORA DETECTADA EN:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* --- UPDATED: Changed from checkbox to radio for single selection --- */}
                {[
                    { key: 'revisionDireccion', label: 'Revisión Dirección' },
                    { key: 'auditoriaInterna', label: 'Auditoría Interna' },
                    { key: 'auditoriaExterna', label: 'Auditoría Externa' },
                    { key: 'vozCliente', label: 'Voz del cliente' },
                    { key: 'autocontrolProceso', label: 'Autocontrol del Proceso' },
                ].map(source => (
                    <label key={source.key} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-green-50 transition-colors has-[:checked]:bg-green-100 has-[:checked]:border-green-400">
                        <input
                            type="radio"
                            name="fuente"
                            value={source.key}
                            checked={formData.fuente === source.key}
                            onChange={(e) => updateForm('fuente', e.target.value)}
                            className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                        />
                        <span className="ml-3 text-sm font-medium text-gray-800">{source.label}</span>
                    </label>
                ))}
            </div>
        </div>
    </div>
);

const DescripcionNC = ({ formData, updateNestedForm }) => (
    <div className="space-y-4 animate-fade-in">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción (no conformidad/plan de mejora/no conformidad potencial)</label>
            <textarea
                value={formData.descripcion.descripcionNC}
                onChange={(e) => updateNestedForm('descripcion', 'descripcionNC', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md h-32 shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Descripción detallada de la no conformidad..."
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Archivo de Soporte (Opcional)</label>
            <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer transition-colors shadow-sm">
                    <Upload size={16} />
                    <span>Seleccionar archivo</span>
                    <input
                        type="file"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                updateNestedForm('descripcion', 'supportFile', e.target.files[0].name)
                            }
                        }}
                        className="hidden"
                    />
                </label>
                {formData.descripcion.supportFile && (
                    <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm">
                        <span>{formData.descripcion.supportFile}</span>
                        <button 
                            onClick={() => updateNestedForm('descripcion', 'supportFile', null)}
                            className="text-green-800 hover:text-red-600"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre/Firma del responsable</label>
            <input
                type="text"
                value={formData.descripcion.responsable}
                onChange={(e) => updateNestedForm('descripcion', 'responsable', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Nombre del responsable"
            />
        </div>
    </div>
);

const AccionDirecta = ({ formData, addItemToArray, removeItemFromArray, updateArrayItem }) => (
    <div className="space-y-8 animate-fade-in">
        {/* Section for Acciones Directas */}
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">Acciones Directas</h3>
                <button
                    onClick={() => addItemToArray('accionDirecta', { fecha: '', tratamiento: '', solucion: '', responsable: '' })}
                    className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors shadow"
                >
                    <Plus size={16} /> Agregar Acción
                </button>
            </div>
            {formData.accionDirecta.map((accion, index) => {
                const isAccionIncomplete = !accion.fecha || !accion.tratamiento || !accion.solucion || !accion.responsable;
                return (
                    <div key={index} className="border p-4 rounded-lg bg-gray-50 shadow-sm animate-fade-in">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className={`font-semibold ${isAccionIncomplete ? 'text-red-600' : 'text-gray-700'}`}>Acción {index + 1}</h4>
                            <button
                                onClick={() => removeItemFromArray('accionDirecta', index)}
                                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                                aria-label={`Eliminar Acción ${index + 1}`}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                                <input
                                    type="month"
                                    value={accion.fecha}
                                    onChange={(e) => updateArrayItem('accionDirecta', index, 'fecha', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Responsable</label>
                                <input
                                    type="text"
                                    value={accion.responsable}
                                    onChange={(e) => updateArrayItem('accionDirecta', index, 'responsable', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                    placeholder="Responsable de la acción"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tratamiento (Acciones a realizar)</label>
                            <textarea
                                value={accion.tratamiento}
                                onChange={(e) => updateArrayItem('accionDirecta', index, 'tratamiento', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md h-24 shadow-sm"
                                placeholder="Describe las acciones a realizar..."
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Solución (Acciones Ejecutadas)</label>
                            <textarea
                                value={accion.solucion}
                                onChange={(e) => updateArrayItem('accionDirecta', index, 'solucion', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md h-24 shadow-sm"
                                placeholder="Describe las acciones ejecutadas..."
                            />
                        </div>
                    </div>
                )
            })}
            {formData.accionDirecta.length === 0 && (
                <div className="text-center text-gray-500 py-8 border-2 border-dashed rounded-lg">
                    No hay acciones directas. Haga clic en "Agregar Acción" para comenzar.
                </div>
            )}
        </div>

        {/* Section for Seguimiento de Acciones Ejecutadas */}
        <div className="space-y-4 pt-8 border-t">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Seguimiento al resultado de las Acciones Ejecutadas</h3>
                <button onClick={() => addItemToArray('seguimientoAcciones', { accionId: '', resultado: '', fecha: '', responsable: ''})} className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700">
                    <Plus size={16} /> Agregar Seguimiento
                </button>
            </div>
            {formData.seguimientoAcciones.map((seguimiento, index) => (
                <div key={index} className="border p-4 rounded-lg bg-blue-50 mb-3 animate-fade-in">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Seguimiento {index + 1}</h4>
                        <button onClick={() => removeItemFromArray('seguimientoAcciones', index)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Acción Directa Relacionada</label>
                            <select
                                value={seguimiento.accionId}
                                onChange={(e) => updateArrayItem('seguimientoAcciones', index, 'accionId', e.target.value)}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="">Seleccione una acción</option>
                                {formData.accionDirecta.map((accion, i) => (
                                    <option key={i} value={i}>Acción {i + 1}: {accion.tratamiento.substring(0, 30)}...</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Fecha de Seguimiento</label>
                            <input
                                type="month"
                                value={seguimiento.fecha}
                                onChange={(e) => updateArrayItem('seguimientoAcciones', index, 'fecha', e.target.value)}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Responsable</label>
                            <input
                                type="text"
                                value={seguimiento.responsable}
                                onChange={(e) => updateArrayItem('seguimientoAcciones', index, 'responsable', e.target.value)}
                                className="w-full p-2 border rounded-md"
                                placeholder="Responsable del seguimiento"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Resultado</label>
                        <textarea
                            value={seguimiento.resultado}
                            onChange={(e) => updateArrayItem('seguimientoAcciones', index, 'resultado', e.target.value)}
                            className="w-full p-2 border rounded-md h-24"
                            placeholder="Describe el resultado del seguimiento..."
                        />
                    </div>
                </div>
            ))}
        </div>
    </div>
);


const AnalisisCausas = ({ formData, updateNestedForm }) => {
    const { categorias, cincoPorque, causaRaiz } = formData.analisisCausas;
    const [newSubCausas, setNewSubCausas] = useState({
        Medidas: '', Métodos: '', Personas: '', Materiales: '', 'Medio Ambiente': ''
    });

    const addSubCausa = (categoria) => {
        if (newSubCausas[categoria].trim() === '') return;
        const newCategorias = {
            ...categorias,
            [categoria]: [...categorias[categoria], newSubCausas[categoria]]
        };
        updateNestedForm('analisisCausas', 'categorias', newCategorias);
        setNewSubCausas(prev => ({ ...prev, [categoria]: '' }));
    };

    const removeSubCausa = (categoria, index) => {
        const newCategorias = {
            ...categorias,
            [categoria]: categorias[categoria].filter((_, i) => i !== index)
        };
        updateNestedForm('analisisCausas', 'categorias', newCategorias);
    };

    const addPorque = () => {
        if (cincoPorque.length < 5) {
            const newPorque = [...cincoPorque, ''];
            updateNestedForm('analisisCausas', 'cincoPorque', newPorque);
        }
    };
    
    const updatePorque = (index, value) => {
        const newPorque = [...cincoPorque];
        newPorque[index] = value;
        updateNestedForm('analisisCausas', 'cincoPorque', newPorque);
    };

    const removePorque = (index) => {
        if (cincoPorque.length > 3) {
            const newPorque = cincoPorque.filter((_, i) => i !== index);
            updateNestedForm('analisisCausas', 'cincoPorque', newPorque);
        }
    };

    const FishboneDiagram = ({ categorias, efecto }) => {
        const hasCauses = Object.values(categorias).some(arr => arr.length > 0);
        if (!hasCauses) {
            return (
                <div className="text-center text-gray-400 py-8 border-2 border-dashed rounded-lg bg-gray-50">
                    <p>El diagrama de espina de pescado aparecerá aquí.</p>
                    <p className="text-sm">Agregue una sub-causa para comenzar a visualizar.</p>
                </div>
            );
        }
    
        const width = 1200;
        const height = 700;
        const midY = height / 2;
        const headWidth = 180;
        const headX = width - headWidth - 20;

        const mainBones = [
            { name: 'Medidas', x: 200, angle: -45 },
            { name: 'Métodos', x: 500, angle: -45 },
            { name: 'Materiales', x: 800, angle: -45 },
            { name: 'Personas', x: 200, angle: 45 },
            { name: 'Medio Ambiente', x: 500, angle: 45 },
        ];
    
        return (
            <div className="w-full overflow-x-auto p-4 bg-white rounded-lg border">
                <svg viewBox={`0 0 ${width} ${height}`} className={`min-w-[${width}px]`}>
                    {/* Spine */}
                    <line x1="50" y1={midY} x2={headX} y2={midY} stroke="#4a5568" strokeWidth="3" />
    
                    {/* Head (Effect/Root Cause) */}
                    <foreignObject x={headX} y={midY - (height / 4)} width={headWidth} height={height / 2}>
                        <div xmlns="http://www.w3.org/1999/xhtml" className="w-full h-full bg-green-700 rounded-md flex items-center justify-center p-3 text-white text-center text-sm font-bold" style={{wordWrap: 'break-word', whiteSpace: 'normal'}}>
                            {efecto || 'Descripción de la No Conformidad'}
                        </div>
                    </foreignObject>
    
                    {/* Main Bones */}
                    {mainBones.map(bone => {
                        const subCausas = categorias[bone.name] || [];
                        const isTop = bone.angle < 0;
                        const boneLength = 300;
                        const endX = bone.x + boneLength * Math.cos(bone.angle * Math.PI / 180);
                        const endY = midY + boneLength * Math.sin(bone.angle * Math.PI / 180);

                        return (
                            <g key={bone.name}>
                                {/* Main bone line */}
                                <line x1={bone.x} y1={midY} x2={endX} y2={endY} stroke="#718096" strokeWidth="2" />
                                
                                {/* Main bone title */}
                                <text x={endX + (isTop ? -10 : 10)} y={endY + (isTop ? -15 : 25)} textAnchor={isTop ? "end" : "start"} fontWeight="bold" fontSize="16px" fill="#374151">{bone.name}</text>
                                
                                {/* Sub-causes */}
                                {subCausas.map((subCausa, index) => {
                                    const pos = (index + 0.5) / (subCausas.length);
                                    const subX1 = bone.x + (endX - bone.x) * pos;
                                    const subY1 = midY + (endY - midY) * pos;
                                    const subX2 = subX1 + 80;
                                    const subY2 = subY1;

                                    return (
                                        <g key={index}>
                                            <line x1={subX1} y1={subY1} x2={subX2} y2={subY2} stroke="#7f8c8d" strokeWidth="1.5" />
                                            <foreignObject x={subX2 + 5} y={subY2 - 30} width="150" height="60">
                                                <div xmlns="http://www.w3.org/1999/xhtml" className="text-xs text-gray-700 p-1" style={{wordWrap: 'break-word', whiteSpace: 'normal', lineHeight: '1.2'}}>
                                                    {subCausa}
                                                </div>
                                            </foreignObject>
                                        </g>
                                    );
                                })}
                            </g>
                        );
                    })}
                </svg>
            </div>
        );
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h3 className="text-lg font-medium mb-3">Diagrama de Espina de Pescado (Ishikawa)</h3>
                <FishboneDiagram categorias={categorias} efecto={formData.descripcion.descripcionNC || 'Descripción de la No Conformidad'} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(categorias).map(cat => (
                    <div key={cat} className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-3">{cat}</h4>
                        <div className="space-y-2">
                            {categorias[cat].map((sub, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                                    <span className="text-sm">{sub}</span>
                                    <button onClick={() => removeSubCausa(cat, index)} className="text-red-500 hover:text-red-700">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 mt-3">
                            <input
                                type="text"
                                value={newSubCausas[cat]}
                                onChange={(e) => setNewSubCausas(prev => ({ ...prev, [cat]: e.target.value }))}
                                className="flex-1 p-2 border rounded-md text-sm"
                                placeholder={`Añadir causa en ${cat}`}
                                onKeyPress={(e) => e.key === 'Enter' && addSubCausa(cat)}
                            />
                            <button onClick={() => addSubCausa(cat)} className="bg-green-700 text-white p-2 rounded-md hover:bg-green-800">
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 5 Whys Analysis Section */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">Análisis de 5 Por Qué</h3>
                    <button onClick={addPorque} disabled={cincoPorque.length >= 5} className="flex items-center gap-2 bg-green-700 text-white px-3 py-2 rounded-lg hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        <Plus size={16} /> Agregar Por Qué
                    </button>
                </div>
                {cincoPorque.map((porque, index) => (
                    <div key={index} className="flex gap-2 mb-2 items-center">
                        <span className="bg-gray-200 px-3 py-2 rounded-md font-medium text-gray-700">
                            Por qué {index + 1}
                        </span>
                        <input
                            type="text"
                            value={porque}
                            onChange={(e) => updatePorque(index, e.target.value)}
                            className="flex-1 p-2 border rounded-md"
                            placeholder="¿Por qué ocurrió esto?"
                        />
                        <button onClick={() => removePorque(index)} disabled={cincoPorque.length <= 3} className="text-red-500 hover:text-red-700 p-2 disabled:text-gray-400 disabled:cursor-not-allowed">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Root Cause Section */}
            <div>
                <label className="block text-lg font-medium mb-2">Causa Raíz</label>
                <textarea
                    value={causaRaiz}
                    onChange={(e) => updateNestedForm('analisisCausas', 'causaRaiz', e.target.value)}
                    className="w-full p-3 border rounded-lg h-24 bg-yellow-50 focus:ring-2 focus:ring-yellow-400"
                    placeholder="Describe la causa raíz identificada..."
                />
            </div>
        </div>
    );
};

// --- UPDATED: PlanMejora now includes Seguimiento de Plan de Mejora ---
const PlanMejora = ({ formData, addItemToArray, removeItemFromArray, updateArrayItem }) => (
    <div className="space-y-8 animate-fade-in">
        {/* Section for Plan de Mejora */}
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Plan de Acción/Plan de Mejora</h3>
                <button
                    onClick={() => addItemToArray('planMejora', { que: '', como: '', fechaImplementacion: '', quien: '', fechaSeguimiento: '' })}
                    className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors shadow"
                >
                    <Plus size={16} /> Agregar Acción
                </button>
            </div>
            {formData.planMejora.map((accion, index) => {
                const isPlanIncomplete = !accion.que || !accion.como || !accion.fechaImplementacion || !accion.quien || !accion.fechaSeguimiento;
                return (
                <div key={index} className="border p-4 rounded-lg bg-gray-50 shadow-sm animate-fade-in">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className={`font-semibold ${isPlanIncomplete ? 'text-red-600' : 'text-gray-700'}`}>Acción de Mejora {index + 1}</h4>
                        <button
                            onClick={() => removeItemFromArray('planMejora', index)}
                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Qué (acción que ataca la causa)</label>
                            <textarea
                                value={accion.que}
                                onChange={(e) => updateArrayItem('planMejora', index, 'que', e.target.value)}
                                className="w-full p-2 border rounded-md h-20"
                                placeholder="¿Qué acción se va a realizar?"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Cómo</label>
                            <textarea
                                value={accion.como}
                                onChange={(e) => updateArrayItem('planMejora', index, 'como', e.target.value)}
                                className="w-full p-2 border rounded-md h-20"
                                placeholder="¿Cómo se va a implementar?"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Fecha de Implementación</label>
                            <input
                                type="month"
                                value={accion.fechaImplementacion}
                                onChange={(e) => updateArrayItem('planMejora', index, 'fechaImplementacion', e.target.value)}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Quién</label>
                            <input
                                type="text"
                                value={accion.quien}
                                onChange={(e) => updateArrayItem('planMejora', index, 'quien', e.target.value)}
                                className="w-full p-2 border rounded-md"
                                placeholder="Responsable"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Fecha de Seguimiento</label>
                            <input
                                type="month"
                                value={accion.fechaSeguimiento}
                                onChange={(e) => updateArrayItem('planMejora', index, 'fechaSeguimiento', e.target.value)}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                    </div>
                </div>
            )})}
            {formData.planMejora.length === 0 && (
                <div className="text-center text-gray-500 py-8 border-2 border-dashed rounded-lg">
                    No hay acciones de mejora. Haga clic en "Agregar Acción" para comenzar.
                </div>
            )}
        </div>

        {/* Section for Seguimiento de Plan de Mejora */}
        <div className="space-y-4 pt-8 border-t">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Seguimiento al plan de acción/plan de mejora</h3>
                <button onClick={() => addItemToArray('seguimientoPlan', { planId: '', resultado: '', fecha: '', responsable: ''})} className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700">
                    <Plus size={16} /> Agregar Seguimiento
                </button>
            </div>
            {formData.seguimientoPlan.map((seguimiento, index) => {
                const relatedPlan = formData.planMejora[seguimiento.planId];
                return (
                <div key={index} className="border p-4 rounded-lg bg-blue-50 mb-3 animate-fade-in">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Seguimiento Plan {index + 1}</h4>
                        <button onClick={() => removeItemFromArray('seguimientoPlan', index)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Plan de Mejora Relacionado</label>
                        <select
                            value={seguimiento.planId}
                            onChange={(e) => updateArrayItem('seguimientoPlan', index, 'planId', e.target.value)}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="">Seleccione un plan</option>
                            {formData.planMejora.map((plan, i) => (
                                <option key={i} value={i}>Acción de Mejora {i + 1}: {plan.que.substring(0, 40)}...</option>
                            ))}
                        </select>
                    </div>

                    {relatedPlan && (
                        <div className="mb-4 p-3 bg-gray-100 rounded-md">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Cómo se implementará (del plan seleccionado):</label>
                            <p className="text-sm text-gray-800">{relatedPlan.como}</p>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Fecha de Seguimiento</label>
                            <input
                                type="month"
                                value={seguimiento.fecha}
                                onChange={(e) => updateArrayItem('seguimientoPlan', index, 'fecha', e.target.value)}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Responsable</label>
                            <input
                                type="text"
                                value={seguimiento.responsable}
                                onChange={(e) => updateArrayItem('seguimientoPlan', index, 'responsable', e.target.value)}
                                className="w-full p-2 border rounded-md"
                                placeholder="Responsable del seguimiento"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Resultado</label>
                        <textarea
                            value={seguimiento.resultado}
                            onChange={(e) => updateArrayItem('seguimientoPlan', index, 'resultado', e.target.value)}
                            className="w-full p-2 border rounded-md h-24"
                            placeholder="Describe el resultado del seguimiento del plan..."
                        />
                    </div>
                </div>
            )})}
        </div>
    </div>
);


// --- UPDATED: Component for the last step now includes the Save button ---
const AnalisisRiesgos = ({ formData, updateForm, handleSave, editingId, isSaveDisabled, updateNestedForm }) => (
    <div className="space-y-4 animate-fade-in">
        <h3 className="text-lg font-medium">Análisis de la acción correctiva desde los riesgos y las oportunidades</h3>
        <textarea
            value={formData.analisisRiesgos}
            onChange={(e) => updateForm('analisisRiesgos', e.target.value)}
            className="w-full p-3 border rounded-lg h-32 shadow-sm"
            placeholder="Analiza los riesgos y oportunidades identificados..."
        />
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">Guía para el análisis:</h4>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>¿Se identifican riesgos derivados de la no conformidad?</li>
                <li>¿Existen oportunidades de mejora identificadas?</li>
                <li>¿Las acciones implementadas generan nuevos riesgos?</li>
                <li>¿Se establecen acciones preventivas para evitar recurrencia?</li>
            </ul>
        </div>

        {/* --- NEW: Final Closure Section --- */}
        <div className="space-y-4 pt-8 border-t">
            <h3 className="text-lg font-medium text-gray-800">Cierre y Verificación de la Eficacia</h3>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Eficacia</label>
                <div className="flex gap-4">
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-green-50 transition-colors has-[:checked]:bg-green-100 has-[:checked]:border-green-400">
                        <input type="radio" name="eficacia" value="si" checked={formData.cierre.eficacia === 'si'} onChange={(e) => updateNestedForm('cierre', 'eficacia', e.target.value)} className="h-4 w-4 text-green-600" />
                        <span className="ml-2">Sí</span>
                    </label>
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-red-50 transition-colors has-[:checked]:bg-red-100 has-[:checked]:border-red-400">
                        <input type="radio" name="eficacia" value="no" checked={formData.cierre.eficacia === 'no'} onChange={(e) => updateNestedForm('cierre', 'eficacia', e.target.value)} className="h-4 w-4 text-red-600" />
                        <span className="ml-2">No</span>
                    </label>
                </div>
            </div>
            {formData.cierre.eficacia && (
                 <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Comentario de Eficacia</label>
                     <textarea
                        value={formData.cierre.comentarioEficacia}
                        onChange={(e) => updateNestedForm('cierre', 'comentarioEficacia', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md h-24 shadow-sm"
                        placeholder="Explique por qué la acción fue o no fue eficaz..."
                    />
                </div>
            )}
            <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Lección Aprendida</label>
                 <textarea
                    value={formData.cierre.leccionAprendida}
                    onChange={(e) => updateNestedForm('cierre', 'leccionAprendida', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md h-24 shadow-sm"
                    placeholder="Describe la lección aprendida..."
                />
            </div>
            <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Resultado Final</label>
                 <textarea
                    value={formData.cierre.resultadoFinal}
                    onChange={(e) => updateNestedForm('cierre', 'resultadoFinal', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md h-24 shadow-sm"
                    placeholder="Describe el resultado final de la acción..."
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Responsable del Cierre</label>
                    <input
                        type="text"
                        value={formData.cierre.responsable}
                        onChange={(e) => updateNestedForm('cierre', 'responsable', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="Nombre del responsable"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Cierre</label>
                    <input
                        type="month"
                        value={formData.cierre.fecha}
                        onChange={(e) => updateNestedForm('cierre', 'fecha', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
            </div>
        </div>

        <div className="flex flex-col items-end pt-6 border-t mt-6">
            <button 
                onClick={handleSave} 
                disabled={isSaveDisabled}
                className="flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors shadow-lg text-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                <Save size={20} /> {editingId ? 'Actualizar Acción' : 'Guardar Acción'}
            </button>
            {isSaveDisabled && (
                <p className="text-red-600 text-sm mt-2">Debe completar todos los campos de "5 Porqués" para poder guardar.</p>
            )}
        </div>
    </div>
);


// Main Application Component
const SistemaAccionesCorrectivas = () => {
    const [view, setView] = useState('list');
    const [currentStep, setCurrentStep] = useState(0);
    const [listaAcciones, setListaAcciones] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    
    const initialFormData = {
        id: null,
        tipoAccion: 'correctiva',
        ambito: '',
        proceso: '',
        fecha: new Date().toISOString().split('T')[0].substring(0, 7),
        fuente: '', // --- UPDATED: Changed to a string for single selection
        descripcion: {
            descripcionNC: '',
            responsable: '',
            supportFile: null
        },
        accionDirecta: [],
        analisisCausas: {
            categorias: {
                Medidas: [],
                Métodos: [],
                Personas: [],
                Materiales: [],
                'Medio Ambiente': []
            },
            cincoPorque: ['', '', ''], // --- UPDATED: Starts with 3 "whys"
            causaRaiz: ''
        },
        planMejora: [],
        seguimientoAcciones: [],
        seguimientoPlan: [],
        analisisRiesgos: '',
        cierre: {
            resultadoFinal: '',
            fecha: '',
            responsable: '',
            leccionAprendida: '',
            eficacia: '',
            comentarioEficacia: ''
        }
    };

    const [formData, setFormData] = useState(initialFormData);
    
    const [modal, setModal] = useState({
        isOpen: false,
        message: '',
        type: 'info'
    });

    // --- UPDATED: Steps reordered and Seguimiento removed ---
    const steps = [
        { id: 0, title: 'Información General', icon: FileText },
        { id: 1, title: 'Descripción NC', icon: AlertTriangle },
        { id: 2, title: 'Acción Directa', icon: Target },
        { id: 3, title: 'Análisis de Causas', icon: TrendingUp },
        { id: 4, title: 'Plan de Mejora', icon: CheckCircle },
        { id: 5, title: 'Riesgos y Oportunidades', icon: AlertTriangle }
    ];

    // --- State Management Helpers ---

    const updateForm = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

    const updateNestedForm = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    };

    const addItemToArray = (arrayName, newItem) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], newItem]
        }));
    };

    const removeItemFromArray = (arrayName, index) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].filter((_, i) => i !== index)
        }));
    };

    const updateArrayItem = (arrayName, index, field, value) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    // --- Data Handlers ---

    const handleSave = () => {
        if (isSaveDisabled) {
            setModal({ isOpen: true, message: 'Por favor, complete todos los campos de "5 Porqués" antes de guardar.', type: 'error' });
            return;
        }

        if (editingId !== null) {
            setListaAcciones(listaAcciones.map(accion => 
                accion.id === editingId ? { ...formData, id: editingId } : accion
            ));
            setModal({ isOpen: true, message: 'Acción actualizada correctamente.', type: 'success' });
        } else {
            const newAction = { ...formData, id: Date.now() };
            setListaAcciones([...listaAcciones, newAction]);
            setModal({ isOpen: true, message: 'Acción guardada correctamente.', type: 'success' });
        }
        setFormData(initialFormData);
        setEditingId(null);
        setCurrentStep(0);
        setView('list');
    };

    const handleEdit = (id) => {
        const actionToEdit = listaAcciones.find(accion => accion.id === id);
        if (actionToEdit) {
            setFormData(actionToEdit);
            setEditingId(id);
            setCurrentStep(0);
            setView('form');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    const handleCreateNew = () => {
        setFormData(initialFormData);
        setEditingId(null);
        setCurrentStep(0);
        setView('form');
    };

    const handleDelete = (id) => {
        setListaAcciones(listaAcciones.filter(accion => accion.id !== id));
        setModal({ isOpen: true, message: 'Acción eliminada.', type: 'info' });
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedAcciones = useMemo(() => {
        let sortableItems = [...listaAcciones];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                const keyA = sortConfig.key === 'responsable' ? a.descripcion.responsable : a[sortConfig.key];
                const keyB = sortConfig.key === 'responsable' ? b.descripcion.responsable : b[sortConfig.key];

                if (keyA < keyB) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (keyA > keyB) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [listaAcciones, sortConfig]);
    
    // --- NEW: Validation logic for the save button ---
    const isSaveDisabled = formData.analisisCausas.cincoPorque.some(porque => porque.trim() === '');

    // --- Render Logic ---

    const renderCurrentStep = () => {
        const props = { formData, updateForm, updateNestedForm, addItemToArray, removeItemFromArray, updateArrayItem, handleSave, editingId, isSaveDisabled };
        switch (currentStep) {
            case 0: return <InformacionGeneral {...props} />;
            case 1: return <DescripcionNC {...props} />;
            case 2: return <AccionDirecta {...props} />;
            case 3: return <AnalisisCausas {...props} />;
            case 4: return <PlanMejora {...props} />;
            case 5: return <AnalisisRiesgos {...props} />;
            default: return <InformacionGeneral {...props} />;
        }
    };

    const Modal = () => {
        if (!modal.isOpen) return null;

        const modalConfig = {
            success: { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-700', icon: <CheckCircle /> },
            error: { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-700', icon: <AlertTriangle /> },
            info: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-700', icon: <AlertTriangle /> },
        };
        const config = modalConfig[modal.type];

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in-fast">
                <div className={`relative p-6 rounded-lg shadow-xl border-t-4 ${config.bg} ${config.border} ${config.text} flex items-center gap-4`}>
                    <div className="text-2xl">{config.icon}</div>
                    <p>{modal.message}</p>
                    <button onClick={() => setModal({ ...modal, isOpen: false })} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                        <X size={20} />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-slate-200 min-h-screen font-sans">
            <Modal />
            <AppHeader />

            {view === 'list' && (
                <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
                    <div className="flex flex-wrap gap-3 mb-6 border-b pb-6">
                        <button onClick={handleCreateNew} className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors shadow">
                            <Plus size={16} /> Crear Nueva Acción
                        </button>
                    </div>

                    <h2 className="text-2xl font-semibold mb-6 text-white bg-green-700 text-center p-4 rounded-lg">
                        Listado de Acciones Creadas
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('id')}><div className="flex items-center gap-2">ID <ArrowUpDown size={14}/></div></th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('tipoAccion')}><div className="flex items-center gap-2">Tipo <ArrowUpDown size={14}/></div></th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('fecha')}><div className="flex items-center gap-2">Fecha <ArrowUpDown size={14}/></div></th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('proceso')}><div className="flex items-center gap-2">Proceso <ArrowUpDown size={14}/></div></th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('responsable')}><div className="flex items-center gap-2">Responsable <ArrowUpDown size={14}/></div></th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sortedAcciones.map(accion => (
                                    <tr key={accion.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{accion.id.toString().slice(-5)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{accion.tipoAccion}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{accion.fecha}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{accion.proceso}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{accion.descripcion.responsable}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button onClick={() => handleEdit(accion.id)} className="text-yellow-600 hover:text-yellow-900 mr-4" aria-label="Editar"><Edit size={16}/></button>
                                            <button onClick={() => handleDelete(accion.id)} className="text-red-600 hover:text-red-900" aria-label="Eliminar"><Trash2 size={16}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {listaAcciones.length === 0 && (
                            <p className="text-center text-gray-500 py-8">No hay acciones guardadas.</p>
                        )}
                    </div>
                </div>
            )}

            {view === 'form' && (
                <div className="animate-fade-in">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <button onClick={() => setView('list')} className="flex items-center gap-2 text-sm text-green-700 hover:underline mb-4">
                            <ArrowLeft size={16} />
                            Volver al listado
                        </button>
                        {/* --- UPDATED: Stepper now wraps on smaller screens --- */}
                        <div className="flex flex-nowrap items-center justify-between gap-x-1 md:gap-x-2 mb-8 pb-4 border-b">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                const isCompleted = currentStep > step.id;
                                const isActive = currentStep === step.id;
                                return (
                                    <React.Fragment key={step.id}>
                                        <button
                                            onClick={() => setCurrentStep(step.id)}
                                            className={`flex items-center gap-1.5 px-2 py-1 md:px-2.5 md:py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                                                isActive ? 'bg-green-700 text-white shadow-md' : 
                                                isCompleted ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
                                                'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                        >
                                            <Icon size={14} />
                                            <span className="hidden sm:inline">{step.title}</span>
                                        </button>
                                        {index < steps.length - 1 && (
                                            <div className={`flex-grow h-1 mx-1 rounded-full transition-colors duration-500 ${
                                                isCompleted ? 'bg-green-400' : 'bg-gray-200'
                                            }`} />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
                        <h2 className="text-2xl font-semibold mb-6 text-white bg-green-700 text-center p-4 rounded-lg">
                            {editingId ? `Editando Acción #${editingId.toString().slice(-5)}` : 'Crear Nueva Acción'}
                        </h2>
                        
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">{steps[currentStep].title}</h3>
                        {renderCurrentStep()}
                    </div>

                    <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-xl shadow-lg">
                        <button
                            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                            disabled={currentStep === 0}
                            className="px-6 py-2 rounded-lg font-semibold disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                        >
                            Anterior
                        </button>
                        <div className="text-sm text-gray-600">
                            Paso <strong>{currentStep + 1}</strong> de {steps.length}
                        </div>
                        <button
                            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                            disabled={currentStep === steps.length - 1}
                            className="px-6 py-2 rounded-lg font-semibold disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed bg-green-700 text-white hover:bg-green-800 transition-colors"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}
             {/* --- NEW: Floating Help Button --- */}
            <button 
                onClick={() => setIsHelpModalOpen(true)}
                className="fixed bottom-6 right-6 bg-green-700 text-white p-4 rounded-full shadow-lg hover:bg-green-800 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                aria-label="Abrir manual de usuario"
            >
                <HelpCircle size={28} />
            </button>
            <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
        </div>
    );
};

export default SistemaAccionesCorrectivas;