import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { ChangeEvent, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { cityList } from '../../city/citySlice';
import { studentActions, studentFilter } from '../studentSlice';

const StudentFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(studentFilter);
    const searchRef = useRef<HTMLInputElement>(null);
    const cityData = useAppSelector(cityList);
    const [searchParams] = useSearchParams();
    const nameQuery = searchParams.get('name');

    useEffect(() => {
        if (nameQuery) {
            if (searchRef.current) searchRef.current.value = nameQuery;
            dispatch(
                studentActions.setFilterSearch({
                    ...filter,
                    _page: 1,
                    name_like: nameQuery!,
                })
            );
        }
    }, [nameQuery]);

    const searchHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            studentActions.setFilterSearch({
                ...filter,
                _page: 1,
                name_like: e.target.value,
            })
        );
    };

    const handleCityChange = (
        e: ChangeEvent<{ name?: string; value: unknown }>
    ) => {
        dispatch(
            studentActions.setFilterSearch({
                ...filter,
                _page: 1,
                city: e.target.value,
            })
        );
    };

    const handleClearFilter = () => {
        dispatch(
            studentActions.setFilter({
                ...filter,
                _page: 1,
                _limit: 10,
                _order: 'asc',
                _sort: 'name',
                name_like: '',
                city: undefined,
            })
        );

        if (searchRef.current) searchRef.current.value = '';
    };

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel htmlFor="searchByName">
                            Search by name
                        </InputLabel>
                        <OutlinedInput
                            id="searchByName"
                            label="Search by name"
                            endAdornment={<Search />}
                            onChange={searchHandleChange}
                            inputRef={searchRef}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={5}>
                    <FormControl variant="outlined" size="small" fullWidth>
                        <InputLabel id="filterByCity">
                            Filter by city
                        </InputLabel>
                        <Select
                            labelId="filterByCity"
                            value={filter.city || ''}
                            onChange={handleCityChange}
                            label="Filter by city"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>

                            {cityData.map(city => (
                                <MenuItem key={city.code} value={city.code}>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6} md={1}>
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={handleClearFilter}
                    >
                        Clear
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StudentFilter;
