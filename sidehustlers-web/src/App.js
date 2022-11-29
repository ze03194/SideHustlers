import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./components/LandingComponent/LandingPage";
import LoginPage from "./components/LoginComponent/LoginPage";
import RegisterPage from "./components/RegisterComponent/RegisterPage";
import RequireAuth from "./components/RequireAuth";
import ProfilePage from "./components/ProfileComponent/ProfilePage";
import PersistLogin from "./components/PersistComponent/PersistLogin";
import CreatePost from "./components/PostComponent/CreatePost";

function App() {
    // window.onbeforeunload = () => {
    // secureLocalStorage.removeItem('isLoggedIn');
    // secureLocalStorage.removeItem('user');
    // secureLocalStorage.removeItem('password');
    // }
    return (
        // <Provider store={store}>
        <BrowserRouter>
            <Routes id="root">
                <Route exact path="/" element={<LandingPage/>}/>
                <Route exact path="/login" element={<LoginPage/>}/>
                <Route exact path="/register" element={<RegisterPage/>}/>

                {/*Protect these routes*/}
                <Route element={<PersistLogin/>}>
                    <Route element={<RequireAuth/>}>
                        <Route exact path="/profile" element={<ProfilePage/>}/>
                        <Route exact path="/createPost" element={<CreatePost/>}/>

                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
        // </Provider>

    );
}

export default App;
