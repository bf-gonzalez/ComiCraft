export const validateRegister = (values: { [key: string]: string }) => {
  const errors: { [key: string]: string } = {};

  if (!values.name) {
      errors.name = "El nombre es requerido";
  }

  if (!values.email) {
      errors.email = "El email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "El email no es válido";
  }

  if (!values.password) {
      errors.password = "La contraseña es requerida";
  } else if (values.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Las contraseñas deben coincidir";
  }

  if (!/^\d{10,}$/.test(values.phone)) {
      errors.phone = "El teléfono debe tener al menos 10 dígitos";
  }

  if (!values.address) {
      errors.address = "La dirección es requerida";
  }

  if (!values.dob) {
      errors.dob = "La fecha de nacimiento es requerida";
  } else {
      const today = new Date();
      const dob = new Date(values.birthdate);
      if (dob > today) {
          errors.birthdate = "La fecha de nacimiento no puede ser futura";
      } else {
          let age = today.getFullYear() - dob.getFullYear();
          const monthDifference = today.getMonth() - dob.getMonth();
          if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
              age--;
          }
          if (age < 18) {
              errors.birthdate = "Debes tener al menos 18 años";
          }
      }
  }

  return errors;
};

export const validateCompleteProfile = (values: { [key: string]: string }) => {
    const errors: { [key: string]: string } = {};
  

  
  
    if (!values.password) {
        errors.password = "La contraseña es requerida";
    } else if (values.password.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres";
    }
  
    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Las contraseñas deben coincidir";
    }
  
    if (!/^\d{10,}$/.test(values.phone)) {
        errors.phone = "El teléfono debe tener al menos 10 dígitos";
    }
  
    if (!values.address) {
        errors.address = "La dirección es requerida";
    }
  
    if (!values.dob) {
        errors.dob = "La fecha de nacimiento es requerida";
    } else {
        const today = new Date();
        const dob = new Date(values.birthdate);
        if (dob > today) {
            errors.birthdate = "La fecha de nacimiento no puede ser futura";
        } else {
            let age = today.getFullYear() - dob.getFullYear();
            const monthDifference = today.getMonth() - dob.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            if (age < 18) {
                errors.birthdate = "Debes tener al menos 18 años";
            }
        }
    }
  
    return errors;
  };
