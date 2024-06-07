import { error } from 'console';
import { BASE_URL } from '../Constants/Constant';

// ##############  Authentication  #############

export const Authentication = async () => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(`${BASE_URL}/protected`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (!request.ok) {
            let response = await request.json();
            console.log('this is request.ok');
            throw new Error(response.message);
        }
        let response = await request.json();
        return response;
    } catch (err) {
        throw err;
    }
};

// ##############  SCOUT COUNT #################

export const getScoutCount = async () => {
    let token = localStorage.getItem('token');
    const request = await fetch(`${BASE_URL}/scout/countScout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    let response = await request.json();
    return response.data;
};

// ############## GET ALL SCOUT  ###############

export const getAllScouts = async () => {
    let token = localStorage.getItem('token');
    const request = await fetch(`${BASE_URL}/scout/getscouts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    let response = await request.json();
    return response.data;
};

// ############## GET ALL SCOUT  #################

export const getScoutMember = async () => {
    let token = localStorage.getItem('token');
    const request = await fetch(`${BASE_URL}/scoutsMember`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    let response = await request.json();
    return response.data;
};

// ############## ADD SCOUT MEMBER  #################

export const AddScoutMember = async (data: Object) => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(`${BASE_URL}/createScoutUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!request.ok) {
            let response = await request.json();
            throw new Error(response?.message);
        }
        let response = await request.json();
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ############## ADD CITY  #################

export const AddCity = async (data: string) => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(
            `${BASE_URL}/scout/AddCity
        `,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ cityName: data }),
            }
        );

        if (!request.ok) {
            let response = await request.json();
            throw new Error(response.message);
        }
        let response = await request.json();
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ############## ADD CITY CSV FILE  #################

export const AddCityCSVfile = async (data: any) => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(`${BASE_URL}/scout/AddCityCSV`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: data,
        });

        if (!request.ok) {
            let response = await request.json();
            throw new Error(response.message);
        }
        let response = await request.json();
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ############## GET CITY #################

export const getCity = async () => {
    let token = localStorage.getItem('token');
    const request = await fetch(`${BASE_URL}/scout/getCities`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    let response = await request.json();
    return response.data;
};

// ############## ADD AREA  #################

export const AddAreas = async (data: any) => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(
            `${BASE_URL}/scout/AddArea
        `,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            }
        );

        if (!request.ok) {
            let response = await request.json();
            throw new Error(response.message);
        }
        let response = await request.json();
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ############## ADD AREA CSV File  #################

export const AddAreaCSVfile = async (data: any) => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(`${BASE_URL}/scout/AddAreaCSV`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: data,
        });

        if (!request.ok) {
            let response = await request.json();
            throw new Error(response.message);
        }
        let response = await request.json();
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ############## GET AREA #################

export const getAreas = async (cityId: any) => {
    let token = localStorage.getItem('token');
    const url = new URL(`${BASE_URL}/scout/getAreas`);
    url.searchParams.append('cityId', cityId);

    const request = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!request.ok) {
        let response = await request.json();
        throw new Error(response.message);
    }
    let response = await request.json();
    return response.data;
};

// ############## ADD SUB AREA  #################

export const AddSubAreas = async (areaId: any, subAreaName: any) => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(
            `${BASE_URL}/scout/AddSubArea
        `,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ areaId: areaId, subAreaName: subAreaName }),
            }
        );

        if (!request.ok) {
            let response = await request.json();
            throw new Error(response.message);
        }
        let response = await request.json();
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ############## ADD AREA CSV File  #################

export const AddSubAreaCSVfile = async (data: any) => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(`${BASE_URL}/scout/AddSubAreaCSV`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: data,
        });

        if (!request.ok) {
            let response = await request.json();
            throw new Error(response.message);
        }
        let response = await request.json();
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ############## ADD SUB AREA  #################

export const getSubAreas = async (areaId: any) => {
    let token = localStorage.getItem('token');
    let url = new URL(`${BASE_URL}/scout/getSubAreas`);
    url.searchParams.append('areaId', areaId);

    try {
        const request = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!request.ok) {
            let response = await request.json();
            throw new Error(response.message);
        }
        let response = await request.json();
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ############## ADD AREA  #################

export const AddMeetingMember = async (data: any) => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(
            `${BASE_URL}/MeetingMembers/createMeetingMembers
        `,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            }
        );

        if (!request.ok) {
            let response = await request.json();
            throw new Error(response.message);
        }
        let response = await request.json();
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createSOP = async (data: any) => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(
            `${BASE_URL}/createSOP
        `,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            }
        );

        if (!request.ok) {
            let response = await request.json();
            throw new Error(response.message);
        }
        let response = await request.json();
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ############## GET Locations #################

export const getLocations = async (location: any) => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(`${BASE_URL}/scout/getLocation/${location}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!request.ok) {
            let response = await request.json();
            throw new Error(response?.message);
        }
        let response = await request.json();
        return response.data;
    } catch (err) {
        throw err;
    }
};

// ############## Manually Add Scout Member #################

export const ManuallyAddScoutMember = async (data: any) => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(
            `${BASE_URL}/scout/addUnassignedScouter
        `,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            }
        );

        if (!request.ok) {
            let response = await request.json();
            throw new Error(response.message);
        }
        let response = await request.json();
        return response.message;
    } catch (error) {
        throw error;
    }
};

// ############## GET Single Scout Member #################

export const getSingleScoutMember = async (userID: any) => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(`${BASE_URL}/scout/getSingleScoutUser/${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!request.ok) {
            let response = await request.json();
            throw new Error(response?.message);
        }
        let response = await request.json();
        return response.data[0];
    } catch (err) {
        throw err;
    }
};

// ############## Update Single Scout Member #################

export const updateScoutMember = async (data: any) => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(`${BASE_URL}/scout/updateScouteMember`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });

        if (!request.ok) {
            let response = await request.json();
            throw new Error(response?.message);
        }
        let response = await request.json();
        return response.message;
    } catch (err) {
        throw err;
    }
};


