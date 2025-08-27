
import React, { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

const initialFormData = {
    id: null,
    tipoAccion: 'correctiva',
    ambito: '',
    proceso: '',
    fecha: new Date().toISOString().split('T')[0],
    fuente: '',
    descripcion: {
        requisito: '',
        descripcionNC: '',
        evidencia: '',
        responsable: ''
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
        cincoPorque: ['', '', ''],
        causaRaiz: ''
    },
    planMejora: [],
    seguimientoAcciones: [],
    seguimientoPlan: [],
    analisisRiesgos: ''
};

export const FormProvider = ({ children, actionToEdit }) => {
    const [formData, setFormData] = useState(actionToEdit || initialFormData);

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
    
    const resetForm = () => {
        setFormData(initialFormData);
    }

    const value = {
        formData,
        setFormData,
        updateForm,
        updateNestedForm,
        addItemToArray,
        removeItemFromArray,
        updateArrayItem,
        resetForm,
        initialFormData
    };

    return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
