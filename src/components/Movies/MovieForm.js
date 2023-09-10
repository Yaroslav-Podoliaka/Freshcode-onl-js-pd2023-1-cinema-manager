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
import { emptyMovie } from "../../constants";
import { createMovie, updateMovie } from "../../store/slices/moviesSlice";

function MovieForm() {
  const dispatch = useDispatch();

  const {
    moviesList: { movies },
    // actorsList: {actors},
    // directorsList: {directors},
  } = useSelector((state) => state);

  const { id } = useParams();

  const navigate = useNavigate();

  const currentMovie = movies.find((movie) => movie.id === parseInt(id));

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });

  const goHome = () => navigate("/movies");

  const onMovieSubmit = (values) => {
    !values.id ? dispatch(createMovie(values)) : dispatch(updateMovie(values));
  };

  const renderForm = ({ isValid, values }) => {
    return (
      <Form id="form">
        <h1>Movies</h1>
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
            <label htmlFor="title" className="label">
              Title
            </label>
            <Field name="title" style={{ fontSize: "30px" }} />
          </Stack>
          <ErrorMessage name="title">
            {(msg) => <div className="error">{msg}</div>}
          </ErrorMessage>
        </Stack>
        <fieldset className="items-container">
          <legend>Actors</legend>
          <FieldArray name="stars">
            {(fieldArrayProps) => {
              const { push, remove } = fieldArrayProps;
              const { stars } = values;
              return (
                <Stack spacing={2}>
                  {stars.map((_, id) => (
                    <Stack direction="row" key={nanoid()} spacing={2}>
                      <Field
                        name={`stars[${id}]`}
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
        <fieldset className="items-container">
          <legend>Directors</legend>
          <FieldArray name="producers">
            {({ push, remove }) => {
              const { producers } = values;
              return (
                <Stack spacing={2}>
                  {producers.map((_, id) => (
                    <Stack key={nanoid()} direction="row" spacing={2}>
                      <Field
                        name={`producers[${id}]`}
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
        <fieldset className="items-container">
          <legend>Studios</legend>
          <FieldArray name="companies">
            {({ push, remove }) => {
              const { companies } = values;
              return (
                <Stack spacing={2}>
                  {companies.map((_, id) => (
                    <Stack key={nanoid()} direction="row" spacing={2}>
                      <Field
                        name={`companies[${id}]`}
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
          <label htmlFor="poster" className="label">
            Poster
          </label>
          <Field
            name="poster"
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
      initialValues={currentMovie ? currentMovie : emptyMovie}
      onSubmit={onMovieSubmit}
      validationSchema={schema}
    >
      {renderForm}
    </Formik>
  );
}

export default MovieForm;
