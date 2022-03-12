// import React from "react";
// import {Navigate, Route, Routes} from "react-router-dom";
//
// const SecureRoute = ({ component: Component, security, ...otherProps }) => {
//     // const SecureRoute = ({ element: element, security, ...otherProps }) => {
//     return (
//         <Routes>
//             <Route
//                 {...otherProps}
//                 render={props =>
//                     security.validToken === true ? (
//                         <Component {...props} />
//                     ) : (
//                         <Navigate to="/login" />
//                     )
//                 }
//             />
//         </Routes>
//
//     );
// }
//
// export default SecureRoute;
