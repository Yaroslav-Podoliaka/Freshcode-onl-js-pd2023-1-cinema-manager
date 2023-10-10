import React from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, /*FieldArray,*/ Form, Formik } from "formik";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { emptyStudio } from "../../constants";
import { createStudio, updateStudio } from "../../store/slices/studiosSlice";

function StudioForm() {
  const dispatch = useDispatch();

  const studios = useSelector((state) => state.studiosList.studios);
  // const {
  //   studiosList: { studios },
  // } = useSelector((state) => state);

  const { id } = useParams();

  const navigate = useNavigate();

  const currentStudio = studios.find(
    (studio) => studio.studio_id === parseInt(id)
  );

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });

  const goHome = () => navigate("/studios");

  const onStudioSubmit = (values) => {
    !values.studio_id
      ? dispatch(createStudio(values))
      : dispatch(updateStudio(values));
  };

  const renderForm = ({ isValid, values }) => {
    return (
      <Form id="form">
        <h1>Studios</h1>
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
            <label htmlFor="location" className="label">
              Location
            </label>
            <Field name="location" style={{ fontSize: "30px" }} />
          </Stack>
          <ErrorMessage name="location">
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
            <label htmlFor="year_foundation" className="label">
              Foundation Year
            </label>
            <Field name="year_foundation" style={{ fontSize: "30px" }} />
          </Stack>
          <ErrorMessage name="year_foundation">
            {(msg) => <div className="error">{msg}</div>}
          </ErrorMessage>
        </Stack>
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
      initialValues={currentStudio ? currentStudio : emptyStudio}
      onSubmit={onStudioSubmit}
      validationSchema={schema}
    >
      {renderForm}
    </Formik>
  );
}

export default StudioForm;
