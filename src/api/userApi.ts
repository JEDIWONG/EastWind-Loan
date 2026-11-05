import { api } from "./client";

export const getLenderEmployeeDetails = async()=>{

    const {data} = await api.get(
      `/lender/employee`,
    );
  
    return data;
};