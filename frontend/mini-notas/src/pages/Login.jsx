import { useNavigate, Link } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";

const Login = () => {
  const navigate = useNavigate();

  const { getFieldProps, validateAll, reset } = useFormValidation({
    email: "",
    password: "",
  });

  const emailProps = getFieldProps("email");
  const passwordProps = getFieldProps("password");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateAll()) {
      // ✅ Simulación JWT
      localStorage.setItem("token", "fake-jwt-token");

      reset();
      navigate("/notes");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-4">Iniciar sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" {...emailProps} />
          {emailProps.hasError && <p className="text-red-500">{emailProps.error}</p>}

          <input type="password" placeholder="Contraseña" {...passwordProps} />
          {passwordProps.hasError && <p className="text-red-500">{passwordProps.error}</p>}

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
