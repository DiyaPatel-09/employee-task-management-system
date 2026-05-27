import axios from "axios";

export const getTasks = async (token) => {

    const response = await axios.get(

        "http://localhost:5000/api/tasks",

        {

            headers: {

                Authorization:

                    `Bearer ${token}`

            }

        }

    );

    return response.data;

};

export const assignTask =

    async (

        taskData,

        token

    ) => {

        const response =

            await axios.post(

                "http://localhost:5000/api/tasks",

                taskData,

                {

                    headers: {

                        Authorization:

                            `Bearer ${token}`

                    }

                }

            );

        return response.data;

    };


export const updateTask = async (id, data, token) => {

    const response = await axios.put(

        `http://localhost:5000/api/tasks/edit/${id}`,

        data,

        {

            headers: {

                Authorization:

                    `Bearer ${token}`

            }

        }

    );

    return response.data;

};

export const deleteTask = async (id, token) => {

    const response = await axios.delete(

        `http://localhost:5000/api/tasks/${id}`,

        {

            headers: {

                Authorization:

                    `Bearer ${token}`

            }

        }

    );

    return response.data;

};


export const archiveTask = async (id, token) => {

    const response = await axios.put(

        `http://localhost:5000/api/tasks/archive/${id}`,

        {},

        {

            headers: {

                Authorization:
                    `Bearer ${token}`

            }

        }

    );

    return response.data;

};


export const getProjectReport =

    async (token) => {

        const response =

            await axios.get(

                "http://localhost:5000/api/tasks/project-report",

                {

                    headers: {

                        Authorization:

                            `Bearer ${token}`

                    }

                }

            );

        return response.data;

    };

export const createTask = async (taskData) => {

    const token =

        localStorage.getItem(
            "token"
        );

    const response =

        await axios.post(

            "http://localhost:5000/api/tasks",

            taskData,

            {

                headers: {

                    Authorization:

                        `Bearer ${token}`

                }

            }

        );

    return response.data;

};


export const getEmployeeReport =

    async (

        from,

        to,

        token

    ) => {

        const response =

            await axios.get(

                "http://localhost:5000/api/tasks/employee-report",

                {

                    params: {

                        from,

                        to

                    },

                    headers: {

                        Authorization:

                            `Bearer ${token}`

                    }

                }

            );

        return response.data;

    };