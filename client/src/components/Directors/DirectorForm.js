import React from "react";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { emptyDirector } from "../../constants";
import {
  createDirector,
  updateDirector,
} from "../../store/slices/directorsSlice";

function DirectorForm() {
  const dispatch = useDispatch();

  const {
    directorsList: { directors },
  } = useSelector((state) => state);

  const { id } = useParams();

  const navigate = useNavigate();

  const currentDirector = directors.find(
    (director) => director.id === parseInt(id)
  );

  const schema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
  });

  const goHome = () => navigate("/directors");

  const onDirectorSubmit = (values) => {
    !values.id
      ? dispatch(createDirector(values))
      : dispatch(updateDirector(values));
  };

  const renderForm = ({ isValid, values }) => {
    return (
      <Form id="form">
        <h1>Directors</h1>
        <Stack className="field-container">
          <Stack
            direction="row"
            spacing={2}
            sx={{
              bgcolor: "primary.dark",
              color: "white",
              pl: "10px",
            }}
          >
            <label htmlFor="fullName" className="label">
              Full Name
            </label>
            <Field name="fullName" style={{ fontSize: "30px" }} />
          </Stack>
          <ErrorMessage name="fullName">
            {(msg) => <div className="error">{msg}</div>}
          </ErrorMessage>
        </Stack>
        <Stack className="field-container">
          <Stack
            direction="row"
            spacing={2}
            sx={{
              bgcolor: "primary.dark",
              color: "white",
              pl: "10px",
            }}
          >
            <label htmlFor="birthYear" className="label">
              Birth Year
            </label>
            <Field name="birthYear" style={{ fontSize: "30px" }} />
          </Stack>
          <ErrorMessage name="birthYear">
            {(msg) => <div className="error">{msg}</div>}
          </ErrorMessage>
        </Stack>
        <Stack className="field-container">
          <Stack
            direction="row"
            spacing={2}
            sx={{
              bgcolor: "primary.dark",
              color: "white",
              pl: "10px",
            }}
          >
            <label htmlFor="nationality" className="label">
              Nationality
            </label>
            <Field name="nationality" style={{ fontSize: "30px" }} />
          </Stack>
          <ErrorMessage name="nationality">
            {(msg) => <div className="error">{msg}</div>}
          </ErrorMessage>
        </Stack>
        <fieldset className="items-container">
          <legend>Movies</legend>
          <FieldArray name="films">
            {(fieldArrayProps) => {
              const { push, remove } = fieldArrayProps;
              const { films } = values;
              return (
                <Stack spacing={2}>
                  {films.map((_, id) => (
                    <Stack direction="row" key={nanoid()} spacing={2}>
                      <Field
                        name={`films[${id}]`}
                        style={{ fontSize: "30px" }}
                      ></Field>
                      {id > 0 && (
                        <Button
                          type="button"
                          variant="contained"
                          size="small"
                          startIcon={<RemoveIcon />}
                          onClick={() => remove(id)}
                        ></Button>
                      )}
                      <Button
                        variant="contained"
                        size="small"
                        type="button"
                        startIcon={<AddIcon />}
                        onClick={() => push("")}
                      ></Button>
                    </Stack>
                  ))}
                </Stack>
              );
            }}
          </FieldArray>
        </fieldset>
        <Stack direction="row" spacing={2} className="field-container">
          <label htmlFor="image" className="label">
            Image
          </label>
          <Field
            name="image"
            as="textarea"
            style={{ fontSize: "20px" }}
          ></Field>
        </Stack>
        <Stack direction="row" spacing={8} justifyContent="center">
          <Button
            variant="contained"
            type="submit"
            disabled={!isValid}
            className="form-btn"
            size="small"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
          <Button
            variant="contained"
            type="button"
            className="form-btn"
            onClick={goHome}
            size="small"
            startIcon={<KeyboardReturnIcon />}
          >
            Return
          </Button>
          <Button
            variant="contained"
            type="reset"
            className="form-btn"
            size="small"
            startIcon={<ClearIcon />}
          >
            Reset
          </Button>
        </Stack>
      </Form>
    );
  };

  return (
    <Formik
      initialValues={currentDirector ? currentDirector : emptyDirector}
      onSubmit={onDirectorSubmit}
      validationSchema={schema}
    >
      {renderForm}
    </Formik>
  );
}

export default DirectorForm;
