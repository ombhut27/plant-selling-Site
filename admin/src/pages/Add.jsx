import { useState } from 'react';
import PropTypes from 'prop-types';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    InputAdornment,
    Card,
    CardContent,
    CardHeader,
    Typography
} from '@mui/material';

const Add = ({ token }) => {
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Indoor');
    const [bestseller, setBestseller] = useState(false);
    const [newarrival, setNewarrival] = useState(false);
    const [hotsales, setHotsales] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('bestseller', bestseller);
            formData.append('newarrival', newarrival);
            formData.append('hotsales', hotsales);
            image1 && formData.append('image1', image1);
            image2 && formData.append('image2', image2);
            image3 && formData.append('image3', image3);
            image4 && formData.append('image4', image4);

            const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
                headers: { token },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setName('');
                setDescription('');
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setPrice('');
                setBestseller(false);
                setNewarrival(false);
                setHotsales(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Card sx={{ maxWidth: 600, margin: 'auto', mt: 1, boxShadow: 3, borderRadius: 2 }}>

                <CardHeader
                    title={<Typography variant="h6">Add New Product</Typography>}
                />

                <CardContent>
                    <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
                        <div sx={{ mt: 2, mb: 2 }}>
                            <InputLabel>Upload Images:</InputLabel>
                            <Grid container spacing={1} sx={{ mt: 1 }}>
                                {[image1, image2, image3, image4].map((image, index) => (
                                    <Grid item key={index}>
                                        <label className="cursor-pointer">
                                            <img
                                                src={image ? URL.createObjectURL(image) : assets.upload_area}
                                                alt="Upload Preview"
                                                style={{
                                                    width: 80,
                                                    height: 80,
                                                    border: '1px solid #ccc',
                                                    borderRadius: 6,
                                                    objectFit: 'cover',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                            <input
                                                onChange={(e) => [setImage1, setImage2, setImage3, setImage4][index](e.target.files[0])}
                                                type="file"
                                                hidden
                                            />
                                        </label>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>

                        <TextField
                            label="Product Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            size="small"
                            sx={{ mt: 2, mb: 2 }}
                        />

                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={2}
                            required
                            size="small"
                            sx={{ mt: 2, mb: 2 }}
                        />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth size="small" sx={{ mt: 2, mb: 2 }}>
                                    <InputLabel>Category</InputLabel>
                                    <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Category">
                                        <MenuItem value="Indoor">Indoor</MenuItem>
                                        <MenuItem value="Outdoor">Outdoor</MenuItem>
                                        <MenuItem value="Bonsai">Bonsai</MenuItem>
                                        <MenuItem value="Hanging">Hanging</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>


                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Price ($)"
                                    variant="outlined"
                                    fullWidth
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
                                    required
                                    type="number"
                                    size="small"
                                    sx={{ mt: 2, mb: 2 }}
                                />
                            </Grid>
                        </Grid>

                        <div className="flex flex-wrap gap-2 mt-3">
                            <FormControlLabel
                                control={<Checkbox checked={bestseller} onChange={() => setBestseller((prev) => !prev)} />}
                                label="Bestseller"
                                size="small"
                                sx={{ mt: 1, mb: 1 }}
                            />
                            <FormControlLabel
                                control={<Checkbox checked={newarrival} onChange={() => setNewarrival((prev) => !prev)} />}
                                label="New Arrival"
                                size="small"
                                sx={{ mt: 1, mb: 1 }}
                            />
                            <FormControlLabel
                                control={<Checkbox checked={hotsales} onChange={() => setHotsales((prev) => !prev)} />}
                                label="Hot Sale"
                                size="small"
                                sx={{ mt: 1, mb: 1 }}
                            />
                        </div>

                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, mb: 3 }} size="small">
                            ADD PRODUCT
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    );
};

Add.propTypes = {
    token: PropTypes.string.isRequired,
};

export default Add;
