import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import Diamond from '../../models/Diamond';
import {
    getDiamonds,
    getAvgCut,
    getIdeal,
    getMax,
    getMean,
    getPremium,
    getPriceAvg,
    addDiamond,
    delDiamond,
    updDiamond
} from './diamondsAPI';

export interface diamondState {
    diamonds: Diamond[]
    updateFlag: boolean
    avg_cut: []
    ideal: []
    max: []
    mean: []
    premium: []
    price_avg: []
}

const initialState: diamondState = {
    diamonds: [],
    updateFlag: false,
    avg_cut: [],
    ideal: [],
    max: [],
    mean: [],
    premium: [],
    price_avg: []


};

export const getDiamondsAsync = createAsyncThunk(
    'diamond/getDiamonds',
    async () => {
        const response = await getDiamonds();
        return response.data;
    }
);

export const getAvgCutAsync = createAsyncThunk(
    'diamond/getAvgCut',
    async () => {
        const response = await getAvgCut();
        return response.data;
    }
);

export const getIdealAsync = createAsyncThunk(
    'diamond/getIdeal',
    async () => {
        const response = await getIdeal();
        return response.data;
    }
);

export const getMaxAsync = createAsyncThunk(
    'diamond/getMax',
    async () => {
        const response = await getMax();
        return response.data;
    }
);

export const getMeanAsync = createAsyncThunk(
    'diamond/getMean',
    async () => {
        const response = await getMean();
        return response.data;
    }
);

export const getPremiumAsync = createAsyncThunk(
    'diamond/getPremium',
    async () => {
        const response = await getPremium();
        return response.data;
    }
);

export const getPriceAvgAsync = createAsyncThunk(
    'diamond/getPriceAvg',
    async () => {
        const response = await getPriceAvg();
        return response.data;
    }
);

export const updDiamondAsync = createAsyncThunk(
    'diamond/updDiamond',
    async (new_diamond: Diamond) => {
        const response = await updDiamond(new_diamond);
        return response.data;
    }
);

export const addDiamondAsync = createAsyncThunk(
    'diamond/addDiamond',
    async (new_diamond: Diamond) => {
        const response = await addDiamond(new_diamond);
        return response.data;
    }
);

export const delDiamondAsync = createAsyncThunk(
    'diamond/delDiamond',
    async (id: number) => {
        const response = await delDiamond(id);
        return response.data;
    }
);


export const diamondSlice = createSlice({
    name: 'diamond',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getDiamondsAsync.fulfilled, (state, action) => {
                state.diamonds = action.payload;

            })
            .addCase(getAvgCutAsync.fulfilled, (state, action) => {
                state.avg_cut = action.payload;
            })
            .addCase(getIdealAsync.fulfilled, (state, action) => {
                state.ideal = action.payload;
            })
            .addCase(getMaxAsync.fulfilled, (state, action) => {
                state.max = action.payload;
            })
            .addCase(getMeanAsync.fulfilled, (state, action) => {
                state.mean = action.payload;
            })
            .addCase(getPremiumAsync.fulfilled, (state, action) => {
                state.premium = action.payload;
            })
            .addCase(getPriceAvgAsync.fulfilled, (state, action) => {
                state.price_avg = action.payload;
            })

            .addCase(addDiamondAsync.fulfilled, (state, action) => {

                  state.diamonds.push( action.payload);


                state.updateFlag = !state.updateFlag;
            })
            .addCase(delDiamondAsync.fulfilled, (state, action) => {

                state.diamonds.filter(d => d.ID != action.payload);
                //   console.log(state.diamonds)
                state.updateFlag = !state.updateFlag;
            })
            .addCase(updDiamondAsync.fulfilled, (state, action) => {
                // console.log(action.payload)
                //   state.status = 'idle';
                state.updateFlag = !state.updateFlag;
            });

    },
});

export const { } = diamondSlice.actions;
export const selectdiamonds = (state: RootState) => state.diamond.diamonds;
export const selectUpdate = (state: RootState) => state.diamond.updateFlag;
export const selectAvgCut = (state: RootState) => state.diamond.avg_cut;
export const selectIdeal = (state: RootState) => state.diamond.ideal;
export const selectMax = (state: RootState) => state.diamond.max;
export const selectMean = (state: RootState) => state.diamond.mean;
export const selectPremium = (state: RootState) => state.diamond.premium;
export const selectAvgPrice = (state: RootState) => state.diamond.price_avg;
export default diamondSlice.reducer;
