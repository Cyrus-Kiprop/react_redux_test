import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const ManageCoursePage = ({
  loadCourses,
  loadAuthors,
  courses,
  authors,
  saveCourse,
  history,
  ...props
}) => {
  // console.log(props.course);
  const [course, setCourse] = useState(props.course); // this is a single object {title: ""}
  const [saving, setSaving] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        console.log(error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) console.log("fetched the data");
    loadAuthors().catch(error => {
      alert("loading Authors faied" + error);
    });
  }, [props.course]);

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
    console.log(course);
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course saved successfully.");
        history.push("/courses");
      })
      .catch(err => {
        setSaving(false);
        setErrors({ onSave: err.message });
      });
  };

  return courses.length === 0 || authors.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      authors={authors}
      course={course}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
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
  loadAuthors: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
// This is a redux selector
export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;

  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
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
