import React, { useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

const CoursesPage = props => {
  // const [courses, setCourses] = useState([]); // holds a number of courses

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
      <h2>Courses</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter the title of the course"
        />
        <input type="submit" value="Save" />
        {props.courses.map((val, index) => {
          return (
            <ul key={index}>
              <li>{val.title}</li>
            </ul>
          );
        })}
      </form>
    </div>
  );
};

CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  // take a second parameter called ownProps
  console.log(state.courses);

  return {
    courses: state.courses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
};

// exporting our compoenent with connect inorder to hook with react
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
