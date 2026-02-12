import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import useFormValidation from "../hooks/useFormValidation";

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const { getFieldProps, validateAll, reset } = useFormValidation({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    try {
      // Verificar si el usuario ya existe
      const existingUser = await axiosClient.get(
        `/users?email=${getFieldProps("email").value}`
      );

      if (existingUser.data.length > 0) {
        setErrorMessage("El usuario ya está registrado.");
        return;
      }

      // Crear usuario
      await axiosClient.post("/users", {
        username: getFieldProps("username").value,
        email: getFieldProps("email").value,
        password: getFieldProps("password").value,
      });

      reset();
      navigate("/login");
    } catch (error) {
  console.error("Error en registro:", error);
  setErrorMessage("Error al registrar usuario.");
}

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-4">Registro</h2>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-3">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input placeholder="Usuario" {...getFieldProps("username")} />
          <input placeholder="Email" {...getFieldProps("email")} />
          <input type="password" placeholder="Contraseña" {...getFieldProps("password")} />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            {...getFieldProps("confirmPassword")}
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Crear cuenta
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-600">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

