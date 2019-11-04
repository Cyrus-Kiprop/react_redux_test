import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

const ManageCoursePage = ({
  loadCourses,
  loadAuthors,
  courses,
  authors,
  saveCourse,
  ...props
}) => {
  const [course, setCourse] = useState(props.course);

  const [errors, setErrors] = useState({});

  // handler functions
  const handleChange = event => {
    const { name, value } = event.target;
    setCourse(prevState => ({
      ...prevState,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
    console.log(course);
  };

  // onSave handler functions
  const handleSave = event => {
    event.preventDefault();
    saveCourse(course);
  };

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        console.log(error);
      });
    }

    if (authors.length === 0) console.log("fetched the data");
    loadAuthors().catch(error => {
      alert("loading Authors faied" + error);
    });
  }, []);

  return (
    <CourseForm
      authors={authors}
      course={course}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
};

ManageCoursePage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  saveCourse: PropTypes.func.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors
  };
};

// using the object form

const mapDispatchToProps = {
  loadAuthors: authorActions.loadAuthors,
  loadCourses: courseActions.loadCourses,
  saveCourse: courseActions.saveCourse
};

// exporting our compoenent with connect inorder to hook with react
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
