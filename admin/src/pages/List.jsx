import axios from 'axios';
import { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Typography,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const List = ({ token }) => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    const fetchList = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/display`, {
                withCredentials: true
            });
            if (response.data.success) {
                setList(response.data.products.reverse());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, {
                headers: { token }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const pageCount = Math.ceil(list.length / itemsPerPage);
    const paginatedList = list.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );


    return (
        <Box sx={{ padding: 2, backgroundColor: 'white', borderRadius: 2 }}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h6">All Products</Typography>
            </Box>

            {/* Header */}
            <Box sx={{
                display: 'flex',
                backgroundColor: '#4caf50',
                padding: 1,
                borderRadius: 1,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '0.8rem'
            }}>
                <Box sx={{ flex: 2, color: "white" }}>Image</Box>
                <Box sx={{ flex: 3, color: "white" }}>Name</Box>
                <Box sx={{ flex: 2, color: "white" }}>Category</Box>
                <Box sx={{ flex: 2, color: "white" }}>Price</Box>
                <Box sx={{ flex: 3, color: "white" }}>Actions</Box>
            </Box>

            {/* Product Rows */}
            {paginatedList.map((item) => (
                <Box
                    key={item._id}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        py: 0.5,
                        px: 1,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        my: 0.5,
                    }}
                >
                    <Box sx={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={item.image[0]}
                            alt={item.name}
                            style={{
                                width: '60px',
                                height: '60px',
                                objectFit: 'cover'
                            }}
                        />
                    </Box>
                    <Box sx={{ flex: 3 }}>
                        <Typography variant="caption" sx={{ ml: 14 }}>
                            {item.name}
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 10 }}>
                            {item.category}
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 2 }}>
                        <Typography variant="caption" color="green" sx={{ ml: 11 }}>
                            {currency}{item.price}
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 3, display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            onClick={() => removeProduct(item._id)}
                        >
                            Remove
                        </Button>
                    </Box>
                </Box>
            ))}

            {/* Pagination with Arrows */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setPage(page > 1 ? page - 1 : 1)}
                    disabled={page === 1}
                    sx={{ minWidth: 32 }}
                >
                    <ArrowBackIosIcon fontSize="small" />
                </Button>
                <Typography variant="body2" sx={{ mx: 2,mt:0.50 }}>
                    Page {page} of {pageCount}
                </Typography>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setPage(page < pageCount ? page + 1 : pageCount)}
                    disabled={page === pageCount}
                    sx={{ minWidth: 32 }}
                >
                    <ArrowForwardIosIcon fontSize="small" />
                </Button>
            </Box>
        </Box>
    );
};

List.propTypes = {
    token: PropTypes.string.isRequired,
};

export default List;
