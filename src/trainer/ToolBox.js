// import React, { useState, useContext } from 'react';
// import {
//     Col,
//     Collapse,
//     Container,
//     Row,
// } from 'react-bootstrap';
// import UserContext from "../auth/UserContext";
// import LoginForm from '../auth/LoginForm';


// function ToolBox(){
//     const { currentUser } = useContext(UserContext);
//     const [open, setOpen] = useState(false);
//     const handleToggle = () => setOpen(!open);

//     return (
//         <div>
//             <Drawer >
//                 <Drawer.Toggle onClick={ handleToggle } />

//                 <Collapse in={ open }>
//                     <Drawer.Overflow>
//                         <Drawer.ToC>
//                             <Drawer.Header href="/">Application</Drawer.Header>

//                             <Drawer.Nav>
//                                 <Drawer.Item href="/settings">Settings</Drawer.Item>
//                             </Drawer.Nav>
//                         </Drawer.ToC>
//                     </Drawer.Overflow>
//                 </Collapse>
//             </Drawer>
//             {/* <LoginForm /> */}
//         </div>
//     );
// };

// export default ToolBox;