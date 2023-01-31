import axios from "axios";
import Diamond from "../../models/Diamond";
import {
    MY_SERVER,
    MY_SERVER_ADD_DIAMOND,
    MY_SERVER_DEL_DIAMOND,
    MY_SERVER_UPD_DIAMOND,
    MY_SERVER_AVG_CUT,
    MY_SERVER_IDEAL,
    MY_SERVER_MAX,
    MY_SERVER_MEAN,
    MY_SERVER_PREMIUM,
    MY_SERVER_PRICE_AVG,
    
    
} from "../../env"
import { Dictionary } from "@reduxjs/toolkit";

export function getDiamonds() {
    return new Promise<{ data: Diamond[] }>((resolve) =>
        axios.get(MY_SERVER).then(res => resolve({ data: res.data }))
    );
}

export function getAvgCut() {
    return new Promise<{ data: []}>((resolve) =>
        axios.get(MY_SERVER_AVG_CUT).then(res => resolve({ data: res.data }))
    );
}

export function getIdeal() {
    return new Promise<{ data: [] }>((resolve) =>
        axios.get(MY_SERVER_IDEAL).then(res => resolve({ data: res.data }))
    );
}

export function getMean() {
    return new Promise<{ data: [] }>((resolve) =>
        axios.get(MY_SERVER_MEAN).then(res => resolve({ data: res.data }))
    );
}

export function getMax() {
    return new Promise<{ data: [] }>((resolve) =>
        axios.get(MY_SERVER_MAX).then(res => resolve({ data: res.data }))
    );
}

export function getPremium() {
    return new Promise<{ data: [] }>((resolve) =>
        axios.get(MY_SERVER_PREMIUM).then(res => resolve({ data: res.data }))
    );
}

export function getPriceAvg() {
    return new Promise<{ data: []}>((resolve) =>
        axios.get(MY_SERVER_PRICE_AVG).then(res => resolve({ data: res.data }))
    );
}


export function addDiamond(new_diamond: Diamond) {
    return new Promise<{ data:  Diamond}>((resolve) =>
        axios.post(MY_SERVER_ADD_DIAMOND, new_diamond).then(res => resolve({ data: new_diamond }))
    );
}


export function delDiamond(id : number) {
    return new Promise<{ data: number }>((resolve) =>
        axios.delete(MY_SERVER_DEL_DIAMOND + id).then(res => resolve({ data: id }))
    );
}

export function updDiamond(new_diamond: Diamond) {
    return new Promise<{ data: Diamond }>((resolve) =>
        axios.put(MY_SERVER_UPD_DIAMOND, new_diamond).then(res => resolve({ data: new_diamond }))
    );
}
