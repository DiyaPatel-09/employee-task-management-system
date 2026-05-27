import axios from "axios";

export const getEmployees =

    async (token) => {

        const response =

            await axios.get(

                "http://localhost:5000/api/users",

                {

                    headers: {

                        Authorization:

                            `Bearer ${token}`

                    }

                }

            );

        return response.data;

    };

export const createEmployee =

    async (

        userData,

        token

    ) => {

        const response =

            await axios.post(

                "http://localhost:5000/api/users/register",

                userData,

                {

                    headers: {

                        Authorization:

                            `Bearer ${token}`

                    }

                }

            );

        return response.data;

    };


export const updateEmployee = async (id, data, token) => {

    const response = await axios.put(

        `http://localhost:5000/api/users/employees/${id}`,

        data,

        {

            headers: {Authorization: `Bearer ${token}`}

        }

    );

    return response.data;

};