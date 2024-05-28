import QuackContext from "./context/QuackContext";
import DashboardPage from "./pages/DashboardPage";
import "antd/dist/reset.css";

function App() {
	return (
		<QuackContext>
			<DashboardPage />;
		</QuackContext>
	);
}

export default App;
