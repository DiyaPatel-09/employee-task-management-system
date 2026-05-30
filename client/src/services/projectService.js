import axios from "axios";

export const getProjects = async (token) => {

    const response = await axios.get(

        "http://localhost:5000/api/projects",

        {

            headers: {

                Authorization:

                    `Bearer ${token}`

            }

        }

    );

    return response.data;

};


export const createProject = async (projectData, token) => {

    const response = await axios.post(

        "http://localhost:5000/api/projects",

        projectData,

        {

            headers: {

                Authorization:

                    `Bearer ${token}`

            }

        }

    );

    return response.data;

};


export const deleteProject = async (id, token) => {

    const response = await axios.put(

        `http://localhost:5000/api/projects/archive/${id}`,

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


export const updateProject = async (id, projectData, token) => {

    const response = await axios.put(

        `http://localhost:5000/api/projects/${id}`,

        projectData,

        {

            headers: {

                Authorization:

                    `Bearer ${token}`

            }

        }

    );

    return response.data;

};


export const addProjectMember = async (data, token) => {

    const response = await axios.post(

        "http://localhost:5000/api/projects/members",

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


export const getProjectMembers = async (id, token) => {

    const response = await axios.get(

        `http://localhost:5000/api/projects/${id}/members`,

        {

            headers: {

                Authorization:

                    `Bearer ${token}`

            }

        }
    );
        return response.data;
}