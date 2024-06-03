import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import LoadingPage from "../components/Loading";
import QuackQuackSleleton from "../components/Skeleton/QuackQuackSleleton";

const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const QuackQuackpage = lazy(() => import("../pages/QuackQuackPage"));
const ServerErrorPage = lazy(() => import("../pages/ServerErrorPage"));
const QuackQuackDetailPage = lazy(() =>
	import("../pages/QuackQuackPage/QuackQuackDetailPage")
);

const ErrorPage = () => (
	<LoadingPage>
		<ServerErrorPage />
	</LoadingPage>
);

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<LoadingPage>
				<DashboardPage />
			</LoadingPage>
		),
		errorElement: <ErrorPage />,
		children: [
			{
				path: "quackquack",
				element: (
					<LoadingPage fallback={<QuackQuackSleleton />}>
						<QuackQuackpage />
					</LoadingPage>
				),
				HydrateFallback: QuackQuackSleleton,
				errorElement: <ErrorPage />,
			},
			{
				path: "quackquack/:uid",
				element: (
					<LoadingPage>
						<QuackQuackDetailPage />
					</LoadingPage>
				),
				HydrateFallback: QuackQuackSleleton,
				errorElement: <ErrorPage />,
			},
		],
	},
	{
		path: "*",
		element: (
			<LoadingPage>
				<NotFoundPage />
			</LoadingPage>
		),
		errorElement: <ErrorPage />,
	},
]);

export default router;
