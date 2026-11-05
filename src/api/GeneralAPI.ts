import { api } from "./client";

export const getLoanPurposes = async () => {
    const { data } = await api.get("/loans/purpose");

    return data;
};

export const getHomeOwnershipStatuses = async () => {
    const { data } = await api.get(
        "/general/home-ownership-status"
    );

    return data;
};

export const getEmploymentStatuses = async () => {
    const { data } = await api.get(
        "/general/employment-status"
    );

    return data;
};

export const getSectorList = async () => {
    const { data } = await api.get(
        "/general/sector"
    );

    return data;
};

export const getStateList = async () => {
    const { data } = await api.get(
        "/general/state"
    );

    return data;
};

export const getEduLevelList = async () => {
    const { data } = await api.get(
        "/general/edu-level"
    );

    return data;
};

export const getDebtTypeList = async () => {
    const { data } = await api.get(
        "/general/debt-type"
    );

    return data;
};

export const getBankList = async () => {
    const { data } = await api.get(
        "/general/bank"
    );

    return data;
};