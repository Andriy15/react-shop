export const writeItemToStorage = (title: string ,value: any) => {
	try {
		const jsonValue = JSON.stringify(value)
		localStorage.setItem(title, jsonValue)
		return jsonValue
	} catch (e) {
		return e
	}
}

export const readItemFromStorage = (title: string) => {
	try {
		const jsonValue = localStorage.getItem(title);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		return e;
	}
};