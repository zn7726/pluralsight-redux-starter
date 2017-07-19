import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: {title: ""}
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }
  
  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({course: course});
  }

  onClickSave() {
    // dispatch is auto injected by connect() when MapDispatchToProps() is not passed in to connect()
    // this.props.createCourse(this.state.course);

    // after using bindActionCreators
    this.props.actions.createCourse(this.state.course);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  render(){
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <h2>Add Course</h2>
        <input type="text" 
               onChange={this.onTitleChange} 
               value={this.state.course.title} />

        <input type="submit" value="Save" 
               onClick={this.onClickSave} />
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