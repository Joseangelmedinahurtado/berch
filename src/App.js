import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Plus, Trash2, FileText, AlertTriangle, Target, TrendingUp, CheckCircle, X, Save, Edit, ArrowLeft, HelpCircle, Upload, ArrowUpDown, ShieldCheck, Download, ChevronLeft, ChevronRight, Filter, XCircle } from 'lucide-react';

// --- Header Component (No changes) ---
const AppHeader = () => (
    <div className="grid grid-cols-12 gap-px items-stretch border border-gray-300 rounded-lg overflow-hidden bg-gray-300 mb-8 shadow-sm">
        <div className="col-span-12 sm:col-span-3 text-center bg-white p-3 flex items-center justify-center">
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
            <div className="border border-gray-300 p-2 rounded"><p className="font-semibold text-gray-700 text-sm">ADO-03-R03</p></div>
            <div className="border border-gray-300 p-2 rounded"><p className="font-semibold text-gray-700 text-sm">V3</p></div>
        </div>
    </div>
);

// --- UPDATED: Help Modal Component ---
const HelpModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in-fast">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><HelpCircle className="text-green-700" />Manual de Usuario</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100"><X size={24} /></button>
                </div>
                <div className="p-6 overflow-y-auto space-y-6">
                    <p className="text-gray-600">¡Bienvenido! Esta guía te ayudará a utilizar la herramienta para registrar y gestionar las acciones de mejora de manera eficiente.</p>
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">1. Vista Principal</h3>
                        {/* ... (content omitted for brevity) ... */}
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">2. Creación y Edición de una Acción</h3>
                        {/* ... (content omitted for brevity) ... */}
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">3. Descripción de las Hojas del Formulario</h3>
                        <ol className="list-decimal list-inside space-y-4 text-gray-600">
                            <li><strong className="font-semibold text-gray-800">Información General:</strong> Define el tipo, ámbito, proceso, fecha y la fuente única de la acción.</li>
                            <li><strong className="font-semibold text-gray-800">Descripción NC:</strong> Detalla el problema y adjunta archivos de soporte si es necesario.</li>
                            <li><strong className="font-semibold text-gray-800">Acción Directa:</strong> Registra las acciones inmediatas y su seguimiento específico.</li>
                            <li><strong className="font-semibold text-gray-800">Análisis de Causas:</strong> Usa el Diagrama de Ishikawa y completa los "5 Porqués" (mínimo 3, máximo 5) para cada causa raíz.</li>
                            <li><strong className="font-semibold text-gray-800">Plan de Mejora:</strong> Define el plan a largo plazo y su seguimiento.</li>
                            <li>
                                <strong className="font-semibold text-gray-800">Riesgos y Oportunidades:</strong> Revisa la no conformidad desde esta perspectiva. El análisis debe considerar la descripción del problema, el análisis de causas, el objetivo del proceso y el plan de acción. Si se identifica un riesgo u oportunidad, se debe actualizar la matriz correspondiente con apoyo de la oficina de calidad.
                            </li>
                            <li><strong className="font-semibold text-gray-800">Cierre de la Acción:</strong> Es la última hoja. Aquí registras la verificación final y la eficacia. En esta hoja encontrarás el botón para **Guardar Acción**.</li>
                        </ol>
                    </div>
                </div>
                 <div className="p-4 bg-gray-50 border-t text-right">
                    <button onClick={onClose} className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition-colors">Cerrar</button>
                </div>
            </div>
        </div>
    );
};

// --- Status Bar Component (No changes) ---
const StatusBar = ({ status }) => {
    const statusConfig = {
        pendiente: { text: 'Pendiente', classes: 'bg-yellow-100 text-yellow-800' },
        cumplido: { text: 'Cumplido', classes: 'bg-green-100 text-green-800' },
        vencido: { text: 'Vencido', classes: 'bg-red-100 text-red-800' },
    };
    const config = statusConfig[status] || statusConfig.pendiente;
    return <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.classes}`}>{config.text}</span>;
};


// --- Intelligent Stepper Component (No changes) ---
const IntelligentStepper = ({ steps, currentStepId, setCurrentStepId }) => {
    const stepperRef = useRef(null);
    const totalSteps = steps.length;
    const completedSteps = steps.filter(step => step.status === 'completed').length;

    const handleStepClick = (stepId) => {
        setCurrentStepId(stepId);
    };

    const scroll = (direction) => {
        if (stepperRef.current) {
            stepperRef.current.scrollBy({ left: direction * 200, behavior: 'smooth' });
        }
    };

    const getStepClasses = (step) => {
        const isActive = step.id === currentStepId;
        const baseClasses = "flex items-center w-full text-left relative p-3 text-sm font-medium transition-all duration-300 rounded-lg whitespace-nowrap cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
        
        if (isActive) return `${baseClasses} bg-blue-700 text-white shadow-lg scale-105`;
        if (step.status === 'completed') return `${baseClasses} bg-green-100 text-green-800 hover:bg-green-200 font-semibold`;
        if (step.status === 'with-observations') return `${baseClasses} bg-amber-100 text-amber-800 hover:bg-amber-200`;
        return `${baseClasses} bg-gray-100 text-gray-600 hover:bg-gray-200`;
    };

    const getIconForStep = (step) => {
        const isActive = step.id === currentStepId;
        const IconComponent = step.icon;
        if (step.status === 'completed') return <CheckCircle size={16} className="mr-3 flex-shrink-0" />;
        if (isActive) return <Edit size={16} className="mr-3 flex-shrink-0" />;
        if (step.status === 'with-observations') return <AlertTriangle size={16} className="mr-3 flex-shrink-0" />;
        return <IconComponent size={16} className="mr-3 flex-shrink-0" />;
    };

    return (
        <div className="w-full">
            {/* --- Mobile Horizontal Stepper --- */}
            <div className="md:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-md shadow-sm -mx-4 px-4">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-grow flex items-center justify-center relative">
                        <button onClick={() => scroll(-1)} className="absolute -left-2 z-10 p-1 bg-white/50 rounded-full shadow-md hover:bg-gray-100"><ChevronLeft size={20} /></button>
                        <nav aria-label="Progreso del formulario" className="w-full">
                            <ol ref={stepperRef} className="flex items-center justify-start space-x-2 overflow-x-auto scrollbar-hide py-2">
                                {steps.map((step) => (
                                    <li key={step.id} className="flex-shrink-0">
                                        <a href="#" onClick={(e) => { e.preventDefault(); handleStepClick(step.id); }} className="flex items-center justify-center p-3 rounded-lg" aria-current={step.id === currentStepId ? "step" : undefined} title={step.tooltip}>
                                            <div className={`${step.id === currentStepId ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-600'} w-8 h-8 rounded-full flex items-center justify-center`}>{getIconForStep(step)}</div>
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        </nav>
                        <button onClick={() => scroll(1)} className="absolute -right-2 z-10 p-1 bg-white/50 rounded-full shadow-md hover:bg-gray-100"><ChevronRight size={20} /></button>
                    </div>
                </div>
            </div>

            {/* --- Desktop Vertical Stepper --- */}
            <div className="hidden md:block">
                 <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-600 ">{completedSteps}/{totalSteps} completadas</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1" role="progressbar" aria-valuenow={completedSteps} aria-valuemin="0" aria-valuemax={totalSteps}>
                        <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${(completedSteps / totalSteps) * 100}%` }}></div>
                    </div>
                </div>
                <nav aria-label="Progreso del formulario">
                    <ol>
                        {steps.map((step, index) => (
                            <React.Fragment key={step.id}>
                                {index > 0 && (
                                    <div className="h-6 w-px bg-gray-300 ml-5" />
                                )}
                                <li>
                                    <a href="#" onClick={(e) => { e.preventDefault(); handleStepClick(step.id); }} className={getStepClasses(step)} aria-current={step.id === currentStepId ? "step" : undefined} title={step.tooltip}>
                                        {getIconForStep(step)}
                                        <span className={`${step.id === currentStepId ? 'font-bold' : ''}`}>{step.title}</span>
                                        {step.status === 'with-observations' && (<span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">{step.errorCount}</span>)}
                                    </a>
                                </li>
                            </React.Fragment>
                        ))}
                    </ol>
                </nav>
            </div>
        </div>
    );
};


// --- Bottom Navigation Bar (No changes) ---
const BottomNavBar = ({ currentStepId, steps, onNext, onPrev, onSaveDraft, setView }) => {
    return (
        <footer className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-md border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center">
                 <button onClick={() => setView('list')} className="flex items-center gap-2 text-sm text-blue-700 hover:underline">
                    <ArrowLeft size={16} />
                    Volver al listado
                </button>
                <div className="flex-grow flex justify-end items-center gap-4">
                    <button onClick={onPrev} disabled={currentStepId === steps[0].id} className="px-6 py-2 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors">Anterior</button>
                    <button onClick={onSaveDraft} className="px-6 py-2 rounded-lg font-semibold bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors hidden sm:block">Guardar borrador</button>
                    <div className="relative">
                        <button 
                            onClick={onNext} 
                            disabled={currentStepId === steps[steps.length - 1].id} 
                            className="px-6 py-2 rounded-lg font-semibold bg-blue-700 text-white hover:bg-blue-800 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors">
                                Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// --- Form Section Components (Full Implementation RESTORED) ---
const InformacionGeneral = ({ formData, updateForm }) => (
    <div className="space-y-6 animate-fade-in">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">TIPO DE ACCIÓN</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['correctiva', 'directa', 'preventiva', 'planMejora'].map(type => (
                    <label key={type} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-green-50 transition-colors has-[:checked]:bg-green-100 has-[:checked]:border-green-400">
                        <input type="radio" name="tipoAccion" value={type} checked={formData.tipoAccion === type} onChange={(e) => updateForm('tipoAccion', e.target.value)} className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500" />
                        <span className="ml-3 text-sm font-medium text-gray-800">{{correctiva: 'Correctiva', directa: 'Directa', preventiva: 'Preventiva', planMejora: 'Plan de Mejora'}[type]}</span>
                    </label>
                ))}
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ÁMBITO</label>
                <select value={formData.ambito} onChange={(e) => updateForm('ambito', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white">
                    <option value="">Seleccione un ámbito</option>
                    <option value="direccion_organizacion">Dirección de Organización</option>
                    <option value="formacion_integral">Formación Integral</option>
                    <option value="gestion_administrativa_financiera">Gestión Administrativa y Financiera</option>
                    <option value="talento_humano">Talento Humano</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PROCESO</label>
                <select value={formData.proceso} onChange={(e) => updateForm('proceso', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white">
                    <option value="">Seleccione un proceso</option>
                    <option value="admision_matricula">Admisión y Matrícula</option>
                    <option value="ambiente_escolar">Ambiente Escolar</option>
                    <option value="bienestar_institucional">Bienestar Institucional</option>
                    <option value="comunicaciones">Comunicaciones</option>
                    <option value="compras_contratacion">Compras y Contratación</option>
                    <option value="desarrollo_humano">Desarrollo Humano</option>
                    <option value="direccionamiento_estrategico">Direccionamiento Estratégico</option>
                    <option value="ensenanza_aprendizaje">Enseñanza Aprendizaje</option>
                    <option value="facturacion">Facturación</option>
                    <option value="gestion_financiera">Gestión Financiera</option>
                    <option value="mantenimiento_planta_fisica">Mantenimiento Planta Física</option>
                    <option value="mantenimiento_sistemas">Mantenimiento Sistemas</option>
                    <option value="promocion">Promoción</option>
                    <option value="recaudo_cartera">Recaudo y Cartera</option>
                    <option value="revision_mejora">Revisión y Mejora</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">FECHA</label>
                <input type="month" value={formData.fecha} onChange={(e) => updateForm('fecha', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
            </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">ACCIÓN DE MEJORA DETECTADA EN:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[{ key: 'revisionDireccion', label: 'Revisión Dirección' },{ key: 'auditoriaInterna', label: 'Auditoría Interna' },{ key: 'auditoriaExterna', label: 'Auditoría Externa' },{ key: 'vozCliente', label: 'Voz del cliente' },{ key: 'autocontrolProceso', label: 'Autocontrol del Proceso' }].map(source => (
                    <label key={source.key} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-green-50 transition-colors has-[:checked]:bg-green-100 has-[:checked]:border-green-400">
                        <input type="radio" name="fuente" value={source.key} checked={formData.fuente === source.key} onChange={(e) => updateForm('fuente', e.target.value)} className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500" />
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
            <textarea value={formData.descripcion.descripcionNC} onChange={(e) => updateNestedForm('descripcion', 'descripcionNC', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md h-32 shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="Descripción detallada de la no conformidad..."/>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Archivo de Soporte (Opcional)</label>
            <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer transition-colors shadow-sm">
                    <Upload size={16} /><span>Seleccionar archivo</span>
                    <input type="file" onChange={(e) => { if (e.target.files && e.target.files[0]) { updateNestedForm('descripcion', 'supportFile', e.target.files[0].name) }}} className="hidden"/>
                </label>
                {formData.descripcion.supportFile && (
                    <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm">
                        <span>{formData.descripcion.supportFile}</span>
                        <button onClick={() => updateNestedForm('descripcion', 'supportFile', null)} className="text-green-800 hover:text-red-600"><X size={16} /></button>
                    </div>
                )}
            </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del responsable</label>
            <input type="text" value={formData.descripcion.responsable} onChange={(e) => updateNestedForm('descripcion', 'responsable', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="Nombre del responsable"/>
        </div>
    </div>
);
const AccionDirecta = ({ formData, addItemToArray, removeItemFromArray, updateArrayItem }) => ( 
    <div className="space-y-8 animate-fade-in">
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">Acciones Directas</h3>
                <button onClick={() => addItemToArray('accionDirecta', { fecha: '', tratamiento: '', solucion: '', responsable: '' })} className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors shadow"><Plus size={16} /> Agregar Acción</button>
            </div>
            {formData.accionDirecta.map((accion, index) => {
                const isAccionIncomplete = !accion.fecha || !accion.tratamiento || !accion.solucion || !accion.responsable;
                return (
                    <div key={index} className="border p-4 rounded-lg bg-gray-50 shadow-sm animate-fade-in">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className={`font-semibold ${isAccionIncomplete ? 'text-red-600' : 'text-gray-700'}`}>Acción {index + 1}</h4>
                            <button onClick={() => removeItemFromArray('accionDirecta', index)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100" aria-label={`Eliminar Acción ${index + 1}`}><Trash2 size={18} /></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label><input type="month" value={accion.fecha} onChange={(e) => updateArrayItem('accionDirecta', index, 'fecha', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm"/></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Responsable</label><input type="text" value={accion.responsable} onChange={(e) => updateArrayItem('accionDirecta', index, 'responsable', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm" placeholder="Responsable de la acción"/></div>
                        </div>
                        <div className="mt-4"><label className="block text-sm font-medium text-gray-700 mb-1">Tratamiento (Acciones a realizar)</label><textarea value={accion.tratamiento} onChange={(e) => updateArrayItem('accionDirecta', index, 'tratamiento', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md h-24 shadow-sm" placeholder="Describe las acciones a realizar..."/></div>
                        <div className="mt-4"><label className="block text-sm font-medium text-gray-700 mb-1">Solución (Acciones Ejecutadas)</label><textarea value={accion.solucion} onChange={(e) => updateArrayItem('accionDirecta', index, 'solucion', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md h-24 shadow-sm" placeholder="Describe las acciones ejecutadas..."/></div>
                    </div>
                )
            })}
            {formData.accionDirecta.length === 0 && (<div className="text-center text-gray-500 py-8 border-2 border-dashed rounded-lg">No hay acciones directas. Haga clic en "Agregar Acción" para comenzar.</div>)}
        </div>
        <div className="space-y-4 pt-8 border-t">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Seguimiento al resultado de las Acciones Ejecutadas</h3>
                <button onClick={() => addItemToArray('seguimientoAcciones', { accionId: '', resultado: '', fecha: '', responsable: ''})} className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"><Plus size={16} /> Agregar Seguimiento</button>
            </div>
            {formData.seguimientoAcciones.map((seguimiento, index) => (
                <div key={index} className="border p-4 rounded-lg bg-blue-50 mb-3 animate-fade-in">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Seguimiento {index + 1}</h4><button onClick={() => removeItemFromArray('seguimientoAcciones', index)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Acción Directa Relacionada</label>
                            <select value={seguimiento.accionId} onChange={(e) => updateArrayItem('seguimientoAcciones', index, 'accionId', e.target.value)} className="w-full p-2 border rounded-md">
                                <option value="">Seleccione una acción</option>{formData.accionDirecta.map((accion, i) => (<option key={i} value={i}>Acción {i + 1}: {accion.tratamiento.substring(0, 30)}...</option>))}
                            </select>
                        </div>
                        <div><label className="block text-sm font-medium mb-1">Fecha de Seguimiento</label><input type="month" value={seguimiento.fecha} onChange={(e) => updateArrayItem('seguimientoAcciones', index, 'fecha', e.target.value)} className="w-full p-2 border rounded-md"/></div>
                        <div><label className="block text-sm font-medium mb-1">Responsable</label><input type="text" value={seguimiento.responsable} onChange={(e) => updateArrayItem('seguimientoAcciones', index, 'responsable', e.target.value)} className="w-full p-2 border rounded-md" placeholder="Responsable del seguimiento"/></div>
                    </div>
                    <div><label className="block text-sm font-medium mb-1">Resultado</label><textarea value={seguimiento.resultado} onChange={(e) => updateArrayItem('seguimientoAcciones', index, 'resultado', e.target.value)} className="w-full p-2 border rounded-md h-24" placeholder="Describe el resultado del seguimiento..."/></div>
                </div>
            ))}
        </div>
    </div>
);
const AnalisisCausas = ({ formData, updateNestedForm }) => { 
    const { categorias, causas } = formData.analisisCausas;
    const [newSubCausas, setNewSubCausas] = useState({Medidas: '', Métodos: '', Personas: '', Materiales: '', 'Medio Ambiente': ''});
    
    const allSubCausas = useMemo(() => Object.values(categorias).flat(), [categorias]);

    const addSubCausa = (categoria) => { if (newSubCausas[categoria].trim() === '') return; const newCategorias = { ...categorias, [categoria]: [...categorias[categoria], newSubCausas[categoria]] }; updateNestedForm('analisisCausas', 'categorias', newCategorias); setNewSubCausas(prev => ({ ...prev, [categoria]: '' })); };
    const removeSubCausa = (categoria, index) => { const newCategorias = { ...categorias, [categoria]: categorias[categoria].filter((_, i) => i !== index) }; updateNestedForm('analisisCausas', 'categorias', newCategorias); };
    const addCausa = () => { const newCausas = [...causas, { subCausaSeleccionada: '', descripcion: '', cincoPorque: ['', '', ''] }]; updateNestedForm('analisisCausas', 'causas', newCausas); };
    const removeCausa = (indexToRemove) => { if (causas.length > 1) { const newCausas = causas.filter((_, index) => index !== indexToRemove); updateNestedForm('analisisCausas', 'causas', newCausas); } };
    const updateCausa = (causaIndex, field, value) => { const newCausas = causas.map((causa, index) => index === causaIndex ? { ...causa, [field]: value } : causa ); updateNestedForm('analisisCausas', 'causas', newCausas); };
    const addPorque = (causaIndex) => { const newCausas = JSON.parse(JSON.stringify(causas)); const causa = newCausas[causaIndex]; if (causa.cincoPorque.length < 5) { causa.cincoPorque.push(''); updateNestedForm('analisisCausas', 'causas', newCausas); } };
    const updatePorque = (causaIndex, porqueIndex, value) => { const newCausas = JSON.parse(JSON.stringify(causas)); newCausas[causaIndex].cincoPorque[porqueIndex] = value; updateNestedForm('analisisCausas', 'causas', newCausas); };
    const removePorque = (causaIndex, porqueIndex) => { const newCausas = JSON.parse(JSON.stringify(causas)); const causa = newCausas[causaIndex]; if (causa.cincoPorque.length > 3) { causa.cincoPorque = causa.cincoPorque.filter((_, i) => i !== porqueIndex); updateNestedForm('analisisCausas', 'causas', newCausas); } };
    
    const FishboneDiagram = ({ categorias, efecto }) => {
        const hasCauses = Object.values(categorias).some(arr => arr.length > 0);
        if (!hasCauses) return (<div className="text-center text-gray-400 py-8 border-2 border-dashed rounded-lg bg-gray-50"><p>El diagrama de espina de pescado aparecerá aquí.</p><p className="text-sm">Agregue una sub-causa para comenzar a visualizar.</p></div>);
        const width = 1200, height = 700, midY = height / 2, headWidth = 180, headX = width - headWidth - 20;
        const mainBones = [{ name: 'Medidas', x: 200, angle: -45 }, { name: 'Métodos', x: 500, angle: -45 }, { name: 'Materiales', x: 800, angle: -45 }, { name: 'Personas', x: 200, angle: 45 }, { name: 'Medio Ambiente', x: 500, angle: 45 }];
        return (
            <div className="w-full overflow-x-auto p-4 bg-white rounded-lg border">
                <svg viewBox={`0 0 ${width} ${height}`} className={`min-w-[${width}px]`}>
                    <line x1="50" y1={midY} x2={headX} y2={midY} stroke="#4a5568" strokeWidth="3" />
                    <foreignObject x={headX} y={midY - (height / 4)} width={headWidth} height={height / 2}><div xmlns="http://www.w3.org/1999/xhtml" className="w-full h-full bg-green-700 rounded-md flex items-center justify-center p-3 text-white text-center text-sm font-bold" style={{wordWrap: 'break-word', whiteSpace: 'normal'}}>{efecto || 'Descripción de la No Conformidad'}</div></foreignObject>
                    {mainBones.map(bone => {
                        const subCausas = categorias[bone.name] || [], isTop = bone.angle < 0, boneLength = 300, endX = bone.x + boneLength * Math.cos(bone.angle * Math.PI / 180), endY = midY + boneLength * Math.sin(bone.angle * Math.PI / 180);
                        return (
                            <g key={bone.name}>
                                <line x1={bone.x} y1={midY} x2={endX} y2={endY} stroke="#718096" strokeWidth="2" /><text x={endX + (isTop ? -10 : 10)} y={endY + (isTop ? -15 : 25)} textAnchor={isTop ? "end" : "start"} fontWeight="bold" fontSize="16px" fill="#374151">{bone.name}</text>
                                {subCausas.map((subCausa, index) => {
                                    const pos = (index + 0.5) / (subCausas.length), subX1 = bone.x + (endX - bone.x) * pos, subY1 = midY + (endY - midY) * pos, subX2 = subX1 + 80, subY2 = subY1;
                                    return (<g key={index}><line x1={subX1} y1={subY1} x2={subX2} y2={subY2} stroke="#7f8c8d" strokeWidth="1.5" /><foreignObject x={subX2 + 5} y={subY2 - 30} width="150" height="60"><div xmlns="http://www.w3.org/1999/xhtml" className="text-xs text-gray-700 p-1" style={{wordWrap: 'break-word', whiteSpace: 'normal', lineHeight: '1.2'}}>{subCausa}</div></foreignObject></g>);
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
            <div><h3 className="text-lg font-medium mb-3">Diagrama de Espina de Pescado (Ishikawa)</h3><FishboneDiagram categorias={categorias} efecto={formData.descripcion.descripcionNC || 'Descripción de la No Conformidad'} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(categorias).map(cat => (
                    <div key={cat} className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-3">{cat}</h4>
                        <div className="space-y-2">{categorias[cat].map((sub, index) => (<div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded"><span className="text-sm">{sub}</span><button onClick={() => removeSubCausa(cat, index)} className="text-red-500 hover:text-red-700"><Trash2 size={14} /></button></div>))}</div>
                        <div className="flex gap-2 mt-3"><input type="text" value={newSubCausas[cat]} onChange={(e) => setNewSubCausas(prev => ({ ...prev, [cat]: e.target.value }))} className="flex-1 p-2 border rounded-md text-sm" placeholder={`Añadir causa en ${cat}`} onKeyPress={(e) => e.key === 'Enter' && addSubCausa(cat)}/><button onClick={() => addSubCausa(cat)} className="bg-green-700 text-white p-2 rounded-md hover:bg-green-800"><Plus size={16} /></button></div>
                    </div>
                ))}
            </div>
            <div className="space-y-6 pt-6 border-t">
                <div className="flex justify-between items-center"><h3 className="text-lg font-medium text-gray-800">Análisis de Causa Raíz y 5 Porqués</h3><button onClick={addCausa} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow"><Plus size={16} /> Agregar Causa Raíz</button></div>
                {causas.map((causa, causaIndex) => (
                    <div key={causaIndex} className="border p-4 rounded-lg bg-gray-50 shadow-sm relative animate-fade-in">
                        {causas.length > 1 && (<button onClick={() => removeCausa(causaIndex)} className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100" aria-label={`Eliminar Causa Raíz ${causaIndex + 1}`}><Trash2 size={18} /></button>)}
                        <h4 className="text-md font-semibold mb-4 text-gray-700">Análisis de Causa #{causaIndex + 1}</h4>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sub-causa de Ishikawa a analizar</label>
                            <select value={causa.subCausaSeleccionada} onChange={(e) => updateCausa(causaIndex, 'subCausaSeleccionada', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white">
                                <option value="">Seleccione una sub-causa</option>
                                {allSubCausas.map((sc, i) => (<option key={i} value={sc}>{sc}</option>))}
                            </select>
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between items-center mb-3"><h5 className="text-sm font-medium text-gray-600">Análisis de 5 Por Qué</h5><button onClick={() => addPorque(causaIndex)} disabled={causa.cincoPorque.length >= 5} className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-md hover:bg-green-200 disabled:bg-gray-200 disabled:cursor-not-allowed text-xs"><Plus size={14} /> Agregar</button></div>
                            <div className="space-y-2">{causa.cincoPorque.map((porque, porqueIndex) => (<div key={porqueIndex} className="flex gap-2 items-center"><span className="bg-gray-200 px-3 py-2 rounded-md font-medium text-gray-700 text-sm">Por qué {porqueIndex + 1}</span><input type="text" value={porque} onChange={(e) => updatePorque(causaIndex, porqueIndex, e.target.value)} className="flex-1 p-2 border rounded-md shadow-sm" placeholder="¿Por qué ocurrió esto?"/><button onClick={() => removePorque(causaIndex, porqueIndex)} disabled={causa.cincoPorque.length <= 3} className="text-red-500 hover:text-red-700 p-2 disabled:text-gray-400 disabled:cursor-not-allowed"><Trash2 size={16} /></button></div>))}</div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Causa Raíz (Conclusión del análisis)</label>
                            <textarea value={causa.descripcion} onChange={(e) => updateCausa(causaIndex, 'descripcion', e.target.value)} className="w-full p-2 border rounded-lg h-24 bg-yellow-50 focus:ring-2 focus:ring-yellow-400" placeholder="Describe la causa raíz identificada a partir de los 5 porqués..."/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) 
};
const PlanMejora = ({ formData, addItemToArray, removeItemFromArray, updateArrayItem, addFechaSeguimiento, removeFechaSeguimiento, updateFechaSeguimiento }) => ( 
    <div className="space-y-8 animate-fade-in">
        <div className="space-y-4">
            <div className="flex justify-between items-center"><h3 className="text-lg font-medium">Plan de Acción/Plan de Mejora</h3><button onClick={() => addItemToArray('planMejora', { que: '', como: '', fechaImplementacion: '', quien: '', fechasSeguimiento: [''] })} className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors shadow"><Plus size={16} /> Agregar Acción</button></div>
            {formData.planMejora.map((accion, index) => {
                const isPlanIncomplete = !accion.que || !accion.como || !accion.fechaImplementacion || !accion.quien || accion.fechasSeguimiento.some(f => f === '');
                return (
                <div key={index} className="border p-4 rounded-lg bg-gray-50 shadow-sm animate-fade-in">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className={`font-semibold ${isPlanIncomplete ? 'text-red-600' : 'text-gray-700'}`}>Acción de Mejora {index + 1}</h4><button onClick={() => removeItemFromArray('planMejora', index)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"><Trash2 size={18} /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div><label className="block text-sm font-medium mb-1">Qué (acción que ataca la causa)</label><textarea value={accion.que} onChange={(e) => updateArrayItem('planMejora', index, 'que', e.target.value)} className="w-full p-2 border rounded-md h-20" placeholder="¿Qué acción se va a realizar?"/></div>
                        <div><label className="block text-sm font-medium mb-1">Cómo</label><textarea value={accion.como} onChange={(e) => updateArrayItem('planMejora', index, 'como', e.target.value)} className="w-full p-2 border rounded-md h-20" placeholder="¿Cómo se va a implementar?"/></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium mb-1">Fecha de Implementación</label><input type="month" value={accion.fechaImplementacion} onChange={(e) => updateArrayItem('planMejora', index, 'fechaImplementacion', e.target.value)} className="w-full p-2 border rounded-md"/></div>
                        <div><label className="block text-sm font-medium mb-1">Quién</label><input type="text" value={accion.quien} onChange={(e) => updateArrayItem('planMejora', index, 'quien', e.target.value)} className="w-full p-2 border rounded-md" placeholder="Responsable"/></div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-2">Fechas de Seguimiento</label>
                        <div className="space-y-2">
                             {accion.fechasSeguimiento.map((fecha, fechaIndex) => (<div key={fechaIndex} className="flex items-center gap-2"><input type="month" value={fecha} onChange={(e) => updateFechaSeguimiento(index, fechaIndex, e.target.value)} className="w-full p-2 border rounded-md"/>{accion.fechasSeguimiento.length > 1 && (<button onClick={() => removeFechaSeguimiento(index, fechaIndex)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={16} /></button>)}</div>))}
                        </div>
                        <button onClick={() => addFechaSeguimiento(index)} className="mt-2 flex items-center gap-1 text-sm text-green-700 hover:underline"><Plus size={14} /> Agregar otra fecha</button>
                    </div>
                </div>
            )})}
            {formData.planMejora.length === 0 && (<div className="text-center text-gray-500 py-8 border-2 border-dashed rounded-lg">No hay acciones de mejora. Haga clic en "Agregar Acción" para comenzar.</div>)}
        </div>
        <div className="space-y-4 pt-8 border-t">
            <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-medium">Seguimiento al plan de acción/plan de mejora</h3><button onClick={() => addItemToArray('seguimientoPlan', { planId: '', resultado: '', fecha: '', responsable: ''})} className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"><Plus size={16} /> Agregar Seguimiento</button></div>
            {formData.seguimientoPlan.map((seguimiento, index) => {
                const relatedPlan = formData.planMejora[seguimiento.planId];
                return (
                <div key={index} className="border p-4 rounded-lg bg-blue-50 mb-3 animate-fade-in">
                    <div className="flex justify-between items-center mb-3"><h4 className="font-medium">Seguimiento Plan {index + 1}</h4><button onClick={() => removeItemFromArray('seguimientoPlan', index)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button></div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Plan de Mejora Relacionado</label>
                        <select value={seguimiento.planId} onChange={(e) => updateArrayItem('seguimientoPlan', index, 'planId', e.target.value)} className="w-full p-2 border rounded-md">
                            <option value="">Seleccione un plan</option>{formData.planMejora.map((plan, i) => (<option key={i} value={i}>Acción de Mejora {i + 1}: {plan.que.substring(0, 40)}...</option>))}
                        </select>
                    </div>
                    {relatedPlan && (<div className="mb-4 p-3 bg-gray-100 rounded-md"><label className="block text-sm font-medium text-gray-600 mb-1">Cómo se implementará (del plan seleccionado):</label><p className="text-sm text-gray-800">{relatedPlan.como}</p></div>)}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div><label className="block text-sm font-medium mb-1">Fecha de Seguimiento</label><input type="month" value={seguimiento.fecha} onChange={(e) => updateArrayItem('seguimientoPlan', index, 'fecha', e.target.value)} className="w-full p-2 border rounded-md"/></div>
                        <div><label className="block text-sm font-medium mb-1">Responsable</label><input type="text" value={seguimiento.responsable} onChange={(e) => updateArrayItem('seguimientoPlan', index, 'responsable', e.target.value)} className="w-full p-2 border rounded-md" placeholder="Responsable del seguimiento"/></div>
                    </div>
                    <div><label className="block text-sm font-medium mb-1">Resultado</label><textarea value={seguimiento.resultado} onChange={(e) => updateArrayItem('seguimientoPlan', index, 'resultado', e.target.value)} className="w-full p-2 border rounded-md h-24" placeholder="Describe el resultado del seguimiento del plan..."/></div>
                </div>
            )})}
        </div>
    </div>
);
const AnalisisRiesgos = ({ formData, updateForm }) => ( 
    <div className="space-y-6 animate-fade-in">
        <div>
            <label className="block text-lg font-medium mb-2" htmlFor="analisis-riesgos">Análisis de la acción correctiva desde los riesgos y las oportunidades</label>
            <textarea 
                id="analisis-riesgos"
                value={formData.analisisRiesgos} 
                onChange={(e) => updateForm('analisisRiesgos', e.target.value)} 
                className="w-full p-3 border rounded-lg h-40 shadow-sm focus:ring-2 focus:ring-blue-500" 
                placeholder="La conclusión del análisis se registra aquí..."/>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Guía para el análisis</h4>
            <p className="text-sm text-gray-700 mb-3">
                Revisar la no conformidad desde la perspectiva de los riesgos y las oportunidades. Realizar un análisis teniendo en cuenta las siguientes variables:
            </p>
            <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                <li>La descripción de la no conformidad.</li>
                <li>El análisis de causas realizado, incluyendo los 5 porqués y la causa raíz.</li>
                <li>Tener presente el objetivo del proceso y su aseguramiento.</li>
                <li>El plan de acción elaborado.</li>
            </ul>
             <p className="text-sm text-gray-700 mt-4">
                Dependiendo de estas variables y el análisis realizado, el responsable de la acción identifica o no un riesgo o una oportunidad.
             </p>
             <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside mt-3">
                 <li>Si ha identificado un riesgo y/o una oportunidad, con el acompañamiento de la oficina de calidad se actualiza la matriz de riesgos y/o oportunidades (institucionales u operativo) según corresponda para su respectivo tratamiento.</li>
             </ul>
        </div>
    </div>
);
const CierreAccion = ({ formData, updateNestedForm, handleSave, editingId, isSaveDisabled }) => ( 
    <div className="space-y-4 animate-fade-in">
        <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded-r-lg shadow-sm" role="alert"><p className="font-bold mb-1">Nota Importante:</p><p className="text-sm">Esta sección solo debe ser completada al finalizar todo el proceso, una vez que las acciones hayan sido implementadas y se haya verificado su eficacia para dar cierre a la acción de mejora.</p></div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Eficacia</label>
            <div className="flex gap-4">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-green-50 transition-colors has-[:checked]:bg-green-100 has-[:checked]:border-green-400"><input type="radio" name="eficacia" value="si" checked={formData.cierre.eficacia === 'si'} onChange={(e) => updateNestedForm('cierre', 'eficacia', e.target.value)} className="h-4 w-4 text-green-600" /><span className="ml-2">Sí</span></label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-red-50 transition-colors has-[:checked]:bg-red-100 has-[:checked]:border-red-400"><input type="radio" name="eficacia" value="no" checked={formData.cierre.eficacia === 'no'} onChange={(e) => updateNestedForm('cierre', 'eficacia', e.target.value)} className="h-4 w-4 text-red-600" /><span className="ml-2">No</span></label>
            </div>
        </div>
        {formData.cierre.eficacia && (<div><label className="block text-sm font-medium text-gray-700 mb-1">Comentario de Eficacia</label><textarea value={formData.cierre.comentarioEficacia} onChange={(e) => updateNestedForm('cierre', 'comentarioEficacia', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md h-24 shadow-sm" placeholder="Explique por qué la acción fue o no fue eficaz..."/></div>)}
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Lección Aprendida</label><textarea value={formData.cierre.leccionAprendida} onChange={(e) => updateNestedForm('cierre', 'leccionAprendida', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md h-24 shadow-sm" placeholder="Describe la lección aprendida..."/></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Resultado Final</label><textarea value={formData.cierre.resultadoFinal} onChange={(e) => updateNestedForm('cierre', 'resultadoFinal', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md h-24 shadow-sm" placeholder="Describe el resultado final de la acción..."/></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Responsable del Cierre</label><input type="text" value={formData.cierre.responsable} onChange={(e) => updateNestedForm('cierre', 'responsable', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm" placeholder="Nombre del responsable"/></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Cierre</label><input type="month" value={formData.cierre.fecha} onChange={(e) => updateNestedForm('cierre', 'fecha', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm"/></div>
        </div>
        <div className="flex flex-col items-end pt-6 border-t mt-6">
            <button onClick={handleSave} disabled={isSaveDisabled} className="flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors shadow-lg text-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"><Save size={20} /> {editingId ? 'Actualizar Acción' : 'Guardar Acción'}</button>
            {isSaveDisabled && (<p className="text-red-600 text-sm mt-2 text-right">Debe completar todos los campos de 'Información General' y los '5 Porqués' para poder guardar.</p>)}
        </div>
    </div>
);


// --- Main Application Component ---
const SistemaAccionesCorrectivas = () => {
    const [view, setView] = useState('list');
    const [listaAcciones, setListaAcciones] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [currentStepId, setCurrentStepId] = useState(0);
     const [filters, setFilters] = useState({ tipoAccion: 'all', estado: 'all', proceso: 'all', responsable: '', fechaDesde: '', fechaHasta: '' });

    useEffect(() => { 
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
        script.async = true;
        document.body.appendChild(script);
        return () => { document.body.removeChild(script); }
     }, []);

    const initialFormData = {
        id: null,
        tipoAccion: 'correctiva',
        ambito: '',
        proceso: '',
        fecha: new Date().toISOString().split('T')[0].substring(0, 7),
        fuente: '',
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
            causas: [
                { subCausaSeleccionada: '', descripcion: '', cincoPorque: ['', '', ''] }
            ]
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
    const [modal, setModal] = useState({ isOpen: false, message: '', type: 'info' });

    // --- LÓGICA DE VALIDACIÓN Y ESTADO DEL STEPPER ---
    const stepDefinitions = [
        { id: 0, title: 'Información General', icon: FileText, fields: ['tipoAccion', 'ambito', 'proceso', 'fecha', 'fuente'] },
        { id: 1, title: 'Descripción NC', icon: AlertTriangle, fields: ['descripcion.descripcionNC', 'descripcion.responsable'] },
        { id: 2, title: 'Acción Directa', icon: Target, fields: [] }, // Opcional, siempre completo
        { id: 3, title: 'Análisis de Causas', icon: TrendingUp, fields: ['analisisCausas'] },
        { id: 4, title: 'Plan de Mejora', icon: CheckCircle, fields: [] }, // Opcional, siempre completo
        { id: 5, title: 'Riesgos y Oportunidades', icon: AlertTriangle, fields: ['analisisRiesgos'] },
        { id: 6, title: 'Cierre de la Acción', icon: ShieldCheck, fields: [] } // Se llena al final
    ];

    const managedSteps = useMemo(() => {
        const checkField = (obj, path) => path.split('.').reduce((o, i) => o && o[i] ? o[i] : null, obj);

        return stepDefinitions.map(step => {
            let missingFields = [];
            if (step.id < 6) { // No validar el cierre hasta el final
                 if (step.id === 3) { // Validación especial para Análisis de Causas
                    if (formData.analisisCausas && formData.analisisCausas.causas.some(c => c.descripcion.trim() === '' || c.cincoPorque.some(p => p.trim() === ''))) {
                        missingFields.push('Completar todas las causas y porqués');
                    }
                } else {
                    step.fields.forEach(field => {
                        const value = checkField(formData, field);
                        if (!value || (typeof value === 'string' && value.trim().length === 0) || (Array.isArray(value) && value.length === 0) ) {
                            missingFields.push(field.split('.').pop());
                        }
                    });
                }
            }

            let status = 'pending';
            if (step.id === currentStepId) {
                status = 'active';
            }
            
            if (missingFields.length > 0) {
                 if(step.id < currentStepId) status = 'with-observations';
            } else if (step.id < currentStepId) {
                status = 'completed';
            }
            
            if (status === 'active' && missingFields.length > 0) {
                 status = 'with-observations';
            }

            return {
                ...step,
                status,
                errorCount: missingFields.length,
                tooltip: missingFields.length > 0 ? `Faltan campos: ${missingFields.join(', ')}` : 'Paso completo'
            };
        });
    }, [formData, currentStepId]);


    // --- Handlers ---
    const getAccionStatus = (accion) => { 
        if (accion.cierre && accion.cierre.fecha) return 'cumplido';
        const today = new Date(); today.setHours(23, 59, 59, 999);
        let isOverdue = false;
        accion.planMejora.forEach((plan, planIndex) => {
            const performedCount = accion.seguimientoPlan.filter(s => s.planId == planIndex).length;
            plan.fechasSeguimiento.forEach((fecha, fechaIndex) => {
                if (fechaIndex >= performedCount) {
                    if (fecha) {
                        const [year, month] = fecha.split('-').map(Number);
                        const dueDate = new Date(year, month, 0); 
                        if (dueDate < today) isOverdue = true;
                    }
                }
            });
            if (isOverdue) return;
        });
        return isOverdue ? 'vencido' : 'pendiente';
     };
    const updateForm = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
    const updateNestedForm = (section, field, value) => setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
    const addItemToArray = (arrayName, newItem) => setFormData(prev => ({ ...prev, [arrayName]: [...prev[arrayName], newItem] }));
    const removeItemFromArray = (arrayName, index) => setFormData(prev => ({ ...prev, [arrayName]: prev[arrayName].filter((_, i) => i !== index) }));
    const updateArrayItem = (arrayName, index, field, value) => setFormData(prev => ({ ...prev, [arrayName]: prev[arrayName].map((item, i) => i === index ? { ...item, [field]: value } : item)}));
    const addFechaSeguimiento = (planIndex) => { setFormData(prev => { const newPlanMejora = [...prev.planMejora]; const plan = { ...newPlanMejora[planIndex] }; const newFechas = [...plan.fechasSeguimiento, '']; plan.fechasSeguimiento = newFechas; newPlanMejora[planIndex] = plan; return { ...prev, planMejora: newPlanMejora }; }); };
    const removeFechaSeguimiento = (planIndex, fechaIndex) => { setFormData(prev => { const newPlanMejora = [...prev.planMejora]; const plan = { ...newPlanMejora[planIndex] }; if (plan.fechasSeguimiento.length > 1) { const newFechas = plan.fechasSeguimiento.filter((_, i) => i !== fechaIndex); plan.fechasSeguimiento = newFechas; newPlanMejora[planIndex] = plan; } return { ...prev, planMejora: newPlanMejora }; }); };
    const updateFechaSeguimiento = (planIndex, fechaIndex, value) => { setFormData(prev => { const newPlanMejora = [...prev.planMejora]; const plan = { ...newPlanMejora[planIndex] }; const newFechas = [...plan.fechasSeguimiento]; newFechas[fechaIndex] = value; plan.fechasSeguimiento = newFechas; newPlanMejora[planIndex] = plan; return { ...prev, planMejora: newPlanMejora }; }); };
    
    const handleSave = () => { if (isSaveDisabled) { setModal({ isOpen: true, message: 'Por favor, complete todos los campos de "5 Porqués" antes de guardar.', type: 'error' }); return; } if (editingId !== null) { setListaAcciones(listaAcciones.map(accion => accion.id === editingId ? { ...formData, id: editingId } : accion )); setModal({ isOpen: true, message: 'Acción actualizada correctamente.', type: 'success' }); } else { const newAction = { ...formData, id: Date.now() }; setListaAcciones([...listaAcciones, newAction]); setModal({ isOpen: true, message: 'Acción guardada correctamente.', type: 'success' }); } setFormData(initialFormData); setEditingId(null); setCurrentStepId(0); setView('list'); };
    const handleEdit = (id) => { const actionToEdit = listaAcciones.find(accion => accion.id === id); if (actionToEdit) { setFormData(actionToEdit); setEditingId(id); setCurrentStepId(0); setView('form'); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
    const handleCreateNew = () => { setFormData(initialFormData); setEditingId(null); setCurrentStepId(0); setView('form'); };
    const handleDelete = (id) => { setListaAcciones(listaAcciones.filter(accion => accion.id !== id)); setModal({ isOpen: true, message: 'Acción eliminada.', type: 'info' }); };
    const requestSort = (key) => { let direction = 'ascending'; if (sortConfig.key === key && sortConfig.direction === 'ascending') { direction = 'descending'; } setSortConfig({ key, direction }); };
    
    const handleDownloadExcel = () => {
        if (typeof XLSX === 'undefined') {
            setModal({ isOpen: true, message: 'La librería para exportar a Excel no está lista. Por favor, espere un momento y vuelva a intentarlo.', type: 'error' });
            return;
        }

        const today = new Date();
        const formattedDate = today.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

        const ambitoLabels = { "direccion_organizacion": "Dirección de Organización", "formacion_integral": "Formación Integral", "gestion_administrativa_financiera": "Gestión Administrativa y Financiera", "talento_humano": "Talento Humano"};
        const procesoLabels = { "admision_matricula": "Admisión y Matrícula", "ambiente_escolar": "Ambiente Escolar", "bienestar_institucional": "Bienestar Institucional", "comunicaciones": "Comunicaciones", "compras_contratacion": "Compras y Contratación", "desarrollo_humano": "Desarrollo Humano", "direccionamiento_estrategico": "Direccionamiento Estratégico", "ensenanza_aprendizaje": "Enseñanza Aprendizaje", "facturacion": "Facturación", "gestion_financiera": "Gestión Financiera", "mantenimiento_planta_fisica": "Mantenimiento Planta Física", "mantenimiento_sistemas": "Mantenimiento Sistemas", "promocion": "Promoción", "recaudo_cartera": "Recaudo y Cartera", "revision_mejora": "Revisión y Mejora" };
        const tipoAccionLabels = { 'correctiva': 'Correctiva', 'directa': 'Directa', 'preventiva': 'Preventiva', 'planMejora': 'Plan de Mejora' };

        const titleRow = [`Informe de Acciones de Mejora - Generado el: ${formattedDate}`];
        const headers = ['ID', 'Tipo', 'Fecha Creación', 'Ámbito', 'Proceso', 'Responsable', 'Estado'];

        const dataRows = filteredAndSortedAcciones.map(accion => ([
            `#${accion.id.toString().slice(-5)}`,
            tipoAccionLabels[accion.tipoAccion] || accion.tipoAccion,
            accion.fecha,
            ambitoLabels[accion.ambito] || accion.ambito,
            procesoLabels[accion.proceso] || accion.proceso,
            accion.descripcion.responsable,
            getAccionStatus(accion)
        ]));

        const sheetData = [ titleRow, [], headers, ...dataRows ];

        const ws = XLSX.utils.aoa_to_sheet(sheetData);

        const colWidths = [ { wch: 10 }, { wch: 15 }, { wch: 15 }, { wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 15 } ];
        ws['!cols'] = colWidths;
        ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } }];
        
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Informe');
        
        XLSX.writeFile(wb, `Informe_Acciones_${new Date().toISOString().slice(0,10)}.xlsx`);
    };
    
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const resetFilters = () => {
        setFilters({ tipoAccion: 'all', estado: 'all', proceso: 'all', responsable: '', fechaDesde: '', fechaHasta: '' });
    };
    
    const filteredAndSortedAcciones = useMemo(() => {
        let filteredItems = [...listaAcciones];

        if (filters.tipoAccion !== 'all') { filteredItems = filteredItems.filter(accion => accion.tipoAccion === filters.tipoAccion); }
        if (filters.estado !== 'all') { filteredItems = filteredItems.filter(accion => getAccionStatus(accion) === filters.estado); }
        if (filters.proceso !== 'all') { filteredItems = filteredItems.filter(accion => accion.proceso === filters.proceso); }
        if (filters.responsable.trim() !== '') { filteredItems = filteredItems.filter(accion => accion.descripcion.responsable.toLowerCase().includes(filters.responsable.toLowerCase())); }
        if (filters.fechaDesde) { filteredItems = filteredItems.filter(accion => accion.fecha >= filters.fechaDesde); }
        if (filters.fechaHasta) { filteredItems = filteredItems.filter(accion => accion.fecha <= filters.fechaHasta); }

        if (sortConfig.key !== null) { 
            filteredItems.sort((a, b) => { 
                let keyA, keyB; 
                if (sortConfig.key === 'estado') { keyA = getAccionStatus(a); keyB = getAccionStatus(b); } 
                else { keyA = sortConfig.key === 'responsable' ? a.descripcion.responsable : a[sortConfig.key]; keyB = sortConfig.key === 'responsable' ? b.descripcion.responsable : b[sortConfig.key]; } 
                if (keyA < keyB) return sortConfig.direction === 'ascending' ? -1 : 1; 
                if (keyA > keyB) return sortConfig.direction === 'ascending' ? 1 : -1; 
                return 0; 
            }); 
        } 
        return filteredItems; 
    }, [listaAcciones, sortConfig, filters]);
    
    // --- UPDATED: Validation logic for save button ---
    const isSaveDisabled = useMemo(() => {
        const { tipoAccion, ambito, proceso, fecha, fuente, analisisCausas } = formData;
        
        const infoGeneralIncomplete = !tipoAccion || !ambito || !proceso || !fecha || !fuente;
        if (infoGeneralIncomplete) {
            return true;
        }

        const analisisIncomplete = analisisCausas.causas.some(causa => 
             causa.cincoPorque.some(porque => porque.trim() === '')
        );
        if (analisisIncomplete) {
            return true;
        }

        return false;
    }, [formData]);

    const handleNext = () => { if (currentStepId < stepDefinitions.length - 1) setCurrentStepId(currentStepId + 1); };
    const handlePrev = () => { if (currentStepId > 0) setCurrentStepId(currentStepId - 1); };

    const renderCurrentStep = () => {
        const props = { formData, updateForm, updateNestedForm, addItemToArray, removeItemFromArray, updateArrayItem, handleSave, editingId, isSaveDisabled, addFechaSeguimiento, removeFechaSeguimiento, updateFechaSeguimiento };
        switch (currentStepId) {
            case 0: return <InformacionGeneral {...props} />;
            case 1: return <DescripcionNC {...props} />;
            case 2: return <AccionDirecta {...props} />;
            case 3: return <AnalisisCausas {...props} />;
            case 4: return <PlanMejora {...props} />;
            case 5: return <AnalisisRiesgos {...props} />;
            case 6: return <CierreAccion {...props} />;
            default: return <InformacionGeneral {...props} />;
        }
    };
    
    const Modal = () => { if (!modal.isOpen) return null; const modalConfig = { success: { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-700', icon: <CheckCircle /> }, error: { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-700', icon: <AlertTriangle /> }, info: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-700', icon: <AlertTriangle /> } }; const config = modalConfig[modal.type]; return (<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in-fast"><div className={`relative p-6 rounded-lg shadow-xl border-t-4 ${config.bg} ${config.border} ${config.text} flex items-center gap-4`}><div className="text-2xl">{config.icon}</div><p>{modal.message}</p><button onClick={() => setModal({ ...modal, isOpen: false })} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"><X size={20} /></button></div></div>); };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen font-sans">
            <Modal />
            
            {view === 'list' && <AppHeader />}

            {view === 'list' && (
                <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
                    <div className="flex flex-wrap gap-3 mb-6 border-b pb-6">
                        <button onClick={handleCreateNew} className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors shadow"><Plus size={16} /> Crear Nueva Acción</button>
                        <button onClick={handleDownloadExcel} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow"><Download size={16} /> Descargar Informe (Excel)</button>
                    </div>

                    {/* --- NEW: Filter Controls --- */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                         <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2"><Filter size={18}/> Filtros</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                             <select name="tipoAccion" value={filters.tipoAccion} onChange={handleFilterChange} className="w-full p-2 border rounded-md bg-white">
                                 <option value="all">Todos los Tipos</option>
                                 <option value="correctiva">Correctiva</option><option value="directa">Directa</option><option value="preventiva">Preventiva</option><option value="planMejora">Plan de Mejora</option>
                             </select>
                             <select name="estado" value={filters.estado} onChange={handleFilterChange} className="w-full p-2 border rounded-md bg-white">
                                <option value="all">Todos los Estados</option>
                                <option value="pendiente">Pendiente</option><option value="cumplido">Cumplido</option><option value="vencido">Vencido</option>
                             </select>
                             <select name="proceso" value={filters.proceso} onChange={handleFilterChange} className="w-full p-2 border rounded-md bg-white">
                                 <option value="all">Todos los Procesos</option>
                                 <option value="admision_matricula">Admisión y Matrícula</option><option value="ambiente_escolar">Ambiente Escolar</option><option value="bienestar_institucional">Bienestar Institucional</option><option value="comunicaciones">Comunicaciones</option><option value="compras_contratacion">Compras y Contratación</option><option value="desarrollo_humano">Desarrollo Humano</option><option value="direccionamiento_estrategico">Direccionamiento Estratégico</option><option value="ensenanza_aprendizaje">Enseñanza Aprendizaje</option><option value="facturacion">Facturación</option><option value="gestion_financiera">Gestión Financiera</option><option value="mantenimiento_planta_fisica">Mantenimiento Planta Física</option><option value="mantenimiento_sistemas">Mantenimiento Sistemas</option><option value="promocion">Promoción</option><option value="recaudo_cartera">Recaudo y Cartera</option><option value="revision_mejora">Revisión y Mejora</option>
                             </select>
                             <input type="text" name="responsable" placeholder="Filtrar por responsable..." value={filters.responsable} onChange={handleFilterChange} className="w-full p-2 border rounded-md" />
                             <div><label className="text-xs text-gray-500">Desde:</label><input type="month" name="fechaDesde" value={filters.fechaDesde} onChange={handleFilterChange} className="w-full p-2 border rounded-md" /></div>
                             <div><label className="text-xs text-gray-500">Hasta:</label><input type="month" name="fechaHasta" value={filters.fechaHasta} onChange={handleFilterChange} className="w-full p-2 border rounded-md" /></div>
                         </div>
                         <div className="mt-4 flex justify-end">
                            <button onClick={resetFilters} className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 font-medium py-1 px-3 rounded-lg hover:bg-red-50">
                                <XCircle size={16}/> Limpiar Filtros
                            </button>
                         </div>
                    </div>

                    <h2 className="text-2xl font-semibold mb-6 text-white bg-green-700 text-center p-4 rounded-lg">Listado de Acciones Creadas</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                           <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('id')}><div className="flex items-center gap-2">ID <ArrowUpDown size={14}/></div></th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('tipoAccion')}><div className="flex items-center gap-2">Tipo <ArrowUpDown size={14}/></div></th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('fecha')}><div className="flex items-center gap-2">Fecha <ArrowUpDown size={14}/></div></th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('proceso')}><div className="flex items-center gap-2">Proceso <ArrowUpDown size={14}/></div></th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('responsable')}><div className="flex items-center gap-2">Responsable <ArrowUpDown size={14}/></div></th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('estado')}><div className="flex items-center gap-2">Estado <ArrowUpDown size={14}/></div></th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th></tr></thead>
                           <tbody className="bg-white divide-y divide-gray-200">{filteredAndSortedAcciones.map(accion => (<tr key={accion.id} className="hover:bg-gray-50"><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{accion.id.toString().slice(-5)}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{accion.tipoAccion}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{accion.fecha}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{accion.proceso}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{accion.descripcion.responsable}</td><td className="px-6 py-4 whitespace-nowrap"><StatusBar status={getAccionStatus(accion)} /></td><td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><button onClick={() => handleEdit(accion.id)} className="text-yellow-600 hover:text-yellow-900 mr-4" aria-label="Editar"><Edit size={16}/></button><button onClick={() => handleDelete(accion.id)} className="text-red-600 hover:text-red-900" aria-label="Eliminar"><Trash2 size={16}/></button></td></tr>))}</tbody>
                        </table>
                    </div>
                </div>
            )}

            {view === 'form' && (
                <div className="md:grid md:grid-cols-12 md:gap-x-8">
                    <aside className="md:col-span-4 lg:col-span-3 md:sticky md:top-0 md:h-screen py-6">
                         <IntelligentStepper steps={managedSteps} currentStepId={currentStepId} setCurrentStepId={setCurrentStepId} />
                    </aside>
                    <div className="md:col-span-8 lg:col-span-9 flex flex-col">
                        <main className="flex-grow py-6">
                             <div className="bg-white p-6 rounded-xl shadow-lg">
                                 <h2 className="text-2xl font-semibold mb-6 text-white bg-green-700 text-center p-4 rounded-lg">
                                    {editingId ? `Editando Acción #${editingId.toString().slice(-5)}` : 'Crear Nueva Acción'}
                                </h2>
                                <h3 className="text-xl font-semibold mb-4 text-gray-700">{stepDefinitions[currentStepId].title}</h3>
                                {renderCurrentStep()}
                            </div>
                        </main>
                        <BottomNavBar 
                            currentStepId={currentStepId} 
                            steps={managedSteps}
                            onNext={handleNext}
                            onPrev={handlePrev}
                            onSaveDraft={() => alert('Guardando borrador...')}
                            setView={setView}
                         />
                    </div>
                </div>
            )}
            
            <button onClick={() => setIsHelpModalOpen(true)} className="fixed bottom-20 right-6 bg-green-700 text-white p-4 rounded-full shadow-lg hover:bg-green-800 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 z-40" aria-label="Abrir manual de usuario">
                <HelpCircle size={28} />
            </button>
            <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
        </div>
    );
};

export default SistemaAccionesCorrectivas;

