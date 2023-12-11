import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { AuthContext } from "../../context";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { login, user } = useContext(AuthContext);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Le champ est obligatoire")
      .email("L'email n'est pas valide"),
    password: yup.string().required("Le champ est obligatoire"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });

  async function submit(values) {
    try {
      clearErrors();
      await login(values);
    } catch (error) {
      setError("generic", { type: "generic", message: error });
    }
  }

  return (
    <div
      className={`flex-fill d-flex align-items-center justify-content-center`}
    >
      {user ? (
        <Navigate to="/profile" />
      ) : (
        <form
          onSubmit={handleSubmit(submit)}
          className={`d-flex flex-column card p20 ${styles.form}`}
        >
          <h2>Login</h2>
          <div className="mb10 d-flex flex-column">
            <label htmlFor="email">Email</label>
            <input type="text" {...register("email")} id="email" />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>
          <div className="mb10 d-flex flex-column">
            <label htmlFor="password">Password</label>
            <input type="password" {...register("password")} id="password" />
            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>
          {errors.generic && (
            <p className="form-error">{errors.generic.message}</p>
          )}
          <div className="mb10">
            <button disabled={isSubmitting} className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
