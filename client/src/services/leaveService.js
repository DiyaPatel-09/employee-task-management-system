import axios from "axios";

export const getAllLeaves = async (token) => {

    const response = await axios.get(

        "http://localhost:5000/api/leaves",

        {

            headers: {

                Authorization:

                    `Bearer ${token}`

            }

        }

    );

    return response.data;

};


export const updateLeaveStatus = async (

    id,

    leaveData,

    token

) => {

    const response = await axios.put(

        `http://localhost:5000/api/leaves/${id}`,

        leaveData,

        {

            headers: {

                Authorization:

                    `Bearer ${token}`

            }

        }

    );

    return response.data;

};



export const applyLeave = async (

    leaveData,

    token

) => {

    const response = await axios.post(

        "http://localhost:5000/api/leaves",

        leaveData,

        {

            headers: {

                Authorization:

                    `Bearer ${token}`

            }

        }

    );

    return response.data;

};


export const getEmployeeLeaves = async (

    token

) => {

    const response = await axios.get(

        "http://localhost:5000/api/leaves/my-leaves",

        {

            headers: {

                Authorization:

                    `Bearer ${token}`

            }

        }

    );

    return response.data;

};

export const cancelLeave = async (

    id,

    token

) => {

    const response = await axios.delete(

        `http://localhost:5000/api/leaves/${id}`,

        {

            headers: {

                Authorization:

                    `Bearer ${token}`

            }

        }

    );

    return response.data;

};