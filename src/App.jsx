import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import PropTypes from "prop-types"; // Import PropTypes

function App() {
	const { currentUser } = useContext(AuthContext);

	const ProtectedRoute = ({ children }) => {
		if (!currentUser) {
			return <Navigate to="/login" />;
		}

		return children;
	};

	ProtectedRoute.propTypes = {
		children: PropTypes.node.isRequired,
	};

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route
							index
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}
						/>
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
