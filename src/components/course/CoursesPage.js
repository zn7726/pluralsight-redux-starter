import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  
  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  render(){
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
      </div>
    );
  }
}

// state => state in redux store, rather than the react raw state
function mapStateToProps(state, ownProps) {  
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(courseActions.createCourse(course))

    // all actions in courseActions are now bound to dispatch
    actions: bindActionCreators(courseActions, dispatch)
  };
}

CoursesPage.propTypes={
  // dispatch: PropTypes.func.isRequired, no longer needed once mapDispatchToProps is defined
  courses: PropTypes.array.isRequired,
  // createCourse: PropTypes.func.isRequired
  actions: PropTypes.object.isRequired

};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);