import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import useFormValidation from "../hooks/useFormValidation";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const { getFieldProps, validateAll, reset } = useFormValidation({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    try {
      const email = getFieldProps("email").value;
      const password = getFieldProps("password").value;

      // Buscar usuario en API
      const response = await axiosClient.get(
        `/users?email=${email}&password=${password}`
      );

      if (response.data.length === 0) {
        setErrorMessage("Credenciales incorrectas.");
        return;
      }

      // Simulación de JWT
      const fakeToken = "fake-jwt-token";
      localStorage.setItem("token", fakeToken);

      reset();
      navigate("/notes");
    } catch (error) {
      console.error("Error en login:", error);
  setErrorMessage("Error al iniciar sesión.");
}

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-4">
          Iniciar sesión
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-3">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" {...getFieldProps("email")} />
          <input type="password" placeholder="Contraseña" {...getFieldProps("password")} />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Ingresar
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-blue-600">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

