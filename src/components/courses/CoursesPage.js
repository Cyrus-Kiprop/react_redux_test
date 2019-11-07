import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";

import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CoursesList";

const CoursesPage = props => {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);
  useEffect(() => {
    if (props.courses.length === 0) {
      props.actions.loadCourses().catch(error => {
        console.log(error);
      });
    }

    if (props.authors.length === 0) console.log("fetched the data");
    props.actions.loadAuthors().catch(error => {
      alert("loading Authors faied" + error);
    });
  }, []);

  const [course, setCourse] = useState({ title: "" }); // stores individual course object

  const handleSubmit = event => {
    event.preventDefault();
    props.actions.createCourse(course);
  };

  const handleChange = event => {
    event.preventDefault();
    setCourse({ title: event.target.value });
  };

  return (
    <div>
      {redirectToAddCoursePage && <Redirect to="/course" />}
      <h2>Courses</h2>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-course"
            // sets the redirectToCoursePage to true hence the display of the Add  Course Button

            onClick={() => setRedirectToAddCoursePage(true)}
          >
            Add Course
          </button>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Enter the title of the course"
            />
            <input type="submit" value="Save" />

            <CourseList courses={props.courses} />
          </form>
        </>
      )}
    </div>
  );
};

CoursesPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  // take a second parameter called ownProps
  console.log(state);
  console.log(state.courses);
  console.log(state.authors);

  return {
    courses:
      state.courses.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,

              authorName: state.authors.find(
                author => author.id === course.authorId
              )
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress === 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
};

// exporting our compoenent with connect inorder to hook with react
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
