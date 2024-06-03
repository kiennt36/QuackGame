const BASE_URL = "https://api-quack-game.somee.com";

export const sendToken = async (token) => {
	const response = await fetch(
		`${BASE_URL}/QuackQuack/SendToken?token=${token}`,
		{
			method: "GET",
		}
	);
	const responseJson = response.status >= 500 ? {} : await response.json();

	return { status: response.status, ...responseJson };
};

export const sendNotification = async (message) => {
	const response = await fetch(`${BASE_URL}/Notification/SendMessage`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ message }),
	});
	const responseJson = response.status >= 500 ? {} : await response.json();

	return { status: response.status, ...responseJson };
};

export const getBalance = async () => {
	const uid = localStorage.getItem("uid");

	if (!uid) {
		return {
			status: 400,
			message: "Please send token",
		};
	}

	const response = await fetch(
		`${BASE_URL}/QuackQuack/GetBalance?uid=${uid}`,
		{
			method: "GET",
		}
	);
	const responseJson = response.status >= 500 ? {} : await response.json();

	return { status: response.status, ...responseJson };
};

export const getListReload = async () => {
	const uid = localStorage.getItem("uid");

	if (!uid) {
		return {
			status: 400,
			message: "Please send token",
		};
	}

	const response = await fetch(
		`${BASE_URL}/QuackQuack/GetListReload?uid=${uid}`,
		{
			method: "GET",
		}
	);
	const responseJson = response.status >= 500 ? {} : await response.json();

	return { status: response.status, ...responseJson };
};

export const collectEgg = async (nestId) => {
	const uid = localStorage.getItem("uid");

	if (!uid) {
		return {
			status: 400,
			message: "Please send token",
		};
	}

	const response = await fetch(
		`${BASE_URL}/QuackQuack/CollectEgg?uid=${uid}&nestId=${nestId}`,
		{
			method: "POST",
		}
	);
	const responseJson = response.status >= 500 ? {} : await response.json();

	return { status: response.status, ...responseJson };
};

export const layEgg = async (nestId, duckId) => {
	const uid = localStorage.getItem("uid");

	if (!uid) {
		return {
			status: 400,
			message: "Please send token",
		};
	}

	try {
		const response = await fetch(
			`${BASE_URL}/QuackQuack/LayEgg?uid=${uid}&nestId=${nestId}&duckId=${duckId}`,
			{
				method: "POST",
			}
		);
		const responseJson =
			response.status >= 500 ? {} : await response.json();

		return { status: response.status, ...responseJson };
	} catch (error) {
		return {
			status: 500,
			message: "Server error",
		};
	}
};

// Users
export const getUserList = async () => {
	const response = await fetch(`${BASE_URL}/User/GetAll`, {
		method: "GET",
	});
	const responseJson = response.status >= 500 ? {} : await response.json();

	return { status: response.status, data: responseJson };
};
