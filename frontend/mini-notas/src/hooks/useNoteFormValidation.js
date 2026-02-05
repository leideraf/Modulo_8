import { useState, useCallback } from 'react';

const validationRules = {
  titulo: (value) => {
    if (!value || value.trim() === '') {
      return 'El título es obligatorio.';
    }
    if (value.trim().length < 3) {
      return 'El título debe tener al menos 3 caracteres.';
    }
    if (value.trim().length > 50) {
      return 'El título no debe exceder 50 caracteres.';
    }
    return '';
  },

  contenido: (value) => {
    if (!value || value.trim() === '') {
      return 'El contenido es obligatorio.';
    }
    if (value.trim().length < 5) {
      return 'El contenido debe tener al menos 5 caracteres.';
    }
    if (value.trim().length > 500) {
      return 'El contenido no debe exceder 500 caracteres.';
    }
    return '';
  },

  categoria: (value) => {
    if (!value || value.trim() === '') {
      return 'Debes seleccionar una categoría.';
    }
    return '';
  }
};

const useNoteFormValidation = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validar un campo específico
  const validateField = useCallback((name, value) => {
    let error = '';

    if (validationRules[name]) {
      error = validationRules[name](value);
    }
    return error;
  }, []);

  // Manejar cambios en los inputs
  const handleChange = useCallback(
    (name, value) => {
      setValues((prev) => ({
        ...prev,
        [name]: value
      }));

      // Validar mientras escribe si ya tocó el campo
      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({
          ...prev,
          [name]: error
        }));
      }
    },
    [touched, validateField]
  );

  // Marcar campo como tocado y validar
  const handleBlur = useCallback(
    (name) => {
      setTouched((prev) => ({
        ...prev,
        [name]: true
      }));

      const error = validateField(name, values[name]);
      setErrors((prev) => ({
        ...prev,
        [name]: error
      }));
    },
    [values, validateField]
  );

  // Validar todos los campos
  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(values).forEach((name) => {
      const error = validateField(name, values[name]);
      newErrors[name] = error;
      if (error) {
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );

    return isValid;
  }, [values, validateField]);

  // Limpiar el formulario
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Obtener propiedades del campo para input
  const getFieldProps = useCallback(
    (name) => {
      const hasError = touched[name] && errors[name];
      const isValid = touched[name] && !errors[name] && values[name];

      return {
        value: values[name] || '',
        onChange: (e) => handleChange(name, e.target.value),
        onBlur: () => handleBlur(name),
        className: `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all
          ${
            hasError
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : isValid
                ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`,
        error: hasError ? errors[name] : '',
        isValid,
        hasError
      };
    },
    [values, errors, touched, handleChange, handleBlur]
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    getFieldProps
  };
};

export default useNoteFormValidation;