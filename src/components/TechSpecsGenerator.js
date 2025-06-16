import React, { useState, useEffect } from "react";
import { Plus, Trash2, Download, Eye, Edit3 } from "lucide-react";
import { toPng } from 'html-to-image';

const TechSpecsGenerator = () => {
  // Función para cargar datos desde localStorage
  const loadFromLocalStorage = () => {
    try {
      const savedData = localStorage.getItem('techSpecsData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        return parsed.fields || getDefaultFields();
      }
    } catch (error) {
      console.error('Error al cargar datos desde localStorage:', error);
    }
    return getDefaultFields();
  };

  // Función para obtener campos por defecto
  const getDefaultFields = () => [
    {
      id: 1,
      category: "CPU / GPU",
      value: "Lorem ipsum dolor sit amet",
      categoryColor: "#1E2137",
      categoryTextColor: "#ef4444",
      categoryFont: "sans-serif",
      categoryFontSize: 12,
      categoryFontWeight: "600",
      valueColor: "#ffffff",
      valueFont: "sans-serif",
    },
    {
      id: 2,
      category: "RAM",
      value: "Lorem ipsum dolor sit amet",
      categoryColor: "#1E2137",
      categoryTextColor: "#ef4444",
      categoryFont: "sans-serif",
      categoryFontSize: 12,
      categoryFontWeight: "600",
      valueColor: "#ffffff",
      valueFont: "sans-serif",
    },
    {
      id: 3,
      category: "Almacenamiento",
      value: "Lorem ipsum dolor sit amet",
      categoryColor: "#1E2137",
      categoryTextColor: "#ef4444",
      categoryFont: "sans-serif",
      categoryFontSize: 12,
      categoryFontWeight: "600",
      valueColor: "#ffffff",
      valueFont: "sans-serif",
    },
    {
      id: 4,
      category: "Pantalla",
      value: 'Lorem ipsum dolor sit amet',
      categoryColor: "#1E2137",
      categoryTextColor: "#eab308",
      categoryFont: "sans-serif",
      categoryFontSize: 12,
      categoryFontWeight: "600",
      valueColor: "#ffffff",
      valueFont: "sans-serif",
    },
    {
      id: 5,
      category: "Batería",
      value: "Lorem ipsum dolor sit amet",
      categoryColor: "#1E2137",
      categoryTextColor: "#eab308",
      categoryFont: "sans-serif",
      categoryFontSize: 12,
      categoryFontWeight: "600",
      valueColor: "#ffffff",
      valueFont: "sans-serif",
    },
    {
      id: 6,
      category: "Peso",
      value: "Lorem ipsum dolor sit amet",
      categoryColor: "#1E2137",
      categoryTextColor: "#eab308",
      categoryFont: "sans-serif",
      categoryFontSize: 12,
      categoryFontWeight: "600",
      valueColor: "#ffffff",
      valueFont: "sans-serif",
    },
    {
      id: 7,
      category: "Conectividad",
      value: "Lorem ipsum dolor sit amet",
      categoryColor: "#1E2137",
      categoryTextColor: "#22c55e",
      categoryFont: "sans-serif",
      categoryFontSize: 12,
      categoryFontWeight: "600",
      valueColor: "#ffffff",
      valueFont: "sans-serif",
    },
    {
      id: 8,
      category: "Sistema Operativo",
      value: "Lorem ipsum dolor sit amet",
      categoryColor: "#1E2137",
      categoryTextColor: "#22c55e",
      categoryFont: "sans-serif",
      categoryFontSize: 12,
      categoryFontWeight: "600",
      valueColor: "#ffffff",
      valueFont: "sans-serif",
    },
    {
      id: 9,
      category: "Otros",
      value: "Lorem ipsum dolor sit amet",
      categoryColor: "#1E2137",
      categoryTextColor: "#22c55e",
      categoryFont: "sans-serif",
      categoryFontSize: 12,
      categoryFontWeight: "600",
      valueColor: "#ffffff",
      valueFont: "sans-serif",
    }
  ];

  const [fields, setFields] = useState(loadFromLocalStorage);
  const [editingFieldId, setEditingFieldId] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  // Función para guardar en localStorage
  const saveToLocalStorage = (fieldsData) => {
    try {
      const dataToSave = {
        fields: fieldsData,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('techSpecsData', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  };

  // Effect para guardar automáticamente cuando cambian los fields
  useEffect(() => {
    saveToLocalStorage(fields);
  }, [fields]);

  const addField = () => {
    const newField = {
      id: Date.now(),
      category: "Nueva categoría",
      value: "Lorem ipsum dolor sit amet",
      categoryColor: "#6b7280",
      categoryTextColor: "#000000",
      categoryFont: "sans-serif",
      categoryFontSize: 12,
      categoryFontWeight: "600",
      valueColor: "#ffffff",
      valueFont: "sans-serif",
    };
    setFields([...fields, newField]);
  };

  const deleteField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateField = (id, updates) => {
    console.log('UpdateField llamado:', id, updates); // Debug
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, ...updates } : field))
    );
  };

  // Función para resetear todos los datos
  const resetAllData = () => {
    if (window.confirm('¿Estás seguro de que quieres resetear todos los datos? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('techSpecsData');
      setFields(getDefaultFields());
    }
  };

  const exportAsImage = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('spec-card');

      // ✅ 1) Añade padding temporalmente
      const originalPadding = element.style.padding;
      element.style.padding = '20px';

      const dataUrl = await toPng(element, {
        backgroundColor: '#1E2137',
        pixelRatio: 2,
        cacheBust: true,
      });

      // ✅ 2) Restaurar padding original
      element.style.padding = originalPadding;

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'tech-specs.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      //alert('✅ Exportado correctamente con márgenes!');
    } catch (error) {
      console.error(error);
      alert('❌ Error al exportar');
    } finally {
      setIsExporting(false);
    }
  };

  const colorPresets = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#1e2137",
  ];

  const fontOptions = [
    "sans-serif",
    "serif",
    "monospace",
    "Courier New, Courier, monospace",
    "Roboto, sans-serif",
    "Georgia, serif",
    "Times New Roman, Times, serif",
    "Comic Sans MS, cursive, sans-serif",
    "Verdana, sans-serif",
    "Tahoma, sans-serif",
  ];

  const SpecCard = ({ field, onDelete, onEdit }) => {
    return (
      <div className="relative group" data-field-id={field.id}>
        <div className="relative">
          <div
            className="category-label absolute -top-2 left-3 px-2 py-1 rounded z-10"
            style={{
              backgroundColor: field.categoryColor,
              color: field.categoryTextColor,
              fontFamily: field.categoryFont,
              fontSize: `${field.categoryFontSize}px`,
              fontWeight: field.categoryFontWeight,
            }}
          >
            {field.category}
          </div>

          <div
            className="rounded-lg px-4 pt-4 pb-1 border-2 transition-all duration-200 hover:border-gray-400 min-h-[50px] flex items-center"
            style={{
              backgroundColor: "#1E2137",
              borderColor: "#4b5563",
            }}
          >
            <div
              className="value-text text-base font-medium leading-tight"
              style={{ color: field.valueColor, fontFamily: field.valueFont }}
            >
              {field.value}
            </div>
          </div>
        </div>

        <div className="absolute top-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
          <button
            onClick={() => onEdit(field.id)}
            className="p-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            <Edit3 size={12} />
          </button>
          <button
            onClick={() => onDelete(field.id)}
            className="p-1 bg-red-600 hover:bg-red-700 rounded text-white"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    );
  };

  const EditModal = ({ initialField, onSave, onClose }) => {
    const [localEditData, setLocalEditData] = useState(() => {
      console.log('Inicializando EditModal con:', initialField);
      return { ...initialField };
    });

    const handleChange = (updates) => {
      console.log('HandleChange llamado con:', updates);
      setLocalEditData(prev => {
        const updated = { ...prev, ...updates };
        console.log('Nuevo localEditData:', updated);
        
        // Vista previa en tiempo real - actualizar directamente el DOM
        updatePreview(updated);
        
        return updated;
      });
    };

    const updatePreview = (data) => {
      // Buscar la tarjeta que se está editando y actualizar su estilo
      const cardElement = document.querySelector(`[data-field-id="${initialField.id}"]`);
      if (cardElement) {
        const categoryElement = cardElement.querySelector('.category-label');
        const valueElement = cardElement.querySelector('.value-text');
        
        if (categoryElement) {
          categoryElement.style.backgroundColor = data.categoryColor;
          categoryElement.style.color = data.categoryTextColor;
          categoryElement.style.fontFamily = data.categoryFont;
          categoryElement.style.fontSize = `${data.categoryFontSize}px`;
          categoryElement.style.fontWeight = data.categoryFontWeight;
          categoryElement.textContent = data.category;
        }
        
        if (valueElement) {
          valueElement.style.color = data.valueColor;
          valueElement.style.fontFamily = data.valueFont;
          valueElement.textContent = data.value;
        }
      }
    };

    const resetPreview = () => {
      // Restaurar el estilo original
      const cardElement = document.querySelector(`[data-field-id="${initialField.id}"]`);
      if (cardElement) {
        const categoryElement = cardElement.querySelector('.category-label');
        const valueElement = cardElement.querySelector('.value-text');
        
        if (categoryElement) {
          categoryElement.style.backgroundColor = initialField.categoryColor;
          categoryElement.style.color = initialField.categoryTextColor;
          categoryElement.style.fontFamily = initialField.categoryFont;
          categoryElement.style.fontSize = `${initialField.categoryFontSize}px`;
          categoryElement.style.fontWeight = initialField.categoryFontWeight;
          categoryElement.textContent = initialField.category;
        }
        
        if (valueElement) {
          valueElement.style.color = initialField.valueColor;
          valueElement.style.fontFamily = initialField.valueFont;
          valueElement.textContent = initialField.value;
        }
      }
    };

    const handleSave = () => {
      console.log('Guardando:', localEditData);
      onSave(initialField.id, localEditData);
      onClose();
    };

    const handleClose = () => {
      resetPreview();
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded-lg w-96 max-w-full mx-4 overflow-y-auto max-h-[90vh]">
          <h3 className="text-xl font-bold text-white mb-4">Editar Campo</h3>

          <div className="space-y-4">
            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Categoría
              </label>
              <input
                type="text"
                value={localEditData.category}
                onChange={(e) => handleChange({ category: e.target.value })}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>

            {/* Valor */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Valor
              </label>
              <input
                type="text"
                value={localEditData.value}
                onChange={(e) => handleChange({ value: e.target.value })}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>

            {/* Colores */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Color Fondo Categoría
              </label>
              <div className="flex gap-2 mb-2">
                {colorPresets.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleChange({ categoryColor: color })}
                    className="w-8 h-8 rounded border-2 border-gray-600 hover:border-white"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <input
                type="color"
                value={localEditData.categoryColor}
                onChange={(e) => handleChange({ categoryColor: e.target.value })}
                className="w-full h-10 bg-gray-700 border border-gray-600 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Color Texto Categoría
              </label>
              <div className="flex gap-2 mb-2">
                {colorPresets.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleChange({ categoryTextColor: color })}
                    className="w-8 h-8 rounded border-2 border-gray-600 hover:border-white"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <input
                type="color"
                value={localEditData.categoryTextColor}
                onChange={(e) =>
                  handleChange({ categoryTextColor: e.target.value })
                }
                className="w-full h-10 bg-gray-700 border border-gray-600 rounded"
              />
            </div>

            {/* Fuente */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Fuente Categoría
              </label>
              <select
                value={localEditData.categoryFont}
                onChange={(e) => handleChange({ categoryFont: e.target.value })}
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                {fontOptions.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Tamaño Fuente Categoría (px)
              </label>
              <input
                type="number"
                min="8"
                value={localEditData.categoryFontSize}
                onChange={(e) =>
                  handleChange({
                    categoryFontSize: parseInt(e.target.value) || 12,
                  })
                }
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Peso Fuente Categoría
              </label>
              <select
                value={localEditData.categoryFontWeight}
                onChange={(e) =>
                  handleChange({ categoryFontWeight: e.target.value })
                }
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                <option value="400">Normal (400)</option>
                <option value="600">Semibold (600)</option>
                <option value="700">Bold (700)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Color Valor
              </label>
              <input
                type="color"
                value={localEditData.valueColor}
                onChange={(e) => handleChange({ valueColor: e.target.value })}
                className="w-full h-10 bg-gray-700 border border-gray-600 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Fuente Valor
              </label>
              <select
                value={localEditData.valueFont}
                onChange={(e) => handleChange({ valueFont: e.target.value })}
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                {fontOptions.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Guardar
            </button>
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen p-8" style={{ backgroundColor: "#1E2137" }}>
      <div className="max-w-6xl mx-auto">
        <div className="relative justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Generador de Infográficos de Especificaciones
          </h1>
          <div className="flex gap-3">
            <button
              onClick={addField}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              <Plus size={20} />
              Agregar Campo
            </button>
            <button
              onClick={exportAsImage}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              <Download size={20} />
              Exportar
            </button>
            <button
              onClick={resetAllData}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              <Trash2 size={20} />
              Resetear Todo
            </button>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-400 text-sm">
            ✅ Todos los cambios se guardan automáticamente en tu navegador
          </p>
        </div>

        <div id="spec-card" className="inline-grid grid-cols-3 gap-x-6 gap-y-4 auto-rows-min">
          {fields.map((field) => (
            <SpecCard
              key={field.id}
              field={field}
              onDelete={deleteField}
              onEdit={(id) => {
                setEditingFieldId(id);
              }}
            />
          ))}
        </div>

        {editingFieldId && (
          <EditModal
            key={editingFieldId}
            initialField={fields.find((f) => f.id === editingFieldId)}
            onSave={updateField}
            onClose={() => {
              setEditingFieldId(null);
            }}
          />
        )}
      </div>

      <footer className="fixed bottom-0 left-0 w-full text-center text-sm text-white/60 bg-[#0f0c29] py-2 border-t border-white/10">
        Made by <span className="font-semibold">Zulux91</span> with 💗 using <span className="inline-flex items-center gap-1 text-cyan-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3" fill="currentColor" className="w-4 h-4">
            <path d="M666.3 296.5c0-40.3-31.3-74.1-71.3-78.7 5.1-12.4 7.8-26 7.8-40.2 0-60.3-49-109.3-109.3-109.3-28.3 0-54 10.8-73.4 28.5-19.4-17.7-45.1-28.5-73.4-28.5-60.3 0-109.3 49-109.3 109.3 0 14.2 2.7 27.8 7.8 40.2-40 4.6-71.3 38.4-71.3 78.7 0 43.8 35.5 79.3 79.3 79.3h44.8c19.8 0 38.1-8.7 51.4-22.6 13.3 13.9 31.6 22.6 51.4 22.6s38.1-8.7 51.4-22.6c13.3 13.9 31.6 22.6 51.4 22.6h44.8c43.7 0 79.3-35.5 79.3-79.3z"/>
          </svg> React
        </span>
      </footer>
      <div style={{ height: "20px" }}></div>
    </div>
  );
};

export default TechSpecsGenerator;