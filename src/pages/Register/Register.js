import styles from "./Register.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUser } from "../../apis/users";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Le champ est obligatoire")
      .min(2, "Le champ doit contenir 2 caractères"),
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
    // console.log(values);
    try {
      clearErrors();
      await createUser(values);
      navigate("/login");
    } catch (error) {
      setError("generic", { type: "generic", message: error });
    }
  }

  return (
    <div
      className={`flex-fill d-flex align-items-center justify-content-center`}
    >
      <form
        onSubmit={handleSubmit(submit)}
        className={`d-flex flex-column card p20 ${styles.form}`}
      >
        <h2>Register</h2>
        <div className="mb10 d-flex flex-column">
          <label htmlFor="name">Name</label>
          <input type="text" {...register("name")} id="name" />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>
        <div className="mb10 d-flex flex-column">
          <label htmlFor="email">Email</label>
          <input type="text" {...register("email")} id="email" />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
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
    </div>
  );
}
