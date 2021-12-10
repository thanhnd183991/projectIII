import "./app.css";
import {
  CreateSeries,
  CreateMovie,
  User,
  Series,
  Users,
  Products,
  Movie,
} from "./pages";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Users />} />
        <Route exact path="/movies" element={<Products movies />} />
        <Route exact path="/series" element={<Products series />} />
        <Route exact path="/user/:id" element={<User />} />
        <Route exact path="/movie/:id" element={<Movie />} />
        <Route exact path="/movie/create" element={<CreateMovie />} />
        <Route exact path="/user/create" element={<User />} />
        <Route exact path="/series/:id" element={<Series />} />
        <Route exact path="/series/create" element={<CreateSeries />} />
      </Routes>
    </Router>
  );
}
// import React from "react";
// import { render } from "react-dom";
// import { Formik } from "formik";

// class Thumb extends React.Component {
//   state = {
//     loading: false,
//     thumb: undefined,
//   };

//   componentWillReceiveProps(nextProps) {
//     if (!nextProps.file) {
//       return;
//     }

//     this.setState({ loading: true }, () => {
//       let reader = new FileReader();

//       reader.onloadend = () => {
//         this.setState({ loading: false, thumb: reader.result });
//       };

//       reader.readAsDataURL(nextProps.file);
//     });
//   }

//   render() {
//     const { file } = this.props;
//     const { loading, thumb } = this.state;

//     if (!file) {
//       return null;
//     }

//     if (loading) {
//       return <p>loading...</p>;
//     }

//     return (
//       <img
//         src={thumb}
//         alt={file.name}
//         className="img-thumbnail mt-2"
//         height={200}
//         width={200}
//       />
//     );
//   }
// }

// class App extends React.Component {
//   render() {
//     return (
//       <div className="container">
//         <Formik
//           initialValues={{ file: null }}
//           onSubmit={(values) => {
//             alert(
//               JSON.stringify(
//                 {
//                   fileName: values.file.name,
//                   type: values.file.type,
//                   size: `${values.file.size} bytes`,
//                 },
//                 null,
//                 2
//               )
//             );
//           }}
//           render={({ values, handleSubmit, setFieldValue }) => {
//             return (
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label for="file">File upload</label>
//                   <input
//                     id="file"
//                     name="file"
//                     type="file"
//                     onChange={(event) => {
//                       setFieldValue("file", event.currentTarget.files[0]);
//                     }}
//                     className="form-control"
//                   />
//                   <Thumb file={values.file} />
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                   submit
//                 </button>
//               </form>
//             );
//           }}
//         />
//       </div>
//     );
//   }
// }

export default App;
