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

// ##############  TOP SCOUT COUNT #################

export const getTopScout = async () => {
    let token = localStorage.getItem('token');
    const request = await fetch(`${BASE_URL}/scout/topscouts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    let response = await request.json();
    return response.data;
};

// ##############  TOP SCOUT COUNT #################
// ##############  MONTHLY SCOUT COUNT #################

export const getMonthlyScout = async () => {
    let token = localStorage.getItem('token');
    const request = await fetch(`${BASE_URL}/scout/monthlyScouts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    let response = await request.json();
    return response.data;
};
// ##############  MONTHLY SCOUT COUNT #################

// ############## GET ALL SCOUT  ###############

export const getAllScouts = async () => {
    let token = localStorage.getItem('token');
    try {
        // const request = await fetch(`http://localhost:2300/scout/getscouts`, {
        const request = await fetch(`${BASE_URL}/scout/getscouts`, {
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
    } catch (error) {
        throw error;
    }
};

// ############## GET ALL SCOUT MEMBER #################

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
        // const request = await fetch(`http://localhost:2300/createScoutUser`, {
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
        const request = await fetch(`${BASE_URL}/scout/AddArea`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
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

// ############## GET ALL AREA #################

export const getAllAreas = async () => {
    let token = localStorage.getItem('token');
    const url = new URL(`${BASE_URL}/scout/getAllAreas`);

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
// ################################################################################################################
// ############## ADD Architecture #################

export const AddArchitecture = async (data: { architectureName: string, architecturePhoneNumber: string }) => {
    let token = localStorage.getItem('token');
    try {
        // const request = await fetch(`http://localhost:2300/scout/AddArchitecture`, {
        const request = await fetch(`${BASE_URL}/scout/AddArchitecture`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
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

// ############## ADD Architecture #################


// ############## ADD Architecture CSV FILE  #################

export const AddArchitectureCSVfile = async (data: any) => {
    let token = localStorage.getItem('token');
    try {
        // const request = await fetch(`http://localhost:2300/scout/AddArchitectureCSV`, {
        const request = await fetch(`${BASE_URL}/scout/AddArchitectureCSV`, {
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



// ############## Add Architecture CSV #################

// ############## GET Architecture  ###############

export const getArchitecture = async () => {
    let token = localStorage.getItem('token');
    try {
        // const request = await fetch(`http://localhost:2300/scout/getscouts`, {
        const request = await fetch(`${BASE_URL}/scout/getArchitecture`, {
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
    } catch (error) {
        throw error;
    }
};

// ############## GET Architecture #################

// ################################################################################################################
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


// ############## GET Single Scout Member #################

export const getSingleSop = async (sopId: any) => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(`${BASE_URL}/getSingleSop/${sopId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(request,"req")

        if (!request.ok) {
            let response = await request.json();
            throw new Error(response?.message);
        }
        let response = await request.json();
        console.log(response.data)
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const updateSop = async (data: any) => {
    // console.log(data.scoutMemberNames)
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(`${BASE_URL}/updateSop`, {
            method: 'PUT',
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
        return response.message;
    } catch (err) {
        throw err;
    }
};
// ############## Update Single Scout Member #################


// ############## GET Alloted Locations #################

export const getAllotedLocations = async () => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(`${BASE_URL}/scout/getAllotedLocation`, {
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

// ############## GET Locations #################

export const getUnAllotedLocations = async () => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(`${BASE_URL}/scout/getUnAllotedLocation`, {
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
            body: JSON.stringify(data),
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

export const getMeetings = async () => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(`${BASE_URL}/MeetingMembers/getMeeting`, {
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
    } catch (error) {
        throw error;
    }
};

export const getSinglemeetingLogs = async (meetingID: any) => {
    let token = localStorage.getItem('token');
    try {
        const request = await fetch(`${BASE_URL}/MeetingMembers/getSingleMeetingLogs/${meetingID}`, {
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
    } catch (error) {
        throw error;
    }
};

export const getLongAndLat = async () => {
    let token = localStorage.getItem('token');
    try {
        // const request = await fetch(`http://localhost:2300/scout/getLongAndLat`, {
        const request = await fetch(`${BASE_URL}/scout/getLongAndLat`, {
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
    } catch (error) {
        throw error;
    }
};

// ############################### Dashboard Pie Chart ###############################
export const pieChartDashboard = async () => {
    let token = localStorage.getItem('token');
    try {

        // const request = await fetch(`http://localhost:2300/dashboard/pieChart`, {
        const request = await fetch(`${BASE_URL}/dashboard/pieChart`, {
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
    } catch (error) {
        throw error;
    }
};
// ############################### Dashboard Pie Chart ###############################



// ############################### Dashboard Pie Chart ###############################
export const linearChartDashboard = async () => {
    let token = localStorage.getItem('token');
    try {

        // const request = await fetch(`http://localhost:2300/dashboard/linearChart`, {
        const request = await fetch(`${BASE_URL}/dashboard/linearChart`, {
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
    } catch (error) {
        throw error;
    }
};
// ############################### Dashboard Pie Chart ###############################



// ############################### View SOP ###############################
export const ViewSOPData = async () => {
    let token = localStorage.getItem('token');
    try {

        // const request = await fetch(`http://localhost:2300/viewSOP`, {
        const request = await fetch(`${BASE_URL}/viewSOP`, {
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
    } catch (error) {
        throw error;
    }
};
// ############################### View SOP ###############################


// ############## ADD Catalogue  #################

export const ADDCatalogue = async (formData: FormData): Promise<any> => {
    let token = localStorage.getItem('token');
    try {
        // const request = await fetch(`http://localhost:2300/catalogue/create`, {
        const request = await fetch(`${BASE_URL}/catalogue/create`, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: formData,
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


// ############## ADD Catalogue  #################

// ############################### View Catalogue ###############################
export const ViewCatalogue = async () => {
    let token = localStorage.getItem('token');
    try {

        // const request = await fetch(`http://localhost:2300/catalogue/getCatalogue`, {
        const request = await fetch(`${BASE_URL}/catalogue/getCatalogue`, {
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
    } catch (error) {
        throw error;
    }
};
// ############################### View Catalogue ###############################


// ################################################################################################################

// ############## Add Builder ###############################

export const AddBuilder = async (data: { builderName: string, builderPhoneNumber: string }) => {
    let token = localStorage.getItem('token');
    try {
        // const request = await fetch(`http://localhost:2300/scout/AddBuilder`, {
        const request = await fetch(`${BASE_URL}/scout/AddBuilder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
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

// ############## Add Builder ###############################

// ############## Get All Builder ###############################

export const GetAllBuilder = async () => {
    let token = localStorage.getItem('token');
    try {
        // const request = await fetch(`http://localhost:2300/scout/getscouts`, {
        const request = await fetch(`${BASE_URL}/scout/getBuilder`, {
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
    } catch (error) {
        throw error;
    }
};

// ############## Add Builder ###############################

// ############## Add Builder CSV FILE  #####################

export const AddBuilderCSVfile = async (data: any) => {
    let token = localStorage.getItem('token');
    try {
        // const request = await fetch(`http://localhost:2300/scout/AddBuilderCSV`, {
        const request = await fetch(`${BASE_URL}/scout/AddBuilderCSV`, {
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

// ############## Add Builder CSV ###########################

// ############## Add Electrician ###########################

export const AddElectrician = async (data: { electricianName: string, electricianPhoneNumber: string }) => {
    
    let token = localStorage.getItem('token');
    try {
        // const request = await fetch(`http://localhost:2300/scout/AddElectrician`, {
        const request = await fetch(`${BASE_URL}/scout/AddElectrician`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
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

// ############## Add Electrician ###########################
export const GetElectrician = async () => {
    let token = localStorage.getItem('token');
    try {
        // const request = await fetch(`http://localhost:2300/scout/getscouts`, {
        const request = await fetch(`${BASE_URL}/scout/getElectricians`, {
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
    } catch (error) {
        throw error;
    }
};

// ############## Add Electrician CSV FILE  #################

export const AddElectricianCSVfile = async (data: any) => {
    let token = localStorage.getItem('token');
    try {
        // const request = await fetch(`http://localhost:2300/scout/AddElectricianCSV`, {
        const request = await fetch(`${BASE_URL}/scout/AddElectricianCSV`, {
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

// ############## Add Electrician CSV #######################

// ################################################################################################################



