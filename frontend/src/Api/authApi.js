const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/auth`

//RegisterAPI
export const registerAPI = async (payload) => {
    const res = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error((await res.json()).msg);
    return res.json();
};

export const loginAPI = async (payload) => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
        // If array of errors, throw it
        if (Array.isArray(data)) {
            const error = new Error("Multiple login errors");
            error.fields = data; // attach array
            throw error;
        }

        // If single error
        const error = new Error(data.message || "Login failed");
        error.field = data.field || "general";
        throw error;
    }

    return data;
};

